'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { AudioButton } from "@/components/ui/audio-button";
import { LazyCardGrid } from "@/components/ui/lazy-card";
import { CommunityChat } from "@/components/ui/community-chat";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isCommunityChatOpen, setIsCommunityChatOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Mobile: Hidden by default, Desktop: Always visible */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col gap-2 p-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 py-2 text-lg font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Learning Path</h2>
              <div className="space-y-1">
                <Link href="/learn" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Get Started
                </Link>
                <Link href="/vocabulary" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Vocabulary
                </Link>
                <Link href="/practice" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Practice
                </Link>
                <Link href="/progress" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Progress
                </Link>
              </div>
            </div>
            
            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Get Started</h3>
              <div className="space-y-1">
                <Link href="/welcome" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Welcome
                </Link>
                <Link href="/basics" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  French Basics
                </Link>
                <Link href="/pronunciation" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Pronunciation
                </Link>
                <Link href="/alphabet" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Alphabet
                </Link>
                <Link href="/numbers" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Numbers
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Advanced Lessons</h3>
              <div className="space-y-1">
                <Link href="/grammar" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Grammar
                </Link>
                <Link href="/vocabulary" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Vocabulary
                </Link>
                <Link href="/conversations" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Conversations
                </Link>
                <Link href="/greetings" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Greetings
                </Link>
                <Link href="/pronunciation" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Pronunciation
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Culture & Advanced</h3>
              <div className="space-y-1">
                <Link href="/culture" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  French Culture
                </Link>
                <Link href="/expressions" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Expressions & Idioms
              </Link>
                <Link href="/immigration" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Immigration to Canada
              </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold">French Basics</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  Start Lesson
                </Button>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
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
        </main>

        {/* Right Sidebar - Mobile: Hidden by default, Desktop: Always visible */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col gap-2 p-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Quick Access</h2>
              <div className="space-y-1">
                <Link href="/grammar" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Grammar Lessons
                </Link>
                <Link href="/vocabulary" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Vocabulary Builder
                </Link>
                <Link href="/conversations" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Conversation Practice
                </Link>
                <Link href="/pronunciation" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Pronunciation Guide
                </Link>
                <Link href="/alphabet" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  French Alphabet
                </Link>
                <Link href="/culture" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  French Culture
                </Link>
                <Link href="/expressions" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Expressions & Idioms
                </Link>
                <Link href="/immigration" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">
                  Immigration to Canada
                </Link>
              </div>
            </div>

            <div className="px-3 py-2 mt-8">
              <Card className="p-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-sm">Join Français Pro Community</CardTitle>
            </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-muted-foreground mb-3">
                    Connect with thousands of French learners worldwide. Practice together and accelerate your learning journey.
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200"
                    onClick={() => setIsCommunityChatOpen(true)}
                  >
                    Join Community
                  </Button>
                </CardContent>
          </Card>
        </div>

            <div className="px-3 py-2 mt-4">
              <Card className="p-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-sm">☕ Support This Project</CardTitle>
          </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-muted-foreground mb-3">
                    Enjoying Français Pro? Buy me a coffee to support the development and help keep this platform free for everyone.
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg active:bg-orange-700 active:scale-95 transition-all duration-200"
                    onClick={() => window.open('https://buymeacoffee.com/kasimdev07m', '_blank')}
                  >
                    ☕ Buy me a coffee
            </Button>
          </CardContent>
        </Card>
            </div>
          </div>
        </aside>
      </div>
      
      {/* Community Chat Modal */}
      <CommunityChat 
        isOpen={isCommunityChatOpen} 
        onClose={() => setIsCommunityChatOpen(false)} 
      />
    </div>
  );
}