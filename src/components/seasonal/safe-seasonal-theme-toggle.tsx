'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HalloweenPumpkin } from '@/components/halloween/halloween-pumpkin';

interface SafeSeasonalThemeToggleProps {
  onToggle?: (isActive: boolean) => void;
  className?: string;
}

export function SafeSeasonalThemeToggle({ 
  onToggle,
  className = ''
}: SafeSeasonalThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>('default');

  useEffect(() => {
    setMounted(true);
    
    // Check for admin-selected theme
    try {
      const adminTheme = localStorage.getItem('admin-selected-theme');
      if (adminTheme) {
        setCurrentTheme(adminTheme);
      }
      
      // Check for user's enable/disable preference
      const userEnabled = localStorage.getItem('seasonal-theme-enabled') === 'true';
      setIsEnabled(userEnabled);
    } catch (error) {
      // localStorage not available
      console.warn('localStorage not available');
    }
  }, []);

  if (!mounted || currentTheme === 'default') {
    return null;
  }

  const handleToggle = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    
    try {
      localStorage.setItem('seasonal-theme-enabled', newEnabled.toString());
      
      // Apply or remove theme class
      const root = document.documentElement;
      if (newEnabled) {
        root.classList.add(`${currentTheme}-mode`);
      } else {
        root.classList.remove(`${currentTheme}-mode`);
      }
    } catch (error) {
      console.warn('Could not save theme preference');
    }
    
    if (onToggle) {
      onToggle(newEnabled);
    }
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'halloween':
        return <HalloweenPumpkin 
          size="sm" 
          animated={false} 
          className="w-5 h-5 text-orange-600 transition-transform duration-500 ease-in-out hover:scale-110" 
        />;
      case 'christmas':
        return <div className="text-lg transition-opacity duration-300">🎄</div>;
      case 'spring':
        return <div className="text-lg transition-opacity duration-300">🌸</div>;
      case 'summer':
        return <div className="text-lg transition-opacity duration-300">☀️</div>;
      case 'autumn':
        return <div className="text-lg transition-opacity duration-300">🍂</div>;
      default:
        return <div className="text-lg transition-opacity duration-300">🎨</div>;
    }
  };

  const getThemeTitle = () => {
    const themeName = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    return isEnabled ? `Disable ${themeName} Mode` : `Enable ${themeName} Mode`;
  };

  return (
    <Button
      onClick={handleToggle}
      variant={isEnabled ? "default" : "outline"}
      className={`
        h-9 w-9 px-0 relative flex items-center justify-center
        ${isEnabled ? 'seasonal-button' : ''}
        ${className}
      `}
      title={getThemeTitle()}
      aria-pressed={isEnabled}
    >
      {getThemeIcon(currentTheme)}

      {/* Subtle glow effect when active */}
      {isEnabled && (
        <span 
          aria-hidden="true"
          className="absolute inset-0 rounded-md shadow-[0_0_8px_2px_rgba(255,140,0,0.6)] pointer-events-none animate-pulse-slow"
        />
      )}
    </Button>
  );
}

