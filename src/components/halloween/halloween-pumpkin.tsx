'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HalloweenPumpkinProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'orange' | 'white' | 'green';
  animated?: boolean;
  glow?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const sizeDimensions = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 48, height: 48 },
  xl: { width: 64, height: 64 }
};

export function HalloweenPumpkin({
  size = 'md',
  color = 'orange',
  animated = false,
  glow = false,
  className = ''
}: HalloweenPumpkinProps) {
  const dimensions = sizeDimensions[size];
  
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        sizeClasses[size],
        animated && 'halloween-pumpkin-glow',
        glow && 'halloween-pumpkin-glow',
        className
      )}
    >
      <Image
        src="/halloween/images/pumkin2.gif"
        alt="Halloween Pumpkin"
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full object-contain"
        unoptimized
      />
    </div>
  );
}
