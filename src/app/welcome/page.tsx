import { Header } from "@/components/layout/header";
import { WelcomeInteractions } from "@/components/welcome/welcome-interactions";
import { DynamicStats } from "@/components/welcome/dynamic-stats";
import { HalloweenPageWrapper } from "@/components/halloween/halloween-page-wrapper";
import { SeasonalCard } from "@/components/seasonal/seasonal-card";
import { SeasonalWelcome } from "@/components/seasonal/seasonal-welcome";
import { SeasonalHeading } from "@/components/seasonal/seasonal-heading";
import { ThemeAwareButton } from "@/components/seasonal/theme-aware-button";
import { ThemeAwareFeatureCard } from "@/components/seasonal/theme-aware-feature-card";
import { DraggableLearningPath } from "@/components/seasonal/draggable-learning-path";
import {
  BookOpen,
  Users,
  ArrowRight,
  Play,
  Globe,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
// import Image from "next/image";

// Feature cards data
const featureCards = [
  {
    icon: CheckCircle,
    title: "100% Free",
    description:
      "No hidden costs or subscriptions. Access all lessons and features completely free forever.",
    iconType: "CheckCircle",
  },
  {
    icon: Clock,
    title: "Self-Paced Learning",
    description:
      "Learn at your own speed with structured lessons covering foundations, grammar, and vocabulary.",
    iconType: "Clock",
  },
  {
    icon: Award,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with real-time progress tracking and achievement system.",
    iconType: "Trophy",
  },
  {
    icon: Play,
    title: "Interactive Lessons",
    description:
      "Engaging lessons with exercises, examples, and audio pronunciation for better learning.",
    iconType: "Play",
  },
  {
    icon: Users,
    title: "Community Features",
    description:
      "Connect with fellow learners through leaderboards and shared progress tracking.",
    iconType: "Users",
  },
  {
    icon: Globe,
    title: "Mobile Optimized",
    description:
      "Learn anywhere, anytime with our responsive design that works perfectly on all devices.",
    iconType: "Globe",
  },
];

// Static data - using string identifiers for icons to avoid serialization issues
const features = [
  {
    icon: "BookOpen",
    title: "Interactive Lessons",
    description:
      "Learn with engaging, structured lessons covering foundations, grammar, and vocabulary.",
    href: "/learn",
  },
  {
    icon: "Users",
    title: "Community Features",
    description:
      "Connect with fellow learners through leaderboards and progress sharing.",
    href: "/leaderboard",
  },
  {
    icon: "Trophy",
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with real-time progress tracking and achievements.",
    href: "/progress",
  },
  {
    icon: "Play",
    title: "Practice Exercises",
    description:
      "Reinforce your learning with interactive exercises and pronunciation practice.",
    href: "/practice",
  },
  {
    icon: "Target",
    title: "Structured Learning",
    description:
      "Follow a clear learning path from basics to advanced French concepts.",
    href: "/favorites",
  },
  {
    icon: "Globe",
    title: "Cultural Context",
    description:
      "Learn French with cultural insights and practical language usage.",
    href: "/conversations",
  },
];

// Stats are now dynamic - fetched from Firebase in DynamicStats component

const learningPath = [
  {
    step: 1,
    title: "Foundations",
    description: "Master the basics",
    icon: "BookOpen",
    href: "/alphabet",
  },
  {
    step: 2,
    title: "Grammar",
    description: "Learn French structure",
    icon: "Target",
    href: "/grammar",
  },
  {
    step: 3,
    title: "Vocabulary",
    description: "Expand your word bank",
    icon: "Globe",
    href: "/vocabulary",
  },
  {
    step: 4,
    title: "Practice",
    description: "Apply what you learn",
    icon: "Play",
    href: "/practice",
  },
  {
    step: 5,
    title: "Conversations",
    description: "Real-world dialogue",
    icon: "Users",
    href: "/conversations",
  },
  {
    step: 6,
    title: "Culture",
    description: "Understand French culture",
    icon: "Heart",
    href: "/culture",
  },
];

export default function WelcomePage() {
  return (
    <HalloweenPageWrapper
      showLoader={true}
      loaderDuration={3000}
      decorationIntensity="medium"
      className="min-h-screen bg-background w-full"
    >
      <Header />

      <div className="flex w-full">
        {/* Left Sidebar - Decorative/Additional Content */}
        <div className="hidden xl:block w-64 xl:w-80 flex-shrink-0 px-4 py-8">
          <div className="sticky top-24 space-y-6">
            {/* Quick Stats Sidebar */}
            {/* <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Stats</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Lessons</span>
                  <span className="font-mono">150+</span>
                </div>
                <div className="flex justify-between">
                  <span>Students</span>
                  <span className="font-mono">10K+</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages</span>
                  <span className="font-mono">1</span>
                </div>
              </div>
            </div> */}

            {/* Theme Toggle Sidebar */}
            {/* <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Themes</h3>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Switch themes for a unique learning experience</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">🎃 Halloween</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">🎄 Christmas</span>
                  <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">🌸 Spring</span>
                </div>
              </div>
            </div> */}

            {/* Decorative Elements */}
            {/* <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 border">
              <div className="text-center">
                <Image src="/globe.svg" alt="Globe" className="w-8 h-8 mx-auto mb-2" width={32} height={32} />
                <div className="text-xs text-muted-foreground">Bonjour! Ready to learn French?</div>
              </div>
            </div> */}

            {/* Halloween Decoration */}
            {/* <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg p-4 border">
              <div className="text-center">
                <Image src="/halloween/images/pumkin.gif" alt="Pumpkin" className="w-12 h-12 mx-auto mb-2" width={48} height={48} />
                <div className="text-xs font-semibold text-orange-800 dark:text-orange-200">Spooky Learning</div>
                <div className="text-xs text-muted-foreground">Halloween theme active!</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto max-w-4xl px-4 py-4 md:py-8">
          {/* Hero Section - Seasonal Theme Content */}
        <div className="text-center mb-8">
          <SeasonalWelcome />

          {/* Interactive CTA Buttons */}
          <WelcomeInteractions features={features} />

          {/* Dynamic Stats */}
          <DynamicStats />
        </div>

        {/* Learning Path - Interactive Puzzle */}
        <div className="my-16">
          <SeasonalHeading
            title="Your Learning Journey"
            description="Arrange the cards in the correct learning sequence (1-6)"
          />
          <DraggableLearningPath learningPath={learningPath} />
        </div>

        {/* Why Choose Us - Seasonal Theme Content */}
        <div className="my-16">
          <SeasonalHeading
            title="Why Choose Français Pro?"
            description="Discover what makes our platform special"
          />

          {/* Unique Diagonal Pattern Layout */}
          <div className="space-y-12">
            {/* First Row - 3 cards with unique diagonal effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {featureCards.slice(0, 3).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className={`transform transition-all duration-500 hover:scale-110 hover:rotate-2 ${
                      index === 0
                        ? "md:translate-y-0 md:translate-x-2 lg:translate-x-4"
                        : index === 1
                        ? "md:translate-y-6 lg:translate-y-10 md:-translate-x-1 lg:-translate-x-2"
                        : "md:translate-y-12 lg:translate-y-16 md:translate-x-3 lg:translate-x-6"
                    }`}
                  >
                    <ThemeAwareFeatureCard
                      icon={<IconComponent />}
                      title={feature.title}
                      description={feature.description}
                      iconType={feature.iconType}
                    />
                  </div>
                );
              })}
            </div>

            {/* Second Row - 3 cards with opposite diagonal effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {featureCards.slice(3, 6).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index + 3}
                    className={`transform transition-all duration-500 hover:scale-110 hover:-rotate-2 ${
                      index === 0
                        ? "md:translate-y-0 md:-translate-x-2 lg:-translate-x-4"
                        : index === 1
                        ? "md:translate-y-6 lg:translate-y-10 md:translate-x-1 lg:translate-x-2"
                        : "md:translate-y-12 lg:translate-y-16 md:-translate-x-3 lg:-translate-x-6"
                    }`}
                  >
                    <ThemeAwareFeatureCard
                      icon={<IconComponent />}
                      title={feature.title}
                      description={feature.description}
                      iconType={feature.iconType}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action - Seasonal Theme Content */}
        <div className="mt-24 text-center">
          <SeasonalCard
            titleClassName="text-2xl font-bold tracking-wide"
            descriptionClassName="text-xl tracking-widest mt-2"
            title="Ready to Start Your French Journey?"
            description="Begin learning French today with our free, structured lessons and interactive features."
            decoration="pumpkin"
            glow={true}
            animated={true}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ThemeAwareButton
                href="/home"
                size="lg"
                className="hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </ThemeAwareButton>
              <ThemeAwareButton
                href="/practice"
                variant="outline"
                size="lg"
                className="hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Try Sample Lesson
              </ThemeAwareButton>
            </div>
          </SeasonalCard>
        </div>
        </div>

        {/* Right Sidebar - Additional Features/Ads */}
        <div className="hidden xl:block w-64 xl:w-80 flex-shrink-0 px-4 py-8">
          <div className="sticky top-24 space-y-6">
            {/* Learning Progress Sidebar */}
            {/* <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Your Progress</h3>
              <div className="space-y-3">
                <div className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span>Alphabet</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                <div className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span>Grammar</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                <div className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span>Vocabulary</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Quick Links Sidebar */}
            {/* <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Links</h3>
              <div className="space-y-2 text-xs">
                <a href="/alphabet" className="block p-2 hover:bg-muted rounded transition-colors">📚 Alphabet</a>
                <a href="/grammar" className="block p-2 hover:bg-muted rounded transition-colors">📝 Grammar</a>
                <a href="/vocabulary" className="block p-2 hover:bg-muted rounded transition-colors">📖 Vocabulary</a>
                <a href="/practice" className="block p-2 hover:bg-muted rounded transition-colors">🎯 Practice</a>
                <a href="/conversations" className="block p-2 hover:bg-muted rounded transition-colors">💬 Conversations</a>
              </div>
            </div> */}

            {/* Ad Space / Promotional */}
            {/* <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-4 border">
              <div className="text-center">
                <Image src="/file.svg" alt="File" className="w-8 h-8 mx-auto mb-2" width={32} height={32} />
                <div className="text-xs font-semibold mb-1">Pro Tip</div>
                <div className="text-xs text-muted-foreground">Practice 15 minutes daily for best results!</div>
              </div>
            </div> */}

            {/* Halloween Animation */}
            {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4 border">
              <div className="text-center">
                <Image src="/halloween/images/ghost-spirits.gif" alt="Ghost" className="w-10 h-10 mx-auto mb-2" width={40} height={40} />
                <div className="text-xs font-semibold text-purple-800 dark:text-purple-200">Boo!</div>
                <div className="text-xs text-muted-foreground">Learning is fun!</div>
              </div>
            </div> */}

            {/* Social/Community */}
            {/* <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Community</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Image src="/halloween/images/happyhalloween.gif" alt="Happy" className="w-4 h-4" width={16} height={16} />
                  <span>Join 10K+ learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/halloween/images/catbat.gif" alt="Bat" className="w-4 h-4" width={16} height={16} />
                  <span>Active discussions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/halloween/images/sketing.gif" alt="Skeleton" className="w-4 h-4" />
                  <span>Weekly challenges</span>
                </div>
              </div>
            </div> */}

            {/* More Halloween Decorations */}
            {/* <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg p-4 border">
              <div className="text-center">
                <Image src="/halloween/images/spooky.gif" alt="Spooky" className="w-12 h-12 mx-auto mb-2" width={48} height={48} />
                <div className="text-xs font-semibold text-yellow-800 dark:text-yellow-200">Trick or Treat!</div>
                <div className="text-xs text-muted-foreground">Learn French the spooky way</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </HalloweenPageWrapper>
  );
}
