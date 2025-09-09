import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, CheckCircle, Clock, Star } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="min-h-screen bg-background">
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
                <div className="text-2xl font-bold text-primary">2</div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12.5%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div className="grid gap-6">
          {learningModules.map((module) => (
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
                  <Badge variant="secondary">
                    {module.progress}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
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
                      <Button
                        variant={lesson.completed ? "outline" : "default"}
                        size="sm"
                        asChild
                      >
                        <Link href={`/learn/${module.id}/${lesson.id}`}>
                          {lesson.completed ? "Review" : "Start"}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
