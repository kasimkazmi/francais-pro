"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { HalloweenPumpkin } from './halloween-pumpkin';
// import { HalloweenGhost } from './halloween-ghost';
// import { HalloweenBat } from './halloween-bat';
import { cn } from "@/lib/utils";
// import { HalloweenTeaBat } from './halloween-teabat';
import { HalloweenGif } from "./halloween-gif";

interface HalloweenCardProps {
  title: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  decoration?: "pumpkin" | "ghost" | "bat" | "none";
  decorationSize?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  animated?: boolean;
}

export function HalloweenCard({
  title,
  description,
  children,
  className,
  decoration = "pumpkin",
  decorationSize,
  glow = true,
  animated = true,
}: HalloweenCardProps) {
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const renderDecoration = () => {
    if (!isHalloweenMode || decoration === "none") return null;

    const resolvedSize = decorationSize ?? "md";
    const decorationProps = {
      animated,
      className: "absolute bottom-4 right-4 opacity-60",
    };

    switch (decoration) {
      case "pumpkin":
        return (
          <HalloweenGif
            src="/halloween/images/pumkin2.gif"
            size={resolvedSize}
            {...decorationProps}
            glow={glow}
          />
        );
      case "ghost":
        return (
          <HalloweenGif
            src="/halloween/images/ghost-spirits.gif"
            size={resolvedSize}
            glow={glow}
            {...decorationProps}
          />
        );
      case "bat":
        return (
          <HalloweenGif
            src="/halloween/images/sketing.gif"
            size="lg"
            glow={glow}
            {...decorationProps}
          />
        );
      default:
        return null;
    }
  };

  if (!mounted) {
    return (
      <Card
        className={cn(
          "relative overflow-hidden h-48 w-full flex flex-col",
          className
        )}
      >
        <CardHeader className="flex-shrink-0">
          <CardTitle
            className={cn(
              "text-xl font-bold",
              typeof title === "string" && "halloween-font-magnificent"
            )}
          >
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="halloween-font-spooky">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        {children && (
          <CardContent className="flex-1 flex flex-col justify-center">
            {children}
          </CardContent>
        )}
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden h-48 w-full flex flex-col",
        isHalloweenMode && "halloween-card",
        isHalloweenMode && animated && "halloween-float",
        isHalloweenMode && glow && "halloween-glow",
        className
      )}
    >
      {renderDecoration()}

      <CardHeader className="relative z-10 flex-shrink-0">
        <CardTitle
          className={cn(
            "text-xl font-bold",
            isHalloweenMode && "halloween-text-glow",
            isHalloweenMode &&
              typeof title === "string" &&
              "halloween-font-magnificent"
          )}
        >
          {title}
        </CardTitle>
        {description && (
          <CardDescription
            className={cn(
              isHalloweenMode ? "text-orange-200 halloween-font-spooky" : ""
            )}
          >
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {children && (
        <CardContent className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="halloween-card-content">{children}</div>
        </CardContent>
      )}

      {/* Halloween background pattern - only when theme is active */}
      {isHalloweenMode && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500 to-purple-500"></div>
          <div className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-8 right-4 w-1 h-1 bg-red-400 rounded-full"></div>
        </div>
      )}
    </Card>
  );
}
