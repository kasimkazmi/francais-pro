'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { createAdminUser, createModeratorUser, checkAdminUsersExist } from '@/lib/admin-setup';
import { Shield, User, Crown, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function AdminSetupPage() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'moderator'>('admin');
  const [isInitialSetup, setIsInitialSetup] = useState<boolean | null>(null);

  // Check if this is the initial setup (no admin users exist yet)
  useEffect(() => {
    const checkSetup = async () => {
      if (isAuthenticated) {
        try {
          const adminUsersExist = await checkAdminUsersExist();
          setIsInitialSetup(!adminUsersExist);
        } catch (error) {
          console.error('Error checking admin setup:', error);
          setIsInitialSetup(false);
        }
      }
    };

    checkSetup();
  }, [isAuthenticated]);

  const handleCreateAdmin = async () => {
    if (!user) {
      setError('You must be signed in to create an admin user');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const success = role === 'admin' 
        ? await createAdminUser(user.uid, user.email || '', user.displayName || 'Admin')
        : await createModeratorUser(user.uid, user.email || '', user.displayName || 'Moderator');

      if (success) {
        setSuccess(true);
      } else {
        setError('Failed to create admin user. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              You must be signed in to access the admin setup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please sign in to your account first, then return to this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isInitialSetup === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Checking Setup Status
            </CardTitle>
            <CardDescription>
              Verifying admin configuration...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              Setup Complete!
            </CardTitle>
            <CardDescription>
              Your admin account has been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You now have {role} privileges. You can:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {role === 'admin' ? (
                <>
                  <li>• Manage all users and their roles</li>
                  <li>• Ban and unban users</li>
                  <li>• Edit all content and materials</li>
                  <li>• Monitor system performance</li>
                  <li>• Access all admin features</li>
                </>
              ) : (
                <>
                  <li>• Edit content and materials</li>
                  <li>• View user statistics</li>
                  <li>• Access moderator features</li>
                </>
              )}
            </ul>
            <Button 
              onClick={() => window.location.href = '/admin'} 
              className="w-full"
            >
              Go to Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Admin Setup
          </CardTitle>
          <CardDescription>
            {isInitialSetup 
              ? "Create your first admin account to get started"
              : "Create additional admin or moderator accounts"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInitialSetup && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Initial Setup
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    This is your first admin account. You&apos;ll have full access to manage users, content, and system settings.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="user-info">Current User</Label>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{user?.displayName || 'User'}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={role} onValueChange={(value: 'admin' | 'moderator') => setRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    Administrator
                  </div>
                </SelectItem>
                <SelectItem value="moderator">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Moderator
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Button 
              onClick={handleCreateAdmin} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : `Create ${role === 'admin' ? 'Administrator' : 'Moderator'} Account`}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Role Permissions:</p>
            {role === 'admin' ? (
              <ul className="space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• Content management</li>
                <li>• System monitoring</li>
              </ul>
            ) : (
              <ul className="space-y-1">
                <li>• Content management</li>
                <li>• User statistics</li>
                <li>• Limited admin access</li>
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
