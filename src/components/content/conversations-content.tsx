'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Tooltip } from '@/components/ui/tooltip';
import { TipSection } from '@/components/ui/tip-section';
import { ArrowRight, MessageCircle, Users, Star, Play, RotateCcw } from 'lucide-react';
import conversationsData from '@/data/conversations.json';
import { useFavorites } from '@/contexts/FavoritesContext';

export function ConversationsContent() {
  const { scenarios, commonPhrases } = conversationsData;
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">French Conversations</h1>
        {/* <div className="flex items-center space-x-2">
          <EnhancedButton variant="outline" size="sm" tooltip="Practice role-playing conversations">
            Role Play Mode
          </EnhancedButton>
          <EnhancedButton variant="ghost" size="sm">
            <ArrowRight className="h-4 w-4" />
          </EnhancedButton>
        </div> */}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Practice real-world French conversations with interactive dialogues and common phrases for everyday situations.
        </p>

        <TipSection 
          title="Conversation Tip"
          content="Practice these dialogues out loud. Try to understand the context and use appropriate gestures and expressions."
        />

        {/* Conversation Scenarios */}
        <h2 className="text-2xl font-bold mt-8 mb-6">Conversation Scenarios</h2>
        <div className="space-y-8 mb-12">
          {scenarios.map((scenario, scenarioIndex) => (
            <Card key={scenarioIndex} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      {scenario.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {scenario.situation}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={scenario.level === 'Beginner' ? 'default' : scenario.level === 'Intermediate' ? 'secondary' : 'destructive'}
                    >
                      {scenario.level}
                    </Badge>
                    <EnhancedButton 
                      variant="outline" 
                      size="sm"
                      tooltip="Start role-playing this conversation"
                    >
                      <Play className="h-4 w-4" />
                    </EnhancedButton>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenario.dialogue.map((line, lineIndex) => (
                    <div 
                      key={lineIndex} 
                      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-200 cursor-pointer interactive-hover ${
                        line.speaker === 'Customer' || line.speaker === 'Guest' || line.speaker === 'Patient' 
                          ? 'universal-card' 
                          : 'universal-card'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          line.speaker === 'Customer' || line.speaker === 'Guest' || line.speaker === 'Patient'
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}>
                          {line.speaker.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-muted-foreground">
                            {line.speaker}
                          </span>
                          <AudioButton 
                            text={`${line.speaker}: ${line.french}`}
                            size="sm"
                            tooltipContent={`Listen to ${line.speaker}`}
                          />
                        </div>
                        <p className="font-medium text-lg mb-2">{line.french}</p>
                        <p className="text-muted-foreground mb-2">{line.english}</p>
                        <Badge variant="outline" className="text-xs">
                          {line.pronunciation}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EnhancedButton 
                      variant="outline" 
                      size="sm"
                      tooltip="Practice this conversation"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Practice
                    </EnhancedButton>
                    <EnhancedButton 
                      variant="ghost" 
                      size="sm"
                      tooltip="Reset conversation"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </EnhancedButton>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Common Phrases */}
        <h2 className="text-2xl font-bold mt-8 mb-6">Essential Phrases</h2>
        <div className="space-y-6 mb-12">
          {commonPhrases.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.phrases.map((phrase, phraseIndex) => (
                    <div 
                      key={phraseIndex} 
                      className="flex items-center justify-between p-4 border rounded-lg universal-card transition-all duration-200 cursor-pointer interactive-hover group"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {phrase.french}
                        </p>
                        <p className="text-muted-foreground mb-2">{phrase.english}</p>
                        <Badge variant="outline" className="text-xs">
                          {phrase.pronunciation}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <AudioButton 
                          text={`${phrase.french}, ${phrase.english}`}
                          size="sm"
                          tooltipContent={`Listen to: ${phrase.french}`}
                        />
                        <Tooltip content={isFavorite('conversation', phrase.french) ? "Remove from favorites" : "Add to favorites"}>
                          <EnhancedButton 
                            variant="ghost" 
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                              isFavorite('conversation', phrase.french) ? 'text-yellow-500' : ''
                            }`}
                            onClick={() => toggleFavorite({
                              type: 'conversation',
                              french: phrase.french,
                              english: phrase.english,
                              category: 'Common Phrases',
                              pronunciation: phrase.pronunciation,
                              example: undefined
                            })}
                          >
                            <Star className={`h-4 w-4 ${isFavorite('conversation', phrase.french) ? 'fill-current' : ''}`} />
                          </EnhancedButton>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Practice Tools */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6">Conversation Practice Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Role Play Practice
                </CardTitle>
                <CardDescription>
                  Practice conversations with AI partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedButton 
                  className="w-full"
                  tooltip="Start role-playing with AI"
                >
                  Start Role Play
                  <ArrowRight className="ml-2 h-4 w-4" />
                </EnhancedButton>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Dialogue Builder
                </CardTitle>
                <CardDescription>
                  Create your own conversation scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedButton 
                  variant="outline"
                  className="w-full"
                  tooltip="Build custom dialogues"
                >
                  Build Dialogue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </EnhancedButton>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Pronunciation Coach
                </CardTitle>
                <CardDescription>
                  Get feedback on your pronunciation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedButton 
                  variant="secondary"
                  className="w-full"
                  tooltip="Start pronunciation coaching"
                >
                  Start Coaching
                  <ArrowRight className="ml-2 h-4 w-4" />
                </EnhancedButton>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Master French Conversations</h3>
          <p className="text-muted-foreground mb-4">
            Regular conversation practice will boost your confidence and fluency. Use these tools to practice in realistic scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              tooltip="Start comprehensive conversation practice"
            >
              Start Conversation Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnhancedButton>
            <EnhancedButton 
              variant="outline"
              tooltip="Join conversation groups"
            >
              Join Groups
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
