'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { isMobileDevice } from '@/lib/utils/mobile-detection';

interface SimpleTooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function SimpleTooltip({ 
  content, 
  children, 
  side = 'top', 
  delay = 300,
  className 
}: SimpleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const showTooltip = () => {
    // Don't show tooltips on mobile devices
    if (isMobileDevice()) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    // Don't show tooltips on mobile devices
    if (isMobileDevice()) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getTooltipClasses = () => {
    const baseClasses = "absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded-md shadow-lg whitespace-nowrap pointer-events-none";
    const animationClasses = "transition-all duration-200 ease-in-out";
    
    switch (side) {
      case 'top':
        return cn(
          baseClasses,
          animationClasses,
          "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        );
      case 'bottom':
        return cn(
          baseClasses,
          animationClasses,
          "top-full left-1/2 transform -translate-x-1/2 mt-2",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        );
      case 'left':
        return cn(
          baseClasses,
          animationClasses,
          "right-full top-1/2 transform -translate-y-1/2 mr-2",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1"
        );
      case 'right':
        return cn(
          baseClasses,
          animationClasses,
          "left-full top-1/2 transform -translate-y-1/2 ml-2",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
        );
      default:
        return baseClasses;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 bg-gray-900 border border-gray-700 rotate-45";
    
    switch (side) {
      case 'top':
        return cn(baseClasses, "top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0");
      case 'bottom':
        return cn(baseClasses, "bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2 border-b-0 border-r-0");
      case 'left':
        return cn(baseClasses, "left-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 border-l-0 border-b-0");
      case 'right':
        return cn(baseClasses, "right-full top-1/2 transform -translate-y-1/2 translate-x-1/2 border-r-0 border-t-0");
      default:
        return baseClasses;
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div className={cn(getTooltipClasses(), className)}>
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
}
