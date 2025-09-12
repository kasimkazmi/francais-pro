import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { ArrowRight, BookOpen, Lightbulb, Target } from 'lucide-react';
import grammarData from '@/data/grammar.json';
import { GrammarData, Verb } from '@/types/data-types';

export function GrammarContent() {
  const { articles, pronouns, verbs, adjectives, prepositions } = grammarData as GrammarData;
  
  // Convert verbs object to array for easier mapping
  const verbsArray = Object.values(verbs) as Verb[];
  
  // Convert adjectives object to array for easier mapping
  const adjectivesArray = adjectives.common;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">French Grammar</h1>
        <div className="flex items-center space-x-2">
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Grammar Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Master the essential French grammar rules. Understanding grammar is crucial for building proper sentences and communicating effectively in French.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm font-medium">Grammar Tip</p>
              <p className="text-sm text-muted-foreground">
                French grammar has specific rules for gender, number, and word order. Practice regularly to internalize these patterns.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Articles</h2>
        <p className="text-muted-foreground mb-6">
          Articles are words that come before nouns to indicate gender and number:
        </p>

        <div className="my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Definite Articles
                </CardTitle>
                <CardDescription>Used when referring to specific nouns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {articles.definite.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <span className="font-semibold">{article.french}</span>
                        <span className="text-muted-foreground ml-2">({article.english})</span>
                      </div>
                      <AudioButton 
                        text={article.french} 
                        size="sm" 
                        tooltipContent="Click to hear pronunciation"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Indefinite Articles
                </CardTitle>
                <CardDescription>Used when referring to non-specific nouns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {articles.indefinite.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <span className="font-semibold">{article.french}</span>
                        <span className="text-muted-foreground ml-2">({article.english})</span>
                      </div>
                      <AudioButton 
                        text={article.french} 
                        size="sm" 
                        tooltipContent="Click to hear pronunciation"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Pronouns</h2>
        <p className="text-muted-foreground mb-6">
          Pronouns replace nouns to avoid repetition:
        </p>

        <div className="my-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Subject Pronouns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {pronouns.subject.map((pronoun, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">{pronoun.french}</span>
                      <span className="text-muted-foreground ml-2 text-sm">({pronoun.english})</span>
                    </div>
                    <AudioButton 
                      text={pronoun.french} 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Common Verbs</h2>
        <p className="text-muted-foreground mb-6">
          Essential French verbs with their conjugations:
        </p>

        <div className="my-6">
          <div className="space-y-4">
            {verbsArray.map((verb, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{verb.infinitive}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{verb.english}</Badge>
                      <AudioButton 
                        text={verb.infinitive} 
                        size="sm" 
                        tooltipContent="Click to hear pronunciation"
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {verb.conjugations.map((conjugation, conjIndex) => (
                      <div key={conjIndex} className="flex items-center justify-between p-2 rounded bg-muted/30">
                        <span className="text-sm font-medium">{conjugation.pronoun}</span>
                        <span className="text-sm">{conjugation.french}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Adjectives</h2>
        <p className="text-muted-foreground mb-6">
          French adjectives must agree with the nouns they describe:
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adjectivesArray.map((adjective, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">{adjective.french}</span>
                      <span className="text-muted-foreground ml-2">/ {adjective.feminine}</span>
                      <span className="text-muted-foreground ml-2 text-sm">({adjective.english})</span>
                    </div>
                    <AudioButton 
                      text={`${adjective.french}, ${adjective.feminine}`} 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Prepositions</h2>
        <p className="text-muted-foreground mb-6">
          Common French prepositions and their usage:
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prepositions.map((preposition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-semibold">{preposition.french}</span>
                      <span className="text-muted-foreground ml-2">({preposition.english})</span>
                    </div>
                    <AudioButton 
                      text={preposition.french} 
                      size="sm" 
                      tooltipContent="Click to hear pronunciation"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Ready to Practice?</h3>
          <p className="text-muted-foreground mb-4">
            Test your grammar knowledge with our interactive exercises and quizzes.
          </p>
          <Link href="/practice">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Grammar Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
