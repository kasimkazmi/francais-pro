import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Card components removed as they're not used in this file
import { Header } from '@/components/layout/header';
import { InteractiveGreetingList } from '@/components/greetings/interactive-greeting-card';
import { InteractiveIntroductionList } from '@/components/greetings/interactive-introduction-card';
import { ArrowRight } from 'lucide-react';
import { AudioButton } from '@/components/ui/audio-button';
import greetingsData from '@/data/greetings.json';

export default function GreetingsPage() {
  const { basicGreetings, politeExpressions, introductions, responses } = greetingsData;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Static Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">French Greetings</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Practice Mode
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {/* Static Description */}
          <p className="text-muted-foreground">
            Master essential French greetings and polite expressions for everyday conversations.
          </p>

          {/* Interactive Tip */}
          <div className="my-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-2">
              <AudioButton 
                text="French greetings vary by time of day and formality level. Choose the appropriate greeting for each situation."
                size="sm"
                variant="ghost"
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-medium">Greeting Tip</p>
                <p className="text-sm text-muted-foreground">
                  French greetings vary by time of day and formality level. Choose the appropriate greeting for each situation.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Greetings Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Basic Greetings</h2>
          <p className="text-muted-foreground mb-6">
            Start your conversations with these essential greetings:
          </p>

          <div className="my-6">
            <InteractiveGreetingList greetings={basicGreetings} />
          </div>

          {/* Polite Expressions Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Polite Expressions</h2>
          <p className="text-muted-foreground mb-6">
            Essential polite expressions for courteous conversations:
          </p>

          <div className="my-6">
            <InteractiveGreetingList greetings={politeExpressions} />
          </div>

          {/* Introductions Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Introductions</h2>
          <p className="text-muted-foreground mb-6">
            Learn how to introduce yourself and ask about others:
          </p>

          <div className="my-6">
            <InteractiveIntroductionList introductions={introductions} />
          </div>

          {/* Common Responses Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Common Responses</h2>
          <p className="text-muted-foreground mb-6">
            How to respond when someone asks how you are:
          </p>

          <div className="my-6">
            <InteractiveGreetingList greetings={responses} />
          </div>

          {/* Static Practice CTA */}
          <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Practice Your Greetings</h3>
            <p className="text-muted-foreground mb-4">
              Test your knowledge with our interactive greeting exercises and conversation practice.
            </p>
            <Link href="/practice">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                Start Greeting Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}