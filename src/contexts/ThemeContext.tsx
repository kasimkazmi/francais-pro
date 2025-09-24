'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType, getCurrentTheme, setTheme, getTheme, THEMES } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ReturnType<typeof getTheme>;
  setCurrentTheme: (theme: ThemeType) => void;
  availableThemes: ThemeType[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentThemeState] = useState<ThemeType>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = getCurrentTheme();
    setCurrentThemeState(theme);
  }, []);

  const setCurrentTheme = (theme: ThemeType) => {
    setCurrentThemeState(theme);
    setTheme(theme);
  };

  const themeConfig = getTheme(currentTheme);
  const availableThemes = Object.keys(THEMES) as ThemeType[];

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig,
        setCurrentTheme,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
