'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { Palette, Users, Star, BookOpen } from 'lucide-react';
import artsData from '@/data/arts.json';

export function ArtsContent() {
  const [selectedMovement, setSelectedMovement] = useState(0);
  const [selectedAuthor, setSelectedAuthor] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Palette className="h-8 w-8 text-purple-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            French Arts & Culture
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the rich world of French art movements, literature, and cultural heritage. 
          Learn vocabulary related to French arts and discover famous artists and writers.
        </p>
      </div>

      <StyledTabs 
        defaultValue="movements" 
        className="space-y-6"
        tabs={[
          {
            value: "movements",
            label: "Art Movements",
            shortLabel: "Movements",
            icon: <Palette className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "artists",
            label: "Famous Artists",
            shortLabel: "Artists",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          },
          {
            value: "museums",
            label: "Museums",
            shortLabel: "Museums",
            icon: <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-purple-500",
            iconColor: "text-purple-600 dark:text-purple-400"
          },
          {
            value: "vocabulary",
            label: "Art Terms",
            shortLabel: "Terms",
            icon: <Star className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-orange-500",
            iconColor: "text-orange-600 dark:text-orange-400"
          }
        ]}
      >

        {/* Art Movements */}
        <TabsContent value="movements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artsData.artMovements.map((movement, index) => (
              <Card 
                key={movement.name} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedMovement === index ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedMovement(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{movement.name}</CardTitle>
                  <CardDescription>{movement.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {movement.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {movement.characteristics.slice(0, 2).map((char, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Movement Details */}
          {artsData.artMovements[selectedMovement] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  {artsData.artMovements[selectedMovement].name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Characteristics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {artsData.artMovements[selectedMovement].characteristics.map((char, i) => (
                      <Badge key={i} variant="outline">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Famous Works:</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {artsData.artMovements[selectedMovement].famousWorks.map((work, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{work.name}</h5>
                          <AudioButton text={work.name} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {work.artist}
                        </p>
                        <p className="text-sm mb-3">{work.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {work.vocabulary.map((vocab, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              <AudioButton text={vocab.french} size="sm" className="mr-1" />
                              {vocab.french} - {vocab.english}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Famous Artists */}
        <TabsContent value="artists" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artsData.famousArtists.map((artist, index) => (
              <Card 
                key={artist.name} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedAuthor === index ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedAuthor(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{artist.name}</CardTitle>
                  <CardDescription>{artist.dates}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {artist.movement}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {artist.famousWorks.slice(0, 2).map((work, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {work}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Artist Details */}
          {artsData.famousArtists[selectedAuthor] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {artsData.famousArtists[selectedAuthor].name}
                </CardTitle>
                <CardDescription>{artsData.famousArtists[selectedAuthor].dates}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Style/Movement:</h4>
                  <Badge variant="outline" className="text-sm">
                    {artsData.famousArtists[selectedAuthor].movement}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Famous Works:</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {artsData.famousArtists[selectedAuthor].famousWorks.map((work, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{work}</h5>
                          <AudioButton text={work} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {artsData.famousArtists[selectedAuthor].vocabulary && (
                  <div>
                    <h4 className="font-semibold mb-3">Related Vocabulary:</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {artsData.famousArtists[selectedAuthor].vocabulary.map((vocab, i) => (
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
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Museums */}
        <TabsContent value="museums" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artsData.museums.map((museum) => (
              <Card key={museum.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{museum.name}</CardTitle>
                  <CardDescription>{museum.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {museum.description}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold mb-1">Famous Works:</h4>
                      <div className="flex flex-wrap gap-1">
                        {museum.famousWorks.slice(0, 3).map((work, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {work}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Vocabulary:</h4>
                      <div className="flex flex-wrap gap-1">
                        {museum.vocabulary.slice(0, 2).map((vocab, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {vocab.french} - {vocab.english}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Art Terms */}
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artsData.artTerms.map((term) => (
              <Card key={term.french}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    {term.french}
                  </CardTitle>
                  <CardDescription>{term.english}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={term.french} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {term.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {term.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </StyledTabs>
    </div>
  );
}
