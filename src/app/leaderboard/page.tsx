"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  BookOpen,
  Target,
  TrendingUp,
  FileText,
  Hash,
} from "lucide-react";
import { Leaderboard } from "@/components/ui/leaderboard";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";

const modules = [
  {
    id: "foundations",
    name: "Foundations",
    shortName: "Found",
    icon: BookOpen,
    color: "bg-blue-500",
    gradient:
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600",
    hoverColor:
      "hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-blue-200",
    activeColor: "data-[state=active]:text-white data-[state=active]:shadow-lg",
    borderColor: "data-[state=active]:border-blue-500",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "grammar",
    name: "Grammar",
    shortName: "Gram",
    icon: FileText,
    color: "bg-green-500",
    gradient:
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600",
    hoverColor:
      "hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-800 dark:hover:text-green-200",
    activeColor: "data-[state=active]:text-white data-[state=active]:shadow-lg",
    borderColor: "data-[state=active]:border-green-500",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    id: "vocabulary",
    name: "Vocabulary",
    shortName: "Vocab",
    icon: Hash,
    color: "bg-purple-500",
    gradient:
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600",
    hoverColor:
      "hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-800 dark:hover:text-purple-200",
    activeColor: "data-[state=active]:text-white data-[state=active]:shadow-lg",
    borderColor: "data-[state=active]:border-purple-500",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "practice",
    name: "Practice",
    shortName: "Prac",
    icon: Target,
    color: "bg-orange-500",
    gradient:
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600",
    hoverColor:
      "hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-800 dark:hover:text-orange-200",
    activeColor: "data-[state=active]:text-white data-[state=active]:shadow-lg",
    borderColor: "data-[state=active]:border-orange-500",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
];

export default function LeaderboardPage() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>("overall");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">
            {isAuthenticated
              ? "See how you rank among French learners worldwide"
              : "Discover top French learners worldwide - Sign in to see your ranking!"}
          </p>
          {!isAuthenticated && (
            <div className="mt-3 sm:mt-4">
              <Button
                onClick={() => setShowAuthModal(true)}
                className="text-xs sm:text-sm md:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5"
              >
                Sign In to See Your Ranking
              </Button>
            </div>
          )}
        </div>

        {/* Module Tabs */}
        <div className="mt-8 sm:mt-10">
          <Tabs
            value={selectedModule}
            onValueChange={setSelectedModule}
            className="w-full"
          >
            <TabsList className="grid w-full mb-4 sm:mb-10 lg:mb-10 grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0.5 sm:gap-1 lg:gap-2 p-1 sm:p-1.5 lg:p-2 rounded-lg sm:rounded-xl">
              <TabsTrigger
                value="overall"
                className="flex items-center gap-1 sm:gap-2 lg:gap-3 px-1 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-md sm:rounded-lg transition-all duration-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 hover:text-yellow-800 dark:hover:text-yellow-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md active:scale-95 font-medium group text-xs sm:text-sm md:text-base"
              >
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110 text-yellow-600 dark:text-yellow-400" />
                <span className="hidden xs:inline">Overall</span>
                <span className="xs:hidden">All</span>
              </TabsTrigger>
              {modules.map((module) => (
                <TabsTrigger
                  key={module.id}
                  value={module.id}
                  className={`flex items-center gap-1 sm:gap-2 lg:gap-3 px-1 sm:px-2 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-md sm:rounded-lg transition-all duration-300 ${module.hoverColor} ${module.gradient} ${module.activeColor} hover:shadow-md active:scale-95 border-2 border-transparent ${module.borderColor} font-medium group text-xs sm:text-sm md:text-base`}
                >
                  <module.icon
                    className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:scale-110 ${
                      selectedModule === module.id
                        ? "text-white"
                        : module.iconColor
                    }`}
                  />
                  <span className="hidden sm:inline">{module.name}</span>
                  <span className="hidden xs:inline sm:hidden">
                    {module.shortName}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <br />
            <br />

            {/* Overall Leaderboard */}
            <TabsContent value="overall" className="mt-0">
              <Leaderboard showStats={true} limit={20} />
            </TabsContent>

            {/* Module Leaderboards */}
            {modules.map((module) => (
              <TabsContent key={module.id} value={module.id} className="mt-0">
                <div className="space-y-4 sm:space-y-6">
                  {/* Module Header */}
                  <Card>
                    <CardHeader className="p-3 sm:p-4 lg:p-6">
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        <div
                          className={`p-1.5 sm:p-2 lg:p-3 rounded-lg ${module.color} text-white`}
                        >
                          <module.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-base sm:text-lg lg:text-xl">
                            {module.name} Leaderboard
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm lg:text-base">
                            Top performers in the {module.name.toLowerCase()}{" "}
                            module
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
        </div>

        {/* Achievement Badges */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader className="p-4 sm:p-4 lg:p-6">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0" />
              <span>Achievement Badges</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base">
              Special recognition for outstanding achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-4 lg:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <div className="text-center p-3 sm:p-4 lg:p-6 border rounded-lg">
                <Crown className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-500 mx-auto mb-2 sm:mb-3" />
                <div className="font-medium text-sm sm:text-base lg:text-lg">
                  First Place
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Top overall learner
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 lg:p-6 border rounded-lg">
                <Medal className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-gray-400 mx-auto mb-2 sm:mb-3" />
                <div className="font-medium text-sm sm:text-base lg:text-lg">
                  Module Master
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Complete any module
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 lg:p-6 border rounded-lg">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-500 mx-auto mb-2 sm:mb-3" />
                <div className="font-medium text-sm sm:text-base lg:text-lg">
                  Streak Master
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  7+ day learning streak
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 lg:p-6 border rounded-lg">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-500 mx-auto mb-2 sm:mb-3" />
                <div className="font-medium text-sm sm:text-base lg:text-lg">
                  Knowledge Seeker
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Complete 10+ lessons
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <Card className="mt-6 sm:mt-8">
            <CardHeader className="p-4 sm:p-4 lg:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" />
                <span>Join the Competition!</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm lg:text-base">
                Start your French learning journey and compete with learners
                worldwide
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                    Free
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    No cost to join
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                    Interactive
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Engaging lessons
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                    Competitive
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Track your progress
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 lg:gap-4 justify-center">
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="text-xs sm:text-sm lg:text-base px-4 sm:px-6 lg:px-8 py-2.5 sm:py-2.5 lg:py-3 w-full sm:w-auto"
                >
                  Sign Up to Start Learning
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="text-xs sm:text-sm lg:text-base px-4 sm:px-6 lg:px-8 py-2.5 sm:py-2.5 lg:py-3 w-full sm:w-auto"
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
