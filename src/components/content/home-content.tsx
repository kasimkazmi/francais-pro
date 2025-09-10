import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AudioButton } from '@/components/ui/audio-button';
import { LazyCardGrid } from '@/components/ui/lazy-card';
import { ArrowRight } from 'lucide-react';

export function HomeContent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome</h1>
        <div className="flex items-center space-x-2">
          <Link href="/welcome">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Go to Welcome
            </Button>
          </Link>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Welcome to your French learning journey! This lesson covers the essential <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">French Basics</code> you need to get started.
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
