import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { AudioButton } from '@/components/ui/audio-button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Tooltip } from '@/components/ui/tooltip';
import { ArrowRight, BookOpen, Lightbulb, Target } from 'lucide-react';
import grammarData from '@/data/grammar.json';

export default function GrammarPage() {
  const { articles, pronouns, verbs, adjectives, prepositions } = grammarData;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">French Grammar</h1>
          <div className="flex items-center space-x-2">
            <EnhancedButton variant="outline" size="sm" tooltip="Practice grammar exercises">
              Practice Mode
            </EnhancedButton>
            <EnhancedButton variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </EnhancedButton>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Master French grammar with comprehensive lessons on articles, pronouns, verbs, and more.
          </p>

          <div className="my-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-2">
              <Lightbulb className="mt-0.5 h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Grammar Tip</p>
                <p className="text-sm text-muted-foreground">
                  French grammar follows specific rules. Practice regularly to internalize these patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Articles Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Articles</h2>
          <p className="text-muted-foreground mb-6">
            Articles are essential in French. They indicate gender and number of nouns.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Definite Articles
                </CardTitle>
                <CardDescription>Used to refer to specific nouns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {articles.definite.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">{article.french}</span>
                          <Badge variant="secondary" className="text-xs">
                            {article.pronunciation}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{article.english}</p>
                        <p className="text-xs text-muted-foreground italic">{article.example}</p>
                      </div>
                      <AudioButton 
                        text={`${article.french}, ${article.english}, example: ${article.example}`}
                        size="sm"
                        tooltipContent={`Listen to: ${article.french}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Indefinite Articles
                </CardTitle>
                <CardDescription>Used to refer to non-specific nouns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {articles.indefinite.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">{article.french}</span>
                          <Badge variant="secondary" className="text-xs">
                            {article.pronunciation}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{article.english}</p>
                        <p className="text-xs text-muted-foreground italic">{article.example}</p>
                      </div>
                      <AudioButton 
                        text={`${article.french}, ${article.english}, example: ${article.example}`}
                        size="sm"
                        tooltipContent={`Listen to: ${article.french}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pronouns Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Pronouns</h2>
          <p className="text-muted-foreground mb-6">
            Pronouns replace nouns to avoid repetition and make sentences flow better.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Subject Pronouns</CardTitle>
                <CardDescription>Used as the subject of a sentence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {pronouns.subject.map((pronoun, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div>
                        <span className="font-semibold">{pronoun.french}</span>
                        <p className="text-sm text-muted-foreground">{pronoun.english}</p>
                      </div>
                      <AudioButton 
                        text={`${pronoun.french}, ${pronoun.english}`}
                        size="sm"
                        tooltipContent={`Listen to: ${pronoun.french}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Object Pronouns</CardTitle>
                <CardDescription>Used as the object of a verb</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {pronouns.object.map((pronoun, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div>
                        <span className="font-semibold">{pronoun.french}</span>
                        <p className="text-sm text-muted-foreground">{pronoun.english}</p>
                      </div>
                      <AudioButton 
                        text={`${pronoun.french}, ${pronoun.english}`}
                        size="sm"
                        tooltipContent={`Listen to: ${pronoun.french}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verbs Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Essential Verbs</h2>
          <p className="text-muted-foreground mb-6">
            Master these fundamental verbs to build strong French sentences.
          </p>

          <div className="space-y-6 mb-8">
            {Object.entries(verbs).map(([verbKey, verbData]) => (
              <Card key={verbKey} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {verbData.infinitive} - {verbData.english}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {verbData.conjugations.map((conjugation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{conjugation.pronoun}</span>
                            <span className="text-primary font-mono">{conjugation.french}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{conjugation.english}</p>
                          <p className="text-xs text-muted-foreground">{conjugation.pronunciation}</p>
                        </div>
                        <AudioButton 
                          text={`${conjugation.pronoun} ${conjugation.french}, ${conjugation.english}`}
                          size="sm"
                          tooltipContent={`Listen to: ${conjugation.pronoun} ${conjugation.french}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Adjectives Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Common Adjectives</h2>
          <p className="text-muted-foreground mb-6">
            Adjectives must agree with the gender and number of the nouns they describe.
          </p>

          <Card className="hover:shadow-lg transition-all duration-300 mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {adjectives.common.map((adjective, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{adjective.french}</span>
                        <span className="text-sm text-muted-foreground">/</span>
                        <span className="font-semibold text-primary">{adjective.feminine}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{adjective.english}</p>
                      <p className="text-xs text-muted-foreground italic">{adjective.example}</p>
                    </div>
                    <AudioButton 
                      text={`${adjective.french}, ${adjective.feminine}, ${adjective.english}`}
                      size="sm"
                      tooltipContent={`Listen to: ${adjective.french} and ${adjective.feminine}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prepositions Section */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Prepositions</h2>
          <p className="text-muted-foreground mb-6">
            Prepositions show relationships between words in a sentence.
          </p>

          <Card className="hover:shadow-lg transition-all duration-300 mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {prepositions.map((preposition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{preposition.french}</span>
                        <Badge variant="secondary" className="text-xs">
                          {preposition.pronunciation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{preposition.english}</p>
                      <p className="text-xs text-muted-foreground italic">{preposition.example}</p>
                    </div>
                    <AudioButton 
                      text={`${preposition.french}, ${preposition.english}, example: ${preposition.example}`}
                      size="sm"
                      tooltipContent={`Listen to: ${preposition.french}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Master French Grammar</h3>
            <p className="text-muted-foreground mb-4">
              Practice with our interactive grammar exercises and build confidence in French sentence structure.
            </p>
            <Link href="/practice">
              <EnhancedButton 
                className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200"
                tooltip="Start comprehensive grammar practice"
              >
                Start Grammar Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
