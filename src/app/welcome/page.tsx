'use client';
import React from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/ui/auth-modal';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  ArrowRight,
  Play,
  Target,
  Globe,
  Heart,
  Zap
} from 'lucide-react';

export default function WelcomePage() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const gate = (href: string) => (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Bienvenue à <span className="text-blue-600">Français Pro</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your journey to mastering French starts here. Learn with interactive lessons, 
            practice with real conversations, and join a community of French learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/alphabet">
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-700 active:scale-95 transition-all duration-200">
                <Play className="mr-2 h-5 w-5" />
                Try Alphabet
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="text-center bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="mx-auto p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mb-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-gray-900 dark:text-gray-100">Interactive Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Learn French through engaging, interactive lessons designed for all skill levels.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mb-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-gray-900 dark:text-gray-100">Community Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Join thousands of French learners in our supportive community.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="mx-auto p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mb-2">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-gray-900 dark:text-gray-100">Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Monitor your learning journey with detailed progress tracking.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="mb-8 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Target className="h-5 w-5" />
              Your Learning Path
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Follow our structured curriculum to master French step by step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Beginner Level</h3>
                <div className="space-y-3">
                  <Link href="/alphabet">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">French Alphabet</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                  <Link href="/numbers">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Numbers & Counting</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                  <Link href="/pronunciation">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                          <Play className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Pronunciation Guide</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Intermediate Level</h3>
                <div className="space-y-3">
                  {isAuthenticated ? (
                    <Link href="/grammar">
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <BookOpen className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">Grammar Fundamentals</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                          <BookOpen className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Grammar Fundamentals</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                  {isAuthenticated ? (
                    <Link href="/conversations">
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                            <Users className="h-4 w-4 text-pink-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">Conversation Practice</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                          <Users className="h-4 w-4 text-pink-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Conversation Practice</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                  {isAuthenticated ? (
                    <Link href="/culture">
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                            <Globe className="h-4 w-4 text-indigo-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">French Culture</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                          <Globe className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">French Culture</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Jump into learning with these popular sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/practice">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 text-gray-900 dark:text-gray-100">
                  <Play className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span>Practice</span>
                </Button>
              </Link>
              {isAuthenticated ? (
                <Link href="/progress">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 text-gray-900 dark:text-gray-100">
                    <Trophy className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <span>Progress</span>
                  </Button>
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full h-20 flex flex-col gap-2 items-center justify-center rounded-md border border-input text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <Trophy className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span>Progress</span>
                </button>
              )}
              <Link href="/vocabulary">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 text-gray-900 dark:text-gray-100">
                  <BookOpen className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span>Vocabulary</span>
                </Button>
              </Link>
              <Link href="/expressions">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 text-gray-900 dark:text-gray-100">
                  <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span>Expressions</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
              <Star className="h-5 w-5 text-yellow-500" />
              Ready to Start Your French Journey?
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Join thousands of learners who are already mastering French with Français Pro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home">
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/alphabet">
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-700 active:scale-95 transition-all duration-200">
                  Try Free Lesson
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}