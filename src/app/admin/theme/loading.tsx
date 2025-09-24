'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ThemeLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton height={32} width={200} />
              <Skeleton height={16} width={300} />
            </div>
            <Skeleton height={40} width={120} />
          </div>

          {/* Current Theme Status Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={150} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton height={20} width={120} />
                  <Skeleton height={16} width={200} />
                </div>
                <Skeleton height={24} width={80} />
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={150} />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton height={20} width={100} />
                      <Skeleton height={20} width={60} />
                    </div>
                    <Skeleton height={16} width="80%" />
                    <Skeleton height={16} width="60%" />
                    <div className="flex gap-2">
                      <Skeleton height={32} width={80} />
                      <Skeleton height={32} width={32} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Preview Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={150} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Skeleton height={40} width={40} circle />
                    <div className="space-y-1">
                      <Skeleton height={16} width={120} />
                      <Skeleton height={12} width={80} />
                    </div>
                  </div>
                  <Skeleton height={16} width="90%" />
                  <Skeleton height={16} width="70%" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
