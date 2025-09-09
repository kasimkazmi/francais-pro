import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { AudioButton } from '@/components/ui/audio-button';
import { ArrowRight, Volume2, Play } from 'lucide-react';

export default function PronunciationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">French Pronunciation</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Practice Mode
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Master French pronunciation with our comprehensive guide to sounds, accents, and rhythm patterns.
          </p>

          <div className="my-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-2">
              <Volume2 className="mt-0.5 h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Pronunciation Tip</p>
                <p className="text-sm text-muted-foreground">
                  French pronunciation is all about rhythm and flow. Practice speaking slowly and clearly.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">French Vowels</h2>
          <p className="text-muted-foreground mb-4">
            French has 16 vowel sounds, more than English. Here are the most important ones:
          </p>

          <div className="my-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">A, À, Â</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono">chat</span>
                      <AudioButton 
                        text="chat, like ah in father"
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Like "ah" in "father"</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">E, É, È</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono">été</span>
                      <AudioButton 
                        text="chat, like ah in father"
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Like "ay" in "say"</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">I, Î</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono">fini</span>
                      <AudioButton 
                        text="chat, like ah in father"
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Like "ee" in "see"</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">O, Ô</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono">mot</span>
                      <AudioButton 
                        text="chat, like ah in father"
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Like "oh" in "go"</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Consonants & Special Sounds</h2>
          <p className="text-muted-foreground mb-4">
            French consonants have some unique characteristics:
          </p>

          <div className="my-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg">
                <Badge variant="secondary" className="mr-4">R</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold">French R</h3>
                  <p className="text-sm text-muted-foreground">A guttural sound made in the back of the throat</p>
                  <div className="flex items-center mt-2">
                    <span className="font-mono mr-2">rouge</span>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 border rounded-lg">
                <Badge variant="secondary" className="mr-4">GN</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold">GN Sound</h3>
                  <p className="text-sm text-muted-foreground">Like "ny" in "canyon"</p>
                  <div className="flex items-center mt-2">
                    <span className="font-mono mr-2">agneau</span>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 border rounded-lg">
                <Badge variant="secondary" className="mr-4">CH</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold">CH Sound</h3>
                  <p className="text-sm text-muted-foreground">Like "sh" in "shoe"</p>
                  <div className="flex items-center mt-2">
                    <span className="font-mono mr-2">château</span>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Silent Letters</h2>
          <p className="text-muted-foreground mb-4">
            French has many silent letters. Here are the most common patterns:
          </p>

          <div className="relative my-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Silent Final Consonants</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• <span className="font-mono">chat</span> (silent 't')</li>
                    <li>• <span className="font-mono">grand</span> (silent 'd')</li>
                    <li>• <span className="font-mono">vert</span> (silent 't')</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Silent H</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• <span className="font-mono">homme</span> (silent 'h')</li>
                    <li>• <span className="font-mono">heure</span> (silent 'h')</li>
                    <li>• <span className="font-mono">hôtel</span> (silent 'h')</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Practice Your Pronunciation</h3>
            <p className="text-muted-foreground mb-4">
              Use our interactive pronunciation exercises to perfect your French accent.
            </p>
            <Link href="/practice">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                Start Pronunciation Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
