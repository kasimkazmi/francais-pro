'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Progress } from '@/components/ui/progress';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/hooks/useProgress';
import { 
  Trophy, 
  Target, 
  BookOpen, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

export default function ProgressPage() {
  const { user } = useAuth();
  const { progress, loading, error } = useProgress();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
      
      <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Your Learning Progress</h1>
            <p className="text-muted-foreground">
              Track your French learning journey and celebrate your achievements
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-sm font-medium">Level: {progress?.level || 'Beginner'}</span>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Overall Progress
            </CardTitle>
            <CardDescription>
              Your journey to French fluency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>Error loading progress: {error}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">French Mastery</span>
                    <span className="text-sm text-muted-foreground">
                      {progress ? Math.round((progress.totalLessonsCompleted / 13) * 100) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={progress ? Math.round((progress.totalLessonsCompleted / 13) * 100) : 0} 
                    className="h-2" 
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {progress?.totalLessonsCompleted || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Lessons Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {progress?.wordsLearned || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Words Learned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {progress?.currentStreak || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Days Streak</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <>
                    {progress?.modules ? Object.entries(progress.modules).map(([moduleId, moduleData]) => {
                      const isCompleted = moduleData.completed;
                      const isInProgress = moduleData.progress > 0 && !isCompleted;
                      
                      return (
                        <div key={moduleId} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : isInProgress ? (
                              <Target className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="text-sm capitalize">{moduleId.replace('_', ' ')}</span>
                            <span className="text-xs text-muted-foreground">
                              ({moduleData.lessonsCompleted}/{moduleData.totalLessons})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={moduleData.progress} className="w-16 h-2" />
                            <Badge variant={isCompleted ? "default" : isInProgress ? "secondary" : "outline"}>
                              {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Not Started"}
                            </Badge>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No module progress data available
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">First Week Complete</div>
                    <div className="text-xs text-muted-foreground">Completed 7 lessons in a row</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Star className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Vocabulary Master</div>
                    <div className="text-xs text-muted-foreground">Learned 100+ words</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Pronunciation Pro</div>
                    <div className="text-xs text-muted-foreground">Perfect pronunciation in 5 lessons</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Statistics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Study Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {progress ? Math.round(progress.totalTimeSpent) : 0}m
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {progress?.currentStreak || 0}
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {progress?.longestStreak || 0}
                </div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {progress?.level?.charAt(0).toUpperCase() || 'B'}
                </div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/practice" className="flex-1">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/alphabet" className="flex-1">
            <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-700 active:scale-95 transition-all duration-200">
              Review Basics
            </Button>
          </Link>
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}
