'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { observeAuth, emailSignIn, emailSignUp, signOutUser, resetPassword, googleSignIn } from '@/lib/firebase/auth';

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

  useEffect(() => {
    const unsub = observeAuth((u) => {
      setUser(u ? mapUser(u) : null);
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
      const u = await emailSignUp(email, password);
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

  const logout = () => {
    signOutUser();
    setUser(null);
  };

  const value = useMemo<AuthContextType>(
    () => ({ user, isLoading, login, signup, loginWithGoogle, sendReset, logout, isAuthenticated: !!user }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
