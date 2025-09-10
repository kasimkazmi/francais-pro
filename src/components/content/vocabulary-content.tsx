'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { ArrowRight, Users, Heart, Palette, Briefcase, Smile, BookOpen } from 'lucide-react';
import vocabularyData from '@/data/vocabulary.json';
import { useFavorites } from '@/contexts/FavoritesContext';

export function VocabularyContent() {
  const { family, food, colors, professions, emotions } = vocabularyData;
  const { toggleFavorite, isFavorite } = useFavorites();

  const categories = [
    { name: 'Family', data: family, icon: Users, color: 'text-blue-500' },
    { name: 'Food', data: food, icon: Heart, color: 'text-red-500' },
    { name: 'Colors', data: colors, icon: Palette, color: 'text-purple-500' },
    { name: 'Professions', data: professions, icon: Briefcase, color: 'text-green-500' },
    { name: 'Emotions', data: emotions, icon: Smile, color: 'text-yellow-500' }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">French Vocabulary</h1>
        <div className="flex items-center space-x-2">
          <EnhancedButton variant="outline" size="sm" tooltip="Practice vocabulary with flashcards">
            Flashcard Mode
          </EnhancedButton>
          <EnhancedButton variant="ghost" size="sm">
            <ArrowRight className="h-4 w-4" />
          </EnhancedButton>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Expand your French vocabulary with essential words organized by category. Each word includes pronunciation and example sentences.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <BookOpen className="mt-0.5 h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Vocabulary Tip</p>
              <p className="text-sm text-muted-foreground">
                Practice new words daily. Use them in sentences to remember them better. Listen to pronunciations to improve your accent.
              </p>
            </div>
          </div>
        </div>

        {/* Vocabulary Categories */}
        {categories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <IconComponent className={`h-6 w-6 ${category.color}`} />
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Badge variant="secondary" className="ml-auto">
                  {category.data.length} words
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.data.map((word, wordIndex) => (
                  <Card 
                    key={wordIndex} 
                    className="group universal-card hover:shadow-lg hover:scale-105"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {word.french}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{word.english}</p>
                          <Badge variant="outline" className="text-xs mb-2">
                            {word.pronunciation}
                          </Badge>
                        </div>
                        <AudioButton 
                          text={`${word.french}, ${word.english}, example: ${word.example}`}
                          size="sm"
                          tooltipContent={`Listen to: ${word.french}`}
                        />
                      </div>
                      
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm italic text-muted-foreground">
                          "{word.example}"
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <SimpleTooltip content={isFavorite('vocabulary', word.french) ? "Remove from favorites" : "Add to favorites"}>
                          <EnhancedButton 
                            variant="ghost" 
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                              isFavorite('vocabulary', word.french) ? 'text-red-500' : ''
                            }`}
                            onClick={() => toggleFavorite({
                              type: 'vocabulary',
                              french: word.french,
                              english: word.english,
                              category: category.name,
                              pronunciation: word.pronunciation,
                              example: word.example
                            })}
                          >
                            <Heart className={`h-4 w-4 ${isFavorite('vocabulary', word.french) ? 'fill-current' : ''}`} />
                          </EnhancedButton>
                        </SimpleTooltip>
                        
                        <SimpleTooltip content="Practice this word">
                          <EnhancedButton 
                            variant="outline" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Practice
                          </EnhancedButton>
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
          <h2 className="text-2xl font-bold mb-6">Vocabulary Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Flashcard Practice
                </CardTitle>
                <CardDescription>
                  Test your knowledge with interactive flashcards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedButton 
                  className="w-full"
                  tooltip="Start flashcard practice session"
                >
                  Start Flashcards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </EnhancedButton>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-primary" />
                  Word Matching
                </CardTitle>
                <CardDescription>
                  Match French words with their English translations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedButton 
                  variant="outline"
                  className="w-full"
                  tooltip="Start word matching game"
                >
                  Start Matching
                  <ArrowRight className="ml-2 h-4 w-4" />
                </EnhancedButton>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Pronunciation Practice
                </CardTitle>
                <CardDescription>
                  Practice pronouncing words correctly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedButton 
                  variant="secondary"
                  className="w-full"
                  tooltip="Start pronunciation practice"
                >
                  Start Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </EnhancedButton>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Build Your French Vocabulary</h3>
          <p className="text-muted-foreground mb-4">
            Consistent practice is key to expanding your vocabulary. Use our interactive tools to make learning fun and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              tooltip="Start comprehensive vocabulary practice"
            >
              Start Vocabulary Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnhancedButton>
            <EnhancedButton 
              variant="outline"
              tooltip="Create custom vocabulary lists"
            >
              Create Custom Lists
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
