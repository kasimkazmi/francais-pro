import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Volume2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Interactive Demo</h1>
          <p className="text-muted-foreground">
            Experience Français Pro with this interactive demonstration
          </p>
        </div>

        {/* Demo Sections */}
        <div className="grid gap-8">
          {/* Vocabulary Flashcard Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Vocabulary Flashcard
              </CardTitle>
              <CardDescription>
                Practice French vocabulary with interactive flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">🍎</div>
                    <div className="text-2xl font-bold mb-2">Pomme</div>
                    <div className="text-muted-foreground mb-4">/pɔm/</div>
                    <Button variant="outline" className="mb-4">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Click to reveal translation
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Hard
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Easy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grammar Exercise Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Grammar Exercise
              </CardTitle>
              <CardDescription>
                Practice French grammar with interactive exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Complete the sentence with the correct article:
                  </h3>
                  <div className="text-xl mb-4">
                    Je mange <span className="border-b-2 border-primary min-w-[60px] inline-block"></span> pomme.
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <Button variant="outline">le</Button>
                  <Button variant="outline">la</Button>
                  <Button variant="outline">les</Button>
                </div>
                <div className="text-center">
                  <Badge variant="secondary">Hint: Apple is feminine in French</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Progress Tracking
              </CardTitle>
              <CardDescription>
                Monitor your learning progress with detailed analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Vocabulary Mastery</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">72%</div>
                  <div className="text-sm text-muted-foreground">Grammar Accuracy</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">7</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                  <div className="text-xs text-muted-foreground mt-1">Keep it up! 🔥</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Ready to Start Learning?</CardTitle>
              <CardDescription>
                Join thousands of learners mastering French with Français Pro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild>
                <Link href="/learn">
                  Start Your French Journey
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
