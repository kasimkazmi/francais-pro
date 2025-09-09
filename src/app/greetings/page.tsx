import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/layout/app-shell';
import { AudioButton } from '@/components/ui/audio-button';
import { ArrowRight, Volume2 } from 'lucide-react';
import greetingsData from '@/data/greetings.json';

export default function GreetingsPage() {
  const { basicGreetings, politeExpressions, introductions, responses } = greetingsData;

  return (
    <AppShell>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">French Greetings</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Practice Mode
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Master essential French greetings and polite expressions for everyday conversations.
          </p>

          <div className="my-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-2">
              <Volume2 className="mt-0.5 h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Greeting Tip</p>
                <p className="text-sm text-muted-foreground">
                  French greetings vary by time of day and formality level. Choose the appropriate greeting for each situation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Basic Greetings</h2>
          <p className="text-muted-foreground mb-6">
            Start your conversations with these essential greetings:
          </p>

          <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {basicGreetings.map((greeting, index) => (
                <Card key={index} className="universal-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{greeting.french}</h3>
                      <AudioButton 
                        text={`${greeting.french}, ${greeting.english}`}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{greeting.english}</p>
                    <p className="text-xs text-muted-foreground mb-2">Pronunciation: {greeting.pronunciation}</p>
                    <p className="text-xs text-muted-foreground italic">{greeting.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Polite Expressions</h2>
          <p className="text-muted-foreground mb-6">
            Essential polite expressions for courteous conversations:
          </p>

          <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {politeExpressions.map((expression, index) => (
                <Card key={index} className="universal-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{expression.french}</h3>
                      <AudioButton 
                        text={`${expression.french}, ${expression.english}`}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{expression.english}</p>
                    <p className="text-xs text-muted-foreground mb-2">Pronunciation: {expression.pronunciation}</p>
                    <p className="text-xs text-muted-foreground italic">{expression.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Introductions</h2>
          <p className="text-muted-foreground mb-6">
            Learn how to introduce yourself and ask about others:
          </p>

          <div className="my-6">
            <div className="space-y-4">
              {introductions.map((intro, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg universal-card">
                  <Badge variant="secondary" className="mr-4">{index + 1}</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold">{intro.french}</h3>
                    <p className="text-sm text-muted-foreground">{intro.english}</p>
                    <p className="text-xs text-muted-foreground mt-1">Pronunciation: {intro.pronunciation}</p>
                    <p className="text-xs text-muted-foreground italic mt-1">{intro.usage}</p>
                  </div>
                  <AudioButton 
                    text={`${intro.french}, ${intro.english}`}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Common Responses</h2>
          <p className="text-muted-foreground mb-6">
            How to respond when someone asks how you are:
          </p>

          <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {responses.map((response, index) => (
                <Card key={index} className="universal-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{response.french}</h3>
                      <AudioButton 
                        text={`${response.french}, ${response.english}`}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{response.english}</p>
                    <p className="text-xs text-muted-foreground mb-2">Pronunciation: {response.pronunciation}</p>
                    <p className="text-xs text-muted-foreground italic">{response.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

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
    </AppShell>
  );
}
