'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  UserProfile,
  UserActivity,
  UserPreferences,
  UserSession,
  createOrUpdateUserProfile,
  getUserProfile,
  logUserActivity,
  getUserActivities,
  createOrUpdateUserPreferences,
  getUserPreferences,
  createUserSession,
  updateUserSession,
  endUserSession,
  getUserSessions,
  updateUserLastActive,
} from '@/lib/firebase/user-storage';

interface UserStorageContextType {
  // Profile
  userProfile: UserProfile | null;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  
  // Preferences
  userPreferences: UserPreferences | null;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  refreshPreferences: () => Promise<void>;
  
  // Activities
  userActivities: UserActivity[];
  logActivity: (activityType: UserActivity['activityType'], activityData: UserActivity['activityData']) => Promise<void>;
  refreshActivities: () => Promise<void>;
  
  // Sessions
  currentSession: UserSession | null;
  startSession: () => Promise<void>;
  endCurrentSession: () => Promise<void>;
  userSessions: UserSession[];
  refreshSessions: () => Promise<void>;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

const UserStorageContext = createContext<UserStorageContextType | undefined>(undefined);

export function UserStorageProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate session ID
  const generateSessionId = useCallback(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Get device info
  const getDeviceInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    return `${platform} - ${language}`;
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (profileData: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      await createOrUpdateUserProfile(user.uid, profileData);
      await refreshProfile();
      
      // Log profile update activity
      await logActivity('profile_update', {
        deviceInfo: getDeviceInfo(),
        userAgent: navigator.userAgent,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, getDeviceInfo]);

  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  }, [user]);

  // Update user preferences
  const updatePreferences = useCallback(async (preferences: Partial<UserPreferences>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      await createOrUpdateUserPreferences(user.uid, preferences);
      await refreshPreferences();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Refresh user preferences
  const refreshPreferences = useCallback(async () => {
    if (!user) return;
    
    try {
      const preferences = await getUserPreferences(user.uid);
      setUserPreferences(preferences);
    } catch (err) {
      console.error('Error refreshing preferences:', err);
    }
  }, [user]);

  // Log user activity
  const logActivity = useCallback(async (
    activityType: UserActivity['activityType'],
    activityData: UserActivity['activityData']
  ) => {
    if (!user || !currentSession) return;
    
    try {
      await logUserActivity(user.uid, activityType, activityData, currentSession.sessionId);
      await refreshActivities();
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  }, [user, currentSession]);

  // Refresh user activities
  const refreshActivities = useCallback(async () => {
    if (!user) return;
    
    try {
      const activities = await getUserActivities(user.uid, 50);
      setUserActivities(activities);
    } catch (err) {
      console.error('Error refreshing activities:', err);
    }
  }, [user]);

  // Start user session
  const startSession = useCallback(async () => {
    if (!user) return;
    
    try {
      const sessionId = generateSessionId();
      const deviceInfo = getDeviceInfo();
      
      await createUserSession(
        user.uid,
        sessionId,
        deviceInfo,
        'unknown', // IP address - would need server-side implementation
        navigator.userAgent
      );
      
      const session: UserSession = {
        uid: user.uid,
        sessionId,
        startTime: new Date(),
        deviceInfo,
        ipAddress: 'unknown',
        userAgent: navigator.userAgent,
        activities: [],
        totalTimeSpent: 0,
        pagesVisited: [],
        isActive: true,
      };
      
      setCurrentSession(session);
      
      // Log login activity
      await logUserActivity(user.uid, 'login', {
        deviceInfo,
        userAgent: navigator.userAgent,
      }, sessionId);
    } catch (err) {
      console.error('Error starting session:', err);
    }
  }, [user, generateSessionId, getDeviceInfo]);

  // End current session
  const endCurrentSession = useCallback(async () => {
    if (!currentSession) return;
    
    try {
      await endUserSession(currentSession.sessionId);
      
      // Log logout activity
      if (user) {
        await logUserActivity(user.uid, 'logout', {
          deviceInfo: currentSession.deviceInfo,
          userAgent: currentSession.userAgent,
        }, currentSession.sessionId);
      }
      
      setCurrentSession(null);
    } catch (err) {
      console.error('Error ending session:', err);
    }
  }, [currentSession, user]);

  // Refresh user sessions
  const refreshSessions = useCallback(async () => {
    if (!user) return;
    
    try {
      const sessions = await getUserSessions(user.uid, 20);
      setUserSessions(sessions);
    } catch (err) {
      console.error('Error refreshing sessions:', err);
    }
  }, [user]);

  // Initialize user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const initializeUserData = async () => {
        try {
          setLoading(true);
          
          // Create or update user profile with Firebase Auth data
          await createOrUpdateUserProfile(user.uid, {
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || null,
            isEmailVerified: user.emailVerified,
          });
          
          // Load all user data
          await Promise.all([
            refreshProfile(),
            refreshPreferences(),
            refreshActivities(),
            refreshSessions(),
          ]);
          
          // Start new session
          await startSession();
          
        } catch (err) {
          console.error('Error initializing user data:', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize user data');
        } finally {
          setLoading(false);
        }
      };
      
      initializeUserData();
    } else {
      // Clear data when not authenticated
      setUserProfile(null);
      setUserPreferences(null);
      setUserActivities([]);
      setCurrentSession(null);
      setUserSessions([]);
      setError(null);
    }
  }, [isAuthenticated, user, refreshProfile, refreshPreferences, refreshActivities, refreshSessions, startSession]);

  // Update last active time periodically
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(async () => {
      try {
        await updateUserLastActive(user.uid);
      } catch (err) {
        console.error('Error updating last active:', err);
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [user]);

  // Handle page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentSession) {
        // Page is hidden, update session
        updateUserSession(currentSession.sessionId, {
          totalTimeSpent: currentSession.totalTimeSpent + 1,
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentSession]);

  // Handle beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentSession) {
        endCurrentSession();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [endCurrentSession, currentSession]);

  const value: UserStorageContextType = {
    userProfile,
    updateProfile,
    refreshProfile,
    userPreferences,
    updatePreferences,
    refreshPreferences,
    userActivities,
    logActivity,
    refreshActivities,
    currentSession,
    startSession,
    endCurrentSession,
    userSessions,
    refreshSessions,
    loading,
    error,
  };

  return (
    <UserStorageContext.Provider value={value}>
      {children}
    </UserStorageContext.Provider>
  );
}

export function useUserStorage() {
  const context = useContext(UserStorageContext);
  if (context === undefined) {
    throw new Error('useUserStorage must be used within a UserStorageProvider');
  }
  return context;
}
