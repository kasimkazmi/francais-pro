'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { learningModules } from '@/data/lessons/learning-content';
import { LearnSidebarProps } from '@/types/component-props';

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
  const [expandedModules, setExpandedModules] = useState<string[]>([currentModuleId || '']);

  // Auto-expand current module when it changes
  React.useEffect(() => {
    if (currentModuleId && !expandedModules.includes(currentModuleId)) {
      setExpandedModules(prev => [...prev, currentModuleId]);
    }
  }, [currentModuleId, expandedModules]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

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
                <p className="text-lg font-bold text-foreground">{totalTime.value}{totalTime.unit}</p>
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

            {/* All Modules with Expandable Lessons */}
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <h3 className="text-xs font-semibold text-foreground mb-3 px-2">
                All Modules
              </h3>
              {learningModules.map((module) => {
                const isExpanded = expandedModules.includes(module.id);
                const isCurrentModule = module.id === currentModuleId;
                const moduleProgress = progress ? 
                  Math.round((module.lessons.filter(l => {
                    const lessonKey = `${module.id}_${l.id}`;
                    return (progress as unknown as { lessons: Record<string, { completed: boolean }> }).lessons?.[lessonKey]?.completed === true;
                  }).length / module.lessons.length) * 100) : 0;

                return (
                  <div key={module.id} className="space-y-1">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        isCurrentModule
                          ? 'bg-primary/10 border border-primary/30'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-primary" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className={`font-medium text-sm ${isCurrentModule ? 'text-primary' : 'text-foreground'}`}>
                            {module.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{moduleProgress}%</span>
                      </div>
                    </button>

                    {/* Module Lessons */}
                    {isExpanded && (
                      <div className="space-y-1 ml-3 pl-3 border-l-2 border-border">
                        {module.lessons.map((lesson, index) => {
                          const lessonKey = `${module.id}_${lesson.id}`;
                          const prevLessonKey = index > 0 ? `${module.id}_${module.lessons[index - 1].id}` : '';
                          const progressData = progress as unknown as { lessons: Record<string, { completed: boolean }> };
                          const isCompleted = progress ? progressData.lessons?.[lessonKey]?.completed === true : false;
                          const isCurrent = lesson.id === currentLessonId && module.id === currentModuleId;
                          const isLocked = index > 0 && (!progress || !progressData.lessons?.[prevLessonKey]?.completed);

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => !isLocked && router.push(`/learn/${module.id}/${lesson.id}`)}
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
                                  ) : isCurrent ? (
                                    <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                                  )}
                                  <span className="truncate font-medium">{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                  {lesson.duration && (
                                    <span className="text-xs text-muted-foreground">
                                      {lesson.duration}m
                                    </span>
                                  )}
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    lesson.difficulty === 'easy' 
                                      ? 'bg-green-500' 
                                      : lesson.difficulty === 'medium'
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`} title={lesson.difficulty} />
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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

