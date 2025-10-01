'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Module } from '@/types';

interface LearnSidebarProps {
  sidebarOpen: boolean;
  overallProgress: number;
  completedCount: number;
  totalTime: string;
  currentModule?: Module | null;
  currentModuleId: string | null;
  currentLessonId: string | null;
  progress: Record<string, number> | null;
}

export default function LearnSidebar({
  sidebarOpen,
  overallProgress,
  completedCount,
  totalTime,
  currentModule,
  currentModuleId,
  currentLessonId,
  progress
}: LearnSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] bg-card
        border-r border-border transition-all duration-300 z-30
        ${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
        overflow-y-auto
      `}
    >
      <div className={`p-4 ${!sidebarOpen && 'lg:p-2'}`}>
        {sidebarOpen ? (
          <div className="space-y-4">
            {/* Progress Overview */}
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Your Progress
                </span>
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
                </div>
                <span className="text-xs text-primary font-semibold">{overallProgress}%</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 rounded-lg p-2 border border-border">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <p className="text-lg font-bold text-foreground">{completedCount}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 border border-border">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Time</span>
                </div>
                <p className="text-lg font-bold text-foreground">{totalTime}h</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <Button
                variant={pathname === '/learn' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => router.push('/learn')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                All Modules
              </Button>
            </nav>

            {/* Current Module Lessons (only show if in a module) */}
            {currentModule && (
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-foreground mb-2 px-2">
                  {currentModule.title} Lessons
                </h3>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {currentModule.lessons.map((lesson, index) => {
                    const isCompleted = progress ? progress[`${currentModule.id}-${lesson.id}` as keyof typeof progress] === 100 : false;
                    const isCurrent = lesson.id === currentLessonId;
                    const isLocked = index > 0 && (!progress || !progress[`${currentModule.id}-${currentModule.lessons[index - 1].id}` as keyof typeof progress]);
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && router.push(`/learn/${currentModule.id}/${lesson.id}`)}
                        disabled={isLocked}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                          ${isCurrent 
                            ? 'bg-primary/20 text-primary border border-primary/30' 
                            : isCompleted
                            ? 'bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border border-green-500/20'
                            : isLocked
                            ? 'bg-muted text-muted-foreground/50 cursor-not-allowed border border-border'
                            : 'hover:bg-muted text-foreground border border-transparent'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            )}
                            <span className="truncate font-medium">{lesson.title}</span>
                          </div>
                          {lesson.duration && (
                            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                              {lesson.duration}m
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex flex-col items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/learn')}
              className="w-full aspect-square p-0"
            >
              <BookOpen className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}

