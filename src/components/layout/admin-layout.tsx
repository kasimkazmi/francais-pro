'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  BarChart3, 
  Users, 
  Database, 
  BookOpen, 
  Settings, 
  Shield,
  LogOut,
  Home,
  ArrowLeft
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { isAdmin, isModerator, adminUser } = useAdmin();
  const pathname = usePathname();

  // Helper function to check if a route is active
  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  // Redirect if not authenticated or not admin/moderator
  if (!isAuthenticated || (!isAdmin && !isModerator)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-6 w-6" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You don&apos;t have permission to access the admin panel.
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:bg-background lg:border-r lg:border-border scrollbar-hide">
          <div className="flex flex-col gap-2 p-4">
            {/* Admin Info */}
            <div className="px-3 py-2 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-red-600" />
                <h2 className="text-sm font-semibold text-red-600">Admin Panel</h2>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Welcome, {user?.displayName || user?.email}</p>
                <p className="capitalize">{adminUser?.role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <Link href="/admin" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                isActiveRoute('/admin') 
                  ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100' 
                  : 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 active:bg-red-100 dark:active:bg-red-900/30'
              }`}>
                <BarChart3 className="h-4 w-4" />
                Overview
              </Link>

              <Link href="/admin/users" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                isActiveRoute('/admin/users') 
                  ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100' 
                  : 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 active:bg-red-100 dark:active:bg-red-900/30'
              }`}>
                <Users className="h-4 w-4" />
                User Management
              </Link>

              <Link href="/admin/storage" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                isActiveRoute('/admin/storage') 
                  ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100' 
                  : 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 active:bg-red-100 dark:active:bg-red-900/30'
              }`}>
                <Database className="h-4 w-4" />
                Data Storage
              </Link>

              <Link href="/admin/content" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                isActiveRoute('/admin/content') 
                  ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100' 
                  : 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 active:bg-red-100 dark:active:bg-red-900/30'
              }`}>
                <BookOpen className="h-4 w-4" />
                Content Management
              </Link>

              <Link href="/admin/system" className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                isActiveRoute('/admin/system') 
                  ? 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100' 
                  : 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 active:bg-red-100 dark:active:bg-red-900/30'
              }`}>
                <Settings className="h-4 w-4" />
                System Monitoring
              </Link>
            </div>

            {/* Back to Main App */}
            <div className="mt-8 pt-4 border-t border-border">
              <Link href="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

