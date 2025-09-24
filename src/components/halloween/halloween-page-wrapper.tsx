'use client';

import React, { useState, useEffect } from 'react';
import { HalloweenDecorations } from './halloween-decorations';
import { HalloweenLoader } from './halloween-loader';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';

interface HalloweenPageWrapperProps {
  children: React.ReactNode;
  showLoader?: boolean;
  loaderDuration?: number;
  decorationIntensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function HalloweenPageWrapper({
  children,
  showLoader = false,
  loaderDuration = 2000,
  decorationIntensity = 'medium',
  className = ''
}: HalloweenPageWrapperProps) {
  const { currentTheme, isActive } = useSeasonalTheme();
  const [isLoading, setIsLoading] = useState(showLoader);
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(!showLoader);
  
  // Check if Halloween theme is active
  const isHalloweenMode = isActive && currentTheme === 'halloween';

  // Show loading overlay immediately if loader should be shown
  useEffect(() => {
    if (showLoader) {
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
      }
    }
  }, [showLoader]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only show loader if both showLoader is true AND Halloween theme is active
    if (showLoader && isHalloweenMode) {
      // Show loader immediately, hide content
      setShowContent(false);
      setIsLoading(true);
      
      // Hide loading overlay when loader starts
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, loaderDuration);

      return () => clearTimeout(timer);
    } else {
      setShowContent(true);
      setIsLoading(false);
      // Hide loading overlay
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
    }
  }, [showLoader, loaderDuration, mounted, isHalloweenMode]);

  // Show loader only if it should be shown AND Halloween theme is active
  if (showLoader && isLoading && isHalloweenMode) {
    return (
      <HalloweenLoader 
        isLoading={isLoading}
        duration={loaderDuration}
        onComplete={() => {
          setIsLoading(false);
          setShowContent(true);
        }}
      />
    );
  }

  // Don't show content until loader is complete (only if Halloween theme is active)
  if (showLoader && !showContent && isHalloweenMode) {
    return null;
  }

  if (!mounted) {
    return <div className={`min-h-screen ${className}`}>{children}</div>;
  }

  // Apply Halloween theme decorations only if Halloween theme is active
  if (isHalloweenMode) {
    return (
      <HalloweenDecorations 
        intensity={decorationIntensity}
        className={`min-h-screen ${className}`}
      >
        {children}
      </HalloweenDecorations>
    );
  }

  // Default styling without Halloween theme
  return <div className={`min-h-screen ${className}`}>{children}</div>;
}
