import { CheckCircle, Clock, Award, Play, Users, Globe } from "lucide-react";

export const featureCards = [
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
 export  const features = [
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
  
 export const learningPath = [
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
  