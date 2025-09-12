'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Search, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";

const learningModules = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Start your French journey with the basics",
    icon: BookOpen,
    color: "bg-blue-500",
    lessons: [
      { id: 1, title: "French Alphabet & Pronunciation", duration: "15 min", difficulty: "Beginner" },
      { id: 2, title: "Basic Greetings", duration: "20 min", difficulty: "Beginner" },
      { id: 3, title: "Numbers 1-20", duration: "25 min", difficulty: "Beginner" },
      { id: 4, title: "Colors & Family", duration: "30 min", difficulty: "Beginner" },
    ]
  },
  {
    id: "grammar",
    title: "Grammar",
    description: "Master French grammar fundamentals",
    icon: BookOpen,
    color: "bg-green-500",
    lessons: [
      { id: 1, title: "Articles (le, la, les)", duration: "20 min", difficulty: "Intermediate" },
      { id: 2, title: "Present Tense Verbs", duration: "35 min", difficulty: "Intermediate" },
      { id: 3, title: "Gender Agreement", duration: "25 min", difficulty: "Intermediate" },
      { id: 4, title: "Question Formation", duration: "30 min", difficulty: "Intermediate" },
    ]
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Expand your French vocabulary",
    icon: BookOpen,
    color: "bg-purple-500",
    lessons: [
      { id: 1, title: "Food & Drinks", duration: "30 min", difficulty: "Beginner" },
      { id: 2, title: "Travel & Transportation", duration: "25 min", difficulty: "Intermediate" },
      { id: 3, title: "Work & Professions", duration: "35 min", difficulty: "Intermediate" },
      { id: 4, title: "Home & Family", duration: "40 min", difficulty: "Beginner" },
    ]
  },
  {
    id: "practice",
    title: "Practice",
    description: "Apply what you've learned",
    icon: Play,
    color: "bg-orange-500",
    lessons: [
      { id: 1, title: "Speaking Exercises", duration: "20 min", difficulty: "Intermediate" },
      { id: 2, title: "Writing Prompts", duration: "25 min", difficulty: "Advanced" },
      { id: 3, title: "Listening Comprehension", duration: "30 min", difficulty: "Intermediate" },
      { id: 4, title: "Conversation Practice", duration: "35 min", difficulty: "Advanced" },
    ]
  }
];

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
};

export default function LessonsPage() {
  const { isAuthenticated } = useAuth();
  const { progress, loading, isLessonCompleted, getModuleProgress } = useProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedModule, setSelectedModule] = useState<string>("all");

  const filteredModules = learningModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.lessons.some(lesson => 
                           lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesModule = selectedModule === "all" || module.id === selectedModule;
    
    return matchesSearch && matchesModule;
  });

  const filteredLessons = filteredModules.flatMap(module => 
    module.lessons
      .filter(lesson => {
        const matchesDifficulty = selectedDifficulty === "all" || lesson.difficulty === selectedDifficulty;
        const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDifficulty && matchesSearch;
      })
      .map(lesson => ({ ...lesson, moduleId: module.id, moduleTitle: module.title, moduleColor: module.color }))
  );

  const handleLessonClick = (moduleId: string, lessonId: number) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Navigate to lesson
    window.location.href = `/learn/${moduleId}/${lessonId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Loading lessons...</span>
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
          <h1 className="text-3xl font-bold mb-2">All Lessons</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of French lessons
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Perfect Lesson
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 transition-colors dark:bg-background dark:text-foreground"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 transition-colors dark:bg-background dark:text-foreground"
              >
                <option value="all">All Modules</option>
                {learningModules.map(module => (
                  <option key={module.id} value={module.id}>{module.title}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        {isAuthenticated && progress && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{progress.totalLessonsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{progress.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{progress.wordsLearned}</div>
                  <div className="text-sm text-muted-foreground">Words Learned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{progress.level}</div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lessons by Module */}
        <div className="space-y-8">
          {filteredModules.map((module) => {
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
                    <div className="text-right">
                      <Badge variant={isCompleted ? "default" : "secondary"}>
                        {moduleProgress}% Complete
                      </Badge>
                      <div className="mt-2">
                        <Progress value={moduleProgress} className="w-24 h-2" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.lessons.map((lesson) => {
                      const lessonCompleted = isLessonCompleted(module.id, lesson.id.toString());
                      
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {lessonCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{lesson.title}</div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${difficultyColors[lesson.difficulty as keyof typeof difficultyColors]}`}
                                >
                                  {lesson.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <EnhancedButton
                            variant={lessonCompleted ? "outline" : "default"}
                            size="sm"
                            onClick={() => handleLessonClick(module.id, lesson.id)}
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

        {/* All Lessons View */}
        {searchQuery && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLessons.map((lesson) => {
                  const lessonCompleted = isLessonCompleted(lesson.moduleId, lesson.id.toString());
                  
                  return (
                    <div
                      key={`${lesson.moduleId}-${lesson.id}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {lessonCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{lesson.title}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className={`px-2 py-1 rounded text-xs ${lesson.moduleColor} text-white`}>
                              {lesson.moduleTitle}
                            </span>
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${difficultyColors[lesson.difficulty as keyof typeof difficultyColors]}`}
                            >
                              {lesson.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <EnhancedButton
                        variant={lessonCompleted ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleLessonClick(lesson.moduleId, lesson.id)}
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
        )}

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    </div>
  );
}
