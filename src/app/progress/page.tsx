'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { AuthModal } from '@/components/ui/auth-modal';
import Link from 'next/link';
import { 
  Star, 
  Flame, 
  Trophy, 
  Target,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningProgress } from '@/contexts/LearningProgressContext';
import { useProgress } from '@/hooks/useProgress';
import { MinimalistGamification } from '@/components/learning/minimalist-gamification';
import { learningModules } from '@/data/learning-content';

export default function ProgressPage() {
  const { isAuthenticated } = useAuth();
  
  // Original progress tracking
  const { 
    progress: originalProgress, 
    loading: originalLoading, 
    error: originalError,
    getModuleProgress
  } = useProgress();
  
  // Enhanced learning progress
  const { 
    progress: enhancedProgress, 
    loading: enhancedLoading, 
    getLearningStats,
    getStreakStatus
  } = useLearningProgress();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const loading = originalLoading || enhancedLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Track Your Learning Progress</CardTitle>
                <p className="text-gray-600">
                  Sign in to view your detailed learning statistics, achievements, and progress tracking
                </p>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full"
                >
                  Sign In to View Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          context="general"
          onSuccess={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  if (originalError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <p className="text-red-500 mb-4">Error loading progress: {originalError}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!originalProgress && !enhancedProgress) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Progress Data</h2>
                <p className="text-gray-600 mb-4">
                  Start learning to see your progress here!
                </p>
                <Button asChild>
                  <Link href="/learn">Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const stats = enhancedProgress ? getLearningStats() : null;
  const streakStatus = enhancedProgress ? getStreakStatus() : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            📊 Your Learning Progress
          </h1>
          <p className="text-gray-600 text-center">
            Track your French learning journey and celebrate your achievements
          </p>
        </div>

        {/* Original Progress Overview */}
        {originalProgress && (
          <Card className="mb-8 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Your Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {originalProgress.totalLessonsCompleted || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {originalProgress ? Math.round((originalProgress.totalLessonsCompleted / 13) * 100) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {originalProgress?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Progress Dashboard */}
        {enhancedProgress && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Level & XP */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Level & XP</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MinimalistGamification progress={enhancedProgress} compact={false} />
              </CardContent>
            </Card>

            {/* Streak Status */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>Learning Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {enhancedProgress.currentStreak}
                    </div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      {enhancedProgress.longestStreak}
                    </div>
                    <div className="text-sm text-gray-600">Longest Streak</div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600">
                      {streakStatus?.daysUntilReset === 0 
                        ? "Keep it up! 🔥" 
                        : `${streakStatus?.daysUntilReset} day${streakStatus?.daysUntilReset !== 1 ? 's' : ''} until reset`
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-purple-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {enhancedProgress.achievements.filter(a => a.unlocked).length}
                    </div>
                    <div className="text-sm text-gray-600">Unlocked</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600 mb-2">
                      {enhancedProgress.achievements.length - enhancedProgress.achievements.filter(a => a.unlocked).length}
                    </div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {enhancedProgress.achievements
                      .filter(a => a.unlocked)
                      .slice(0, 3)
                      .map((achievement) => (
                        <Badge key={achievement.id} variant="secondary" className="text-xs">
                          {achievement.icon}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Original Learning Modules Progress */}
        {originalProgress && (
          <Card className="mb-8 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <span>Learning Modules Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningModules.map((module) => {
                  const moduleProgress = getModuleProgress(module.id);
                  const isCompleted = moduleProgress === 100;
                  
                  return (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border transition-all ${
                        isCompleted
                          ? 'border-green-500 bg-green-50'
                          : moduleProgress > 0
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${module.color} text-white`}>
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{module.title}</h4>
                          <p className="text-xs text-gray-600">{module.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{moduleProgress}%</span>
                        </div>
                        <Progress value={moduleProgress} className="h-2" />
                        <div className="text-xs text-gray-600">
                          {module.lessons.length} lessons
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Learning Statistics */}
        {enhancedProgress && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Learning Statistics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Enhanced Learning Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lessons Completed</span>
                    <span className="font-semibold">{stats.totalLessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Time Spent</span>
                    <span className="font-semibold">{stats.totalTimeSpent} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Accuracy</span>
                    <span className="font-semibold">{stats.averageAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Favorite Skill</span>
                    <Badge variant="outline" className="capitalize">
                      {stats.favoriteSkill}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Levels */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span>Skill Levels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(enhancedProgress.skillLevels).map(([skill, level]) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{skill}</span>
                        <Badge variant="outline" className="text-xs">Level {level}</Badge>
                      </div>
                      <Progress value={level * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Achievements */}
        {enhancedProgress && enhancedProgress.achievements.filter(a => a.unlocked).length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Your Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {enhancedProgress.achievements
                  .filter(a => a.unlocked)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 rounded-lg border-2 border-yellow-500 bg-yellow-50 text-center"
                    >
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <h4 className="font-semibold text-sm mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        +{achievement.xpReward} XP
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="border-0 shadow-sm max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Continue Your Learning Journey</h3>
              <p className="text-gray-600 mb-4">
                Keep building your French skills with our interactive lessons
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/learn">Original Learning</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/learn/enhanced">Enhanced Learning</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}