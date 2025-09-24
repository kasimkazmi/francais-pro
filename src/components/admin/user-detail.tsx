'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  ArrowLeft,
  User,
  TrendingUp,
  Activity,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Award,
  Smartphone,
  Monitor,
  Clock
} from 'lucide-react';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { manualSyncUserProfile } from '@/lib/firebase/progress';
import { getUserSessions, UserActivity as FirebaseUserActivity, UserSession } from '@/lib/firebase/user-storage';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
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
  const [userActivities, setUserActivities] = useState<FirebaseUserActivity[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const loadUserProgressOnly = async () => {
    try {
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

      // Also reload user profile to get synced data
      const profileDoc = await getDoc(doc(db, 'userProfiles', userId));
      if (profileDoc.exists()) {
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
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const loadUserData = async () => {
    try {

      // Load user profile
      const profileDoc = await getDoc(doc(db, 'userProfiles', userId));
      if (!profileDoc.exists()) {
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
      
      const activities: FirebaseUserActivity[] = [];
      activitiesSnapshot.forEach((doc) => {
        const data = doc.data();
        activities.push({
          uid: data.uid,
          activityType: data.activityType,
          activityData: data.activityData || {},
          timestamp: data.timestamp,
          sessionId: data.sessionId || ''
        });
      });

      // Sort activities by timestamp (newest first) and limit to 50
      activities.sort((a, b) => {
        const aTime = a.timestamp instanceof Date ? a.timestamp : (a.timestamp as { toDate: () => Date }).toDate();
        const bTime = b.timestamp instanceof Date ? b.timestamp : (b.timestamp as { toDate: () => Date }).toDate();
        return bTime.getTime() - aTime.getTime();
      });
      const limitedActivities = activities.slice(0, 50);

      setUserActivities(limitedActivities);

      // Load user sessions
      try {
        const sessions = await getUserSessions(userId);
        setUserSessions(sessions);
      } catch (sessionError) {
        console.error('Error loading user sessions:', sessionError);
        // Continue without sessions data
      }

    } catch (err) {
      console.error('Error loading user data:', err);
      // Error handling is now done by the App Router error.tsx file
    }
  };

  useEffect(() => {
    if (!isAdmin && !isModerator) {
      router.push('/admin');
      return;
    }

    loadUserData();
  }, [userId, isAdmin, isModerator, router]);

  const getActivityDescription = (activity: FirebaseUserActivity): string => {
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
        return 'Updated profile information';
      default:
        return `Activity: ${activity.activityType}`;
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

  // Get activity icon
  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'lesson_start': return '📚';
      case 'lesson_complete': return '✅';
      case 'quiz_attempt': return '🧠';
      case 'practice_session': return '💪';
      case 'profile_update': return '👤';
      default: return '📝';
    }
  };

  // Loading and error states are now handled by Next.js App Router
  // error.tsx and loading.tsx files in the route directory

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
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
              
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <User className="h-8 w-8 text-blue-600" />
                  User Profile
                </h1>
                <p className="text-muted-foreground">
                  Detailed view of {userProfile.displayName}&apos;s activity and progress
                </p>
              </div>
            </div>
            <div className="flex gap-2">
            <Button onClick={() => router.push('/admin/users')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
              <Button onClick={loadUserData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                onClick={async () => {
                  setSyncing(true);
                  try {
                    await manualSyncUserProfile(userId);
                    toast.success('Profile synced successfully!', {
                      duration: 3000,
                    });
                    // Reload only progress data, not full page
                    await loadUserProgressOnly();
                  } catch (error) {
                    toast.error('Failed to sync profile: ' + error, {
                      duration: 4000,
                    });
                  } finally {
                    setSyncing(false);
                  }
                }}
                disabled={syncing}
                variant="secondary" 
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync Profile'}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <StyledTabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          tabs={[
            {
              value: 'overview',
              label: 'Overview',
              shortLabel: 'Overview',
              icon: <BarChart3 className="h-4 w-4" />,
              color: 'text-blue-600',
              hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
              activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500'
            },
            {
              value: 'activities',
              label: `Activities (${userActivities.length})`,
              shortLabel: 'Activities',
              icon: <Activity className="h-4 w-4" />,
              color: 'text-green-600',
              hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/30',
              activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500'
            },
            {
              value: 'sessions',
              label: `Sessions (${userSessions.length})`,
              shortLabel: 'Sessions',
              icon: <Clock className="h-4 w-4" />,
              color: 'text-purple-600',
              hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/30',
              activeColor: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500'
            }
          ]}
        >

          <TabsContent value="overview" className="space-y-6">
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
                <p className="text-2xl font-bold">{userProgress?.totalLessonsCompleted || userProfile.totalLessonsCompleted}</p>
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
                <p className="text-2xl font-bold">{userProgress?.streak || userProfile.streak}</p>
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
                <p className="text-2xl font-bold">{userProgress?.xp || userProfile.xp}</p>
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
                    <span className="font-medium">{userProgress?.totalLessonsCompleted || userProfile.totalLessonsCompleted}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Words Learned</span>
                    <span className="font-medium">{userProgress?.totalWordsLearned || userProfile.wordsLearned}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                    <span className="font-medium">{userProgress?.streak || userProfile.streak} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total XP</span>
                    <span className="font-medium">{userProgress?.xp || userProfile.xp}</span>
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
                    userActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.activityType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">
                            {getActivityDescription(activity)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {activity.timestamp instanceof Date ? activity.timestamp.toLocaleString() : (activity.timestamp as { toDate: () => Date }).toDate().toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({getRelativeTime(activity.timestamp instanceof Date ? activity.timestamp : (activity.timestamp as { toDate: () => Date }).toDate())})
                            </span>
                            {activity.activityData?.userAgent && (
                              <div className="flex items-center gap-1">
                                {getDeviceIcon(activity.activityData.userAgent)}
                                <span className="text-xs text-muted-foreground">
                                  {activity.activityData.userAgent.includes('Mobile') ? 'Mobile' : 
                                   activity.activityData.userAgent.includes('Tablet') ? 'Tablet' : 'Desktop'}
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
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  User Activities
                </CardTitle>
                <CardDescription>
                  Complete activity history for {userProfile.displayName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userActivities.length > 0 ? (
                    userActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="text-2xl">{getActivityIcon(activity.activityType)}</div>
                        <div className="flex-1">
                          <p className="font-medium capitalize">
                            {activity.activityType.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.activityData?.lessonId && `Lesson: ${activity.activityData.lessonId}`}
                            {activity.activityData?.score && ` | Score: ${activity.activityData.score}`}
                            {activity.activityData?.timeSpent && ` | Time: ${activity.activityData.timeSpent}min`}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getRelativeTime(activity.timestamp instanceof Date ? activity.timestamp : (activity.timestamp as { toDate: () => Date }).toDate())}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">No Activities</h3>
                      <p className="text-muted-foreground">
                        This user hasn&apos;t performed any activities yet.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  User Sessions
                </CardTitle>
                <CardDescription>
                  Login sessions and device information for {userProfile.displayName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userSessions.length > 0 ? (
                    userSessions.map((session, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="text-2xl">
                          {getDeviceIcon(session.userAgent)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {session.userAgent?.includes('Mobile') ? 'Mobile' : 
                             session.userAgent?.includes('Tablet') ? 'Tablet' : 'Desktop'} Session
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {session.ipAddress} • {session.deviceInfo || 'Unknown device'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.pagesVisited?.length || 0} pages visited • {session.totalTimeSpent || 0} minutes
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          <div>{getRelativeTime(session.startTime instanceof Date ? session.startTime : (session.startTime as { toDate: () => Date }).toDate())}</div>
                          {session.endTime && (
                            <div className="text-xs">
                              Duration: {Math.round(((session.endTime as { toDate: () => Date }).toDate().getTime() - (session.startTime instanceof Date ? session.startTime : (session.startTime as { toDate: () => Date }).toDate()).getTime()) / 60000)}m
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">No Sessions</h3>
                      <p className="text-muted-foreground">
                        No session data available for this user.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </StyledTabs>
      </div>
  );
}
