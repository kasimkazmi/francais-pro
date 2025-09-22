'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSeasonalTheme, SeasonalThemeType } from '@/contexts/SeasonalThemeContext';
import { HalloweenPumpkin } from '@/components/halloween/halloween-pumpkin';

export function SeasonalThemeAdmin() {
  const { currentTheme, setCurrentTheme, availableThemes, isEnabled } = useSeasonalTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getThemeIcon = (theme: SeasonalThemeType) => {
    switch (theme) {
      case 'halloween':
        return <HalloweenPumpkin size="sm" animated={false} className="w-6 h-6" />;
      case 'christmas':
        return <div className="text-2xl">🎄</div>;
      case 'spring':
        return <div className="text-2xl">🌸</div>;
      case 'summer':
        return <div className="text-2xl">☀️</div>;
      case 'autumn':
        return <div className="text-2xl">🍂</div>;
      default:
        return <div className="text-2xl">🎨</div>;
    }
  };

  const getThemeDescription = (theme: SeasonalThemeType) => {
    switch (theme) {
      case 'halloween':
        return 'Spooky Halloween theme with pumpkins, ghosts, and spooky fonts';
      case 'christmas':
        return 'Festive Christmas theme with holiday colors and fonts';
      case 'spring':
        return 'Fresh Spring theme with bright colors and floral fonts';
      case 'summer':
        return 'Bright Summer theme with sunny colors and beach vibes';
      case 'autumn':
        return 'Cozy Autumn theme with warm colors and fall fonts';
      default:
        return 'Default theme - no seasonal styling';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Seasonal Theme Management</CardTitle>
        <CardDescription>
          Select which seasonal theme should be available for all users. Users can then enable/disable this theme.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            <strong>Current Active Theme:</strong> {currentTheme === 'default' ? 'None' : currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
            {isEnabled && currentTheme !== 'default' && (
              <span className="ml-2 text-green-600">(Users can enable/disable this theme)</span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableThemes.map((theme) => (
              <Card
                key={theme}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  currentTheme === theme 
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setCurrentTheme(theme)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    {getThemeIcon(theme)}
                    <h3 className="font-semibold text-lg">
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getThemeDescription(theme)}
                  </p>
                  {currentTheme === theme && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Currently Active
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              How it works:
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Select a theme above to make it available for all users</li>
              <li>• Users will see a toggle button to enable/disable the selected theme</li>
              <li>• Users cannot choose different themes - only enable/disable the admin-selected one</li>
              <li>• Set to &quot;Default&quot; to disable seasonal theming for all users</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

