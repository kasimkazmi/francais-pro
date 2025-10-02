'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HalloweenPumpkin } from './halloween-pumpkin';
import { HalloweenGhost } from './halloween-ghost';
import { HalloweenBat } from './halloween-bat';
import { HalloweenSpider } from './halloween-spider';
import { HalloweenWitchHat } from './halloween-witch-hat';
import { cn } from '@/lib/utils';

interface HalloweenListCardProps {
  title: string;
  description?: string;
  items: Array<{
    id: string;
    text: string;
    icon?: React.ReactNode;
    completed?: boolean;
    highlight?: boolean;
  }>;
  className?: string;
  decoration?: 'pumpkin' | 'ghost' | 'bat' | 'spider' | 'witch-hat' | 'none';
  glow?: boolean;
  animated?: boolean;
  listStyle?: 'bullets' | 'numbers' | 'icons' | 'spooky' | 'instructions';
}

export function HalloweenListCard({
  title,
  description,
  items,
  className,
  decoration = 'pumpkin',
  glow = true,
  animated = true,
  listStyle = 'spooky'
}: HalloweenListCardProps) {
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if Halloween mode is active
    const checkHalloweenMode = () => {
      const isActive = document.documentElement.classList.contains('halloween-mode');
      setIsHalloweenMode(isActive);
    };

    checkHalloweenMode();

    // Listen for Halloween mode changes
    const observer = new MutationObserver(checkHalloweenMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [mounted]);

  const renderDecoration = () => {
    if (!isHalloweenMode || decoration === 'none') return null;

    const decorationProps = {
      size: 'sm' as const,
      animated,
      className: 'absolute top-4 right-4 opacity-60'
    };

    switch (decoration) {
      case 'pumpkin':
        return <HalloweenPumpkin {...decorationProps} glow={glow} />;
      case 'ghost':
        return <HalloweenGhost {...decorationProps} />;
      case 'bat':
        return <HalloweenBat {...decorationProps} />;
      case 'spider':
        return <HalloweenSpider {...decorationProps} color="black" />;
      case 'witch-hat':
        return <HalloweenWitchHat {...decorationProps} color="black" />;
      default:
        return null;
    }
  };


  const renderListItem = (item: { id: string; text: string; icon?: React.ReactNode; completed?: boolean; highlight?: boolean }, index: number) => {
    const baseClasses = cn(
      'flex items-start space-x-3 py-2 px-3 rounded-lg transition-all duration-200',
      isHalloweenMode && 'hover:bg-orange-500/10 hover:shadow-md',
      item.highlight && isHalloweenMode && 'bg-orange-500/20 border border-orange-400/30',
      item.completed && isHalloweenMode && 'opacity-75 line-through'
    );

    return (
      <li key={item.id} className={baseClasses}>
        {/* List marker */}
        <div className="flex-shrink-0 mt-1">
          {listStyle === 'bullets' ? (
            <div className={cn(
              'w-2 h-2 rounded-full mt-2',
              isHalloweenMode ? 'bg-orange-400' : 'bg-gray-400'
            )} />
          ) : listStyle === 'numbers' ? (
            <span className={cn(
              'text-sm font-bold',
              isHalloweenMode ? 'text-orange-400' : 'text-gray-600'
            )}>
              {index + 1}.
            </span>
          ) : listStyle === 'icons' && item.icon ? (
            <div className="text-lg">{item.icon}</div>
          ) : listStyle === 'spooky' || listStyle === 'instructions' ? (
            <div className={cn(
              'w-2 h-2 rounded-full mt-2',
              isHalloweenMode ? 'bg-orange-400' : 'bg-gray-400'
            )} />
          ) : null}
        </div>

   

        {/* Item content */}
        <div className="flex-1 min-w-0">
          <span className={cn(
            'text-sm leading-relaxed',
            isHalloweenMode && item.highlight && 'text-orange-200 font-semibold',
            isHalloweenMode && !item.highlight && 'text-gray-200',
            !isHalloweenMode && 'text-gray-700'
          )}>
            {item.text}
          </span>
        </div>

        {/* Highlighted items get special styling without emojis */}
      </li>
    );
  };

  if (!mounted) {
    return (
      <Card className={cn('relative overflow-hidden', className)}>
        <CardHeader>
          <CardTitle className="text-xl font-bold halloween-font-magnificent">{title}</CardTitle>
          {description && <CardDescription className="halloween-font-spooky">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="halloween-card-content">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="flex items-center space-x-3 py-2">
                  <span className="text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        'relative overflow-hidden',
        isHalloweenMode && 'halloween-card',
        isHalloweenMode && animated && 'halloween-float',
        isHalloweenMode && glow && 'halloween-glow',
        className
      )}
    >
      {renderDecoration()}
      
      <CardHeader className="relative z-10">
        <CardTitle className={cn(
          'text-xl font-bold',
          isHalloweenMode && 'halloween-text-glow halloween-font-magnificent'
        )}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className={cn(
            isHalloweenMode ? 'text-orange-200 halloween-font-spooky' : ''
          )}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="halloween-card-content">
          <ul className="space-y-1">
            {items.map((item, index) => renderListItem(item, index))}
          </ul>
        </div>
      </CardContent>
      
      {/* Halloween background pattern - only when theme is active */}
      {isHalloweenMode && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500 to-purple-500"></div>
          <div className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-4 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
        </div>
      )}
    </Card>
  );
}
