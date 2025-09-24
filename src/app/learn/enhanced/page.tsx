'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/header';
import { AuthModal } from '@/components/ui/auth-modal';
import { 
  BookOpen, 
  Play, 
  Star, 
  Clock, 
  Target, 
  Flame,
  Award,
  Lock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningProgress } from '@/contexts/LearningProgressContext';
import { enhancedLearningModules } from '@/data/enhanced-learning-content';
import { InteractiveLessonComponent } from '@/components/learning/interactive-lesson';
import { GamificationSystem } from '@/components/learning/gamification-system';

export default function EnhancedLearnPage() {
  const { isAuthenticated } = useAuth();
  const { 
    progress, 
    loading, 
    completeLesson, 
    startLesson, 
    unlockLesson,
    getCurrentLevel,
    getXPForNextLevel
  } = useLearningProgress();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning progress...</p>
        </div>
      </div>
    );
  }

  // If a lesson is selected, show the interactive lesson
  if (selectedLesson) {
    const module = enhancedLearningModules.find(m => m.id === selectedModule);
    const lesson = module?.lessons.find(l => l.id === selectedLesson);
    
    if (lesson) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLesson(null);
                  setSelectedModule(null);
                }}
                className="mb-4"
              >
                ← Back to Modules
              </Button>
            </div>
            
            <InteractiveLessonComponent
              lesson={lesson}
              onComplete={async (xpEarned) => {
                await completeLesson(lesson.id, xpEarned);
                setSelectedLesson(null);
                setSelectedModule(null);
              }}
              onStepComplete={(stepId) => {
                console.log('Step completed:', stepId);
              }}
            />
          </div>
        </div>
      );
    }
  }

  // If a module is selected, show the lessons
  if (selectedModule) {
    const module = enhancedLearningModules.find(m => m.id === selectedModule);
    
    if (module) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedModule(null)}
                className="mb-4"
              >
                ← Back to Modules
              </Button>
            </div>

            {/* Module Header */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl flex items-center space-x-3">
                      <BookOpen className="h-8 w-8 text-blue-500" />
                      <span>{module.title}</span>
                    </CardTitle>
                    <CardDescription className="mt-2 text-lg">
                      {module.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{module.totalXP} XP</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.estimatedTime} min</span>
                    </Badge>
                  </div>
                </div>
                
                {/* Module Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Module Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-3" />
                </div>
              </CardHeader>
            </Card>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.lessons.map((lesson, index) => (
                <Card 
                  key={lesson.id} 
                  className={`transition-all hover:shadow-lg ${
                    lesson.unlocked 
                      ? 'cursor-pointer hover:scale-105' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (lesson.unlocked) {
                      setSelectedLesson(lesson.id);
                      startLesson(lesson.id);
                    }
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : lesson.unlocked ? (
                          <Play className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="font-semibold">Lesson {index + 1}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{lesson.estimatedTime} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{lesson.xpReward} XP</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {lesson.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {lesson.unlocked && (
                        <Button className="w-full" size="sm">
                          {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  // Main modules view
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            🎓 Enhanced French Learning
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Master French with interactive lessons, gamified learning, and personalized progress tracking
          </p>
        </div>

        {/* Gamification Dashboard */}
        {isAuthenticated && progress && (
          <div className="mb-8">
            <GamificationSystem
              progress={progress}
              onXPUpdate={(xp) => console.log('XP updated:', xp)}
              onStreakUpdate={(streak) => console.log('Streak updated:', streak)}
              onAchievementUnlock={(achievement) => console.log('Achievement unlocked:', achievement)}
            />
          </div>
        )}

        {/* Learning Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedLearningModules.map((module) => (
            <Card 
              key={module.id}
              className={`transition-all hover:shadow-lg ${
                module.unlocked 
                  ? 'cursor-pointer hover:scale-105' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => {
                if (module.unlocked) {
                  setSelectedModule(module.id);
                }
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${module.color} text-white`}>
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                  {!module.unlocked && (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{module.totalXP} XP</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{module.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span>{module.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      <span>{module.skills.length} skills</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {module.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {module.unlocked && (
                    <Button className="w-full">
                      Start Module
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Start Learning?</CardTitle>
                <CardDescription>
                  Sign in to track your progress, earn XP, and unlock achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          context="learn"
          onSuccess={() => setShowAuthModal(false)}
        />
      </div>
    </div>
  );
}
