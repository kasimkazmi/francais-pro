'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SeasonalThemeType = 'default' | 'halloween' | 'christmas' | 'spring' | 'summer' | 'autumn';

export interface SeasonalThemeConfig {
  name: string;
  displayName: string;
  icon: string;
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
    paragraph?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    tertiary?: string;
    background: string;
    text: string;
  };
  decorations: {
    enabled: boolean;
    types: string[];
  };
  music: {
    enabled: boolean;
    file?: string;
  };
}

export const SEASONAL_THEMES: Record<SeasonalThemeType, SeasonalThemeConfig> = {
  default: {
    name: 'default',
    displayName: 'Default',
    icon: '🎨',
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Inter, sans-serif',
      accent: 'Inter, sans-serif',
      paragraph: 'Inter, sans-serif',
    },
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
    },
    decorations: {
      enabled: false,
      types: [],
    },
    music: {
      enabled: false,
    },
  },
  halloween: {
    name: 'halloween',
    displayName: 'Halloween',
    icon: '🎃',
    fonts: {
      primary: 'MagnificentNightmare, Brush Script MT, cursive, serif',
      secondary: 'SpookyMonster, Chiller, Impact, sans-serif',
      accent: 'MagnificentNightmare, Brush Script MT, cursive, serif',
      paragraph: 'HelloPumpkin, Creepster, cursive',
    },
    colors: {
      primary: '#ff6b35',
      secondary: '#8b5cf6',
      accent: '#10b981',
      tertiary: '#fdba74',
      background: '#1a1a1a',
      text: '#f3f4f6',
    },
    decorations: {
      enabled: true,
      types: ['pumpkin', 'ghost', 'bat', 'spider', 'witch-hat', 'spider-web'],
    },
    music: {
      enabled: true,
      file: '/halloween/audio/spooky-ambient.mp3',
    },
  },
  christmas: {
    name: 'christmas',
    displayName: 'Christmas',
    icon: '🎄',
    fonts: {
      primary: 'Dancing Script, cursive',
      secondary: 'Mountains of Christmas, cursive',
      accent: 'Dancing Script, cursive',
      paragraph: 'Mountains of Christmas, cursive',
    },
    colors: {
      primary: '#dc2626',
      secondary: '#059669',
      accent: '#fbbf24',
      background: '#fef2f2',
      text: '#1f2937',
    },
    decorations: {
      enabled: true,
      types: ['snowflake', 'tree', 'gift', 'star'],
    },
    music: {
      enabled: true,
      file: '/christmas/audio/jingle-bells.mp3',
    },
  },
  spring: {
    name: 'spring',
    displayName: 'Spring',
    icon: '🌸',
    fonts: {
      primary: 'Pacifico, cursive',
      secondary: 'Dancing Script, cursive',
      accent: 'Pacifico, cursive',
    },
    colors: {
      primary: '#10b981',
      secondary: '#f59e0b',
      accent: '#ec4899',
      background: '#f0fdf4',
      text: '#1f2937',
    },
    decorations: {
      enabled: true,
      types: ['flower', 'butterfly', 'leaf'],
    },
    music: {
      enabled: false,
    },
  },
  summer: {
    name: 'summer',
    displayName: 'Summer',
    icon: '☀️',
    fonts: {
      primary: 'Lobster, cursive',
      secondary: 'Quicksand, sans-serif',
      accent: 'Lobster, cursive',
    },
    colors: {
      primary: '#f59e0b',
      secondary: '#06b6d4',
      accent: '#ec4899',
      background: '#fefce8',
      text: '#1f2937',
    },
    decorations: {
      enabled: true,
      types: ['flower', 'butterfly', 'leaf'],
    },
    music: {
      enabled: false,
    },
  },
  autumn: {
    name: 'autumn',
    displayName: 'Autumn',
    icon: '🍂',
    fonts: {
      primary: 'Merriweather, serif',
      secondary: 'Open Sans, sans-serif',
      accent: 'Merriweather, serif',
    },
    colors: {
      primary: '#ea580c',
      secondary: '#a3a3a3',
      accent: '#dc2626',
      background: '#fef3c7',
      text: '#1f2937',
    },
    decorations: {
      enabled: true,
      types: ['leaf', 'acorn', 'pumpkin'],
    },
    music: {
      enabled: false,
    },
  },
};

interface SeasonalThemeContextType {
  currentTheme: SeasonalThemeType;
  themeConfig: SeasonalThemeConfig;
  setCurrentTheme: (theme: SeasonalThemeType) => void;
  toggleTheme: () => void;
  availableThemes: SeasonalThemeType[];
  isActive: boolean;
  isEnabled: boolean;
}

const SeasonalThemeContext = createContext<SeasonalThemeContextType | undefined>(undefined);

export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentThemeState] = useState<SeasonalThemeType>('default');
  const [isEnabled, setIsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for admin-selected theme
    const adminTheme = localStorage.getItem('admin-selected-theme') as SeasonalThemeType;
    if (adminTheme && SEASONAL_THEMES[adminTheme]) {
      setCurrentThemeState(adminTheme);
    }
    
    // Check for user's enable/disable preference
    const userEnabled = localStorage.getItem('seasonal-theme-enabled') === 'true';
    setIsEnabled(userEnabled);
    
    // Apply theme if enabled
    if (userEnabled && adminTheme) {
      applyTheme(adminTheme);
    }
  }, []);

  const applyTheme = (theme: SeasonalThemeType) => {
    const root = document.documentElement;
    
    // Remove all seasonal theme classes
    Object.keys(SEASONAL_THEMES).forEach(themeName => {
      if (themeName !== 'default') {
        root.classList.remove(`${themeName}-mode`);
      }
    });
    
    // Apply new theme class
    if (theme !== 'default') {
      root.classList.add(`${theme}-mode`);
    }
    
    // Update CSS variables
    const themeConfig = SEASONAL_THEMES[theme];
    root.style.setProperty('--seasonal-primary', themeConfig.colors.primary);
    root.style.setProperty('--seasonal-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--seasonal-accent', themeConfig.colors.accent);
    root.style.setProperty('--seasonal-background', themeConfig.colors.background);
    root.style.setProperty('--seasonal-text', themeConfig.colors.text);
    root.style.setProperty('--seasonal-font-primary', themeConfig.fonts.primary);
    root.style.setProperty('--seasonal-font-secondary', themeConfig.fonts.secondary);
    root.style.setProperty('--seasonal-font-accent', themeConfig.fonts.accent);
  };

  const setCurrentTheme = (theme: SeasonalThemeType) => {
    setCurrentThemeState(theme);
    localStorage.setItem('admin-selected-theme', theme);
    // Apply theme if user has enabled it
    if (isEnabled) {
      applyTheme(theme);
    }
  };

  const toggleTheme = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    localStorage.setItem('seasonal-theme-enabled', newEnabled.toString());
    
    if (newEnabled) {
      applyTheme(currentTheme);
    } else {
      // Remove theme classes when disabled
      const root = document.documentElement;
      Object.keys(SEASONAL_THEMES).forEach(themeName => {
        if (themeName !== 'default') {
          root.classList.remove(`${themeName}-mode`);
        }
      });
    }
  };

  const themeConfig = SEASONAL_THEMES[currentTheme];
  const availableThemes = Object.keys(SEASONAL_THEMES) as SeasonalThemeType[];
  const isActive = isEnabled && currentTheme !== 'default';

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SeasonalThemeContext.Provider
      value={{
        currentTheme,
        themeConfig,
        setCurrentTheme,
        toggleTheme,
        availableThemes,
        isActive,
        isEnabled,
      }}
    >
      {children}
    </SeasonalThemeContext.Provider>
  );
}

export function useSeasonalTheme() {
  const context = useContext(SeasonalThemeContext);
  if (context === undefined) {
    throw new Error('useSeasonalTheme must be used within a SeasonalThemeProvider');
  }
  return context;
}
