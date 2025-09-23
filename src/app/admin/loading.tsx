'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AdminLoading() {
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

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton height={16} width={80} />
                  <Skeleton height={16} width={16} />
                </CardHeader>
                <CardContent>
                  <Skeleton height={32} width={64} style={{ marginBottom: 4 }} />
                  <Skeleton height={12} width={96} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={150} />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton height={40} width={40} />
                    <div className="space-y-2 flex-1">
                      <Skeleton height={16} width="70%" />
                      <Skeleton height={12} width="50%" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={150} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Skeleton height={32} width={32} circle />
                    <div className="flex-1 space-y-2">
                      <Skeleton height={16} width="75%" />
                      <Skeleton height={12} width="50%" />
                    </div>
                    <Skeleton height={12} width={64} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
