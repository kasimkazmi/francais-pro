import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/layout/app-shell';
import { AudioButton } from '@/components/ui/audio-button';
import { LazyCardGrid } from '@/components/ui/lazy-card';
import { ArrowRight, Volume2 } from 'lucide-react';
import alphabetData from '@/data/alphabet.json';

export default function AlphabetPage() {
  const { alphabet, specialCharacters, spellingWords } = alphabetData;

  return (
    <AppShell>
      <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">French Alphabet</h1>
          <div className="flex items-center space-x-2">
            <Link href="/practice">
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-700 active:scale-95 transition-all duration-200">
                Practice Mode
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Learn the French alphabet with proper pronunciation. The French alphabet has 26 letters, just like English, but with different pronunciations.
          </p>

          <div className="my-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-2">
              <Volume2 className="mt-0.5 h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Alphabet Tip</p>
                <p className="text-sm text-muted-foreground">
                  French letters are pronounced differently than English. Practice each letter sound carefully.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The French Alphabet</h2>
          <p className="text-muted-foreground mb-6">
            Click on each letter to hear its pronunciation:
          </p>

          {/* Alphabet Grid */}
          <div className="my-6">
            <LazyCardGrid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3" staggerDelay={50}>
              {alphabet.map((item, index) => (
                <Card key={index} className="universal-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-2">{item.letter}</div>
                    <div className="text-sm text-muted-foreground mb-2">{item.pronunciation}</div>
                    <div className="text-xs text-muted-foreground mb-2">{item.example}</div>
                    <AudioButton 
                      text={`${item.letter}, ${item.pronunciation}, ${item.example}`}
                      className="w-full"
                      size="sm"
                      tooltipContent={`Click to hear: ${item.letter} (${item.pronunciation})`}
                    />
                  </CardContent>
                </Card>
              ))}
            </LazyCardGrid>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Special Characters</h2>
          <p className="text-muted-foreground mb-4">
            French uses several special characters with accents:
          </p>

          <div className="my-6">
            <LazyCardGrid className="grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" staggerDelay={100}>
              {specialCharacters.map((char, index) => (
                <Card key={index} className="universal-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{char.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg">{char.character}</span>
                        <AudioButton 
                          text={`${char.character}, ${char.description}, examples: ${char.examples.join(', ')}`}
                          size="sm"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{char.description}</p>
                      <p className="text-xs text-muted-foreground">Example: {char.examples.join(', ')}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </LazyCardGrid>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Spelling Practice</h2>
          <p className="text-muted-foreground mb-4">
            Practice spelling common French words:
          </p>

          <div className="my-6">
            <LazyCardGrid className="space-y-4" staggerDelay={150}>
              {spellingWords.map((word, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg universal-card">
                  <Badge variant="secondary" className="mr-4">{index + 1}</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold">{word.word}</h3>
                    <p className="text-sm text-muted-foreground">{word.spelling}</p>
                  </div>
                  <AudioButton 
                    text={`${word.word}, spelled ${word.spelling}`}
                    size="sm"
                  />
                </div>
              ))}
            </LazyCardGrid>
          </div>

          <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Master the Alphabet</h3>
            <p className="text-muted-foreground mb-4">
              Practice spelling and pronunciation with our interactive alphabet exercises.
            </p>
            <Link href="/practice">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                Start Alphabet Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
