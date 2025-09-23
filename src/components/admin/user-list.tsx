'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Users,
  Search,
  User,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Shield
} from 'lucide-react';
import { collection, query, orderBy, getDocs, limit, startAfter, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getUserProgress, bulkSyncAllUserProfiles } from '@/lib/firebase/progress';
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
  // Real progress data from userProgress collection
  realXP?: number;
  realLevel?: string;
  realStreak?: number;
  realLessonsCompleted?: number;
  realWordsLearned?: number;
}

// Utility function to safely convert to lowercase
const safeToLowerCase = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value !== 'string') return String(value).toLowerCase();
  return value.toLowerCase();
};

export function UserList() {
  const router = useRouter();
  const { isAdmin, isModerator } = useAdmin();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'lastActive' | 'created' | 'lessons' | 'xp'>('lastActive');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (!isAdmin && !isModerator) {
      router.push('/admin');
      return;
    }

    loadUsers();
  }, [isAdmin, isModerator, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query based on sort criteria
      let orderField = 'lastActiveAt';
      switch (sortBy) {
        case 'created':
          orderField = 'createdAt';
          break;
        case 'lessons':
          orderField = 'totalLessonsCompleted';
          break;
        case 'xp':
          orderField = 'xp';
          break;
        default:
          orderField = 'lastActiveAt';
      }

      const usersQuery = query(
        collection(db, 'userProfiles'),
        orderBy(orderField, sortOrder),
        limit(50)
      );

      const usersSnapshot = await getDocs(usersQuery);
      
      const usersList: UserProfile[] = [];
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Debug log to see what we're getting from Firebase
        console.log('User data from Firebase:', {
          uid: doc.id,
          level: data.level,
          levelType: typeof data.level,
          displayName: data.displayName,
          email: data.email
        });
        
        usersList.push({
          uid: doc.id,
          email: (data.email && typeof data.email === 'string') ? data.email : 'No email',
          displayName: (data.displayName && typeof data.displayName === 'string') ? data.displayName : 'Anonymous User',
          level: (data.level && typeof data.level === 'string') ? data.level : 'beginner',
          xp: typeof data.xp === 'number' ? data.xp : 0,
          streak: typeof data.streak === 'number' ? data.streak : 0,
          totalLessonsCompleted: typeof data.totalLessonsCompleted === 'number' ? data.totalLessonsCompleted : 0,
          wordsLearned: typeof data.wordsLearned === 'number' ? data.wordsLearned : 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastActiveAt: data.lastActiveAt?.toDate() || new Date(),
          photoURL: data.photoURL
        });
      });

      // Fetch real progress data for each user
      const usersWithProgress: UserProfile[] = await Promise.all(
        usersList.map(async (user) => {
          try {
            const progress = await getUserProgress(user.uid);
            console.log('Progress data for user', user.uid, ':', progress);
            return {
              ...user,
              realXP: progress?.wordsLearned || 0,
              realLevel: progress?.level || 'beginner',
              realStreak: progress?.currentStreak || 0,
              realLessonsCompleted: progress?.totalLessonsCompleted || 0,
              realWordsLearned: progress?.wordsLearned || 0,
            };
          } catch (progressError) {
            console.warn(`Failed to load progress for user ${user.uid}:`, progressError);
            return {
              ...user,
              realXP: 0,
              realLevel: 'beginner',
              realStreak: 0,
              realLessonsCompleted: 0,
              realWordsLearned: 0,
            };
          }
        })
      );

      setUsers(usersWithProgress);

    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    if (!user || !searchQuery) return true;
    
    const query = safeToLowerCase(searchQuery);
    return (
      safeToLowerCase(user.displayName).includes(query) ||
      safeToLowerCase(user.email).includes(query) ||
      safeToLowerCase(user.level).includes(query)
    );
  });

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

  const getLevelColor = (level: string) => {
    const safeLevel = safeToLowerCase(level);
    
    switch (safeLevel) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
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
            <Button onClick={loadUsers}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
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
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Users className="h-8 w-8 text-blue-600" />
                User Management
              </h1>
              <p className="text-muted-foreground">
                Manage and monitor user accounts and activity
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={loadUsers} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                onClick={async () => {
                  if (confirm('This will sync all user profiles with their progress data. Continue?')) {
                    try {
                      const result = await bulkSyncAllUserProfiles();
                      toast.success(`Bulk sync completed! ✅ Success: ${result.success}, ❌ Failed: ${result.failed}`, {
                        duration: 5000,
                      });
                      loadUsers(); // Reload users
                    } catch (error) {
                      toast.error('Bulk sync failed: ' + error, {
                        duration: 4000,
                      });
                    }
                  }
                }}
                variant="secondary" 
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Bulk Sync
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                Registered users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(user => {
                  const dayAgo = new Date();
                  dayAgo.setDate(dayAgo.getDate() - 1);
                  return user.lastActiveAt > dayAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 24 hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(user => (user.realLessonsCompleted || user.totalLessonsCompleted) > 10).length}
              </div>
              <p className="text-xs text-muted-foreground">
                10+ lessons completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(user => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return user.createdAt > weekAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name, email, or level..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'lastActive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('lastActive')}
                >
                  Last Active {sortBy === 'lastActive' && (sortOrder === 'asc' ? <SortAsc className="h-4 w-4 ml-1" /> : <SortDesc className="h-4 w-4 ml-1" />)}
                </Button>
                <Button
                  variant={sortBy === 'lessons' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('lessons')}
                >
                  Lessons {sortBy === 'lessons' && (sortOrder === 'asc' ? <SortAsc className="h-4 w-4 ml-1" /> : <SortDesc className="h-4 w-4 ml-1" />)}
                </Button>
                <Button
                  variant={sortBy === 'xp' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('xp')}
                >
                  XP {sortBy === 'xp' && (sortOrder === 'asc' ? <SortAsc className="h-4 w-4 ml-1" /> : <SortDesc className="h-4 w-4 ml-1" />)}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.uid} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.displayName}</CardTitle>
                      <CardDescription className="text-sm">{user.email}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getLevelColor(user.realLevel || user.level)}>
                    {user.realLevel || user.level || 'Unknown'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.realLessonsCompleted || user.totalLessonsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{user.realStreak || user.streak}</div>
                    <div className="text-xs text-muted-foreground">Streak</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">XP</span>
                    <span className="font-medium">{user.realXP || user.xp}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Words Learned</span>
                    <span className="font-medium">{user.realWordsLearned || user.wordsLearned}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Active</span>
                    <span className="font-medium">{getRelativeTime(user.lastActiveAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t">
                  <Link href={`/admin/users/${user.uid}`}>
                    <Button className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try adjusting your search criteria.' : 'No users have registered yet.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
