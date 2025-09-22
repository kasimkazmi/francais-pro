// Dynamic theme style generator
import { ThemeConfig } from './themes';

export function generateThemeCSS(themeConfig: ThemeConfig): string {
  const { name, fonts, colors } = themeConfig;
  
  return `
    /* ${themeConfig.displayName} Theme Styles */
    .${name}-mode {
      --theme-primary: ${colors.primary};
      --theme-secondary: ${colors.secondary};
      --theme-accent: ${colors.accent};
      --theme-background: ${colors.background};
      --theme-text: ${colors.text};
      
      --theme-font-primary: ${fonts.primary};
      --theme-font-secondary: ${fonts.secondary};
      --theme-font-accent: ${fonts.accent};
    }
    
    .${name}-mode .theme-text-primary {
      color: var(--theme-primary);
      font-family: var(--theme-font-primary);
    }
    
    .${name}-mode .theme-text-secondary {
      color: var(--theme-secondary);
      font-family: var(--theme-font-secondary);
    }
    
    .${name}-mode .theme-text-accent {
      color: var(--theme-accent);
      font-family: var(--theme-font-accent);
    }
    
    .${name}-mode .theme-bg {
      background-color: var(--theme-background);
    }
    
    .${name}-mode .theme-text {
      color: var(--theme-text);
    }
    
    /* Dynamic heading styles */
    .${name}-mode .theme-heading-1,
    .${name}-mode .theme-heading-2,
    .${name}-mode .theme-heading-3,
    .${name}-mode .theme-heading-4,
    .${name}-mode .theme-heading-5,
    .${name}-mode .theme-heading-6 {
      font-family: var(--theme-font-primary) !important;
      color: var(--theme-primary);
      font-weight: bold;
      letter-spacing: 0.05em;
    }
    
    .${name}-mode .theme-heading-1 { font-size: 2.5em; line-height: 1.1; }
    .${name}-mode .theme-heading-2 { font-size: 2em; line-height: 1.2; }
    .${name}-mode .theme-heading-3 { font-size: 1.75em; line-height: 1.3; }
    .${name}-mode .theme-heading-4 { font-size: 1.5em; line-height: 1.4; }
    .${name}-mode .theme-heading-5 { font-size: 1.25em; line-height: 1.4; }
    .${name}-mode .theme-heading-6 { font-size: 1.125em; line-height: 1.5; }
    
    /* Card content headings */
    .${name}-mode .theme-card-content h1,
    .${name}-mode .theme-card-content h2,
    .${name}-mode .theme-card-content h3,
    .${name}-mode .theme-card-content h4,
    .${name}-mode .theme-card-content h5,
    .${name}-mode .theme-card-content h6 {
      font-family: var(--theme-font-primary) !important;
      color: var(--theme-primary);
      font-weight: bold;
      letter-spacing: 0.05em;
    }
    
    .${name}-mode .theme-card-content h1 { font-size: 2em; line-height: 1.1; }
    .${name}-mode .theme-card-content h2 { font-size: 1.75em; line-height: 1.2; }
    .${name}-mode .theme-card-content h3 { font-size: 1.5em; line-height: 1.3; }
    .${name}-mode .theme-card-content h4 { font-size: 1.25em; line-height: 1.4; }
    .${name}-mode .theme-card-content h5 { font-size: 1.125em; line-height: 1.4; }
    .${name}-mode .theme-card-content h6 { font-size: 1em; line-height: 1.5; }
  `;
}

export function applyThemeStyles(themeConfig: ThemeConfig): void {
  const styleId = `theme-${themeConfig.name}-styles`;
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  styleElement.textContent = generateThemeCSS(themeConfig);
}

