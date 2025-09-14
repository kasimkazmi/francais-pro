'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { Trophy, Target, Star } from 'lucide-react';
import sportsData from '@/data/sports.json';

export function SportsContent() {
  const [selectedSport, setSelectedSport] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            French Sports
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn French vocabulary related to sports, competitions, and athletic activities. 
          Discover popular sports in France and their terminology.
        </p>
      </div>

      <StyledTabs 
        defaultValue="sports" 
        className="space-y-6"
        tabs={[
          {
            value: "sports",
            label: "Sports",
            shortLabel: "Sports",
            icon: <Trophy className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "competitions",
            label: "All Sports",
            shortLabel: "All",
            icon: <Target className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          },
          {
            value: "vocabulary",
            label: "More Sports",
            shortLabel: "More",
            icon: <Star className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-purple-500",
            iconColor: "text-purple-600 dark:text-purple-400"
          }
        ]}
      >

        {/* Sports */}
        <TabsContent value="sports" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sportsData.sports.map((sport, index) => (
              <Card 
                key={sport.french} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedSport === index ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedSport(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    {sport.french}
                  </CardTitle>
                  <CardDescription>{sport.english}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={sport.french} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {sport.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {sport.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {sport.vocabulary.slice(0, 2).map((vocab, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {vocab.french}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Sport Details */}
          {sportsData.sports[selectedSport] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  {sportsData.sports[selectedSport].french}
                </CardTitle>
                <CardDescription>{sportsData.sports[selectedSport].english}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Related Vocabulary:</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {sportsData.sports[selectedSport].vocabulary.map((vocab, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{vocab.french}</span>
                            <AudioButton text={vocab.french} size="sm" />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {vocab.english}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {vocab.pronunciation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* All Sports */}
        <TabsContent value="competitions" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sportsData.sports.map((sport) => (
              <Card key={sport.french}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {sport.french}
                  </CardTitle>
                  <CardDescription>{sport.english}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={sport.french} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {sport.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {sport.description}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Vocabulary:</h4>
                    <div className="flex flex-wrap gap-1">
                      {sport.vocabulary.slice(0, 4).map((vocab, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <AudioButton text={vocab.french} size="sm" className="mr-1" />
                          {vocab.french} - {vocab.english}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Additional Sports */}
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...sportsData.games, ...sportsData.fitness, ...sportsData.olympics, ...sportsData.frenchSports].map((sport) => (
              <Card key={'name' in sport ? sport.name : sport.french}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    {'name' in sport ? sport.name : sport.french}
                  </CardTitle>
                  <CardDescription>{sport.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {'vocabulary' in sport && sport.vocabulary && (
                    <div className="space-y-2">
                      {sport.vocabulary.map((vocab, i) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{vocab.french}</span>
                              <AudioButton text={vocab.french} size="sm" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {vocab.english}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {vocab.pronunciation}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </StyledTabs>
    </div>
  );
}
