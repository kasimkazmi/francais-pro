'use client';

import Link from 'next/link';
import { SearchBar } from '@/components/ui/search-bar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/ui/auth-modal';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Portal } from '@/components/ui/portal';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSearch } from '@/contexts/search-context';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { performSearch } = useSearch();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (query: string) => {
    performSearch(query);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleMobileLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/welcome" className="mr-6 flex items-center">
            <span className="font-bold">Français Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/learn" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Learn
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
            <Link href="/leaderboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Leaderboard
            </Link>
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
          <Link href="/welcome" className="flex items-center">
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
                  <span className="text-muted-foreground">{user?.displayName || user?.email || 'User'}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
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
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover:scale-105 active:scale-95"
            >
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
                href="/learn" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learn
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
              <Link 
                href="/leaderboard" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span className="text-muted-foreground">{user?.displayName || user?.email || 'User'}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleMobileLogout}
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
        <ConfirmModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogoutConfirm}
          title="Confirm Logout"
          message="Are you sure you want to logout? You'll need to sign in again to access your progress and personalized content."
          confirmText="Logout"
          cancelText="Cancel"
          variant="destructive"
        />
      </Portal>
    </header>
  );
}
