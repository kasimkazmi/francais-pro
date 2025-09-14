'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Users,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface AppAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalLessons: number;
  completedLessons: number;
  totalSessions: number;
  averageSessionDuration: number;
  popularModules: Array<{ module: string; completions: number }>;
  dailyActivity: Array<{ date: string; users: number; lessons: number }>;
  storageUsed: number;
  databaseDocuments: number;
  lastUpdated: Date;
}

export function AppAnalytics() {
  const [analytics, setAnalytics] = useState<AppAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all collections to get document counts
      const [userProfiles, userProgress, userActivities, userSessions] = await Promise.all([
        getDocs(collection(db, 'userProfiles')),
        getDocs(collection(db, 'userProgress')),
        getDocs(collection(db, 'userActivities')),
        getDocs(collection(db, 'userSessions'))
      ]);

      // Calculate basic metrics
      const totalUsers = userProfiles.size;
      const totalLessons = userProgress.size;
      const totalSessions = userSessions.size;
      
      console.log('📊 Analytics Debug - Collection sizes:', {
        userProfiles: totalUsers,
        userProgress: totalLessons,
        userActivities: userActivities.size,
        userSessions: totalSessions
      });
      
      // Calculate completed lessons
      let completedLessons = 0;
      const moduleCompletions: { [key: string]: number } = {};
      
      userProgress.forEach(doc => {
        const data = doc.data();
        console.log('📚 User Progress Debug:', {
          uid: doc.id,
          totalLessonsCompleted: data.totalLessonsCompleted,
          completedModules: data.completedModules,
          level: data.level
        });
        
        if (data.totalLessonsCompleted) {
          completedLessons += data.totalLessonsCompleted;
        }
        
        // Track module completions
        if (data.completedModules) {
          Object.entries(data.completedModules).forEach(([module, completed]) => {
            if (completed) {
              moduleCompletions[module] = (moduleCompletions[module] || 0) + 1;
            }
          });
        }
      });
      
      console.log('📈 Completed Lessons Debug:', {
        completedLessons,
        moduleCompletions
      });

      // Calculate active users (unique users with sessions in last 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const activeUserIds = new Set<string>(); // Use Set to track unique users
      let totalSessionDuration = 0;
      let sessionCount = 0;

      userSessions.forEach(doc => {
        const data = doc.data();
        const sessionTime = data.startTime ? new Date(data.startTime.seconds * 1000) : null;
        const isActive = sessionTime && sessionTime > oneDayAgo;
        
        console.log('⏰ Session Debug:', {
          uid: doc.id,
          startTime: data.startTime,
          sessionTime: sessionTime?.toLocaleString(),
          duration: data.duration,
          isActive,
          oneDayAgo: oneDayAgo.toLocaleString()
        });
        
        if (isActive) {
          activeUserIds.add(doc.id); // Add unique user ID to set
        }
        if (data.duration) {
          totalSessionDuration += data.duration;
          sessionCount++;
        }
      });
      
      const activeUsers = activeUserIds.size; // Count unique users
      
      console.log('👥 Active Users Debug:', {
        activeUsers,
        uniqueActiveUserIds: Array.from(activeUserIds),
        totalSessionDuration,
        sessionCount,
        averageSessionDuration: sessionCount > 0 ? Math.round(totalSessionDuration / sessionCount) : 0
      });

      // Get popular modules
      const popularModules = Object.entries(moduleCompletions)
        .map(([module, completions]) => ({ module, completions }))
        .sort((a, b) => b.completions - a.completions)
        .slice(0, 5);

      // Calculate daily activity for last 7 days
      const dailyActivity = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        
        // Count unique users active on this day
        const dayUserIds = new Set<string>();
        let dayLessons = 0;
        
        userSessions.forEach(doc => {
          const data = doc.data();
          if (data.startTime) {
            const sessionDate = new Date(data.startTime.seconds * 1000).toISOString().split('T')[0];
            if (sessionDate === dateStr) {
              dayUserIds.add(doc.id); // Add unique user ID
            }
          }
        });

        userActivities.forEach(doc => {
          const data = doc.data();
          if (data.timestamp) {
            const activityDate = new Date(data.timestamp.seconds * 1000).toISOString().split('T')[0];
            if (activityDate === dateStr && ['lesson_complete', 'lesson_start'].includes(data.activityType)) {
              dayLessons++;
            }
          }
        });

        dailyActivity.push({
          date: dateStr,
          users: dayUserIds.size, // Count unique users
          lessons: dayLessons
        });
      }

      const analyticsData: AppAnalytics = {
        totalUsers,
        activeUsers,
        totalLessons,
        completedLessons,
        totalSessions,
        averageSessionDuration: sessionCount > 0 ? Math.round(totalSessionDuration / sessionCount) : 0,
        popularModules,
        dailyActivity,
        storageUsed: 0, // Firebase doesn't provide this easily
        databaseDocuments: totalUsers + totalLessons + userActivities.size + totalSessions,
        lastUpdated: new Date()
      };

      console.log('🎯 Final Analytics Data:', analyticsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Unable to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            App Analytics
          </h2>
          <p className="text-muted-foreground">
            Real-time learning analytics and user engagement
          </p>
        </div>
        <Button variant="outline" onClick={loadAnalytics}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.activeUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.completedLessons}
            </div>
            <p className="text-xs text-muted-foreground">
              Total completions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.averageSessionDuration}m
            </div>
            <p className="text-xs text-muted-foreground">
              Session duration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Popular Learning Modules
            </CardTitle>
            <CardDescription>
              Most completed modules by users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.popularModules.length > 0 ? (
              analytics.popularModules.map((module, index) => (
                <div key={module.module} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <span className="text-sm font-medium capitalize">
                      {module.module.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <Badge variant="secondary">
                    {module.completions} completions
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No module data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Learning Progress
            </CardTitle>
            <CardDescription>
              Overall learning metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Sessions</span>
              <span className="text-sm font-bold">{analytics.totalSessions}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Database Documents</span>
              <span className="text-sm font-bold">{analytics.databaseDocuments.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm font-bold">
                {analytics.totalUsers > 0 ? Math.round((analytics.completedLessons / (analytics.totalUsers * 13)) * 100) : 0}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">
                {analytics.lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Daily Activity (Last 7 Days)
          </CardTitle>
          <CardDescription>
            User activity and lesson completions over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.dailyActivity.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{day.users} users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{day.lessons} lessons</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Progress 
                    value={day.users > 0 ? (day.users / Math.max(...analytics.dailyActivity.map(d => d.users))) * 100 : 0} 
                    className="w-20 h-2" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

