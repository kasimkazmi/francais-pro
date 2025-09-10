'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { CommunityChat } from '@/components/ui/community-chat';
import { AuthModal } from '@/components/ui/auth-modal';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isCommunityChatOpen, setIsCommunityChatOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Helper function to check if a route is active
  const isActiveRoute = (route: string) => {
    if (route === '/' && pathname === '/') return true;
    if (route !== '/' && pathname.startsWith(route)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:bg-background lg:border-r lg:border-border scrollbar-hide">
          <div className="flex flex-col gap-2 p-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 py-2 text-lg font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Learning Path</h2>
              <div className="space-y-1">
                <Link href="/learn" className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/learn') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Get Started
                </Link>
                <Link href="/vocabulary" className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/vocabulary') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Vocabulary
                </Link>
                <Link href="/practice" className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/practice') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Practice
                </Link>
                {isAuthenticated ? (
                  <Link href="/progress" className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                    isActiveRoute('/progress') 
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                      : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                  }`}>
                    Learning Path
                  </Link>
                ) : (
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-sm active:bg-gray-200 active:scale-95 dark:active:bg-gray-700 w-full text-left"
                  >
                    Learning Path
                  </button>
                )}
              </div>
            </div>
            
            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">French Basics</h3>
              <div className="space-y-1">
                <Link href="/pronunciation" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/pronunciation') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Pronunciation
                </Link>
                <Link href="/alphabet" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/alphabet') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Alphabet
                </Link>
                <Link href="/numbers" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/numbers') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Numbers
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Advanced Lessons</h3>
              <div className="space-y-1">
                <Link href="/grammar" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/grammar') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Grammar
                </Link>
                <Link href="/conversations" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/conversations') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Conversations
                </Link>
                <Link href="/greetings" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/greetings') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Greetings
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg">Culture & Advanced</h3>
              <div className="space-y-1">
                <Link href="/culture" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/culture') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  French Culture
                </Link>
                <Link href="/expressions" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/expressions') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Expressions & Idioms
                </Link>
                <Link href="/immigration" className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 hover:shadow-sm active:scale-95 ${
                  isActiveRoute('/immigration') 
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
                    : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700'
                }`}>
                  Immigration to Canada
                </Link>
                
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 lg:mr-64">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:right-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:bg-background lg:border-l lg:border-border scrollbar-hide">
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
                  <p className="text-xs text-muted-foreground mb-3">Connect with thousands of French learners worldwide. Practice together and accelerate your learning journey.</p>
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
                  <p className="text-xs text-muted-foreground mb-3">Enjoying Français Pro? Buy me a coffee to support the development and help keep this platform free for everyone.</p>
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
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
