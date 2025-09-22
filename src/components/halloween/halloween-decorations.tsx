"use client";

import React, { useState, useEffect } from "react";

interface HalloweenDecorationsProps {
  intensity?: "low" | "medium" | "high";
  className?: string;
  children?: React.ReactNode;
}

// Pre-defined particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 10, top: 20, delay: 0.5, duration: 2.5 },
  { left: 25, top: 60, delay: 1.2, duration: 3.0 },
  { left: 40, top: 15, delay: 0.8, duration: 2.8 },
  { left: 60, top: 45, delay: 1.5, duration: 3.2 },
  { left: 80, top: 30, delay: 0.3, duration: 2.2 },
  { left: 15, top: 80, delay: 1.8, duration: 3.5 },
  { left: 35, top: 70, delay: 0.7, duration: 2.7 },
  { left: 55, top: 25, delay: 1.1, duration: 3.1 },
  { left: 75, top: 65, delay: 0.9, duration: 2.9 },
  { left: 90, top: 10, delay: 1.4, duration: 3.3 },
  { left: 5, top: 50, delay: 0.6, duration: 2.6 },
  { left: 30, top: 35, delay: 1.3, duration: 2.4 },
  { left: 50, top: 85, delay: 0.4, duration: 3.4 },
  { left: 70, top: 55, delay: 1.6, duration: 2.1 },
  { left: 85, top: 40, delay: 0.2, duration: 2.8 },
  { left: 20, top: 90, delay: 1.7, duration: 3.6 },
  { left: 45, top: 5, delay: 0.1, duration: 2.3 },
  { left: 65, top: 75, delay: 1.9, duration: 3.7 },
  { left: 95, top: 60, delay: 0.8, duration: 2.0 },
  { left: 12, top: 30, delay: 1.0, duration: 3.8 },
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
              className="halloween-particle w-2 h-2 bg-orange-400 rounded-full opacity-30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animation: "float 4s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      {children && <div className="relative z-20 min-h-screen">{children}</div>}
    </div>
  );
}
