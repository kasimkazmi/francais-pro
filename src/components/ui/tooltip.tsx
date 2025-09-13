'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { isMobileDevice } from '@/lib/utils/mobile-detection';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({ 
  content, 
  children, 
  side = 'top', 
  delay = 300,
  className 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const showTooltip = () => {
    // Don't show tooltips on mobile devices
    if (isMobileDevice()) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
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

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = 0;
    let y = 0;

    switch (side) {
      case 'top':
        x = triggerRect.left + scrollX + triggerRect.width / 2; // Center on trigger
        y = triggerRect.top + scrollY - tooltipRect.height - 12;
        
        // Ensure tooltip stays within viewport
        if (x - tooltipRect.width / 2 < scrollX) x = scrollX + tooltipRect.width / 2 + 8;
        if (x + tooltipRect.width / 2 > scrollX + viewportWidth) x = scrollX + viewportWidth - tooltipRect.width / 2 - 8;
        break;
        
      case 'bottom':
        x = triggerRect.left + scrollX + triggerRect.width / 2; // Center on trigger
        y = triggerRect.bottom + scrollY + 12;
        
        // Ensure tooltip stays within viewport
        if (x - tooltipRect.width / 2 < scrollX) x = scrollX + tooltipRect.width / 2 + 8;
        if (x + tooltipRect.width / 2 > scrollX + viewportWidth) x = scrollX + viewportWidth - tooltipRect.width / 2 - 8;
        break;
        
      case 'left':
        x = triggerRect.left + scrollX - tooltipRect.width - 12;
        y = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        
        // Ensure tooltip stays within viewport
        if (y < scrollY) y = scrollY + 8;
        if (y + tooltipRect.height > scrollY + viewportHeight) y = scrollY + viewportHeight - tooltipRect.height - 8;
        break;
        
      case 'right':
        x = triggerRect.right + scrollX + 12;
        y = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        
        // Ensure tooltip stays within viewport
        if (y < scrollY) y = scrollY + 8;
        if (y + tooltipRect.height > scrollY + viewportHeight) y = scrollY + viewportHeight - tooltipRect.height - 8;
        break;
    }

    setPosition({ x, y });
  }, [side]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleScroll = () => updatePosition();
      const handleResize = () => updatePosition();
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, side, updatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded-md shadow-lg animate-in fade-in-0 zoom-in-95 duration-200",
            "max-w-xs break-words whitespace-nowrap pointer-events-none",
            "transform -translate-x-1/2", // Center horizontally for top/bottom
            className
          )}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {content}
          <div
            className={cn(
              "absolute w-2 h-2 bg-gray-900 border border-gray-700 rotate-45",
              side === 'top' && "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-0 border-l-0",
              side === 'bottom' && "top-[-4px] left-1/2 -translate-x-1/2 border-b-0 border-r-0",
              side === 'left' && "right-[-4px] top-1/2 -translate-y-1/2 border-l-0 border-b-0",
              side === 'right' && "left-[-4px] top-1/2 -translate-y-1/2 border-r-0 border-t-0"
            )}
          />
        </div>
      )}
    </>
  );
}
