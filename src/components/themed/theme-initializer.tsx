'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/DarkLightThemeContext';
import { applyThemeStyles } from '@/lib/theme-styles';

export function ThemeInitializer() {
  const { themeConfig } = useTheme();

  useEffect(() => {
    // Apply theme styles when theme changes
    applyThemeStyles(themeConfig);
  }, [themeConfig]);

  return null; // This component doesn't render anything
}

