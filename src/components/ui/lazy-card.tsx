'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function LazyCard({ 
  children, 
  className, 
  delay = 0,
  threshold = 0.1,
  rootMargin = '50px'
}: LazyCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay for staggered animation
          setTimeout(() => {
            setIsVisible(true);
            setHasLoaded(true);
          }, delay);
          
          // Disconnect observer after first intersection
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95',
        className
      )}
    >
      {hasLoaded ? children : (
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-lg"></div>
        </div>
      )}
    </div>
  );
}

interface LazyCardGridProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function LazyCardGrid({ 
  children, 
  className,
  staggerDelay = 100 
}: LazyCardGridProps) {
  return (
    <div className={cn('grid gap-4', className)}>
      {children.map((child, index) => (
        <LazyCard key={index} delay={index * staggerDelay}>
          {child}
        </LazyCard>
      ))}
    </div>
  );
}
