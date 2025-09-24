'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type GifSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const sizeClasses: Record<GifSize, string> = {
	sm: 'w-6 h-6',
	md: 'w-8 h-8',
	lg: 'w-12 h-12',
	xl: 'w-16 h-16',
	'2xl': 'w-20 h-20',
	'3xl': 'w-24 h-24',
	'4xl': 'w-28 h-28'
};

const sizeDimensions: Record<GifSize, { width: number; height: number }> = {
	sm: { width: 24, height: 24 },
	md: { width: 32, height: 32 },
	lg: { width: 48, height: 48 },
	xl: { width: 64, height: 64 },
	'2xl': { width: 80, height: 80 },
	'3xl': { width: 96, height: 96 },
	'4xl': { width: 112, height: 112 }
};

export interface HalloweenGifProps {
	src: string;
	alt?: string;
	size?: GifSize;
	animated?: boolean;
	glow?: boolean;
	className?: string;
}

export function HalloweenGif({
	src,
	alt = 'Halloween GIF',
	size = 'md',
	animated = false,
	glow = false,
	className = ''
}: HalloweenGifProps) {
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
				src={src}
				alt={alt}
				width={dimensions.width}
				height={dimensions.height}
				className="w-full h-full object-contain"
				unoptimized
			/>
		</div>
	);
}


