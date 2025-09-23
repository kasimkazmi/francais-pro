'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeasonalThemeAdmin } from './seasonal-theme-admin';
import { Palette } from 'lucide-react';

export function ThemeManagement() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Palette className="h-8 w-8 text-purple-600" />
            Theme Management
          </h1>
          <p className="text-muted-foreground">
            Configure and manage seasonal themes for your application
          </p>
        </div>

        {/* Theme Management Component */}
        <SeasonalThemeAdmin />
      </div>
    </AdminLayout>
  );
}
