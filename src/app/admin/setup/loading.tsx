'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SetupLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton height={24} width={24} />
            <Skeleton height={24} width={120} />
          </div>
          <Skeleton height={16} width={200} />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Info Box Skeleton */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-start gap-2">
              <Skeleton height={20} width={20} />
              <div className="space-y-2 flex-1">
                <Skeleton height={16} width={100} />
                <Skeleton height={14} width="90%" />
                <Skeleton height={14} width="80%" />
              </div>
            </div>
          </div>

          {/* User Info Skeleton */}
          <div className="space-y-2">
            <Skeleton height={16} width={80} />
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton height={16} width={16} />
                <Skeleton height={16} width={100} />
              </div>
              <Skeleton height={14} width={150} />
            </div>
          </div>

          {/* Role Selection Skeleton */}
          <div className="space-y-2">
            <Skeleton height={16} width={80} />
            <Skeleton height={40} width="100%" />
          </div>

          {/* Button Skeleton */}
          <Skeleton height={40} width="100%" />

          {/* Permissions Skeleton */}
          <div className="space-y-2">
            <Skeleton height={14} width={120} />
            <div className="space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={12} width="80%" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
