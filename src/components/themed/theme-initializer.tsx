'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/DarkLightThemeContext';
// Note: theme styles are applied via CSS classes on <html> by DarkLightThemeContext

export function ThemeInitializer() {
  const { theme } = useTheme();

  useEffect(() => {
    // DarkLightThemeContext already toggles 'light'/'dark' on <html>.
    // Keep hook to react to changes if additional side-effects are needed later.
  }, [theme]);

  return null; // This component doesn't render anything
}

