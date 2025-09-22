'use client';

import React, { useState } from 'react';
import { HalloweenDecorations } from '@/components/halloween/halloween-decorations';
import { HalloweenCard } from '@/components/halloween/halloween-card';
import { HalloweenPumpkin, HalloweenGhost, HalloweenBat, HalloweenSpider, HalloweenWitchHat, HalloweenLoader, HalloweenPageWrapper, HalloweenTeaBat, HalloweenGif, HalloweenMusicManager } from '@/components/halloween';
import { SafeSeasonalThemeToggle } from '@/components/seasonal/safe-seasonal-theme-toggle';
import { HalloweenListCard } from '@/components/halloween/halloween-list-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HalloweenDemoPage() {
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [showDecorations, setShowDecorations] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [loaderDuration, setLoaderDuration] = useState(3000);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HalloweenDecorations intensity={intensity} className="min-h-screen  ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold halloween-text-glow halloween-font-magnificent-title mb-4">
            🎃 Halloween Theme Demo 🎃
          </h1>
          <p className="text-xl halloween-text halloween-font-spooky-large mb-6">
            Spooky French Learning Components
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <SafeSeasonalThemeToggle />
            <Button
              onClick={() => setIntensity('low')}
              variant={intensity === 'low' ? 'default' : 'outline'}
              className={intensity === 'low' ? 'halloween-button' : ''}
            >
              Low Intensity
            </Button>
            <Button
              onClick={() => setIntensity('medium')}
              variant={intensity === 'medium' ? 'default' : 'outline'}
              className={intensity === 'medium' ? 'halloween-button' : ''}
            >
              Medium Intensity
            </Button>
            <Button
              onClick={() => setIntensity('high')}
              variant={intensity === 'high' ? 'default' : 'outline'}
              className={intensity === 'high' ? 'halloween-button' : ''}
            >
              High Intensity
            </Button>
            <Button
              onClick={() => setShowDecorations(!showDecorations)}
              variant={showDecorations ? 'default' : 'outline'}
              className={showDecorations ? 'halloween-button' : ''}
            >
              {showDecorations ? 'Hide' : 'Show'} Decorations
            </Button>
          </div>
        </div>

        {/* Individual Components Showcase */}
        {/* Halloween Font Test - Always Visible */}
        <div className="mb-12 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🔤 Font Test (Always Visible)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="text-lg font-bold mb-2">Magnificent Nightmare Test:</h3>
              <p className="halloween-font-magnificent text-lg">This should show Magnificent Nightmare font</p>
              <p className="halloween-font-magnificent-large text-center">Large Magnificent Text</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="text-lg font-bold mb-2">Spooky Monster Test:</h3>
              <p className="halloween-font-spooky text-lg">This should show Spooky Monster font</p>
              <p className="halloween-font-spooky-large text-center">Large Spooky Text</p>
            </div>
          </div>
          <div className="mt-4 p-4   rounded">
            <p className="text-sm">
              <strong>✅ Font Status:</strong> Halloween fonts are now working correctly! 
              The custom TTF fonts are loading and displaying as expected.
            </p>
          </div>
        </div>

        {/* Halloween Font Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow halloween-font-magnificent-title mb-6 text-center">
            🔤 Halloween Fonts
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="halloween-card p-6">
              <CardHeader>
                <CardTitle className="halloween-font-magnificent-title text-center">
                  Magnificent Nightmare
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="halloween-font-magnificent text-lg">
                  This is the Magnificent Nightmare font - perfect for spooky titles and headers!
                </p>
                <p className="halloween-font-magnificent-large text-center">
                  Large Spooky Text
                </p>
                <p className="halloween-font-magnificent text-center">
                  Regular Spooky Text
                </p>
              </CardContent>
            </Card>

            <Card className="halloween-card p-6">
              <CardHeader>
                <CardTitle className="halloween-font-spooky-title text-center">
                  Spooky Monster
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="halloween-font-spooky text-lg">
                  This is the Spooky Monster font - great for descriptions and body text!
                </p>
                <p className="halloween-font-spooky-large text-center">
                  Large Monster Text
                </p>
                <p className="halloween-font-spooky text-center">
                  Regular Monster Text
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow halloween-font-magnificent-title mb-6 text-center">
            Individual Halloween Components
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {/* Pumpkin */}
            <Card className="halloween-card text-center p-4">
              <CardHeader>
                <CardTitle className="text-lg">Pumpkin</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <HalloweenPumpkin size="lg" glow={true} />
              </CardContent>
            </Card>

            {/* Ghost */}
            <Card className="halloween-card text-center p-4">
              <CardHeader>
                <CardTitle className="text-lg">Ghost</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <HalloweenGhost size="lg" />
              </CardContent>
            </Card>

            {/* Bat */}
            <Card className="halloween-card text-center p-4">
              <CardHeader>
                <CardTitle className="text-lg">Bat</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <HalloweenBat size="lg" />
              </CardContent>
            </Card>

            {/* Spider */}
            <Card className="halloween-card text-center p-4">
              <CardHeader>
                <CardTitle className="text-lg">Spider</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <HalloweenSpider size="lg" color="black" />
              </CardContent>
            </Card>

            {/* Witch Hat */}
            <Card className="halloween-card text-center p-4">
              <CardHeader>
                <CardTitle className="text-lg">Witch Hat</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <HalloweenWitchHat size="lg" color="black" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Professional SVG Components (mirroring halloween-test) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold halloween-text mb-6 text-center">Professional SVG Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Pumpkin</h3>
              <div className="flex justify-center space-x-4">
                <HalloweenPumpkin size="sm" color="orange" animated={true} glow={true} />
                <HalloweenPumpkin size="md" color="white" animated={true} glow={true} />
                <HalloweenPumpkin size="lg" color="green" animated={true} glow={true} />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Ghost</h3>
              <div className="flex justify-center space-x-4">
                <HalloweenGhost size="sm" animated={true} />
                <HalloweenGhost size="md" animated={true} />
                <HalloweenGhost size="lg" animated={true} />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Bat</h3>
              <div className="flex justify-center space-x-4">
                <HalloweenBat size="sm" color="black" animated={true} />
                <HalloweenBat size="md" color="brown" animated={true} />
                <HalloweenBat size="lg" color="gray" animated={true} />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Witch Hat</h3>
              <div className="flex justify-center space-x-4">
                <HalloweenWitchHat size="sm" color="black" animated={true} />
                <HalloweenWitchHat size="md" color="purple" animated={true} />
                <HalloweenWitchHat size="lg" color="green" animated={true} />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Spider</h3>
              <div className="flex justify-center space-x-4">
                <HalloweenSpider size="sm" color="black" animated={true} />
                <HalloweenSpider size="md" color="brown" animated={true} />
                <HalloweenSpider size="lg" color="black" animated={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Loader & Page Wrapper Demo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow halloween-font-magnificent-title mb-6 text-center">Loader & Wrapper</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Button onClick={() => setShowLoader(true)} className="halloween-button">Show Loader</Button>
            <Button onClick={() => setMusicOn((v) => !v)} variant={musicOn ? 'default' : 'outline'} className={musicOn ? 'halloween-button' : ''}>
              {musicOn ? 'Stop Music' : 'Play Music'}
            </Button>
          </div>
          {showLoader && (
            <HalloweenLoader isLoading={true} duration={3000} onComplete={() => setShowLoader(false)} />
          )}
          <div className="mt-6">
            <HalloweenPageWrapper>
              <div className="p-6 text-center">
                <p className="halloween-font-spooky">Content inside HalloweenPageWrapper</p>
              </div>
            </HalloweenPageWrapper>
          </div>
          {musicOn && <HalloweenMusicManager volume={0.4} loop={true} />}
        </div>

        {/* GIF Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow halloween-font-magnificent-title mb-6 text-center">GIF Gallery</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <HalloweenTeaBat size="xl" glow />
            <HalloweenGif src="/halloween/images/ghost-spirits.gif" size="xl" />
            <HalloweenGif src="/halloween/images/pumkin2.gif" size="xl" />
            <HalloweenGif src="/halloween/images/catbat.gif" size="xl" />
          </div>
        </div>

        {/* Loader Testing Controls (from halloween-test) */}
        <div className="mb-12">
          <HalloweenCard 
            title="Loader Testing"
            description="Control the Halloween loader duration and test it"
            decoration="pumpkin" 
            glow={true} 
            animated={true}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-orange-300 mb-4">🎃 Loader Testing Controls</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-orange-200 mb-2">Loader Duration (milliseconds):</label>
                <input
                  type="range"
                  min={2000}
                  max={30000}
                  step={1000}
                  value={loaderDuration}
                  onChange={(e) => setLoaderDuration(Number((e.target as HTMLInputElement).value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-orange-300 font-bold">{loaderDuration / 1000} seconds</div>
              </div>
              <button
                onClick={() => { setIsLoading(true); setShowLoader(true); }}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Test Loader'}
              </button>
            </div>
          </HalloweenCard>
        </div>

        {/* Instructions List Card */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold halloween-text">Theme Toggle Test</h2>
          <HalloweenListCard
            title="Instructions"
            description="Follow these steps to test the Halloween theme"
            items={[
              { id: '1', text: 'Click the Halloween toggle button in the header' },
              { id: '2', text: 'Observe that all cards get Halloween styling (borders, colors, animations)' },
              { id: '3', text: 'Notice that text with "halloween-text" classes changes color' },
              { id: '4', text: 'See that floating decorations appear in the background' },
              { id: '5', text: 'Toggle off to see everything return to normal styling' }
            ]}
            decoration="pumpkin"
            listStyle="instructions"
            glow={true}
            animated={true}
          />
        </div>

        {/* Halloween List Cards Showcase */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold halloween-text">Halloween List Card Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HalloweenListCard
              title="Learning Progress"
              description="Track your French learning journey"
              items={[
                { id: '1', text: 'Complete basic vocabulary', completed: true },
                { id: '2', text: 'Master pronunciation', completed: true },
                { id: '3', text: 'Learn grammar rules', completed: false, highlight: true },
                { id: '4', text: 'Practice conversations', completed: false },
                { id: '5', text: 'Take proficiency test', completed: false },
              ]}
              decoration="pumpkin"
              listStyle="spooky"
              showCheckmarks={true}
              glow={true}
              animated={true}
            />
            <HalloweenListCard
              title="Halloween Features"
              description="Spooky functionality implemented"
              items={[
                { id: '1', text: 'Spooky loading animations', completed: true },
                { id: '2', text: 'Floating Halloween decorations', completed: true },
                { id: '3', text: 'Theme toggle functionality', completed: true },
                { id: '4', text: 'Halloween-themed cards', completed: true },
                { id: '5', text: 'Magical particle effects', completed: false },
              ]}
              decoration="ghost"
              listStyle="numbers"
              showCheckmarks={true}
              glow={true}
              animated={true}
            />
          </div>
        </div>

        {/* Halloween Cards Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow mb-6 text-center">
            Halloween Themed Cards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HalloweenCard
              title="French Vocabulary"
              description="Learn spooky French words"
              decoration="pumpkin"
              glow={true}
            >
              <div className="space-y-2">
                <p className="text-orange-200">• Chat noir (Black cat)</p>
                <p className="text-orange-200">• Sorcière (Witch)</p>
                <p className="text-orange-200">• Fantôme (Ghost)</p>
                <p className="text-orange-200">• Citrouille (Pumpkin)</p>
              </div>
            </HalloweenCard>

            <HalloweenCard
              title="Halloween Expressions"
              description="Spooky French phrases"
              decoration="ghost"
            >
              <div className="space-y-2">
                <p className="text-orange-200">• "Joyeux Halloween!"</p>
                <p className="text-orange-200">• "Des bonbons ou un sort!"</p>
                <p className="text-orange-200">• "Boo!" (same in French)</p>
                <p className="text-orange-200">• "C'est effrayant!"</p>
              </div>
            </HalloweenCard>

            <HalloweenCard
              title="French Grammar"
              description="Learn with spooky examples"
              decoration="bat"
            >
              <div className="space-y-2">
                <p className="text-orange-200">• Le chat noir (masculine)</p>
                <p className="text-orange-200">• La sorcière (feminine)</p>
                <p className="text-orange-200">• Les fantômes (plural)</p>
                <p className="text-orange-200">• Une citrouille (indefinite)</p>
              </div>
            </HalloweenCard>
          </div>
        </div>

        {/* Heading Font Demo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow halloween-font-magnificent-title mb-6 text-center">
            📝 Heading Font Demo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HalloweenCard
              title="French Learning Guide"
              description="Complete guide with headings"
              decoration="pumpkin"
              glow={true}
            >
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-orange-300">Chapter 1: Basics</h1>
                <p className="text-orange-200">Learn the fundamental concepts of French language.</p>
                
                <h2 className="text-xl font-bold text-orange-300">1.1 Alphabet</h2>
                <p className="text-orange-200">Master the French alphabet pronunciation.</p>
                
                <h3 className="text-lg font-bold text-orange-300">1.1.1 Vowels</h3>
                <p className="text-orange-200">Focus on vowel sounds: a, e, i, o, u.</p>
                
                <h4 className="text-base font-bold text-orange-300">Special Characters</h4>
                <p className="text-orange-200">Learn about accents: é, è, ê, ç.</p>
              </div>
            </HalloweenCard>

            <HalloweenCard
              title="Halloween Vocabulary"
              description="Spooky words with proper headings"
              decoration="ghost"
              glow={true}
            >
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-orange-300">Halloween Creatures</h1>
                <p className="text-orange-200">Essential Halloween vocabulary in French.</p>
                
                <h2 className="text-xl font-bold text-orange-300">Monsters</h2>
                <p className="text-orange-200">Learn about scary creatures.</p>
                
                <h3 className="text-lg font-bold text-orange-300">Classic Monsters</h3>
                <p className="text-orange-200">Vampire, werewolf, zombie vocabulary.</p>
                
                <h4 className="text-base font-bold text-orange-300">Modern Creatures</h4>
                <p className="text-orange-200">Contemporary Halloween characters.</p>
              </div>
            </HalloweenCard>
          </div>
        </div>

        {/* Animation Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow halloween-font-magnificent-title mb-6 text-center">
            Animation Showcase
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="halloween-card">
              <CardHeader>
                <CardTitle className="halloween-text-glow">Floating Animations</CardTitle>
                <CardDescription className="text-orange-200">
                  Watch these components float and glow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around items-center h-32">
                  <HalloweenPumpkin size="lg" animated={true} glow={true} />
                  <HalloweenGhost size="lg" animated={true} />
                  <HalloweenWitchHat size="lg" animated={true} color="purple" />
                </div>
              </CardContent>
            </Card>

            <Card className="halloween-card">
              <CardHeader>
                <CardTitle className="halloween-text-glow">Flying Animations</CardTitle>
                <CardDescription className="text-orange-200">
                  Watch bats and spiders move across the screen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-32 overflow-hidden">
                  <HalloweenBat size="md" animated={true} flying={true} />
                  <HalloweenSpider size="md" animated={true} crawling={true} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Size Variations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow mb-6 text-center">
            Size Variations
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Card key={size} className="halloween-card text-center p-4">
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{size}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <HalloweenPumpkin size={size} animated={true} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* French Learning Integration */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold halloween-text-glow mb-6 text-center">
            French Learning Integration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HalloweenCard
              title="🎃 Vocabulaire d'Halloween"
              description="Apprenez le vocabulaire français d'Halloween"
              decoration="pumpkin"
              glow={true}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-orange-900/30 rounded">
                  <span className="text-orange-200">Citrouille</span>
                  <span className="text-orange-400 font-bold">Pumpkin</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-900/30 rounded">
                  <span className="text-orange-200">Fantôme</span>
                  <span className="text-orange-400 font-bold">Ghost</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-900/30 rounded">
                  <span className="text-orange-200">Sorcière</span>
                  <span className="text-orange-400 font-bold">Witch</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-900/30 rounded">
                  <span className="text-orange-200">Chauve-souris</span>
                  <span className="text-orange-400 font-bold">Bat</span>
                </div>
              </div>
            </HalloweenCard>

            <HalloweenCard
              title="👻 Expressions Effrayantes"
              description="Phrases françaises pour Halloween"
              decoration="ghost"
            >
              <div className="space-y-3">
                <div className="p-3 bg-purple-900/30 rounded">
                  <p className="text-orange-200 font-bold">"Joyeux Halloween!"</p>
                  <p className="text-orange-400 text-sm">Happy Halloween!</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded">
                  <p className="text-orange-200 font-bold">&quot;Des bonbons ou un sort!"</p>
                  <p className="text-orange-400 text-sm">Trick or treat!</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded">
                  <p className="text-orange-200 font-bold">"C'est effrayant!"</p>
                  <p className="text-orange-400 text-sm">It's scary!</p>
                </div>
              </div>
            </HalloweenCard>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-orange-300 mb-4">
            🎃 Happy Halloween! Use the Halloween theme toggle in the header to enable/disable the spooky effects! 👻
          </p>
          <Button
            onClick={() => window.history.back()}
            className="halloween-button"
          >
            ← Back to Learning
          </Button>
        </div>
      </div>
    </HalloweenDecorations>
  );
}
