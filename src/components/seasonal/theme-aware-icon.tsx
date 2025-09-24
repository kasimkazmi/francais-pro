'use client';

import React from 'react';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

interface ThemeAwareIconProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeAwareIcon({ 
  children, 
  className,
  size = 'md'
}: ThemeAwareIconProps) {
  const { isActive, themeConfig } = useSeasonalTheme();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'md': return 'h-5 w-5';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };

  const getThemeColor = () => {
    if (!isActive) {
      return 'text-blue-600';
    }
    return themeConfig.colors.secondary;
  };

  const getThemeStyle = () => {
    if (!isActive) {
      return {};
    }
    return {
      color: themeConfig.colors.primary
    };
  };

  return (
    <div 
      className={cn(
        getSizeClasses(),
        !isActive ? getThemeColor() : '',
        className
      )}
      style={getThemeStyle()}
    >
      {children}
    </div>
  );
}
