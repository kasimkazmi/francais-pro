import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { WelcomeInteractions } from '@/components/welcome/welcome-interactions';
import { DynamicStats } from '@/components/welcome/dynamic-stats';
import { 
  BookOpen, 
  Users, 
  ArrowRight,
  Play,
  Target,
  Globe,
  Heart,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

// Static data - using string identifiers for icons to avoid serialization issues
const features = [
  {
    icon: "BookOpen",
    title: "Interactive Lessons",
    description: "Learn with engaging, structured lessons covering foundations, grammar, and vocabulary.",
    href: "/learn"
  },
  {
    icon: "Users",
    title: "Community Features",
    description: "Connect with fellow learners through leaderboards and progress sharing.",
    href: "/leaderboard"
  },
  {
    icon: "Trophy",
    title: "Progress Tracking",
    description: "Monitor your learning journey with real-time progress tracking and achievements.",
    href: "/progress"
  },
  {
    icon: "Play",
    title: "Practice Exercises",
    description: "Reinforce your learning with interactive exercises and pronunciation practice.",
    href: "/practice"
  },
  {
    icon: "Target",
    title: "Structured Learning",
    description: "Follow a clear learning path from basics to advanced French concepts.",
    href: "/favorites"
  },
  {
    icon: "Globe",
    title: "Cultural Context",
    description: "Learn French with cultural insights and practical language usage.",
    href: "/conversations"
  }
];

// Stats are now dynamic - fetched from Firebase in DynamicStats component

const learningPath = [
  { step: 1, title: "Foundations", description: "Master the basics", icon: "BookOpen", href: "/alphabet" },
  { step: 2, title: "Grammar", description: "Learn French structure", icon: "Target", href: "/grammar" },
  { step: 3, title: "Vocabulary", description: "Expand your word bank", icon: "Globe", href: "/vocabulary" },
  { step: 4, title: "Practice", description: "Apply what you learn", icon: "Play", href: "/practice" },
  { step: 5, title: "Conversations", description: "Real-world dialogue", icon: "Users", href: "/conversations" },
  { step: 6, title: "Culture", description: "Understand French culture", icon: "Heart", href: "/culture" }
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        {/* Hero Section - Static Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Bienvenue à <span className="text-blue-600">Français Pro</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your journey to learning French starts here. Master the fundamentals with structured lessons, 
            practice with interactive exercises, and track your progress with our free learning platform.
          </p>
          
          {/* Interactive CTA Buttons */}
          <WelcomeInteractions features={features} />
          
          {/* Dynamic Stats */}
          <DynamicStats />
        </div>

        {/* Learning Path - Static Content */}
        <div className="my-16">
          <h2 className="text-2xl font-bold text-center mb-8">Your Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPath.map((step) => (
              <Link key={step.step} href={step.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {step.icon === "BookOpen" && <BookOpen className="h-5 w-5 text-blue-600" />}
                        {step.icon === "Target" && <Target className="h-5 w-5 text-blue-600" />}
                        {step.icon === "Globe" && <Globe className="h-5 w-5 text-blue-600" />}
                        {step.icon === "Play" && <Play className="h-5 w-5 text-blue-600" />}
                        {step.icon === "Users" && <Users className="h-5 w-5 text-blue-600" />}
                        {step.icon === "Heart" && <Heart className="h-5 w-5 text-blue-600" />}
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
                  </Link>
            ))}
                        </div>
                      </div>

        {/* Why Choose Us - Static Content */}
        <div className="my-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Français Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Free</h3>
              <p className="text-muted-foreground">
                No hidden costs or subscriptions. Access all lessons and features completely free forever.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Self-Paced Learning</h3>
              <p className="text-muted-foreground">
                Learn at your own speed with structured lessons covering foundations, grammar, and vocabulary.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with real-time progress tracking and achievement system.
              </p>
            </div>
          </div>
          
          {/* Additional Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Lessons</h3>
              <p className="text-muted-foreground">
                Engaging lessons with exercises, examples, and audio pronunciation for better learning.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Features</h3>
              <p className="text-muted-foreground">
                Connect with fellow learners through leaderboards and shared progress tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-muted-foreground">
                Learn anywhere, anytime with our responsive design that works perfectly on all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action - Static Content */}
        <div className="my-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Ready to Start Your French Journey?</CardTitle>
              <CardDescription className="text-lg text-gray-900 dark:text-white">
                Begin learning French today with our free, structured lessons and interactive features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/alphabet">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="hover:shadow-lg active:scale-95 transition-all duration-200 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Try Sample Lesson
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}