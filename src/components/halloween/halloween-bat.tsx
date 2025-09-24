'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HalloweenBatProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'black' | 'brown' | 'gray';
  animated?: boolean;
  flying?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const colorClasses = {
  black: 'text-black',
  brown: 'text-amber-800',
  gray: 'text-gray-600'
};

const BatSVG = ({ className }: { className: string }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="1280.000000pt"
    height="640.000000pt"
    viewBox="0 0 1280.000000 640.000000"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <metadata>
      Created by potrace 1.15, written by Peter Selinger 2001-2017
    </metadata>
    <g
      transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path d="M2000 5319 c-587 -63 -1196 -361 -1865 -910 -69 -57 -123 -104 -122
-106 2 -2 62 2 133 8 255 21 506 -22 699 -118 326 -164 570 -508 655 -921 24
-119 40 -260 40 -360 l0 -74 41 34 c194 158 387 246 609 279 104 15 337 7 440
-15 298 -65 573 -233 775 -477 150 -179 213 -317 283 -613 l7 -30 53 47 c28
25 85 68 124 95 345 233 733 265 1073 89 93 -48 201 -150 254 -240 50 -85 99
-238 117 -368 16 -109 15 -350 -1 -489 -6 -53 -2 -43 45 110 44 143 91 237
151 298 103 105 232 149 414 139 179 -10 323 -69 435 -179 l61 -59 44 36 c214
175 476 220 684 119 72 -36 187 -146 234 -225 35 -60 72 -150 95 -229 7 -26 8
-7 5 75 -15 318 63 574 225 746 157 167 338 251 572 266 106 6 266 -14 379
-49 99 -30 256 -109 345 -172 43 -31 80 -56 81 -54 2 2 21 69 43 149 48 176
96 296 156 392 268 432 791 648 1331 552 202 -36 329 -86 540 -214 65 -39 119
-70 120 -69 2 2 8 44 14 93 40 306 138 571 281 764 73 97 204 223 300 285 41
27 120 71 175 97 169 81 281 101 562 100 l192 0 -14 37 c-44 122 -105 228
-197 339 -188 227 -533 434 -959 577 -729 243 -1379 146 -2054 -305 -59 -39
-342 -275 -695 -579 -614 -528 -759 -649 -918 -764 -231 -166 -488 -305 -685
-370 -59 -20 -109 -36 -112 -36 -2 0 -24 35 -49 77 l-44 77 44 34 c56 44 119
138 141 211 25 85 23 215 -4 267 -49 93 -154 147 -288 148 -72 0 -86 -3 -143
-34 -72 -38 -132 -103 -186 -200 l-35 -65 -157 -10 c-104 -7 -158 -7 -160 0
-46 138 -86 201 -160 254 -130 93 -282 75 -397 -48 -72 -77 -92 -127 -92 -236
0 -82 3 -97 32 -155 17 -36 55 -88 82 -117 57 -58 62 -82 32 -149 -21 -46 -73
-74 -139 -74 -69 0 -199 74 -377 216 -55 43 -120 92 -145 108 -226 145 -567
436 -1135 970 -176 166 -371 338 -500 442 -534 429 -1047 631 -1485 583z" />
    </g>
  </svg>
);

export function HalloweenBat({
  size = 'md',
  color = 'black',
  animated = false,
  flying = false,
  className = ''
}: HalloweenBatProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        sizeClasses[size],
        colorClasses[color],
        animated && !flying && 'halloween-float',
        flying && 'halloween-bat-fly',
        className
      )}
    >
      <BatSVG className="w-full h-full" />
    </div>
  );
}
