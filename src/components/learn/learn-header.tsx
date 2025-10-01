'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeasonalThemeToggle } from '@/components/seasonal/seasonal-theme-toggle';
import { DarkModeToggle } from '@/components/themed/dark-light-toggle';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Portal } from '@/components/ui/portal';
import { LearnHeaderProps } from '@/types/component-props';

export default function LearnHeader({
  sidebarOpen,
  onToggleSidebar,
  isLearnHome,
  currentModule,
  currentLesson,
  currentModuleId,
  currentLessonId,
  previousLesson,
  nextLesson
}: LearnHeaderProps) {
  const router = useRouter();
  const { currentTheme, isActive, themeConfig } = useSeasonalTheme();
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    router.push('/welcome');
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Français Pro Learning
              </h1>
              {/* Breadcrumb */}
              {!isLearnHome && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => router.push('/learn')}>
                  All Modules
                </span>
                {currentModule && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="hover:text-blue-600 cursor-pointer" onClick={() => router.push(`/learn/${currentModule.id}`)}>
                      {currentModule.title}
                    </span>
                  </>
                )}
                {currentLesson && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {currentLesson.title}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DarkModeToggle 
            isThemeEnabled={isActive}
            themePrimaryColor={isActive ? themeConfig.colors.primary : undefined}
          />
          {currentTheme !== 'default' && <SeasonalThemeToggle />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/home')}
            className="hidden sm:flex"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          
          {/* User Profile & Logout */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center gap-2 text-sm"
            onClick={() => router.push('/profile')}
            title="View Profile"
          >
            <User className="h-4 w-4" />
            <span className="text-muted-foreground">{user?.displayName || user?.email || 'User'}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className={`text-muted-foreground ${isActive ? 'hover:text-[var(--nav-hover)]' : 'hover:text-foreground'}`}
            style={isActive ? ({ '--nav-hover': themeConfig.colors.primary } as React.CSSProperties) : undefined}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Next/Previous Lesson Navigation (only on lesson pages) */}
      {currentLessonId && (previousLesson || nextLesson) && (
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-border">
          {previousLesson ? (
            <motion.button
              onClick={() => router.push(`/learn/${currentModuleId}/${previousLesson.id}`)}
              className="group relative text-sm font-medium text-primary px-3 py-2 rounded-lg flex items-center gap-1 overflow-hidden"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              initial="initial"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-lg"
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 }
                }}
              />
              <motion.div
                className="flex items-center relative z-10"
                variants={{
                  initial: { x: 0 },
                  hover: { x: -3 }
                }}
              >
                <ChevronLeft className="w-4 h-4 group-hover:text-foreground transition-colors duration-200" />
              </motion.div>
              <span className="relative z-10 group-hover:text-foreground group-hover:font-semibold transition-all duration-200">
                Previous: {previousLesson.title}
              </span>
            </motion.button>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <motion.button
              onClick={() => router.push(`/learn/${currentModuleId}/${nextLesson.id}`)}
              className="group relative text-sm font-medium text-primary px-3 py-2 rounded-lg flex items-center gap-1 overflow-hidden"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              initial="initial"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-lg"
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 }
                }}
              />
              <span className="relative z-10 group-hover:text-foreground group-hover:font-semibold transition-all duration-200">
                Next: {nextLesson.title}
              </span>
              <motion.div
                className="flex items-center relative z-10"
                variants={{
                  initial: { x: 0 },
                  hover: { x: 3 }
                }}
              >
                <ChevronRight className="w-4 h-4 group-hover:text-foreground transition-colors duration-200" />
              </motion.div>
            </motion.button>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <Portal>
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

