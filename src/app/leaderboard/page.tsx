'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Trophy, Medal, Award, Crown, Star, BookOpen, Target, TrendingUp, FileText, Hash } from "lucide-react";
import { Leaderboard } from "@/components/ui/leaderboard";
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/ui/auth-modal';

const modules = [
  { 
    id: 'foundations', 
    name: 'Foundations', 
    icon: BookOpen, 
    color: 'bg-blue-500',
    gradient: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600',
    hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-blue-200',
    activeColor: 'data-[state=active]:text-white data-[state=active]:shadow-lg',
    borderColor: 'data-[state=active]:border-blue-500',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  { 
    id: 'grammar', 
    name: 'Grammar', 
    icon: FileText, 
    color: 'bg-green-500',
    gradient: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600',
    hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-800 dark:hover:text-green-200',
    activeColor: 'data-[state=active]:text-white data-[state=active]:shadow-lg',
    borderColor: 'data-[state=active]:border-green-500',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  { 
    id: 'vocabulary', 
    name: 'Vocabulary', 
    icon: Hash, 
    color: 'bg-purple-500',
    gradient: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600',
    hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-800 dark:hover:text-purple-200',
    activeColor: 'data-[state=active]:text-white data-[state=active]:shadow-lg',
    borderColor: 'data-[state=active]:border-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  { 
    id: 'practice', 
    name: 'Practice', 
    icon: Target, 
    color: 'bg-orange-500',
    gradient: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600',
    hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-800 dark:hover:text-orange-200',
    activeColor: 'data-[state=active]:text-white data-[state=active]:shadow-lg',
    borderColor: 'data-[state=active]:border-orange-500',
    iconColor: 'text-orange-600 dark:text-orange-400'
  }
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
        <div className="mb-8">
         
          <Tabs value={selectedModule} onValueChange={setSelectedModule}>
            <TabsList className="grid w-full grid-cols-5 gap-2 p-2 rounded-xl">
              <TabsTrigger 
                value="overall" 
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 hover:text-yellow-800 dark:hover:text-yellow-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md active:scale-95 font-medium group"
              >
                <TrendingUp className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 text-yellow-600 dark:text-yellow-400" />
                Overall
              </TabsTrigger>
              {modules.map((module) => (
                <TabsTrigger 
                  key={module.id} 
                  value={module.id}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${module.hoverColor} ${module.gradient} ${module.activeColor} hover:shadow-md active:scale-95 border-2 border-transparent ${module.borderColor} font-medium group`}
                >
                  <module.icon className={`h-4 w-4 transition-all duration-300 group-hover:scale-110 ${selectedModule === module.id ? 'text-white' : module.iconColor}`} />
                  {module.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <Tabs value={selectedModule} onValueChange={setSelectedModule}>
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
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </div>
  );
}
