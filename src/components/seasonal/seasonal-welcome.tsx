'use client';

import React from 'react';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';

interface SeasonalWelcomeProps {
  className?: string;
}

export function SeasonalWelcome({ className }: SeasonalWelcomeProps) {
  const { currentTheme, isActive, themeConfig } = useSeasonalTheme();

  const getFrancaisProText = () => {
    switch (currentTheme) {
      case 'halloween':
        return 'Français Pro';
      case 'christmas':
        return 'Français Pro';
      case 'spring':
        return 'Français Pro';
      case 'summer':
        return 'Français Pro';
      case 'autumn':
        return 'Français Pro';
      default:
        return 'Français Pro';
    }
  };

  const getSpanStyle = () => {
    if (!isActive) {
      return { color: 'rgb(37 99 235)' }; // blue-600
    }
    return { 
      color: themeConfig.colors.primary,
      fontFamily: themeConfig.fonts.primary
    };
  };

  const getParagraphStyle = () => {
    if (!isActive) {
      return {};
    }
    // For Halloween theme, use Witch font for paragraph text
    if (themeConfig.colors.primary === '#ff6b35') { // Halloween orange
      return {
        color: themeConfig.colors.secondary,
        fontFamily: themeConfig.fonts.paragraph || themeConfig.fonts.secondary
      };
    }
    return {
      color: themeConfig.colors.secondary,
      fontFamily: themeConfig.fonts.secondary
    };
  };

  const defaultSubtitle = "Your journey to learning French starts here. Master the fundamentals with structured lessons, practice with interactive exercises, and track your progress with our free learning platform.";

  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Bienvenue à <span style={getSpanStyle()}>{getFrancaisProText()}</span>
      </h1>
      <p 
        className={isActive ? "text-3xl mb-6 tracking-widest" : "text-lg text-muted-foreground mb-6"}
        style={getParagraphStyle()}
      >
        {defaultSubtitle}
      </p>
    </div>
  );
}