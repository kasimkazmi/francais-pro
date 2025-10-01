"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { LearningPageLoader } from "@/components/ui/page-loader";
import {
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  Play,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { learningModules } from "@/data/lessons/learning-content";

// Helper function to get icon component from string
const getIconComponent = (iconName: string) => {
  const iconMap = {
    BookOpen: BookOpen,
    Play: Play,
  };
  return iconMap[iconName as keyof typeof iconMap] || BookOpen;
};

export default function LearnPage() {
  const { isAuthenticated } = useAuth();
  const { progress, loading, error, isLessonCompleted, getModuleProgress } =
    useProgress();
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
    <>
      {/* Page Header */}
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
              <div className="text-sm text-muted-foreground">
                Lessons Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {progress
                  ? Math.round((progress.totalLessonsCompleted / 13) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Progress
              </div>
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
                    <div
                      className={`p-2 rounded-lg ${module.color} text-white`}
                    >
                      {(() => {
                        const IconComponent = getIconComponent(module.icon);
                        return <IconComponent className="h-5 w-5" />;
                      })()}
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
                    const lessonCompleted = isLessonCompleted(
                      module.id,
                      lesson.id
                    );

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
                              {lesson.duration} min
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

      {/* Learn Login Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        context="learn"
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}
