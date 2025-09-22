'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

interface ThemeAwareButtonProps {
  children: React.ReactNode;
  href?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  className?: string;
  onClick?: () => void;
}

export function ThemeAwareButton({ 
  children, 
  href, 
  size = 'default', 
  variant = 'default',
  className,
  onClick 
}: ThemeAwareButtonProps) {
  const { isEnabled, themeConfig } = useSeasonalTheme();

  const getThemeStyles = () => {
    if (!isEnabled) {
      return {};
    }

    return {
      backgroundColor: variant === 'default' ? themeConfig.colors.primary : undefined,
      borderColor: variant === 'outline' ? themeConfig.colors.primary : undefined,
      color: variant === 'outline' ? themeConfig.colors.primary : undefined,
    };
  };

  const getThemeClasses = () => {
    if (!isEnabled) {
      return {
        primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
        secondary: 'text-blue-600',
        border: 'border-blue-200 dark:border-blue-800'
      };
    }

    return {
      primary: 'hover:opacity-80 active:opacity-90',
      secondary: '',
      border: ''
    };
  };

  const themeClasses = getThemeClasses();
  const themeStyles = getThemeStyles();

  const buttonClasses = cn(
    variant === 'default' ? themeClasses.primary : '',
    className
  );

  const ButtonComponent = (
    <Button
      size={size}
      variant={variant}
      className={buttonClasses}
      style={themeStyles}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {ButtonComponent}
      </a>
    );
  }

  return ButtonComponent;
}
