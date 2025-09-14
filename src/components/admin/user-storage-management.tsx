'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Activity, 
  Search, 
  RefreshCw,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  SortAsc,
  SortDesc,
  ChevronDown,
  Loader2
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
import { getUserProgress } from '@/lib/firebase/progress';

// Combined interface for user data with real progress
interface UserWithProgress extends UserProfile {
  realLevel?: string;
  realXP?: number;
  realStudyTime?: number;
  realStreak?: number;
  realWordsLearned?: number;
}

export function UserStorageManagement() {
  const { isAdmin, isModerator } = useAdmin();
  const [selectedUser, setSelectedUser] = useState<UserWithProgress | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('users');
  
  // Filter and sort states
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [sortBy, setSortBy] = useState('lastActive');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Lazy loading states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allUsers, setAllUsers] = useState<UserWithProgress[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithProgress[]>([]);
  
  const USERS_PER_PAGE = 20;

  // Apply filters and sorting
  const applyFiltersAndSort = useCallback((usersToFilter: UserWithProgress[]) => {
    let filtered = [...usersToFilter];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.displayName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.uid.toLowerCase().includes(searchLower)
      );
    }

    // Apply level filter
    if (filterLevel !== 'all') {
      filtered = filtered.filter(user => user.realLevel === filterLevel);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.accountStatus === filterStatus);
    }

    // Apply subscription tier filter
    if (filterTier !== 'all') {
      filtered = filtered.filter(user => (user.subscriptionTier || 'free') === filterTier);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;
      
      switch (sortBy) {
        case 'name':
          aValue = a.displayName || '';
          bValue = b.displayName || '';
          break;
        case 'email':
          aValue = a.email || '';
          bValue = b.email || '';
          break;
        case 'level':
          const levelOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          aValue = levelOrder[a.realLevel as keyof typeof levelOrder] || 0;
          bValue = levelOrder[b.realLevel as keyof typeof levelOrder] || 0;
          break;
        case 'xp':
          aValue = a.realXP || 0;
          bValue = b.realXP || 0;
          break;
        case 'studyTime':
          aValue = a.realStudyTime || 0;
          bValue = b.realStudyTime || 0;
          break;
        case 'streak':
          aValue = a.realStreak || 0;
          bValue = b.realStreak || 0;
          break;
        case 'lastActive':
        default:
          aValue = a.lastActiveAt?.toDate?.() || new Date(0);
          bValue = b.lastActiveAt?.toDate?.() || new Date(0);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const startIndex = 0;
    const endIndex = currentPage * USERS_PER_PAGE;
    const paginatedUsers = filtered.slice(startIndex, endIndex);
    
    setFilteredUsers(paginatedUsers);
    setHasMore(endIndex < filtered.length);
  }, [searchTerm, filterLevel, filterStatus, filterTier, sortBy, sortOrder, currentPage, USERS_PER_PAGE]);

  // Load users with lazy loading
  const loadUsers = useCallback(async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setCurrentPage(1);
        setAllUsers([]);
        setFilteredUsers([]);
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }
      
      setError(null);
      const allUsersData = await getAllUsers(1000); // Load more users for filtering
      
      // Fetch real progress data for each user
      const usersWithProgress: UserWithProgress[] = await Promise.all(
        allUsersData.map(async (user) => {
          try {
            const progress = await getUserProgress(user.uid);
            return {
              ...user,
              realLevel: progress?.level || 'beginner',
              realXP: progress?.wordsLearned || 0,
              realStudyTime: progress?.totalTimeSpent || 0,
              realStreak: progress?.currentStreak || 0,
              realWordsLearned: progress?.wordsLearned || 0,
            };
          } catch (progressError) {
            console.warn(`Failed to load progress for user ${user.uid}:`, progressError);
            return {
              ...user,
              realLevel: 'beginner',
              realXP: 0,
              realStudyTime: 0,
              realStreak: 0,
              realWordsLearned: 0,
            };
          }
        })
      );
      
      if (reset) {
        setAllUsers(usersWithProgress);
      } else {
        setAllUsers(prev => [...prev, ...usersWithProgress]);
      }
      
      setHasMore(usersWithProgress.length === 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Load more users
  const loadMoreUsers = () => {
    if (!loadingMore && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Search users
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadUsers(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await searchUsers(searchTerm, 50);
      
      // Convert search results to UserWithProgress format
      const usersWithProgress: UserWithProgress[] = await Promise.all(
        searchResults.map(async (user) => {
          try {
            const progress = await getUserProgress(user.uid);
            return {
              ...user,
              realLevel: progress?.level || 'beginner',
              realXP: progress?.wordsLearned || 0,
              realStudyTime: progress?.totalTimeSpent || 0,
              realStreak: progress?.currentStreak || 0,
              realWordsLearned: progress?.wordsLearned || 0,
            };
          } catch {
            return {
              ...user,
              realLevel: 'beginner',
              realXP: 0,
              realStudyTime: 0,
              realStreak: 0,
              realWordsLearned: 0,
            };
          }
        })
      );
      
      setAllUsers(usersWithProgress);
      applyFiltersAndSort(usersWithProgress);
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
      setError(null);
      const [profile, activities, sessions] = await Promise.all([
        getUserProfile(uid),
        getUserActivities(uid, 20),
        getUserSessions(uid, 10)
      ]);

      setSelectedUser(profile);
      setUserActivities(activities);
      setUserSessions(sessions);
      
      // Switch to activities tab to show the loaded data
      setActiveTab('activities');
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

  // Apply filters and sort when they change
  useEffect(() => {
    if (allUsers.length > 0) {
      applyFiltersAndSort(allUsers);
    }
  }, [allUsers, applyFiltersAndSort]);

  // Load users on mount
  useEffect(() => {
    if (isAdmin || isModerator) {
      loadUsers(true);
    }
  }, [isAdmin, isModerator, loadUsers]);

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
          {/* Search and Controls */}
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
            <Button onClick={() => loadUsers(true)} variant="outline" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="space-y-6 mb-6">
            {/* Filter Row */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Filters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Level</label>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="deleted">Deleted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tier</label>
                  <Select value={filterTier} onValueChange={setFilterTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Tiers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sort Row */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SortAsc className="h-5 w-5" />
                Sort & Order
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lastActive">Last Active</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="level">Level</SelectItem>
                      <SelectItem value="xp">XP</SelectItem>
                      <SelectItem value="studyTime">Study Time</SelectItem>
                      <SelectItem value="streak">Streak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-shrink-0">
                  <label className="text-sm font-medium mb-2 block">Order</label>
                  <div className="flex gap-2">
                    <Button
                      variant={sortOrder === 'desc' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortOrder('desc')}
                      className="min-w-[80px]"
                    >
                      <SortDesc className="h-4 w-4 mr-1" />
                      Desc
                    </Button>
                    <Button
                      variant={sortOrder === 'asc' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortOrder('asc')}
                      className="min-w-[80px]"
                    >
                      <SortAsc className="h-4 w-4 mr-1" />
                      Asc
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Users ({filteredUsers.length})</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Users</h3>
                  <Badge variant="outline">{filteredUsers.length} users</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {allUsers.length} users
                </div>
              </div>
              
              <div className="grid gap-4">
                {filteredUsers.map((user) => (
                  <Card 
                    key={user.uid} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedUser?.uid === user.uid 
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : ''
                    }`}
                  >
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
                            title="View user details and activities"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Level</p>
                          <p className="font-medium capitalize">{user.realLevel || 'beginner'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">XP</p>
                          <p className="font-medium">{user.realXP || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Study Time</p>
                          <p className="font-medium">{Math.round((user.realStudyTime || 0) / 60)}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Streak</p>
                          <p className="font-medium">{user.realStreak || 0} days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Loading More Indicator */}
                {loadingMore && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span className="text-muted-foreground">Loading more users...</span>
                  </div>
                )}
                
                {/* Load More Button */}
                {hasMore && !loadingMore && (
                  <div className="flex items-center justify-center py-4">
                    <Button onClick={loadMoreUsers} variant="outline" className="w-full max-w-xs">
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Load More Users
                    </Button>
                  </div>
                )}
                
                {/* No More Users */}
                {!hasMore && filteredUsers.length > 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No more users to load</p>
                  </div>
                )}
                
                {/* No Users Found */}
                {filteredUsers.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground">No users found matching your criteria</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setFilterLevel('all');
                        setFilterStatus('all');
                        setFilterTier('all');
                        setSortBy('lastActive');
                        setSortOrder('desc');
                        loadUsers(true);
                      }}
                      variant="outline"
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              {selectedUser ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('users')}
                      >
                        ← Back to Users
                      </Button>
                      <h3 className="text-lg font-semibold">
                        Activities for {selectedUser.displayName || selectedUser.email}
                      </h3>
                    </div>
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
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('users')}
                      >
                        ← Back to Users
                      </Button>
                      <h3 className="text-lg font-semibold">
                        Sessions for {selectedUser.displayName || selectedUser.email}
                      </h3>
                    </div>
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
