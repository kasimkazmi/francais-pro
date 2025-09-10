'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Trophy, Medal, Award, Crown, Star, BookOpen, Target, TrendingUp } from "lucide-react";
import { Leaderboard } from "@/components/ui/leaderboard";
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/ui/auth-modal';

const modules = [
  { id: 'foundations', name: 'Foundations', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'grammar', name: 'Grammar', icon: BookOpen, color: 'bg-green-500' },
  { id: 'vocabulary', name: 'Vocabulary', icon: BookOpen, color: 'bg-purple-500' },
  { id: 'practice', name: 'Practice', icon: Target, color: 'bg-orange-500' }
];

export default function LeaderboardPage() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>('overall');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? "See how you rank among French learners worldwide" 
              : "Discover top French learners worldwide - Sign in to see your ranking!"
            }
          </p>
          {!isAuthenticated && (
            <div className="mt-4">
              <Button 
                onClick={() => setShowAuthModal(true)}
              >
                Sign In to See Your Ranking
              </Button>
            </div>
          )}
        </div>

        {/* Module Tabs */}
        <Tabs value={selectedModule} onValueChange={setSelectedModule} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overall" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overall
            </TabsTrigger>
            {modules.map((module) => (
              <TabsTrigger 
                key={module.id} 
                value={module.id}
                className="flex items-center gap-2"
              >
                <module.icon className="h-4 w-4" />
                {module.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overall Leaderboard */}
          <TabsContent value="overall" className="mt-6">
            <Leaderboard showStats={true} limit={20} />
          </TabsContent>

          {/* Module Leaderboards */}
          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="mt-6">
              <div className="space-y-6">
                {/* Module Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${module.color} text-white`}>
                        <module.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>{module.name} Leaderboard</CardTitle>
                        <CardDescription>
                          Top performers in the {module.name.toLowerCase()} module
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Module Leaderboard */}
                <Leaderboard 
                  moduleId={module.id} 
                  showStats={false} 
                  limit={20} 
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Achievement Badges */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievement Badges
            </CardTitle>
            <CardDescription>
              Special recognition for outstanding achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-medium">First Place</div>
                <div className="text-sm text-muted-foreground">Top overall learner</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Medal className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium">Module Master</div>
                <div className="text-sm text-muted-foreground">Complete any module</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="font-medium">Streak Master</div>
                <div className="text-sm text-muted-foreground">7+ day learning streak</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="font-medium">Knowledge Seeker</div>
                <div className="text-sm text-muted-foreground">Complete 10+ lessons</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Join the Competition!
              </CardTitle>
              <CardDescription>
                Start your French learning journey and compete with learners worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Free</div>
                  <div className="text-sm text-muted-foreground">No cost to join</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Interactive</div>
                  <div className="text-sm text-muted-foreground">Engaging lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Competitive</div>
                  <div className="text-sm text-muted-foreground">Track your progress</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign Up to Start Learning
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
