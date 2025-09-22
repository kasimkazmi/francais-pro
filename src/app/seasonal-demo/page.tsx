"use client";

import React from "react";
import { SeasonalCard } from "@/components/seasonal/seasonal-card";
import { SeasonalThemeToggle } from "@/components/seasonal/seasonal-theme-toggle";
import { SeasonalWelcome } from "@/components/seasonal/seasonal-welcome";
import {
  SeasonalThemeProvider,
  useSeasonalTheme,
} from "@/contexts/SeasonalThemeContext";
import { Button } from "@/components/ui/button";

function SeasonalDemoInner() {
  const {
    currentTheme,
    themeConfig,
    setCurrentTheme,
    availableThemes,
    isActive,
  } = useSeasonalTheme();
  return (
    <div className="min-h-screen seasonal-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <SeasonalWelcome />

          {/* Theme Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <SeasonalThemeToggle />
            <div className="flex gap-2">
              {availableThemes.map((theme) => (
                <Button
                  key={theme}
                  onClick={() => setCurrentTheme(theme)}
                  variant={currentTheme === theme ? "default" : "outline"}
                  className="text-sm"
                >
                  {theme === "halloween" && "🎃"}
                  {theme === "christmas" && "🎄"}
                  {theme === "spring" && "🌸"}
                  {theme === "summer" && "☀️"}
                  {theme === "autumn" && "🍂"}
                  {theme === "default" && "🎨"}
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Info */}
        <SeasonalCard
          title="Current Theme Information"
          description={`Active theme: ${themeConfig.displayName}`}
          className="mb-8"
        >
          <div className="space-y-4">
            <div>
              <h3 className="seasonal-heading-3 mb-2">Fonts</h3>
              <p className="seasonal-text-secondary">
                <strong>Primary:</strong> {themeConfig.fonts.primary}
              </p>
              <p className="seasonal-text-secondary">
                <strong>Secondary:</strong> {themeConfig.fonts.secondary}
              </p>
            </div>

            <div>
              <h3 className="seasonal-heading-3 mb-2">Colors</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: themeConfig.colors.primary }}
                  ></div>
                  <span className="seasonal-text-secondary">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: themeConfig.colors.secondary }}
                  ></div>
                  <span className="seasonal-text-secondary">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: themeConfig.colors.accent }}
                  ></div>
                  <span className="seasonal-text-secondary">Accent</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="seasonal-heading-3 mb-2">Features</h3>
              <p className="seasonal-text-secondary">
                <strong>Decorations:</strong>{" "}
                {themeConfig.decorations.enabled ? "Enabled" : "Disabled"}
              </p>
              <p className="seasonal-text-secondary">
                <strong>Music:</strong>{" "}
                {themeConfig.music.enabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
        </SeasonalCard>

        {/* Typography Demo */}
        <SeasonalCard
          title="Typography Showcase"
          description="See how different heading levels look with the current theme"
          className="mb-8"
        >
          <div className="space-y-4">
            <h1 className="seasonal-heading-1">Heading 1 - Main Title</h1>
            <h2 className="seasonal-heading-2">Heading 2 - Section Title</h2>
            <h3 className="seasonal-heading-3">Heading 3 - Subsection</h3>
            <h4 className="seasonal-heading-4">Heading 4 - Minor Heading</h4>
            <h5 className="seasonal-heading-5">Heading 5 - Small Heading</h5>
            <h6 className="seasonal-heading-6">Heading 6 - Smallest Heading</h6>

            <div className="mt-6">
              <p className="seasonal-text-secondary text-lg">
                This is how body text looks with the current theme&apos;s
                secondary font.
              </p>
              <p className="seasonal-text-secondary">
                Regular paragraph text using the theme&apos;s secondary font
                family.
              </p>
            </div>
          </div>
        </SeasonalCard>

        {/* French Learning Demo */}
        <SeasonalCard
          title="French Learning Content"
          description="Example French learning content with themed styling"
          className="mb-8"
          decoration={isActive ? "pumpkin" : undefined}
        >
          <div className="space-y-4">
            <h1 className="seasonal-heading-1">Leçon 1: Les Salutations</h1>
            <p className="seasonal-text-secondary">
              Apprenez les salutations de base en français.
            </p>

            <h2 className="seasonal-heading-2">Salutations Formelles</h2>
            <ul className="seasonal-text-secondary space-y-2">
              <li>• Bonjour (Good morning/Hello)</li>
              <li>• Bonsoir (Good evening)</li>
              <li>• Bonne nuit (Good night)</li>
            </ul>

            <h3 className="seasonal-heading-3">Salutations Informelles</h3>
            <ul className="seasonal-text-secondary space-y-2">
              <li>• Salut (Hi)</li>
              <li>• Coucou (Hey)</li>
              <li>• À bientôt (See you soon)</li>
            </ul>
          </div>
        </SeasonalCard>

        {/* Halloween Integration Demo */}
        {currentTheme === "halloween" && (
          <SeasonalCard
            title="Halloween Integration"
            description="This shows how existing Halloween components work with the new system"
            className="mb-8"
            decoration="ghost"
          >
            <div className="space-y-4">
              <h2 className="seasonal-heading-2">Spooky French Vocabulary</h2>
              <p className="seasonal-text-secondary">
                Learn Halloween-themed French words with the spooky theme
                active!
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="seasonal-heading-3">Creatures</h3>
                  <ul className="seasonal-text-secondary space-y-1">
                    <li>• Fantôme (Ghost)</li>
                    <li>• Sorcière (Witch)</li>
                    <li>• Vampire (Vampire)</li>
                    <li>• Loup-garou (Werewolf)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="seasonal-heading-3">Objects</h3>
                  <ul className="seasonal-text-secondary space-y-1">
                    <li>• Citrouille (Pumpkin)</li>
                    <li>• Chapeau (Hat)</li>
                    <li>• Balai (Broom)</li>
                    <li>• Toile d&apos;araignée (Spider web)</li>
                  </ul>
                </div>
              </div>
            </div>
          </SeasonalCard>
        )}

        {/* Theme Features */}
        <SeasonalCard
          title="Unified Theme System"
          description="What makes this seasonal theme system special"
        >
          <div className="space-y-4">
            <h2 className="seasonal-heading-2">Seamless Integration</h2>
            <p className="seasonal-text-secondary">
              This system integrates perfectly with your existing Halloween
              components and styles.
            </p>

            <h2 className="seasonal-heading-2">Easy Management</h2>
            <p className="seasonal-text-secondary">
              One provider manages all seasonal themes, making it easy to add
              new seasons.
            </p>

            <h2 className="seasonal-heading-2">Consistent Typography</h2>
            <p className="seasonal-text-secondary">
              All headings automatically use the theme&apos;s primary font,
              descriptions use secondary font.
            </p>
          </div>
        </SeasonalCard>
      </div>
    </div>
  );
}

export default function SeasonalDemoPage() {
  // Ensure context is available even if this page renders outside root layout for any reason
  return (
    <SeasonalThemeProvider>
      <SeasonalDemoInner />
    </SeasonalThemeProvider>
  );
}
