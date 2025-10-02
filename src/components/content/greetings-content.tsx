import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InteractiveGreetingList } from '@/components/greetings/interactive-greeting-card';
import { InteractiveIntroductionList } from '@/components/greetings/interactive-introduction-card';
import { ArrowRight } from 'lucide-react';
import { TipSection } from '@/components/ui/tip-section';
import greetingsData from '@/data/greetings.json';

export function GreetingsContent() {
  const { basicGreetings, politeExpressions, introductions, responses } = greetingsData;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">French Greetings</h1>
        <div className="flex items-center space-x-2">
        
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {/* Static Description */}
        <p className="text-muted-foreground">
          Master essential French greetings and polite expressions for everyday conversations.
        </p>

        <TipSection 
          title="Greeting Tip"
          content="French greetings vary by time of day and formality level. Choose the appropriate greeting for each situation."
        />

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
    </div>
  );
}
