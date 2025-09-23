'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function UsersLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton height={32} width={150} />
              <Skeleton height={16} width={250} />
            </div>
            <div className="flex gap-2">
              <Skeleton height={36} width={100} />
              <Skeleton height={36} width={120} />
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton height={40} width={300} />
            <Skeleton height={40} width={150} />
            <Skeleton height={40} width={120} />
          </div>

          {/* Stats Overview Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton height={16} width={80} />
                      <Skeleton height={24} width={60} />
                    </div>
                    <Skeleton height={32} width={32} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User List Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton height={24} width={120} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton height={40} width={40} circle />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton height={16} width={150} />
                        <Skeleton height={20} width={60} />
                      </div>
                      <Skeleton height={14} width={200} />
                      <div className="flex gap-4">
                        <Skeleton height={12} width={80} />
                        <Skeleton height={12} width={100} />
                        <Skeleton height={12} width={60} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Skeleton height={32} width={80} />
                      <Skeleton height={32} width={32} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton height={16} width={120} />
            <div className="flex gap-2">
              <Skeleton height={32} width={32} />
              <Skeleton height={32} width={32} />
              <Skeleton height={32} width={32} />
              <Skeleton height={32} width={32} />
            </div>
          </div>
        </div>
      </div>
  );
}
