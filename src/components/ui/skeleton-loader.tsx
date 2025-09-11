import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  lines?: number;
  width?: string;
  height?: string;
}

export function Skeleton({ 
  className, 
  variant = 'rectangular',
  lines = 1,
  width,
  height
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  const variantClasses = {
    text: "h-4 w-full",
    rectangular: "h-4 w-full",
    circular: "h-8 w-8 rounded-full",
    card: "h-32 w-full rounded-lg"
  };

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4" // Last line shorter
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    />
  );
}

// Predefined skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <Skeleton variant="rectangular" height="h-6" width="w-3/4" />
      <Skeleton variant="text" lines={2} />
      <Skeleton variant="rectangular" height="h-8" width="w-1/2" />
    </div>
  );
}

export function SkeletonGreetingCard() {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="rectangular" height="h-6" width="w-24" />
        <Skeleton variant="circular" />
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="w-5/6" />
      <Skeleton variant="text" width="w-4/6" />
    </div>
  );
}

export function SkeletonProgressCard() {
  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton variant="circular" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="rectangular" height="h-5" width="w-32" />
          <Skeleton variant="text" width="w-48" />
        </div>
        <Skeleton variant="rectangular" height="h-6" width="w-16" />
      </div>
      <Skeleton variant="rectangular" height="h-2" width="w-full" />
    </div>
  );
}
