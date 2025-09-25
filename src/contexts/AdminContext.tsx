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
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const checkAdminStatus = useCallback(async () => {
    // Wait for auth to finish loading before checking admin status
    if (authLoading) {
      return;
    }
    
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
  }, [isAuthenticated, user, authLoading]);

  // Load admin statistics
  const loadAdminStats = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get total users from userProfiles
      const usersQuery = query(collection(db, 'userProfiles'));
      const usersSnapshot = await getDocs(usersQuery);
      const totalUsers = usersSnapshot.size;

      // Get user progress data for accurate lesson completion stats
      const progressQuery = query(collection(db, 'userProgress'));
      const progressSnapshot = await getDocs(progressQuery);
      
      // Create a map of progress data by UID
      const progressMap = new Map();
      progressSnapshot.forEach((doc) => {
        const data = doc.data();
        progressMap.set(doc.id, data);
      });
      
      // console.log('📊 Admin Stats Debug:');
      // console.log('👥 Total users:', totalUsers);
      // console.log('📈 Progress documents found:', progressSnapshot.size);
      // console.log('📚 Sample progress data:', Array.from(progressMap.entries()).slice(0, 3));
      // console.log('📊 Sample user profile levels:', usersSnapshot.docs.slice(0, 3).map(doc => ({ uid: doc.id, level: doc.data().level, type: typeof doc.data().level })));

      // Get active users (users with recent activity)
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 7); // Last 7 days
      
      let activeUsers = 0;
      let totalLessonsCompleted = 0;
      let totalProgress = 0;
      const topPerformers: AdminStats['topPerformers'] = [];
      const recentActivity: AdminStats['recentActivity'] = [];

      // Process user profiles for basic stats
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        const lastActive = data.lastActiveAt?.toDate();
        
        if (lastActive && lastActive > recentDate) {
          activeUsers++;
        }

        // Get progress data for this user
        const userProgress = progressMap.get(doc.id);
        const lessonsCompleted = userProgress?.totalLessonsCompleted || 0;
        
        // Convert level to number properly
        let userLevel = 0;
        if (userProgress?.level) {
          if (typeof userProgress.level === 'string') {
            // Convert string levels to numbers
            switch (userProgress.level) {
              case 'beginner': userLevel = 1; break;
              case 'intermediate': userLevel = 2; break;
              case 'advanced': userLevel = 3; break;
              default: userLevel = 0;
            }
          } else if (typeof userProgress.level === 'number') {
            userLevel = userProgress.level;
          }
        } else if (data.level) {
          if (typeof data.level === 'string') {
            switch (data.level) {
              case 'beginner': userLevel = 1; break;
              case 'intermediate': userLevel = 2; break;
              case 'advanced': userLevel = 3; break;
              default: userLevel = 0;
            }
          } else if (typeof data.level === 'number') {
            userLevel = data.level;
          }
        }
        
        // Use real lesson completion data
        totalLessonsCompleted += lessonsCompleted;
        totalProgress += userLevel;

        // Top performers based on actual lesson completion
        if (lessonsCompleted > 0 || (data.xp && data.xp > 0)) {
          // Calculate progress percentage based on lessons completed
          const progressPercentage = lessonsCompleted > 0 ? Math.min(Math.round((lessonsCompleted / 13) * 100), 100) : userLevel;
          
          topPerformers.push({
            uid: doc.id,
            displayName: data.displayName || data.email || `User ${doc.id.slice(0, 8)}`,
            totalLessonsCompleted: lessonsCompleted,
            overallProgress: progressPercentage
          });
        }
      });

      // Get recent activity from userActivities collection
      try {
        const activitiesQuery = query(collection(db, 'userActivities'));
        const activitiesSnapshot = await getDocs(activitiesQuery);
        
        // Create a map of user profiles for quick lookup
        const userProfilesMap = new Map();
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          userProfilesMap.set(doc.id, data);
        });
        
        // console.log('👥 User profiles map sample:', Array.from(userProfilesMap.entries()).slice(0, 3).map(([uid, data]) => ({ uid, displayName: data.displayName, email: data.email })));
        // console.log('📱 Total activities found:', activitiesSnapshot.size);
        // console.log('📱 Sample activities:', activitiesSnapshot.docs.slice(0, 5).map(doc => ({ 
        //   uid: doc.data().uid, 
        //   activityType: doc.data().activityType, 
        //   timestamp: doc.data().timestamp?.toDate()?.toLocaleString() 
        // })));
        
        let activitiesInLast7Days = 0;
        const activitiesByType: Record<string, number> = {};
        
        activitiesSnapshot.forEach((doc) => {
          const activityData = doc.data();
          const activityDate = activityData.timestamp?.toDate();
          
          // Count activity types
          const activityType = activityData.activityType || 'unknown';
          activitiesByType[activityType] = (activitiesByType[activityType] || 0) + 1;
          
          // Only include lesson-related activities from the last 7 days
          if (activityDate && activityDate > recentDate) {
            activitiesInLast7Days++;
            
            // Filter out login/logout/profile activities - only show lesson activities
            const isLessonActivity = ['lesson_start', 'lesson_complete', 'quiz_attempt', 'practice_session'].includes(activityData.activityType);
            
            if (isLessonActivity) {
              // Get user profile data for this activity
              const userProfile = userProfilesMap.get(activityData.uid);
              const displayName = userProfile?.displayName || userProfile?.email || `User ${activityData.uid.slice(0, 8)}`;
              
              // console.log('📱 Lesson activity debug:', {
              //   uid: activityData.uid,
              //   activityType: activityData.activityType,
              //   userProfile: userProfile ? { displayName: userProfile.displayName, email: userProfile.email } : 'Not found',
              //   finalDisplayName: displayName,
              //   timestamp: activityDate.toLocaleString()
              // });
              
              recentActivity.push({
                uid: activityData.uid,
                displayName: displayName,
                action: getActivityDescription(activityData.activityType, activityData.activityData),
                timestamp: activityDate
              });
            }
          }
        });
        
        // console.log('📊 Activity Statistics:');
        // console.log('📱 Activities in last 7 days:', activitiesInLast7Days);
        // console.log('📱 Activities by type:', activitiesByType);

        // Sort recent activity by timestamp (newest first)
        recentActivity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      } catch (activityErr) {
        console.warn('Could not load recent activity:', activityErr);
        // Continue without recent activity data
      }

      // Sort top performers by total lessons completed
      topPerformers.sort((a, b) => b.totalLessonsCompleted - a.totalLessonsCompleted);

      // console.log('📊 Final Admin Stats:');
      // console.log('📚 Total lessons completed:', totalLessonsCompleted);
      // console.log('🏆 Top performers count:', topPerformers.length);
      // console.log('🏆 Top performers sample:', topPerformers.slice(0, 3));
      // console.log('📱 Recent activity count:', recentActivity.length);
      // console.log('📊 Total progress sum:', totalProgress);
      // console.log('📊 Average progress calculation:', totalUsers > 0 ? totalProgress / totalUsers : 0);

      // Ensure no NaN values
      const safeTotalProgress = isNaN(totalProgress) ? 0 : totalProgress;
      const safeTotalUsers = isNaN(totalUsers) ? 0 : totalUsers;
      const averageProgress = safeTotalUsers > 0 ? Math.round(safeTotalProgress / safeTotalUsers) : 0;

      setAdminStats({
        totalUsers: safeTotalUsers,
        activeUsers,
        totalLessonsCompleted: totalLessonsCompleted, // This is now actual lesson count
        averageProgress: averageProgress,
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

  // Helper function to get activity descriptions (lesson activities only)
  const getActivityDescription = (activityType: string, activityData: Record<string, unknown>): string => {
    switch (activityType) {
      case 'lesson_start':
        return `Started lesson: ${activityData.lessonId || 'Unknown'}`;
      case 'lesson_complete':
        return `Completed lesson: ${activityData.lessonId || 'Unknown'} (Score: ${activityData.score || 'N/A'})`;
      case 'quiz_attempt':
        return `Attempted quiz: ${activityData.lessonId || 'Unknown'}`;
      case 'practice_session':
        return `Practice session (${activityData.timeSpent || 0} min)`;
      default:
        return 'Learning activity';
    }
  };

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
