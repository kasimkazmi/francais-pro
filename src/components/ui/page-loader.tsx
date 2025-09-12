import { LoadingSpinner } from './loading-spinner';
import { SkeletonCard } from './skeleton-loader';

interface PageLoaderProps {
  variant?: 'spinner' | 'skeleton' | 'minimal';
  message?: string;
  showSkeleton?: boolean;
  skeletonCount?: number;
}

export function PageLoader({ 
  variant = 'spinner', 
  message = "Loading...",
  showSkeleton = false,
  skeletonCount = 3
}: PageLoaderProps) {
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="sm" text={message} />
      </div>
    );
  }

  if (variant === 'skeleton' || showSkeleton) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-96 bg-muted animate-pulse rounded"></div>
          </div>
          
          {/* Content skeletons */}
          <div className="grid gap-6">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" text={message} />
      </div>
    </div>
  );
}

// Specialized loaders for different contexts
export function AuthPageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <LoadingSpinner size="lg" variant="primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Authenticating</h1>
          <p className="text-muted-foreground">
            Please wait while we verify your credentials...
          </p>
        </div>
      </div>
    </div>
  );
}

export function LearningPageLoader() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-80 bg-muted animate-pulse rounded"></div>
        </div>
        
        {/* Progress overview skeleton */}
        <div className="p-6 border rounded-lg space-y-4">
          <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 w-12 bg-muted animate-pulse rounded mx-auto"></div>
                <div className="h-4 w-20 bg-muted animate-pulse rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Learning modules skeletons */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-muted animate-pulse rounded-lg"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
                </div>
                <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center space-x-3">
                    <div className="h-5 w-5 bg-muted animate-pulse rounded-full"></div>
                    <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
                    <div className="h-8 w-16 bg-muted animate-pulse rounded ml-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SearchPageLoader() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search header */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-12 w-full max-w-2xl bg-muted animate-pulse rounded"></div>
        </div>
        
        {/* Search results skeleton */}
        <div className="grid gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
