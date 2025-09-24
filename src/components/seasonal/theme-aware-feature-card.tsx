'use client';

import React from 'react';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

interface ThemeAwareFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconType?: string;
}

export function ThemeAwareFeatureCard({ 
  icon, 
  title, 
  description, 
  className,
  iconType
}: ThemeAwareFeatureCardProps) {
  const { isActive, themeConfig } = useSeasonalTheme();

  const getIconColors = (iconType?: string) => {
    if (!isActive) {
      // Original hardcoded colors for each icon type
      switch (iconType) {
        case 'CheckCircle':
          return { bg: 'rgb(34 197 94)', color: 'white' }; // green-500
        case 'Clock':
          return { bg: 'rgb(59 130 246)', color: 'white' }; // blue-500
        case 'Trophy':
        case 'Award':
          return { bg: 'rgb(168 85 247)', color: 'white' }; // purple-500
        case 'Play':
          return { bg: 'rgb(249 115 22)', color: 'white' }; // orange-500
        case 'Users':
          return { bg: 'rgb(20 184 166)', color: 'white' }; // teal-500
        case 'Globe':
          return { bg: 'rgb(168 85 247)', color: 'white' }; // purple-500
        case 'BookOpen':
          return { bg: 'rgb(34 197 94)', color: 'white' }; // green-500
        case 'Target':
          return { bg: 'rgb(20 184 166)', color: 'white' }; // teal-500
        default:
          return { bg: 'rgb(59 130 246)', color: 'white' }; // blue-500 default
      }
    }
    return {
      bg: `${themeConfig.colors.primary}15`, // 15% opacity
      color: themeConfig.colors.primary
    };
  };

  const getIconBgStyle = () => {
    const colors = getIconColors(iconType);
    return {
      backgroundColor: colors.bg,
    };
  };

  const getIconStyle = () => {
    const colors = getIconColors(iconType);
    return {
      color: colors.color,
    };
  };

  const getTitleStyle = () => {
    if (!isActive) {
      return {
        color: 'rgb(37 99 235)', // blue-600 - original hardcoded color
      };
    }
    // For Halloween theme, use Spooky font for title
    if (themeConfig.colors.primary === '#ff6b35') { // Halloween orange
      return {
        color: themeConfig.colors.secondary,
        fontFamily: 'SpookyMonster, Chiller,Impact'
      };
    }
    return {
      color: themeConfig.colors.primary,
      fontFamily: themeConfig.fonts.primary
    };
  };

  const getDescriptionStyle = () => {
    if (!isActive) {
      return {
        color: 'rgb(107 114 128)', // gray-500 - original hardcoded color
      };
    }
    // For Halloween theme, use orange-200 color like HalloweenCard and Witch font
    if (themeConfig.colors.primary === '#ff6b35') { // Halloween orange
      return {
        color: 'rgb(253 186 116)', // orange-200
        fontFamily: themeConfig.fonts.paragraph || themeConfig.fonts.secondary
      };
    }
    return {
      color: themeConfig.colors.secondary,
      fontFamily: themeConfig.fonts.secondary
    };
  };

  return (
    <div className={cn('text-center', className)}>
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        style={getIconBgStyle()}
      >
        <div 
          className="flex items-center justify-center"
          style={getIconStyle()}
        >
          {icon}
        </div>
      </div>
      <h3 
        className={cn(
          isActive ? 'text-4xl tracking-widest' : 'text-lg',
          'font-family-secondary font-semibold mb-2'
        )}
        style={getTitleStyle()}
      >
        {title}
      </h3>
      <p 
        className={cn(
          isActive ? 'text-xl tracking-widest' : 'text-sm',
          !isActive && 'text-muted-foreground'
        )}
        style={getDescriptionStyle()}
      >
        {description}
      </p>
    </div>
  );
}
