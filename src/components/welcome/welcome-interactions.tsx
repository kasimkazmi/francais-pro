"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthModal } from "@/components/ui/auth-modal";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeAwareButton } from "@/components/seasonal/theme-aware-button";
import { ThemeAwareIcon } from "@/components/seasonal/theme-aware-icon";
import {
  BookOpen,
  Users,
  Trophy,
  ArrowRight,
  Play,
  Target,
  Globe,
} from "lucide-react";
import { SeasonalCard } from "../seasonal/seasonal-card";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";

interface WelcomeInteractionsProps {
  features: Array<{
    icon: string;
    title: string;
    description: string;
    href: string;
  }>;
}

export function WelcomeInteractions({ features }: WelcomeInteractionsProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isActive } = useSeasonalTheme();

  const gate = () => (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      {/* Interactive CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/home" onClick={gate()}>
          <ThemeAwareButton
            size="lg"
            className="hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            Start Learning Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </ThemeAwareButton>
        </Link>
        <Link href="/home" >
          <ThemeAwareButton
            variant="outline"
            size="lg"
            className="hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Lessons
          </ThemeAwareButton>
        </Link>
      </div>

      {/* Interactive Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 justify-items-center">
        {features.map((feature, index) => (
          <Link key={index} href={feature.href} onClick={gate()}>
            <SeasonalCard
              title={
                <div className="flex items-center space-x-2">
                  {!isActive && feature.icon === "BookOpen" && (
                    <ThemeAwareIcon size="lg">
                      <BookOpen />
                    </ThemeAwareIcon>
                  )}
                  {!isActive && feature.icon === "Users" && (
                    <ThemeAwareIcon size="lg">
                      <Users />
                    </ThemeAwareIcon>
                  )}
                  {!isActive && feature.icon === "Trophy" && (
                    <ThemeAwareIcon size="lg">
                      <Trophy />
                    </ThemeAwareIcon>
                  )}
                  {!isActive && feature.icon === "Play" && (
                    <ThemeAwareIcon size="lg">
                      <Play />
                    </ThemeAwareIcon>
                  )}
                  {!isActive && feature.icon === "Target" && (
                    <ThemeAwareIcon size="lg">
                      <Target />
                    </ThemeAwareIcon>
                  )}
                  {!isActive && feature.icon === "Globe" && (
                    <ThemeAwareIcon size="lg">
                      <Globe />
                    </ThemeAwareIcon>
                  )}
                  <span>{feature.title}</span>
                </div>
              }
              description={feature.description}
              decoration="pumpkin"
              glow={true}
              animated={true}
              titleClassName={` ${
                isActive
                  ? "leading-widest tracking-widest text-md"
                  : "text-lg font-bold tracking-wide "
              }`}
              descriptionClassName={` ${
                isActive
                  ? "text-lg leading-widest tracking-widest"
                  : "text-sm mt-2 leading-widest text-muted-foreground  "
              }`}
              className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer h-48 w-full max-w-80 flex flex-col justify-center items-center text-center"
            />
          </Link>
        ))}
      </div>

      {/* Stats are now handled by DynamicStats component */}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
