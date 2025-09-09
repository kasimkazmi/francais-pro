'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommunityChat } from '@/components/ui/community-chat';
import { AuthModal } from '@/components/ui/auth-modal';
import { useAuth } from '@/contexts/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isCommunityChatOpen, setIsCommunityChatOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col gap-2 p-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 py-2 text-lg font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Learning Path</h2>
              <div className="space-y-1">
                <Link href="/learn" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Get Started</Link>
                <Link href="/vocabulary" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Vocabulary</Link>
                <Link href="/practice" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Practice</Link>
                {isAuthenticated ? (
                  <Link href="/progress" className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Learning Path</Link>
                ) : (
                  <button onClick={() => setShowAuthModal(true)} className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700 w-full text-left">Learning Path</button>
                )}
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">French Basics</h3>
              <div className="space-y-1">
                <Link href="/pronunciation" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Pronunciation</Link>
                <Link href="/alphabet" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Alphabet</Link>
                <Link href="/numbers" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Numbers</Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Advanced Lessons</h3>
              <div className="space-y-1">
                <Link href="/grammar" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Grammar</Link>
                <Link href="/vocabulary" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Vocabulary</Link>
                <Link href="/conversations" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Conversations</Link>
                <Link href="/greetings" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Greetings</Link>
                <Link href="/pronunciation" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Pronunciation</Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Culture & Advanced</h3>
              <div className="space-y-1">
                <Link href="/culture" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">French Culture</Link>
                <Link href="/expressions" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Expressions & Idioms</Link>
                <Link href="/immigration" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Immigration to Canada</Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Center content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col gap-2 p-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Quick Access</h2>
              <div className="space-y-1">
                <Link href="/grammar" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Grammar Lessons</Link>
                <Link href="/vocabulary" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Vocabulary Builder</Link>
                <Link href="/conversations" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Conversation Practice</Link>
                <Link href="/pronunciation" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Pronunciation Guide</Link>
                <Link href="/alphabet" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">French Alphabet</Link>
                <Link href="/culture" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">French Culture</Link>
                <Link href="/expressions" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Expressions & Idioms</Link>
                <Link href="/immigration" className="flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700">Immigration to Canada</Link>
              </div>
            </div>

            <div className="px-3 py-2 mt-8">
              <Card className="p-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-sm">Join Français Pro Community</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-muted-foreground mb-3">Connect with thousands of French learners worldwide. Practice together and accelerate your learning journey.</p>
                  <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={() => setIsCommunityChatOpen(true)}>Join Community</Button>
                </CardContent>
              </Card>
            </div>

            <div className="px-3 py-2">
              <Card className="p-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-sm">☕ Support This Project</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-muted-foreground mb-3">Enjoying Français Pro? Buy me a coffee to help keep this platform free.</p>
                  <Button size="sm" className="w-full bg-orange-500 text-white hover:bg-orange-600" onClick={() => window.open('https://buymeacoffee.com/kasimdev07m', '_blank')}>
                    ☕ Buy me a coffee
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>
      </div>

      <CommunityChat isOpen={isCommunityChatOpen} onClose={() => setIsCommunityChatOpen(false)} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}


