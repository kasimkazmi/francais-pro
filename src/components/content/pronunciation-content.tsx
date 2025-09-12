import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioButton } from '@/components/ui/audio-button';
import { ArrowRight } from 'lucide-react';

export function PronunciationContent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">French Pronunciation</h1>
        <div className="flex items-center space-x-2">
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Pronunciation Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Master French pronunciation with our comprehensive guide. Learn the sounds, rules, and techniques to speak French like a native.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm font-medium">Pronunciation Tip</p>
              <p className="text-sm text-muted-foreground">
                French pronunciation is different from English. Focus on the rhythm, nasal sounds, and silent letters.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">French Vowel Sounds</h2>
        <p className="text-muted-foreground mb-6">
          French has unique vowel sounds that don&apos;t exist in English:
        </p>

        <div className="my-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AudioButton 
                  text="Basic vowel sounds in French: a, e, i, o, u"
                  size="sm"
                  variant="ghost"
                />
                Basic Vowel Sounds
              </CardTitle>
              <CardDescription>Essential French vowel pronunciations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">a</span>
                    <span className="text-muted-foreground ml-2">(ah)</span>
                  </div>
                  <AudioButton text="a" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">e</span>
                    <span className="text-muted-foreground ml-2">(uh)</span>
                  </div>
                  <AudioButton text="e" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">i</span>
                    <span className="text-muted-foreground ml-2">(ee)</span>
                  </div>
                  <AudioButton text="i" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">o</span>
                    <span className="text-muted-foreground ml-2">(oh)</span>
                  </div>
                  <AudioButton text="o" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">u</span>
                    <span className="text-muted-foreground ml-2">(oo)</span>
                  </div>
                  <AudioButton text="u" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">y</span>
                    <span className="text-muted-foreground ml-2">(ee-grek)</span>
                  </div>
                  <AudioButton text="y" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Nasal Sounds</h2>
        <p className="text-muted-foreground mb-6">
          French nasal sounds are unique and important to master:
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">an/am</span>
                    <span className="text-muted-foreground ml-2">(ahn)</span>
                  </div>
                  <AudioButton text="an" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">en/em</span>
                    <span className="text-muted-foreground ml-2">(ahn)</span>
                  </div>
                  <AudioButton text="en" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">in/im</span>
                    <span className="text-muted-foreground ml-2">(ahn)</span>
                  </div>
                  <AudioButton text="in" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">on/om</span>
                    <span className="text-muted-foreground ml-2">(ohn)</span>
                  </div>
                  <AudioButton text="on" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <span className="font-semibold">un/um</span>
                    <span className="text-muted-foreground ml-2">(uhn)</span>
                  </div>
                  <AudioButton text="un" size="sm" tooltipContent="Click to hear pronunciation" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Common Words Practice</h2>
        <p className="text-muted-foreground mb-6">
          Practice pronunciation with common French words:
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg mb-3">Basic Words</h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">bonjour</span>
                      <span className="text-muted-foreground ml-2">(hello)</span>
                    </div>
                    <AudioButton text="bonjour" size="sm" tooltipContent="Click to hear pronunciation" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">merci</span>
                      <span className="text-muted-foreground ml-2">(thank you)</span>
                    </div>
                    <AudioButton text="merci" size="sm" tooltipContent="Click to hear pronunciation" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">au revoir</span>
                      <span className="text-muted-foreground ml-2">(goodbye)</span>
                    </div>
                    <AudioButton text="au revoir" size="sm" tooltipContent="Click to hear pronunciation" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg mb-3">Colors</h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">rouge</span>
                      <span className="text-muted-foreground ml-2">(red)</span>
                    </div>
                    <AudioButton text="rouge" size="sm" tooltipContent="Click to hear pronunciation" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">bleu</span>
                      <span className="text-muted-foreground ml-2">(blue)</span>
                    </div>
                    <AudioButton text="bleu" size="sm" tooltipContent="Click to hear pronunciation" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">vert</span>
                      <span className="text-muted-foreground ml-2">(green)</span>
                    </div>
                    <AudioButton text="vert" size="sm" tooltipContent="Click to hear pronunciation" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Pronunciation Rules</h2>
        <p className="text-muted-foreground mb-6">
          Important rules to remember when pronouncing French words:
        </p>

        <div className="my-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Silent Letters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Many French letters are silent, especially at the end of words. For example, in &ldquo;parler&rdquo; (to speak), the final &ldquo;r&rdquo; is silent.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Liaison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When a word ending in a consonant is followed by a word beginning with a vowel, the consonant is pronounced. For example, &ldquo;les amis&rdquo; sounds like &ldquo;lez ami&rdquo;.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accent Marks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Accent marks change pronunciation. For example, &ldquo;é&rdquo; is pronounced like &ldquo;ay&rdquo; in &ldquo;say&rdquo;, while &ldquo;è&rdquo; is pronounced like &ldquo;eh&rdquo; in &ldquo;bed&rdquo;.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Ready to Practice?</h3>
          <p className="text-muted-foreground mb-4">
            Test your pronunciation skills with our interactive exercises and audio practice.
          </p>
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Pronunciation Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
