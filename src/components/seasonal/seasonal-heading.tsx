'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';

interface SeasonalHeadingProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  centered?: boolean;
}

export function SeasonalHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  centered = true
}: SeasonalHeadingProps) {
  const { themeConfig, isActive } = useSeasonalTheme();

  const getTitleStyle = () => {
    if (!isActive) {
      return {};
    }
    return {
      color: themeConfig.colors.primary,
      fontFamily: themeConfig.fonts.primary
    };
  };

  const getDescriptionStyle = () => {
    if (!isActive) {
      return {
        color: 'rgb(107 114 128)', // gray-500 - secondary text color for dark mode
      };
    }
    // For Halloween theme, use orange-200 color like HalloweenCard and Witch font
    if (themeConfig.colors.primary === '#ff6b35') { // Halloween orange
      return {
        color: themeConfig.colors.tertiary, // orange-200
        fontFamily: themeConfig.fonts.paragraph || themeConfig.fonts.secondary
      };
    }
    return {
      color: themeConfig.colors.secondary,
      fontFamily: themeConfig.fonts.secondary
    };
  };

  return (
    <div className={cn(
      'mb-8',
      centered && 'text-center',
      className
    )}>
      <h2 
        className={cn(
          'text-3xl tracking-wide font-bold mb-4',
          titleClassName
        )}
        style={getTitleStyle()}
      >
        {title}
      </h2>
      {description && (
        <p 
          className={cn(
            isActive ? 'text-3xl tracking-widest' : 'text-lg',
            descriptionClassName
          )}
          style={getDescriptionStyle()}
        >
          {description}
        </p>
      )}
    </div>
  );
}
