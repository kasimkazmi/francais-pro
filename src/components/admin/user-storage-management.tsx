'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Activity, 
  Search, 
  RefreshCw,
  Eye,
  Clock,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  getAllUsers, 
  searchUsers, 
  getUserProfile, 
  getUserActivities, 
  getUserSessions,
  UserProfile,
  UserActivity,
  UserSession
} from '@/lib/firebase/user-storage';

export function UserStorageManagement() {
  const { isAdmin, isModerator } = useAdmin();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('users');

  // Load all users
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const allUsers = await getAllUsers(100);
      setUsers(allUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Search users
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadUsers();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await searchUsers(searchTerm, 50);
      setUsers(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  // Load user details
  const loadUserDetails = async (uid: string) => {
    try {
      setLoading(true);
      const [profile, activities, sessions] = await Promise.all([
        getUserProfile(uid),
        getUserActivities(uid, 20),
        getUserSessions(uid, 10)
      ]);

      setSelectedUser(profile);
      setUserActivities(activities);
      setUserSessions(sessions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (timestamp: unknown) => {
    if (!timestamp) return 'N/A';
    const date = (timestamp as { toDate?: () => Date }).toDate ? 
      (timestamp as { toDate: () => Date }).toDate() : 
      new Date(timestamp as string | number);
    return date.toLocaleString();
  };

  // Get device icon
  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return <Smartphone className="h-4 w-4" />;
    if (userAgent.includes('Tablet')) return <Monitor className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
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

  useEffect(() => {
    if (isAdmin || isModerator) {
      loadUsers();
    }
  }, [isAdmin, isModerator]);

  if (!isAdmin && !isModerator) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Users className="h-6 w-6" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You don&apos;t have permission to access user storage management.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Storage Management
          </CardTitle>
          <CardDescription>
            Manage and monitor all user data, activities, and sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search users by name, email, or UID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button onClick={loadUsers} variant="outline" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.uid} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.displayName || 'No Name'}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">UID: {user.uid}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.accountStatus === 'active' ? 'default' : 'destructive'}>
                            {user.accountStatus}
                          </Badge>
                          <Badge variant="outline">
                            {user.subscriptionTier || 'free'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => loadUserDetails(user.uid)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Level</p>
                          <p className="font-medium">{user.level || 1}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">XP</p>
                          <p className="font-medium">{user.xp || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Study Time</p>
                          <p className="font-medium">{Math.round((user.totalStudyTime || 0) / 60)}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Streak</p>
                          <p className="font-medium">{user.streakCount || 0} days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              {selectedUser ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Activities for {selectedUser.displayName || selectedUser.email}
                    </h3>
                    <Button onClick={() => loadUserDetails(selectedUser.uid)} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {userActivities.map((activity, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">
                              {getActivityIcon(activity.activityType)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium capitalize">
                                  {activity.activityType.replace('_', ' ')}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {formatDate(activity.timestamp)}
                                </Badge>
                              </div>
                              {activity.activityData.lessonId && (
                                <p className="text-sm text-muted-foreground">
                                  Lesson: {activity.activityData.lessonId}
                                </p>
                              )}
                              {activity.activityData.score && (
                                <p className="text-sm text-muted-foreground">
                                  Score: {activity.activityData.score}
                                </p>
                              )}
                              {activity.activityData.timeSpent && (
                                <p className="text-sm text-muted-foreground">
                                  Time: {activity.activityData.timeSpent} minutes
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a user to view their activities</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              {selectedUser ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Sessions for {selectedUser.displayName || selectedUser.email}
                    </h3>
                    <Button onClick={() => loadUserDetails(selectedUser.uid)} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {userSessions.map((session, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">
                              {getDeviceIcon(session.userAgent)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Session {index + 1}</h4>
                                <Badge variant={session.isActive ? 'default' : 'secondary'}>
                                  {session.isActive ? 'Active' : 'Ended'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Started: {formatDate(session.startTime)}
                              </p>
                              {session.endTime && (
                                <p className="text-sm text-muted-foreground">
                                  Ended: {formatDate(session.endTime)}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                Duration: {Math.round(session.totalTimeSpent)} minutes
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Pages: {session.pagesVisited.length}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a user to view their sessions</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
