'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'moderator' | 'user';
  permissions: string[];
  createdAt: Date;
  lastActive: Date;
}

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalLessonsCompleted: number;
  averageProgress: number;
  topPerformers: Array<{
    uid: string;
    displayName: string;
    totalLessonsCompleted: number;
    overallProgress: number;
  }>;
  recentActivity: Array<{
    uid: string;
    displayName: string;
    action: string;
    timestamp: Date;
  }>;
}

interface AdminContextType {
  isAdmin: boolean;
  isModerator: boolean;
  adminUser: AdminUser | null;
  adminStats: AdminStats | null;
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
  updateUserRole: (uid: string, role: 'admin' | 'moderator' | 'user') => Promise<void>;
  banUser: (uid: string, reason: string) => Promise<void>;
  unbanUser: (uid: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const checkAdminStatus = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setAdminUser(null);
      setLoading(false);
      return;
    }

    try {
      const adminDoc = await getDoc(doc(db, 'adminUsers', user.uid));
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        setAdminUser({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Admin',
          role: adminData.role || 'user',
          permissions: adminData.permissions || [],
          createdAt: adminData.createdAt?.toDate() || new Date(),
          lastActive: adminData.lastActive?.toDate() || new Date()
        });
      } else {
        setAdminUser(null);
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      setError('Failed to check admin status');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Load admin statistics
  const loadAdminStats = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get total users
      const usersQuery = query(collection(db, 'userProfiles'));
      const usersSnapshot = await getDocs(usersQuery);
      const totalUsers = usersSnapshot.size;

      // Get active users (users with recent activity)
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 7); // Last 7 days
      
      let activeUsers = 0;
      let totalLessonsCompleted = 0;
      let totalProgress = 0;
      const topPerformers: AdminStats['topPerformers'] = [];
      const recentActivity: AdminStats['recentActivity'] = [];

      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        const lastActive = data.lastActiveAt?.toDate();
        
        if (lastActive && lastActive > recentDate) {
          activeUsers++;
        }

        totalLessonsCompleted += data.totalStudyTime || 0;
        totalProgress += data.level || 0;

        // Top performers
        if (data.xp > 0) {
          topPerformers.push({
            uid: doc.id,
            displayName: data.displayName || 'Anonymous',
            totalLessonsCompleted: Math.round((data.totalStudyTime || 0) / 60), // Convert minutes to hours
            overallProgress: data.level || 0
          });
        }
      });

      // Sort top performers
      topPerformers.sort((a, b) => b.totalLessonsCompleted - a.totalLessonsCompleted);

      setAdminStats({
        totalUsers,
        activeUsers,
        totalLessonsCompleted: Math.round(totalLessonsCompleted / 60), // Convert to hours
        averageProgress: totalUsers > 0 ? Math.round(totalProgress / totalUsers) : 0,
        topPerformers: topPerformers.slice(0, 10),
        recentActivity: recentActivity.slice(0, 20)
      });
    } catch (err) {
      console.error('Error loading admin stats:', err);
      setError('Failed to load admin statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user role
  const updateUserRole = useCallback(async (uid: string, role: 'admin' | 'moderator' | 'user') => {
    if (!adminUser || adminUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    try {
      const permissions = role === 'admin' 
        ? ['read', 'write', 'delete', 'manage_users', 'manage_content']
        : role === 'moderator'
        ? ['read', 'write', 'manage_content']
        : ['read'];

      await setDoc(doc(db, 'adminUsers', uid), {
        role,
        permissions,
        updatedAt: new Date(),
        updatedBy: user?.uid
      }, { merge: true });
    } catch (err) {
      console.error('Error updating user role:', err);
      throw new Error('Failed to update user role');
    }
  }, [adminUser, user]);

  // Ban user
  const banUser = useCallback(async (uid: string, reason: string) => {
    if (!adminUser || adminUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    try {
      await setDoc(doc(db, 'bannedUsers', uid), {
        reason,
        bannedAt: new Date(),
        bannedBy: user?.uid,
        status: 'banned'
      });
    } catch (err) {
      console.error('Error banning user:', err);
      throw new Error('Failed to ban user');
    }
  }, [adminUser, user]);

  // Unban user
  const unbanUser = useCallback(async (uid: string) => {
    if (!adminUser || adminUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    try {
      await setDoc(doc(db, 'bannedUsers', uid), {
        status: 'unbanned',
        unbannedAt: new Date(),
        unbannedBy: user?.uid
      }, { merge: true });
    } catch (err) {
      console.error('Error unbanning user:', err);
      throw new Error('Failed to unban user');
    }
  }, [adminUser, user]);

  // Refresh stats
  const refreshStats = useCallback(async () => {
    await loadAdminStats();
  }, [loadAdminStats]);

  // Check admin status on mount and when user changes
  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  // Load stats when admin status is confirmed
  useEffect(() => {
    if (adminUser?.role === 'admin' || adminUser?.role === 'moderator') {
      loadAdminStats();
    }
  }, [adminUser?.role, loadAdminStats]);

  const isAdmin = adminUser?.role === 'admin';
  const isModerator = adminUser?.role === 'moderator' || isAdmin;

  return (
    <AdminContext.Provider value={{
      isAdmin,
      isModerator,
      adminUser,
      adminStats,
      loading,
      error,
      refreshStats,
      updateUserRole,
      banUser,
      unbanUser
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
