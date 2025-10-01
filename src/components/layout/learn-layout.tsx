'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { learningModules } from '@/data/lessons/learning-content';
import { useProgress } from '@/hooks/useProgress';
import LearnHeader from '@/components/learn/learn-header';
import LearnSidebar from '@/components/learn/learn-sidebar';
import { LearnLayoutProps } from '@/types/layout-props';

export default function LearnLayout({ children }: LearnLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { progress, refreshProgress } = useProgress();

  // Parse current route
  const pathParts = pathname.split('/').filter(Boolean);
  const isLearnHome = pathname === '/learn';
  const currentModuleId = pathParts[1] || null;
  const currentLessonId = pathParts[2] || null;

  // Get current module and lesson
  const currentModule = useMemo(() => 
    learningModules.find(m => m.id === currentModuleId),
    [currentModuleId]
  );

  const currentLesson = useMemo(() => 
    currentModule?.lessons.find(l => l.id === currentLessonId),
    [currentModule, currentLessonId]
  );

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    if (!progress) return 0;
    const totalLessons = learningModules.reduce((acc, m) => acc + m.lessons.length, 0);
    const progressData = progress as unknown as { lessons: Record<string, { completed: boolean }> };
    const completedLessons = learningModules.reduce((acc, m) => 
      acc + m.lessons.filter(l => {
        const lessonKey = `${m.id}_${l.id}`;
        return progressData.lessons?.[lessonKey]?.completed === true;
      }).length, 0
    );
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }, [progress]);

  const totalTime = useMemo(() => {
    if (!progress) return '0.0';
    const progressData = progress as unknown as { totalTimeSpent: number };
    const totalMinutes = progressData.totalTimeSpent || 0;
    return (totalMinutes / 60).toFixed(1);
  }, [progress]);

  const completedCount = useMemo(() => {
    if (!progress) return 0;
    const progressData = progress as unknown as { totalLessonsCompleted: number };
    return progressData.totalLessonsCompleted || 0;
  }, [progress]);

  // Navigation helpers
  const getCurrentLessonIndex = () => {
    if (!currentModule || !currentLessonId) return -1;
    return currentModule.lessons.findIndex(l => l.id === currentLessonId);
  };

  const getNextLesson = () => {
    if (!currentModule) return null;
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex < 0 || currentIndex >= currentModule.lessons.length - 1) return null;
    return currentModule.lessons[currentIndex + 1];
  };

  const getPreviousLesson = () => {
    if (!currentModule) return null;
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex <= 0) return null;
    return currentModule.lessons[currentIndex - 1];
  };

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();

  // Listen for lesson completion to refresh progress
  React.useEffect(() => {
    const handleLessonCompleted = () => {
      console.log('🎉 Lesson completed event received, refreshing progress...');
      refreshProgress();
    };

    window.addEventListener('lesson-completed', handleLessonCompleted);
    return () => window.removeEventListener('lesson-completed', handleLessonCompleted);
  }, [refreshProgress]);

  return (
    <div className="min-h-screen bg-background">
      <LearnHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isLearnHome={isLearnHome}
        currentModule={currentModule}
        currentLesson={currentLesson}
        currentModuleId={currentModuleId}
        currentLessonId={currentLessonId}
        previousLesson={previousLesson}
        nextLesson={nextLesson}
      />

        <div className="flex">
          <LearnSidebar
            sidebarOpen={sidebarOpen}
            overallProgress={overallProgress}
            completedCount={completedCount}
            totalTime={totalTime}
            currentModule={currentModule}
            currentModuleId={currentModuleId}
            currentLessonId={currentLessonId}
            progress={progress as Record<string, number> | null}
          />

          {/* Main Content */}
          <main className="flex-1 transition-all duration-300">
            <div className="container mx-auto p-4 lg:p-6 max-w-7xl">
              {children}
            </div>
          </main>
        </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

