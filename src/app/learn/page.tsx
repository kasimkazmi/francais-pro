'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { BookOpen, Play, CheckCircle, Clock, Star, Loader2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { useState } from "react";

const learningModules = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Start your French journey with the basics",
    icon: BookOpen,
    lessons: [
      { id: 1, title: "French Alphabet & Pronunciation", duration: "15 min", completed: true },
      { id: 2, title: "Basic Greetings", duration: "20 min", completed: true },
      { id: 3, title: "Numbers 1-20", duration: "25 min", completed: false },
      { id: 4, title: "Colors & Family", duration: "30 min", completed: false },
    ],
    progress: 50,
    color: "bg-blue-500"
  },
  {
    id: "grammar",
    title: "Grammar",
    description: "Master French grammar fundamentals",
    icon: BookOpen,
    lessons: [
      { id: 1, title: "Articles (le, la, les)", duration: "20 min", completed: false },
      { id: 2, title: "Present Tense Verbs", duration: "35 min", completed: false },
      { id: 3, title: "Gender Agreement", duration: "25 min", completed: false },
    ],
    progress: 0,
    color: "bg-green-500"
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Expand your French vocabulary",
    icon: BookOpen,
    lessons: [
      { id: 1, title: "Food & Drinks", duration: "30 min", completed: false },
      { id: 2, title: "Travel & Transportation", duration: "25 min", completed: false },
      { id: 3, title: "Work & Professions", duration: "35 min", completed: false },
    ],
    progress: 0,
    color: "bg-purple-500"
  },
  {
    id: "practice",
    title: "Practice",
    description: "Apply what you've learned",
    icon: Play,
    lessons: [
      { id: 1, title: "Speaking Exercises", duration: "20 min", completed: false },
      { id: 2, title: "Writing Prompts", duration: "25 min", completed: false },
      { id: 3, title: "Listening Comprehension", duration: "30 min", completed: false },
    ],
    progress: 0,
    color: "bg-orange-500"
  }
];

export default function LearnPage() {
  const { isAuthenticated } = useAuth();
  const { progress, loading, error, isLessonCompleted, getModuleProgress } = useProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading your progress...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading progress: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learn French</h1>
          <p className="text-muted-foreground">
            Master French from zero to hero with our structured learning path
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {progress?.totalLessonsCompleted || 0}
                </div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {progress ? Math.round((progress.totalLessonsCompleted / 13) * 100) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {progress?.currentStreak || 0}
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div className="grid gap-6">
          {learningModules.map((module) => {
            const moduleProgress = getModuleProgress(module.id);
            const isCompleted = moduleProgress === 100;
            
            return (
              <Card key={module.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${module.color} text-white`}>
                        <module.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={isCompleted ? "default" : "secondary"}>
                      {moduleProgress}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {module.lessons.map((lesson) => {
                      const lessonCompleted = isLessonCompleted(module.id, lesson.id.toString());
                      
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {lessonCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                            )}
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (!isAuthenticated) {
                                setShowAuthModal(true);
                                return;
                              }
                              // Navigate to lesson
                              window.location.href = `/learn/${module.id}/${lesson.id}`;
                            }}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '8px',
                              fontWeight: '500',
                              fontSize: '14px',
                              border: '2px solid',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                              backgroundColor: lessonCompleted ? (document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff') : '#2563eb',
                              borderColor: lessonCompleted ? (document.documentElement.classList.contains('dark') ? '#4b5563' : '#d1d5db') : '#2563eb',
                              color: lessonCompleted ? (document.documentElement.classList.contains('dark') ? '#d1d5db' : '#374151') : '#ffffff'
                            }}
                            className="hover:shadow-md active:scale-95"
                            onMouseEnter={(e) => {
                              if (lessonCompleted) {
                                const isDark = document.documentElement.classList.contains('dark');
                                e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f9fafb';
                                e.currentTarget.style.borderColor = isDark ? '#6b7280' : '#9ca3af';
                                e.currentTarget.style.color = isDark ? '#f3f4f6' : '#111827';
                              } else {
                                e.currentTarget.style.backgroundColor = '#1d4ed8';
                                e.currentTarget.style.borderColor = '#1d4ed8';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (lessonCompleted) {
                                const isDark = document.documentElement.classList.contains('dark');
                                e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : '#ffffff';
                                e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                                e.currentTarget.style.color = isDark ? '#d1d5db' : '#374151';
                              } else {
                                e.currentTarget.style.backgroundColor = '#2563eb';
                                e.currentTarget.style.borderColor = '#2563eb';
                              }
                            }}
                          >
                            {lessonCompleted ? "Review" : "Start"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    </div>
  );
}
