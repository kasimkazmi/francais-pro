'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmin } from '@/contexts/AdminContext';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Crown, 
  Shield, 
  User,
  Mail,
  Calendar,
  BookOpen,
  TrendingUp,
} from 'lucide-react';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  totalLessonsCompleted: number;
  totalTimeSpent: number;
  currentStreak: number;
  level: string;
  lastActiveDate: Date;
  role: 'admin' | 'moderator' | 'user';
  isBanned: boolean;
}

export function UserManagement() {
  const { isAdmin, updateUserRole, banUser, unbanUser } = useAdmin();
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load users
  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Get user profiles data
      // Try with orderBy first, fallback to simple query if it fails
      let profilesSnapshot;
      try {
        const profilesQuery = query(collection(db, 'userProfiles'), orderBy('lastActiveAt', 'desc'));
        profilesSnapshot = await getDocs(profilesQuery);
      } catch (orderByError) {
        // console.log('OrderBy failed, using simple query:', orderByError);
        profilesSnapshot = await getDocs(collection(db, 'userProfiles'));
      }
      
      // console.log('Total users found:', profilesSnapshot.size);
      
      const usersData: UserData[] = [];
      
      for (const docSnapshot of profilesSnapshot.docs) {
        const data = docSnapshot.data();
        
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'adminUsers', docSnapshot.id));
        const adminData = adminDoc.exists() ? adminDoc.data() : null;
        
        // Check if user is banned
        const bannedDoc = await getDoc(doc(db, 'bannedUsers', docSnapshot.id));
        const isBanned = bannedDoc.exists() && bannedDoc.data()?.status === 'banned';
        
        // Debug: Log the user data to see what's available
        // console.log('User data for', docSnapshot.id, ':', {
        //   email: data.email,
        //   displayName: data.displayName,
        //   hasEmail: !!data.email,
        //   emailType: typeof data.email,
        //   allKeys: Object.keys(data)
        // });
        
        usersData.push({
          uid: docSnapshot.id,
          email: data.email || 'No email',
          displayName: data.displayName || 'Anonymous',
          totalLessonsCompleted: data.totalLessonsCompleted || 0,
          totalTimeSpent: data.totalStudyTime || 0, // Changed from totalTimeSpent to totalStudyTime
          currentStreak: data.streakCount || 0, // Changed from currentStreak to streakCount
          level: data.level?.toString() || 'beginner',
          lastActiveDate: data.lastActiveAt?.toDate() || new Date(),
          role: adminData?.role || 'user',
          isBanned
        });
      }
      
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter === 'banned') {
      filtered = filtered.filter(user => user.isBanned);
    } else if (statusFilter === 'active') {
      filtered = filtered.filter(user => !user.isBanned);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Handle role change
  const handleRoleChange = async (uid: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      await updateUserRole(uid, newRole);
      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  // Handle ban/unban
  const handleBanToggle = async (uid: string, isBanned: boolean) => {
    try {
      if (isBanned) {
        await unbanUser(uid);
      } else {
        await banUser(uid, 'Administrative action');
      }
      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error toggling ban status:', error);
    }
  };

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Management
          </h2>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button onClick={loadUsers} variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Role</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="moderator">Moderators</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.uid}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  user.isBanned ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {getRoleIcon(user.role)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{user.displayName}</h3>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                      {user.isBanned && (
                        <Badge variant="destructive">Banned</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email === 'No email' ? `UID: ${user.uid}` : user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {user.totalLessonsCompleted} lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {user.currentStreak} day streak
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {user.lastActiveDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Select
                      value={user.role}
                      onValueChange={(value: 'admin' | 'moderator' | 'user') => 
                        handleRoleChange(user.uid, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Button
                    variant={user.isBanned ? "default" : "destructive"}
                    size="sm"
                    onClick={() => handleBanToggle(user.uid, user.isBanned)}
                  >
                    {user.isBanned ? (
                      <>
                        <UserCheck className="h-4 w-4 mr-1" />
                        Unban
                      </>
                    ) : (
                      <>
                        <UserX className="h-4 w-4 mr-1" />
                        Ban
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No users found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
