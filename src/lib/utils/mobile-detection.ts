'use client';

import React from 'react';

// Detect if the device is mobile based on screen size and touch capability
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check screen width (most reliable for mobile detection)
  const isMobileWidth = window.innerWidth < 768; // md breakpoint
  
  // Check if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check user agent for mobile indicators
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Consider it mobile if it has mobile width OR (touch capability AND mobile user agent)
  return isMobileWidth || (isTouchDevice && isMobileUA);
}

// Hook to detect mobile devices with reactive updates
export function useIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  const [isMobile, setIsMobile] = React.useState(() => isMobileDevice());
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
}
