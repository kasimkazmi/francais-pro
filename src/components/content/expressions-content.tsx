'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { ArrowRight, MessageCircle, Lightbulb, Briefcase, Laptop, Plane, Trophy, Star } from 'lucide-react';
import expressionsData from '@/data/expressions.json';
import { useFavorites } from '@/contexts/FavoritesContext';

export function ExpressionsContent() {
  const { idioms, proverbs, slang, business, technology, travel, sports } = expressionsData;
  const { toggleFavorite, isFavorite } = useFavorites();

  const categories = [
    { name: 'Idioms', data: idioms, icon: MessageCircle, color: 'text-blue-500' },
    { name: 'Proverbs', data: proverbs, icon: Lightbulb, color: 'text-yellow-500' },
    { name: 'Slang', data: slang, icon: Star, color: 'text-purple-500' },
    { name: 'Business', data: business, icon: Briefcase, color: 'text-green-500' },
    { name: 'Technology', data: technology, icon: Laptop, color: 'text-cyan-500' },
    { name: 'Travel', data: travel, icon: Plane, color: 'text-orange-500' },
    { name: 'Sports', data: sports, icon: Trophy, color: 'text-red-500' }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">French Expressions & Idioms</h1>
        <div className="flex items-center space-x-2">
          <Link href="/practice?category=expressions">
            <EnhancedButton variant="outline" size="sm" tooltip="Practice using expressions in context">
              Expression Practice
            </EnhancedButton>
          </Link>
          <Link href="/practice">
            <EnhancedButton variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </EnhancedButton>
          </Link>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Master French expressions, idioms, and colloquial language to sound like a native speaker and understand cultural nuances.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <MessageCircle className="mt-0.5 h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Expression Tip</p>
              <p className="text-sm text-muted-foreground">
                French expressions often have literal meanings that differ from their actual usage. Understanding context is key to using them correctly.
              </p>
            </div>
          </div>
        </div>

        {/* Expression Categories */}
        {categories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <IconComponent className={`h-6 w-6 ${category.color}`} />
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Badge variant="secondary" className="ml-auto">
                  {category.data.length} expressions
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.data.map((expression, expressionIndex) => (
                  <Card 
                    key={expressionIndex} 
                    className="group universal-card hover:shadow-lg hover:scale-105"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                            {expression.french}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{expression.english}</p>
                          
                          {(expression as any).literal && (
                            <div className="mb-2">
                              <Badge variant="outline" className="text-xs">
                                Literal: {(expression as any).literal}
                              </Badge>
                            </div>
                          )}
                          
                          <p className="text-xs text-muted-foreground italic mb-2">
                            Usage: {expression.usage}
                          </p>
                          
                          <Badge variant="secondary" className="text-xs">
                            {expression.pronunciation}
                          </Badge>
                          
                          {(expression as any).level && (
                            <Badge variant="destructive" className="text-xs ml-2">
                              {(expression as any).level}
                            </Badge>
                          )}
                        </div>
                        <AudioButton 
                          text={`${expression.french}, ${expression.english}`}
                          size="sm"
                          tooltipContent={`Listen to: ${expression.french}`}
                        />
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <SimpleTooltip content={isFavorite('expression', expression.french) ? "Remove from favorites" : "Add to favorites"}>
                          <EnhancedButton 
                            variant="ghost" 
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                              isFavorite('expression', expression.french) ? 'text-yellow-500' : ''
                            }`}
                            onClick={() => toggleFavorite({
                              type: 'expression',
                              french: expression.french,
                              english: expression.english,
                              category: category.name,
                              pronunciation: expression.pronunciation,
                              example: (expression as any).usage || (expression as any).literal
                            })}
                          >
                            <Star className={`h-4 w-4 ${isFavorite('expression', expression.french) ? 'fill-current' : ''}`} />
                          </EnhancedButton>
                        </SimpleTooltip>
                        
                        <SimpleTooltip content="Practice this expression">
                          <Link href={`/practice?category=expressions&expression=${encodeURIComponent(expression.french)}`}>
                            <EnhancedButton 
                              variant="outline" 
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Practice
                            </EnhancedButton>
                          </Link>
                        </SimpleTooltip>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Practice Section */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6">Expression Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Context Practice
                </CardTitle>
                <CardDescription>
                  Practice using expressions in real situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/practice?category=expressions&type=context">
                  <EnhancedButton 
                    className="w-full"
                    tooltip="Start context-based practice"
                  >
                    Start Context Practice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </EnhancedButton>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Expression Matching
                </CardTitle>
                <CardDescription>
                  Match expressions with their meanings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/practice?category=expressions&type=matching">
                  <EnhancedButton 
                    variant="outline"
                    className="w-full"
                    tooltip="Start expression matching game"
                  >
                    Start Matching
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </EnhancedButton>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Daily Expressions
                </CardTitle>
                <CardDescription>
                  Learn one expression per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/practice?category=expressions&type=daily">
                  <EnhancedButton 
                    variant="secondary"
                    className="w-full"
                    tooltip="Start daily expression learning"
                  >
                    Start Daily Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </EnhancedButton>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Master French Expressions</h3>
          <p className="text-muted-foreground mb-4">
            Using expressions correctly will make you sound more natural and help you understand French culture better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/practice?category=expressions">
              <EnhancedButton 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                tooltip="Start comprehensive expression practice"
              >
                Start Expression Mastery
                <ArrowRight className="ml-2 h-4 w-4" />
              </EnhancedButton>
            </Link>
            <Link href="/practice?category=expressions&type=custom">
              <EnhancedButton 
                variant="outline"
                tooltip="Create custom expression lists"
              >
                Create Custom Lists
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
