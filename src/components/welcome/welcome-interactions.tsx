'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthModal } from '@/components/ui/auth-modal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  ArrowRight,
  Play,
  Target,
  Globe
} from 'lucide-react';

interface WelcomeInteractionsProps {
  features: Array<{
    icon: string;
    title: string;
    description: string;
    href: string;
  }>;
}

export function WelcomeInteractions({ features }: WelcomeInteractionsProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const gate = () => (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      {/* Interactive CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/home">
          <Button 
            size="lg" 
            className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200"
            onClick={gate()}
          >
            Start Learning Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/alphabet">
          <Button 
            variant="outline" 
            size="lg"
            className="hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Lessons
          </Button>
        </Link>
      </div>

      {/* Interactive Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href} onClick={gate()}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {feature.icon === "BookOpen" && <BookOpen className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "Users" && <Users className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "Trophy" && <Trophy className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "Play" && <Play className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "Target" && <Target className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "Globe" && <Globe className="h-6 w-6 text-blue-600" />}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats are now handled by DynamicStats component */}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}
