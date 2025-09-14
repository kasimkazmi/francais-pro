'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { observeAuth, emailSignIn, emailSignUp, signOutUser, resetPassword, googleSignIn } from '@/lib/firebase/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  level: 'beginner' | 'intermediate' | 'advanced';
  streak: number;
  totalLessons: number;
  wordsLearned: number;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  sendReset: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  needsUsername: boolean;
  setUserDisplayName: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapUser(u: User): AppUser {
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName,
    level: 'beginner',
    streak: 0,
    totalLessons: 0,
    wordsLearned: 0,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsUsername, setNeedsUsername] = useState(false);

  useEffect(() => {
    const unsub = observeAuth((u) => {
      const mappedUser = u ? mapUser(u) : null;
      setUser(mappedUser);
      
      // Check if user needs a username
      if (mappedUser && !mappedUser.displayName) {
        setNeedsUsername(true);
      } else {
        setNeedsUsername(false);
      }
      
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const u = await emailSignIn(email, password);
      setUser(mapUser(u));
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const u = await emailSignUp(email, password, name);
      setUser(mapUser(u));
      return true;
    } catch {
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const u = await googleSignIn();
      setUser(mapUser(u));
      return true;
    } catch {
      return false;
    }
  };

  const sendReset = async (email: string) => {
    await resetPassword(email);
  };

  const logout = async () => {
    try {
      await signOutUser();
      setUser(null);
      setNeedsUsername(false);
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear local state even if Firebase logout fails
      setUser(null);
      setNeedsUsername(false);
    }
  };

  const setUserDisplayName = useCallback(async (displayName: string): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // Update Firebase Auth profile
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName });
      }
      
      // Update local state
      setUser(prev => prev ? { ...prev, displayName } : null);
      setNeedsUsername(false);
    } catch (error) {
      console.error('Error setting display name:', error);
      throw error;
    }
  }, [user]);

  const value = useMemo<AuthContextType>(
    () => ({ 
      user, 
      isLoading, 
      login, 
      signup, 
      loginWithGoogle, 
      sendReset, 
      logout, 
      isAuthenticated: !!user,
      needsUsername,
      setUserDisplayName
    }),
    [user, isLoading, needsUsername, setUserDisplayName]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
