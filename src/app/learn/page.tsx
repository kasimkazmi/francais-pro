'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { LearningPageLoader } from "@/components/ui/page-loader";
import { BookOpen, Play, CheckCircle, Clock, Star, ArrowRight } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    return <LearningPageLoader />;
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
                          <EnhancedButton
                            variant={lessonCompleted ? "outline" : "default"}
                            size="sm"
                            onClick={() => {
                              if (!isAuthenticated) {
                                setShowAuthModal(true);
                                return;
                              }
                              // Navigate to lesson
                              window.location.href = `/learn/${module.id}/${lesson.id}`;
                            }}
                            className="ml-4"
                          >
                            {lessonCompleted ? "Review" : "Start"}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </EnhancedButton>
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
