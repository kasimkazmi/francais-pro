'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  Target,
  Activity,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  BarChart3,
  Award,
  Timer,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { manualSyncUserProfile, debugUserData } from '@/lib/firebase/progress';
import toast from 'react-hot-toast';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  level: string;
  xp: number;
  streak: number;
  totalLessonsCompleted: number;
  wordsLearned: number;
  createdAt: Date;
  lastActiveAt: Date;
  photoURL?: string;
}

interface UserActivity {
  id: string;
  activityType: string;
  activityData: Record<string, any>;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
}

interface UserProgress {
  uid: string;
  level: number;
  totalLessonsCompleted: number;
  totalWordsLearned: number;
  streak: number;
  xp: number;
  lastLessonCompleted?: string;
  achievements: string[];
}

export function UserDetail({ userId }: { userId: string }) {
  const router = useRouter();
  const { isAdmin, isModerator } = useAdmin();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin && !isModerator) {
      router.push('/admin');
      return;
    }

    loadUserData();
  }, [userId, isAdmin, isModerator, router]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load user profile
      const profileDoc = await getDoc(doc(db, 'userProfiles', userId));
      if (!profileDoc.exists()) {
        setError('User not found');
        setLoading(false);
        return;
      }

      const profileData = profileDoc.data();
      setUserProfile({
        uid: userId,
        email: profileData.email || 'No email',
        displayName: profileData.displayName || 'Anonymous User',
        level: profileData.level || 'beginner',
        xp: profileData.xp || 0,
        streak: profileData.streak || 0,
        totalLessonsCompleted: profileData.totalLessonsCompleted || 0,
        wordsLearned: profileData.wordsLearned || 0,
        createdAt: profileData.createdAt?.toDate() || new Date(),
        lastActiveAt: profileData.lastActiveAt?.toDate() || new Date(),
        photoURL: profileData.photoURL
      });

      // Load user progress
      const progressDoc = await getDoc(doc(db, 'userProgress', userId));
      if (progressDoc.exists()) {
        const progressData = progressDoc.data();
        setUserProgress({
          uid: userId,
          level: progressData.level || 0,
          totalLessonsCompleted: progressData.totalLessonsCompleted || 0,
          totalWordsLearned: progressData.wordsLearned || 0,
          streak: progressData.currentStreak || 0,
          xp: progressData.wordsLearned || 0,
          lastLessonCompleted: progressData.lastLessonCompleted,
          achievements: progressData.achievements || []
        });
      }

      // Load user activities (last 50) - with fallback if index doesn't exist
      let activitiesSnapshot;
      try {
        const activitiesQuery = query(
          collection(db, 'userActivities'),
          where('uid', '==', userId),
          orderBy('timestamp', 'desc'),
          limit(50)
        );
        activitiesSnapshot = await getDocs(activitiesQuery);
      } catch (indexError) {
        console.warn('Composite index not found, using simple query:', indexError);
        console.log('📋 Using fallback query - activities will be sorted in memory');
        // Fallback: get all activities for user and sort in memory
        const simpleQuery = query(
          collection(db, 'userActivities'),
          where('uid', '==', userId),
          limit(100) // Get more to ensure we have recent ones
        );
        activitiesSnapshot = await getDocs(simpleQuery);
      }
      
      const activities: UserActivity[] = [];
      activitiesSnapshot.forEach((doc) => {
        const data = doc.data();
        activities.push({
          id: doc.id,
          activityType: data.activityType,
          activityData: data.activityData || {},
          timestamp: data.timestamp?.toDate() || new Date(),
          userAgent: data.userAgent,
          ipAddress: data.ipAddress
        });
      });

      // Sort activities by timestamp (newest first) and limit to 50
      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      const limitedActivities = activities.slice(0, 50);

      setUserActivities(limitedActivities);

    } catch (err) {
      console.error('Error loading user data:', err);
      
      // Provide more specific error messages
      if (err instanceof Error) {
        if (err.message.includes('index')) {
          setError('Database index missing. Please create the required Firestore index or contact administrator.');
        } else if (err.message.includes('permission')) {
          setError('Permission denied. You may not have access to view this user\'s data.');
        } else {
          setError(`Failed to load user data: ${err.message}`);
        }
      } else {
        setError('Failed to load user data');
      }
    } finally {
      setLoading(false);
    }
  };

  const getActivityDescription = (activity: UserActivity): string => {
    switch (activity.activityType) {
      case 'lesson_start':
        return `Started lesson: ${activity.activityData.lessonId || 'Unknown'}`;
      case 'lesson_complete':
        return `Completed lesson: ${activity.activityData.lessonId || 'Unknown'} (Score: ${activity.activityData.score || 'N/A'})`;
      case 'quiz_attempt':
        return `Attempted quiz: ${activity.activityData.lessonId || 'Unknown'}`;
      case 'practice_session':
        return `Practice session (${activity.activityData.timeSpent || 0} min)`;
      case 'login':
        return 'Logged in';
      case 'logout':
        return 'Logged out';
      case 'profile_update':
        return 'Updated profile';
      case 'password_change':
        return 'Changed password';
      default:
        return `Activity: ${activity.activityType}`;
    }
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'lesson_start':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'lesson_complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'quiz_attempt':
        return <Target className="h-4 w-4 text-orange-500" />;
      case 'practice_session':
        return <Timer className="h-4 w-4 text-purple-500" />;
      case 'login':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'logout':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'profile_update':
        return <User className="h-4 w-4 text-blue-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const getDeviceIcon = (userAgent?: string) => {
    if (!userAgent) return <Monitor className="h-4 w-4" />;
    
    if (userAgent.includes('Mobile')) {
      return <Smartphone className="h-4 w-4 text-blue-500" />;
    } else if (userAgent.includes('Tablet')) {
      return <Monitor className="h-4 w-4 text-purple-500" />;
    } else {
      return <Monitor className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">{error}</p>
            {error.includes('index') && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Solution:</strong> Create the required Firestore composite index:
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 break-all">
                  Collection: userActivities<br/>
                  Fields: uid (Ascending), timestamp (Descending)
                </p>
                <a 
                  href="https://console.firebase.google.com/v1/r/project/francais-pro/firestore/indexes?create_composite=ClNwcm9qZWN0cy9mcmFuY2Fpcy1wcm8vZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3VzZXJBY3Rpdml0aWVzL2luZGV4ZXMvXxABGgcKA3VpZBABGg0KCXRpbWVzdGFtcBACGgwKCF9fbmFtZV9fEAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Create Index →
                </a>
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={() => router.push('/admin/users')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
              <Button onClick={loadUserData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button 
                onClick={async () => {
                  try {
                    await manualSyncUserProfile(userId);
                    toast.success('Profile synced successfully!', {
                      duration: 3000,
                    });
                    loadUserData(); // Reload data
                  } catch (error) {
                    toast.error('Failed to sync profile: ' + error, {
                      duration: 4000,
                    });
                  }
                }}
                variant="secondary"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              User Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The requested user could not be found.
            </p>
            <Button onClick={() => router.push('/admin/users')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => router.push('/admin/users')} 
                variant="outline" 
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <User className="h-8 w-8 text-blue-600" />
                  User Profile
                </h1>
                <p className="text-muted-foreground">
                  Detailed view of {userProfile.displayName}'s activity and progress
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={loadUserData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                onClick={async () => {
                  try {
                    await manualSyncUserProfile(userId);
                    toast.success('Profile synced successfully!', {
                      duration: 3000,
                    });
                    loadUserData(); // Reload data
                  } catch (error) {
                    toast.error('Failed to sync profile: ' + error, {
                      duration: 4000,
                    });
                  }
                }}
                variant="secondary" 
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Profile
              </Button>
              <Button 
                onClick={async () => {
                  try {
                    await debugUserData(userId);
                    toast.success('Debug completed! Check console for information', {
                      duration: 3000,
                    });
                  } catch (error) {
                    toast.error('Debug failed: ' + error, {
                      duration: 4000,
                    });
                  }
                }}
                variant="outline" 
                size="sm"
              >
                <Monitor className="h-4 w-4 mr-2" />
                Debug Data
              </Button>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Info</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-medium">{userProfile.displayName}</p>
                <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                <Badge variant="secondary" className="text-xs">
                  {userProfile.level}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{userProgress.totalLessonsCompleted || userProfile.totalLessonsCompleted}</p>
                <p className="text-xs text-muted-foreground">Lessons completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{userProgress.streak || userProfile.streak}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{userProgress.xp || userProfile.xp}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Details */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{userProfile.displayName}</p>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">User ID</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {userProfile.uid.slice(0, 8)}...
                    </code>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <Badge variant="outline">{userProfile.level || 'Unknown'}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Joined</span>
                    <span className="text-sm">
                      {userProfile.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Active</span>
                    <span className="text-sm">
                      {getRelativeTime(userProfile.lastActiveAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lessons Completed</span>
                    <span className="font-medium">{userProgress.totalLessonsCompleted || userProfile.totalLessonsCompleted}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Words Learned</span>
                    <span className="font-medium">{userProgress.totalWordsLearned || userProfile.wordsLearned}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                    <span className="font-medium">{userProgress.streak || userProfile.streak} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total XP</span>
                    <span className="font-medium">{userProgress.xp || userProfile.xp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Last {userActivities.length} activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {userActivities.length > 0 ? (
                    userActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.activityType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">
                            {getActivityDescription(activity)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {activity.timestamp.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({getRelativeTime(activity.timestamp)})
                            </span>
                            {activity.userAgent && (
                              <div className="flex items-center gap-1">
                                {getDeviceIcon(activity.userAgent)}
                                <span className="text-xs text-muted-foreground">
                                  {activity.userAgent.includes('Mobile') ? 'Mobile' : 
                                   activity.userAgent.includes('Tablet') ? 'Tablet' : 'Desktop'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
