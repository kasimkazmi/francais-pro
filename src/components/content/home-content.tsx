'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AudioButton } from '@/components/ui/audio-button';
import { LazyCardGrid } from '@/components/ui/lazy-card';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const modules = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Start your French journey with the basics',
    content: 'foundations'
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master French grammar fundamentals',
    content: 'grammar'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Expand your French vocabulary',
    content: 'vocabulary'
  },
  {
    id: 'practice',
    title: 'Practice',
    description: 'Apply what you\'ve learned',
    content: 'practice'
  }
];

export function HomeContent() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const currentModule = modules[currentModuleIndex];

  const goToPrevious = () => {
    setCurrentModuleIndex((prev) => (prev > 0 ? prev - 1 : modules.length - 1));
  };

  const goToNext = () => {
    setCurrentModuleIndex((prev) => (prev < modules.length - 1 ? prev + 1 : 0));
  };

  const renderModuleContent = () => {
    switch (currentModule.id) {
      case 'foundations':
        return (
          <>
            <p className="text-muted-foreground">
              Welcome to your French learning journey! This module covers the essential <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">French Basics</code> you need to get started.
            </p>

            <div className="my-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Tip</p>
                  <p className="text-sm text-muted-foreground">
                    Practice these basics daily for 15-20 minutes to build a strong foundation.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Essential Greetings</h2>
            <p className="text-muted-foreground mb-4">
              Start your French conversations with these common greetings:
            </p>

            <div className="my-6">
              <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" staggerDelay={100}>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Bonjour</h3>
                    <AudioButton 
                      text="Bonjour, Hello, Good morning" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Hello / Good morning</p>
                  <p className="text-xs text-muted-foreground mt-1">Pronunciation: bon-ZHOOR</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Bonsoir</h3>
                    <AudioButton 
                      text="Bonsoir, Good evening" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Good evening</p>
                  <p className="text-xs text-muted-foreground mt-1">Pronunciation: bon-SWAHR</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Au revoir</h3>
                    <AudioButton 
                      text="Au revoir, Goodbye" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Goodbye</p>
                  <p className="text-xs text-muted-foreground mt-1">Pronunciation: oh ruh-VWAHR</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Merci</h3>
                    <AudioButton 
                      text="Merci, Thank you" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Thank you</p>
                  <p className="text-xs text-muted-foreground mt-1">Pronunciation: mer-SEE</p>
                </div>
              </LazyCardGrid>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Basic Numbers</h2>
            <p className="text-muted-foreground mb-4">
              Learn these essential numbers to start counting in French:
            </p>

            <div className="relative my-6">
              <LazyCardGrid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3" staggerDelay={50}>
                <div className="universal-card p-3 rounded-lg text-center">
                  <div className="font-bold text-lg">1</div>
                  <div className="text-sm text-muted-foreground">un</div>
                  <AudioButton text="un, one" size="sm" className="mt-2" />
                </div>
                <div className="universal-card p-3 rounded-lg text-center">
                  <div className="font-bold text-lg">2</div>
                  <div className="text-sm text-muted-foreground">deux</div>
                  <AudioButton text="deux, two" size="sm" className="mt-2" />
                </div>
                <div className="universal-card p-3 rounded-lg text-center">
                  <div className="font-bold text-lg">3</div>
                  <div className="text-sm text-muted-foreground">trois</div>
                  <AudioButton text="trois, three" size="sm" className="mt-2" />
                </div>
                <div className="universal-card p-3 rounded-lg text-center">
                  <div className="font-bold text-lg">4</div>
                  <div className="text-sm text-muted-foreground">quatre</div>
                  <AudioButton text="quatre, four" size="sm" className="mt-2" />
                </div>
                <div className="universal-card p-3 rounded-lg text-center">
                  <div className="font-bold text-lg">5</div>
                  <div className="text-sm text-muted-foreground">cinq</div>
                  <AudioButton text="cinq, five" size="sm" className="mt-2" />
                </div>
              </LazyCardGrid>
            </div>
          </>
        );

      case 'grammar':
        return (
          <>
            <p className="text-muted-foreground">
              Master the fundamental grammar rules that form the backbone of French language structure.
            </p>

            <div className="my-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Grammar Tip</p>
                  <p className="text-sm text-muted-foreground">
                    French grammar follows specific patterns. Understanding these rules will make learning much easier.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Articles (le, la, les)</h2>
            <p className="text-muted-foreground mb-4">
              French articles are essential for proper sentence structure:
            </p>

            <div className="my-6">
              <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" staggerDelay={100}>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">le</h3>
                    <AudioButton 
                      text="le, the (masculine)" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">the (masculine)</p>
                  <p className="text-xs text-muted-foreground mt-1">le livre (the book)</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">la</h3>
                    <AudioButton 
                      text="la, the (feminine)" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">the (feminine)</p>
                  <p className="text-xs text-muted-foreground mt-1">la table (the table)</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">les</h3>
                    <AudioButton 
                      text="les, the (plural)" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">the (plural)</p>
                  <p className="text-xs text-muted-foreground mt-1">les livres (the books)</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">un/une</h3>
                    <AudioButton 
                      text="un une, a an" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">a/an</p>
                  <p className="text-xs text-muted-foreground mt-1">un chat (a cat)</p>
                </div>
              </LazyCardGrid>
            </div>
          </>
        );

      case 'vocabulary':
        return (
          <>
            <p className="text-muted-foreground">
              Expand your French vocabulary with essential words and phrases for everyday communication.
            </p>

            <div className="my-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium">Vocabulary Tip</p>
                  <p className="text-sm text-muted-foreground">
                    Learn vocabulary in context. Group related words together for better retention.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Food & Drinks</h2>
            <p className="text-muted-foreground mb-4">
              Essential vocabulary for dining and food:
            </p>

            <div className="my-6">
              <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" staggerDelay={100}>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">pain</h3>
                    <AudioButton 
                      text="pain, bread" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">bread</p>
                  <p className="text-xs text-muted-foreground mt-1">du pain (some bread)</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">eau</h3>
                    <AudioButton 
                      text="eau, water" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">water</p>
                  <p className="text-xs text-muted-foreground mt-1">de l&apos;eau (some water)</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">café</h3>
                    <AudioButton 
                      text="café, coffee" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">coffee</p>
                  <p className="text-xs text-muted-foreground mt-1">un café (a coffee)</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">fromage</h3>
                    <AudioButton 
                      text="fromage, cheese" 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">cheese</p>
                  <p className="text-xs text-muted-foreground mt-1">du fromage (some cheese)</p>
                </div>
              </LazyCardGrid>
            </div>
          </>
        );

      case 'practice':
        return (
          <>
            <p className="text-muted-foreground">
              Apply what you&apos;ve learned with interactive exercises and real-world practice scenarios.
            </p>

            <div className="my-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-sm font-medium">Practice Tip</p>
                  <p className="text-sm text-muted-foreground">
                    Regular practice is key to mastering French. Try to use what you learn in real conversations.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Practice Exercises</h2>
            <p className="text-muted-foreground mb-4">
              Choose your practice activity:
            </p>

            <div className="my-6">
              <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" staggerDelay={100}>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Speaking Practice</h3>
                    <AudioButton 
                      text="Speaking Practice" 
                      size="sm" 
                      tooltipContent="Practice pronunciation"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Improve your pronunciation</p>
                  <p className="text-xs text-muted-foreground mt-1">15-20 minutes daily</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Listening Exercises</h3>
                    <AudioButton 
                      text="Listening Exercises" 
                      size="sm" 
                      tooltipContent="Practice listening"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Train your ear</p>
                  <p className="text-xs text-muted-foreground mt-1">Audio comprehension</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Writing Prompts</h3>
                    <AudioButton 
                      text="Writing Prompts" 
                      size="sm" 
                      tooltipContent="Practice writing"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Express yourself in French</p>
                  <p className="text-xs text-muted-foreground mt-1">Guided writing practice</p>
                </div>
                <div className="universal-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Conversation Practice</h3>
                    <AudioButton 
                      text="Conversation Practice" 
                      size="sm" 
                      tooltipContent="Practice conversations"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Real-world scenarios</p>
                  <p className="text-xs text-muted-foreground mt-1">Interactive dialogues</p>
                </div>
              </LazyCardGrid>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{currentModule.title}</h1>
          <p className="text-muted-foreground mt-1">{currentModule.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="h-10 w-10 rounded-full hover:bg-muted transition-colors"
            title="Previous module"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="h-10 w-10 rounded-full hover:bg-muted transition-colors"
            title="Next module"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Module Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2">
          {modules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => setCurrentModuleIndex(index)}
              className={`h-2 w-8 rounded-full transition-all duration-200 ${
                index === currentModuleIndex
                  ? 'bg-blue-600'
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              title={module.title}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Module {currentModuleIndex + 1} of {modules.length}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {renderModuleContent()}

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Ready to Practice?</h3>
          <p className="text-muted-foreground mb-4">
            Test your knowledge with our interactive exercises and pronunciation practice.
          </p>
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Practice Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
