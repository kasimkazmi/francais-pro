'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function UserDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton height={32} width={200} />
              <Skeleton height={16} width={300} />
            </div>
            <div className="flex gap-2">
              <Skeleton height={36} width={100} />
              <Skeleton height={36} width={120} />
              <Skeleton height={36} width={80} />
            </div>
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

          {/* User Details and Learning Stats Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Details Card */}
            <Card>
              <CardHeader>
                <Skeleton height={24} width={128} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton height={16} width={96} />
                      <Skeleton height={16} width={80} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats Card */}
            <Card>
              <CardHeader>
                <Skeleton height={24} width={128} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton height={16} width={112} />
                      <Skeleton height={16} width={64} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={128} />
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
