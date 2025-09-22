'use client';

import React from 'react';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { HalloweenCard } from '@/components/halloween/halloween-card';
import { SeasonalCard } from './seasonal-card';

interface ThemeAwareLearningCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  decoration?: 'pumpkin' | 'ghost' | 'bat' | 'none';
  glow?: boolean;
  animated?: boolean;
}

export function ThemeAwareLearningCard({
  title,
  description,
  children,
  className,
  decoration = 'pumpkin',
  glow = true,
  animated = true
}: ThemeAwareLearningCardProps) {
  const { currentTheme, isEnabled } = useSeasonalTheme();

  // Use HalloweenCard when Halloween theme is active
  if (currentTheme === 'halloween' && isEnabled) {
    return (
      <HalloweenCard
        title={title}
        description={description}
        decoration={decoration}
        glow={glow}
        animated={animated}
        className={className}
      >
        {children}
      </HalloweenCard>
    );
  }

  // Use SeasonalCard for other themes or when theme is disabled
  return (
    <SeasonalCard
      title={title}
      description={description}
      className={className}
    >
      {children}
    </SeasonalCard>
  );
}

