'use client';

import React, { useState, useEffect } from 'react';
import { HalloweenDecorations } from './halloween-decorations';
import { HalloweenLoader } from './halloween-loader';

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
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);
  const [isLoading, setIsLoading] = useState(showLoader);
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(!showLoader);

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

    // Check if Halloween mode is active
    const checkHalloweenMode = () => {
      const isActive = document.documentElement.classList.contains('halloween-mode');
      setIsHalloweenMode(isActive);
    };

    checkHalloweenMode();

    // Listen for Halloween mode changes
    const observer = new MutationObserver(checkHalloweenMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (showLoader) {
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
      // Hide loading overlay
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
    }
  }, [showLoader, loaderDuration, mounted]);

  // Show loader immediately if it should be shown (independent of theme)
  if (showLoader && isLoading) {
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

  // Don't show content until loader is complete
  if (showLoader && !showContent) {
    return null;
  }

  if (!mounted) {
    return <div className={`min-h-screen ${className}`}>{children}</div>;
  }

  // Apply Halloween theme decorations only if Halloween mode is active
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
