'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HalloweenPumpkin } from '@/components/halloween/halloween-pumpkin';
import { HalloweenGhost } from '@/components/halloween/halloween-ghost';
import { HalloweenBat } from '@/components/halloween/halloween-bat';
import { HalloweenSpider } from '@/components/halloween/halloween-spider';
import { HalloweenWitchHat } from '@/components/halloween/halloween-witch-hat';

interface SeasonalCardProps {
  title?: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  decoration?: string;
  glow?: boolean;
  animated?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SeasonalCard({
  title,
  description,
  children,
  className,
  decoration,
  glow = true,
  animated = true,
  titleClassName,
  descriptionClassName
}: SeasonalCardProps) {
  const { currentTheme, themeConfig, isActive, isEnabled } = useSeasonalTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 

  const renderDecoration = () => {
    if (!isActive || !decoration) return null;

    const decorationProps = {
      size: 'sm' as const,
      animated,
      className: 'absolute top-4 right-4 opacity-60'
    };

    // Use existing Halloween decorations for Halloween theme
    if (currentTheme === 'halloween') {
      switch (decoration) {
        case 'pumpkin':
          return <HalloweenPumpkin {...decorationProps} glow={glow} />;
        case 'ghost':
          return <HalloweenGhost {...decorationProps} />;
        case 'bat':
          return <HalloweenBat {...decorationProps} />;
        case 'spider':
          return <HalloweenSpider {...decorationProps} />;
        case 'witch-hat':
          return <HalloweenWitchHat {...decorationProps} />;
        default:
          return null;
      }
    }

    // For other themes, you can add their specific decorations later
    return null;
  };

  if (!mounted) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className={titleClassName}>{title}</CardTitle>
          {description && (
            <CardDescription className={descriptionClassName}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
        {children && <CardContent>{children}</CardContent>}
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        isActive && 'seasonal-card',
        isActive && animated && 'seasonal-float',
        isActive && glow && 'seasonal-glow',
        className
      )}
    >
      {renderDecoration()}
      
      <CardHeader>
        <CardTitle 
          className={titleClassName}
          style={isEnabled ? {
            color: themeConfig.colors.primary,
            fontFamily: themeConfig.fonts.primary
          } : undefined}
        >
          {title}
        </CardTitle>
        {description && (
          <CardDescription 
            className={descriptionClassName}
            style={isEnabled ? {
              color: themeConfig.colors.tertiary,
              fontFamily: themeConfig.fonts.paragraph
            } : undefined}
          >
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
