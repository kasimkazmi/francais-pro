'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSeasonalTheme, SeasonalThemeType } from '@/contexts/SeasonalThemeContext';
import { HalloweenPumpkin } from '@/components/halloween/halloween-pumpkin';

interface SeasonalThemeToggleProps {
  onToggle?: (isActive: boolean) => void;
  className?: string;
}

export function SeasonalThemeToggle({ 
  onToggle,
  className = ''
}: SeasonalThemeToggleProps) {
  const { currentTheme, toggleTheme, isActive, isEnabled } = useSeasonalTheme();

  // Don't render if no seasonal theme is active
  if (currentTheme === 'default') {
    return null;
  }

  const handleToggle = () => {
    toggleTheme();
    
    if (onToggle) {
      onToggle(!isEnabled);
    }
  };

  const getThemeIcon = (theme: SeasonalThemeType) => {
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
    return isActive ? `Disable ${themeName} Mode` : `Enable ${themeName} Mode`;
  };

  return (
    <Button
      onClick={handleToggle}
      variant={isActive ? "default" : "outline"}
      className={`
        h-9 w-9 px-0 relative flex items-center justify-center
        ${isActive ? 'seasonal-button' : ''}
        ${className}
      `}
      title={getThemeTitle()}
      aria-pressed={isActive}
    >
      {getThemeIcon(currentTheme)}

      {/* Subtle glow effect when active */}
      {isActive && (
        <span 
          aria-hidden="true"
          className="absolute inset-0 rounded-md shadow-[0_0_8px_2px_rgba(255,140,0,0.6)] pointer-events-none animate-pulse-slow"
        />
      )}
    </Button>
  );
}
