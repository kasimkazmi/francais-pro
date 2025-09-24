"use client";

import React, { useState, useEffect } from "react";

interface HalloweenDecorationsProps {
  intensity?: "low" | "medium" | "high";
  className?: string;
  children?: React.ReactNode;
}

// Pre-defined particle positions to avoid hydration mismatch - distributed like background image
const PARTICLE_POSITIONS = [
  // Top row
  { left: 5, top: 8, delay: 0.2, duration: 2.1 },
  { left: 15, top: 12, delay: 0.8, duration: 2.8 },
  { left: 25, top: 6, delay: 1.4, duration: 3.2 },
  { left: 35, top: 10, delay: 0.6, duration: 2.4 },
  { left: 45, top: 14, delay: 1.2, duration: 2.9 },
  { left: 55, top: 8, delay: 0.4, duration: 3.1 },
  { left: 65, top: 11, delay: 1.6, duration: 2.6 },
  { left: 75, top: 7, delay: 0.9, duration: 3.4 },
  { left: 85, top: 13, delay: 1.1, duration: 2.7 },
  { left: 95, top: 9, delay: 0.3, duration: 3.6 },
  
  // Second row
  { left: 8, top: 25, delay: 1.8, duration: 2.3 },
  { left: 18, top: 22, delay: 0.7, duration: 3.8 },
  { left: 28, top: 28, delay: 1.3, duration: 2.5 },
  { left: 38, top: 24, delay: 0.5, duration: 3.3 },
  { left: 48, top: 26, delay: 1.7, duration: 2.8 },
  { left: 58, top: 23, delay: 0.1, duration: 3.5 },
  { left: 68, top: 27, delay: 1.5, duration: 2.2 },
  { left: 78, top: 25, delay: 0.9, duration: 3.7 },
  { left: 88, top: 21, delay: 1.1, duration: 2.4 },
  { left: 92, top: 29, delay: 0.8, duration: 3.2 },
  
  // Third row
  { left: 12, top: 42, delay: 0.2, duration: 2.1 },
  { left: 22, top: 38, delay: 0.8, duration: 2.8 },
  { left: 32, top: 44, delay: 1.4, duration: 3.2 },
  { left: 42, top: 40, delay: 0.6, duration: 2.4 },
  { left: 52, top: 46, delay: 1.2, duration: 2.9 },
  { left: 62, top: 39, delay: 0.4, duration: 3.1 },
  { left: 72, top: 43, delay: 1.6, duration: 2.6 },
  { left: 82, top: 41, delay: 0.9, duration: 3.4 },
  { left: 87, top: 45, delay: 1.1, duration: 2.7 },
  { left: 97, top: 37, delay: 0.3, duration: 3.6 },
  
  // Fourth row
  { left: 6, top: 58, delay: 1.8, duration: 2.3 },
  { left: 16, top: 62, delay: 0.7, duration: 3.8 },
  { left: 26, top: 56, delay: 1.3, duration: 2.5 },
  { left: 36, top: 60, delay: 0.5, duration: 3.3 },
  { left: 46, top: 64, delay: 1.7, duration: 2.8 },
  { left: 56, top: 58, delay: 0.1, duration: 3.5 },
  { left: 66, top: 62, delay: 1.5, duration: 2.2 },
  { left: 76, top: 59, delay: 0.9, duration: 3.7 },
  { left: 86, top: 63, delay: 1.1, duration: 2.4 },
  { left: 93, top: 57, delay: 0.8, duration: 3.2 },
  
  // Fifth row
  { left: 10, top: 75, delay: 0.2, duration: 2.1 },
  { left: 20, top: 78, delay: 0.8, duration: 2.8 },
  { left: 30, top: 72, delay: 1.4, duration: 3.2 },
  { left: 40, top: 76, delay: 0.6, duration: 2.4 },
  { left: 50, top: 80, delay: 1.2, duration: 2.9 },
  { left: 60, top: 74, delay: 0.4, duration: 3.1 },
  { left: 70, top: 78, delay: 1.6, duration: 2.6 },
  { left: 80, top: 75, delay: 0.9, duration: 3.4 },
  { left: 90, top: 79, delay: 1.1, duration: 2.7 },
  { left: 96, top: 73, delay: 0.3, duration: 3.6 },
  
  // Bottom row
  { left: 4, top: 88, delay: 1.8, duration: 2.3 },
  { left: 14, top: 92, delay: 0.7, duration: 3.8 },
  { left: 24, top: 86, delay: 1.3, duration: 2.5 },
  { left: 34, top: 90, delay: 0.5, duration: 3.3 },
  { left: 44, top: 94, delay: 1.7, duration: 2.8 },
  { left: 54, top: 88, delay: 0.1, duration: 3.5 },
  { left: 64, top: 92, delay: 1.5, duration: 2.2 },
  { left: 74, top: 89, delay: 0.9, duration: 3.7 },
  { left: 84, top: 93, delay: 1.1, duration: 2.4 },
  { left: 94, top: 87, delay: 0.8, duration: 3.2 },
  
  // Additional scattered for density
  { left: 7, top: 35, delay: 1.8, duration: 3.5 },
  { left: 17, top: 50, delay: 0.2, duration: 2.8 },
  { left: 27, top: 15, delay: 1.7, duration: 3.6 },
  { left: 37, top: 85, delay: 1.0, duration: 3.8 },
  { left: 47, top: 20, delay: 0.9, duration: 2.7 },
  { left: 57, top: 70, delay: 1.3, duration: 3.1 },
  { left: 67, top: 30, delay: 0.5, duration: 2.9 },
  { left: 77, top: 65, delay: 1.6, duration: 3.4 },
  { left: 87, top: 18, delay: 0.8, duration: 2.6 },
  { left: 97, top: 82, delay: 1.4, duration: 3.7 },
];

export function HalloweenDecorations({
  intensity = "medium",
  className = "",
  children,
}: HalloweenDecorationsProps) {
  const [mounted, setMounted] = useState(false);
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if Halloween mode is active
    const checkHalloweenMode = () => {
      const isActive =
        document.documentElement.classList.contains("halloween-mode");
      setIsHalloweenMode(isActive);
    };

    checkHalloweenMode();

    // Listen for Halloween mode changes
    const observer = new MutationObserver(checkHalloweenMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !isHalloweenMode) return;
  }, [intensity, mounted, isHalloweenMode]);

  if (!mounted) {
    return (
      <div className={`relative overflow-hidden ${className}`}>{children}</div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background particles - only when Halloween mode is active */}
      {isHalloweenMode && (
        <div className="absolute inset-0">
          {PARTICLE_POSITIONS.map((particle, i) => (
            <div
              key={`particle-${i}`}
              className="halloween-particle opacity-30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationName: 'float',
                animationDuration: '4s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${particle.delay}s`,
                width: '8px',
                height: '16px',
                background: 'linear-gradient(to bottom, #ff6b35 0%, #ff8c42 30%, #ffa726 60%, #ffb74d 100%)',
                borderRadius: '4px 4px 2px 2px',
                position: 'relative',
                boxShadow: '0 0 8px rgba(255, 107, 53, 0.6)',
              }}
            >
              {/* Candle flame */}
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '8px',
                  background: 'radial-gradient(ellipse at center, #ffeb3b 0%, #ff9800 50%, #ff5722 100%)',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: '0 0 6px rgba(255, 193, 7, 0.8)',
                  animationName: 'flicker',
                  animationDuration: '1.5s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {children && <div className="relative z-20 min-h-screen">{children}</div>}
    </div>
  );
}
