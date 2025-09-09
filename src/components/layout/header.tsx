'use client';

import Link from 'next/link';
import { SearchBar } from '@/components/ui/search-bar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/ui/auth-modal';
import { Portal } from '@/components/ui/portal';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSearch } from '@/contexts/search-context';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { performSearch } = useSearch();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (query: string) => {
    performSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center">
            <span className="font-bold">Français Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/welcome" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Learn
            </Link>
            <Link href="/demo" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Demo
            </Link>
            <Link href="/lessons" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Lessons
            </Link>
            <Link href="/practice" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Practice
            </Link>
            {isAuthenticated && (
              <Link href="/progress" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Progress
              </Link>
            )}
          </nav>
        </div>
        {/* Mobile Layout */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Toggle Menu</span>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/" className="flex items-center">
            <span className="font-bold">Français Pro</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="flex items-center space-x-2">
            <div className="relative hidden lg:block">
              <SearchBar onSearch={handleSearch} />
            </div>
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="text-muted-foreground">{user?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com">GitHub</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/welcome" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learn
              </Link>
              <Link 
                href="/demo" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Link 
                href="/lessons" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lessons
              </Link>
              <Link 
                href="/practice" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Practice
              </Link>
              {isAuthenticated && (
                <Link 
                  href="/progress" 
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Progress
                </Link>
              )}
              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span className="text-muted-foreground">{user?.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
      
      <Portal>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </Portal>
    </header>
  );
}
