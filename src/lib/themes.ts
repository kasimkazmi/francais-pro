// Theme system for dynamic seasonal styling
export type ThemeType = 'default' | 'halloween' | 'christmas' | 'spring' | 'summer' | 'autumn';

export interface ThemeConfig {
  name: string;
  displayName: string;
  fonts: {
    primary: string; // For headings, titles
    secondary: string; // For descriptions, body text
    accent: string; // For special elements
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  animations: {
    enabled: boolean;
    intensity: 'low' | 'medium' | 'high';
  };
  decorations: {
    enabled: boolean;
    types: string[];
  };
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  default: {
    name: 'default',
    displayName: 'Default',
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Inter, sans-serif',
      accent: 'Inter, sans-serif',
    },
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
    },
    animations: {
      enabled: false,
      intensity: 'low',
    },
    decorations: {
      enabled: false,
      types: [],
    },
  },
  halloween: {
    name: 'halloween',
    displayName: 'Halloween',
    fonts: {
      primary: 'MagnificentNightmare, Brush Script MT, cursive, serif',
      secondary: 'SpookyMonster, Chiller, Impact, sans-serif',
      accent: 'MagnificentNightmare, Brush Script MT, cursive, serif',
    },
    colors: {
      primary: '#ff6b35',
      secondary: '#8b5cf6',
      accent: '#10b981',
      background: '#1a1a1a',
      text: '#f3f4f6',
    },
    animations: {
      enabled: true,
      intensity: 'high',
    },
    decorations: {
      enabled: true,
      types: ['pumpkin', 'ghost', 'bat', 'spider', 'witch-hat', 'spider-web'],
    },
  },
  christmas: {
    name: 'christmas',
    displayName: 'Christmas',
    fonts: {
      primary: 'Dancing Script, cursive',
      secondary: 'Mountains of Christmas, cursive',
      accent: 'Dancing Script, cursive',
    },
    colors: {
      primary: '#dc2626',
      secondary: '#059669',
      accent: '#fbbf24',
      background: '#fef2f2',
      text: '#1f2937',
    },
    animations: {
      enabled: true,
      intensity: 'medium',
    },
    decorations: {
      enabled: true,
      types: ['snowflake', 'tree', 'gift', 'star'],
    },
  },
  spring: {
    name: 'spring',
    displayName: 'Spring',
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
    animations: {
      enabled: true,
      intensity: 'low',
    },
    decorations: {
      enabled: true,
      types: ['flower', 'butterfly', 'leaf'],
    },
  },
  summer: {
    name: 'summer',
    displayName: 'Summer',
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
    animations: {
      enabled: true,
      intensity: 'medium',
    },
    decorations: {
      enabled: true,
      types: ['sun', 'wave', 'palm-tree'],
    },
  },
  autumn: {
    name: 'autumn',
    displayName: 'Autumn',
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
    animations: {
      enabled: true,
      intensity: 'low',
    },
    decorations: {
      enabled: true,
      types: ['leaf', 'acorn', 'pumpkin'],
    },
  },
};

export function getTheme(themeName: ThemeType): ThemeConfig {
  return THEMES[themeName] || THEMES.default;
}

export function getCurrentTheme(): ThemeType {
  if (typeof window === 'undefined') return 'default';
  
  const savedTheme = localStorage.getItem('active-theme') as ThemeType;
  return savedTheme && THEMES[savedTheme] ? savedTheme : 'default';
}

export function setTheme(themeName: ThemeType): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('active-theme', themeName);
  
  // Remove all theme classes
  Object.keys(THEMES).forEach(theme => {
    document.documentElement.classList.remove(`${theme}-mode`);
  });
  
  // Add new theme class
  if (themeName !== 'default') {
    document.documentElement.classList.add(`${themeName}-mode`);
  }
}

