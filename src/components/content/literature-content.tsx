'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { BookOpen, Users, Star, PenTool } from 'lucide-react';
import literatureData from '@/data/literature.json';

export function LiteratureContent() {
  const [selectedMovement, setSelectedMovement] = useState(0);

  // Safety check for data
  if (!literatureData || !literatureData.poetry || !literatureData.novels || !literatureData.theater || !literatureData.literaryMovements) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              French Literature
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Loading literature data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-green-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            French Literature
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the rich world of French literature, from classic movements to contemporary authors. 
          Learn vocabulary related to literary terms and discover famous works.
        </p>
      </div>

      <StyledTabs 
        defaultValue="poetry" 
        className="space-y-6"
        tabs={[
          {
            value: "poetry",
            label: "Poetry",
            shortLabel: "Poetry",
            icon: <PenTool className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "novels",
            label: "Novels",
            shortLabel: "Novels",
            icon: <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          },
          {
            value: "theater",
            label: "Theater",
            shortLabel: "Theater",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-purple-500",
            iconColor: "text-purple-600 dark:text-purple-400"
          },
          {
            value: "movements",
            label: "Literary Movements",
            shortLabel: "Movements",
            icon: <Star className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-orange-500",
            iconColor: "text-orange-600 dark:text-orange-400"
          }
        ]}
      >

        {/* Poetry */}
        <TabsContent value="poetry" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(literatureData.poetry || []).flatMap(period => 
              (period.poets || []).map(poet => (
                <Card key={`${period.period}-${poet.name}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {poet.name}
                      <AudioButton text={poet.name} size="sm" />
                    </CardTitle>
                    <CardDescription>{period.period} - {poet.dates}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground">
                        {poet.style}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold mb-1">Famous Works:</h4>
                        <div className="flex flex-wrap gap-1">
                          {poet.famous_works?.map((work, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {work}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {poet.sample_poem && (
                        <div>
                          <h4 className="font-semibold mb-2">Sample Poem:</h4>
                          <div className="text-xs space-y-2">
                            <div className="font-medium text-foreground">{poet.sample_poem.title}</div>
                            <div className="space-y-1">
                              <div className="flex items-start gap-2">
                                <AudioButton text={poet.sample_poem.french} size="sm" />
                                <div className="font-medium text-blue-700 dark:text-blue-300">
                                  {poet.sample_poem.french}
                                </div>
                              </div>
                              {poet.sample_poem.pronunciation && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                                  {poet.sample_poem.pronunciation}
                                </div>
                              )}
                              <div className="italic text-muted-foreground ml-6 mt-4">
                                {poet.sample_poem.english}
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Novels */}
        <TabsContent value="novels" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(literatureData.novels || []).flatMap(period => 
              (period.novels || []).map(novel => (
                <Card key={`${period.period}-${novel.title}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {novel.title}
                      <AudioButton text={novel.title} size="sm" />
                    </CardTitle>
                    <CardDescription>by {novel.author} ({novel.year})</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground">
                        {period.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {novel.summary}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold mb-1">Genre:</h4>
                        <Badge variant="outline" className="text-xs">
                          {novel.genre}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Key Themes:</h4>
                        <div className="flex flex-wrap gap-1">
                          {novel.key_themes?.map((theme, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Theater */}
        <TabsContent value="theater" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(literatureData.theater || []).flatMap(period => 
              (period.plays || []).map(play => (
                <Card key={`${period.period}-${play.title}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {play.title}
                      <AudioButton text={play.title} size="sm" />
                    </CardTitle>
                    <CardDescription>by {play.author} ({play.year})</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground">
                        {period.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {play.summary}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold mb-1">Genre:</h4>
                        <Badge variant="outline" className="text-xs">
                          {play.genre}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Key Themes:</h4>
                        <div className="flex flex-wrap gap-1">
                          {play.key_themes?.map((theme, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {play.famous_quote && (
                        <div>
                          <h4 className="font-semibold mb-2">Famous Quote:</h4>
                          <div className="text-xs space-y-2">
                            <div className="space-y-1">
                              <div className="flex items-start gap-2">
                                <AudioButton text={play.famous_quote.french} size="sm" />
                                <div className="font-medium italic text-purple-700 dark:text-purple-300">
                                  &quot;{play.famous_quote.french}&quot;
                                </div>
                              </div>
                              {play.famous_quote.pronunciation && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                                  {play.famous_quote.pronunciation}
                                </div>
                              )}
                              <div className="italic text-muted-foreground ml-6 mt-4">
                                &quot;{play.famous_quote.english}&quot;
                              </div>
                            
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Literary Movements */}
        <TabsContent value="movements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(literatureData.literaryMovements || []).map((movement, index) => (
              <Card 
                key={movement.name} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedMovement === index ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedMovement(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {movement.name}
                    <AudioButton text={movement.name} size="sm" />
                  </CardTitle>
                  <CardDescription>{movement.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Key Authors:</h4>
                      <div className="flex flex-wrap gap-1">
                        {movement.key_authors?.slice(0, 3).map((author, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {author}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Characteristics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {movement.characteristics?.slice(0, 2).map((char, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {movement.vocabulary && (
                      <div>
                        <h4 className="font-semibold mb-2">Vocabulary:</h4>
                        <div className="flex flex-wrap gap-1">
                          {movement.vocabulary.slice(0, 2).map((vocab, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {vocab.french} - {vocab.english}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Movement Details */}
          {literatureData.literaryMovements[selectedMovement] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  {literatureData.literaryMovements[selectedMovement].name}
                  <AudioButton text={literatureData.literaryMovements[selectedMovement].name} size="sm" />
                </CardTitle>
                <CardDescription>{literatureData.literaryMovements[selectedMovement].period}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Characteristics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {literatureData.literaryMovements[selectedMovement].characteristics?.map((char, i) => (
                      <Badge key={i} variant="outline">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Authors:</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {literatureData.literaryMovements[selectedMovement].key_authors?.map((author, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{author}</h5>
                          <AudioButton text={author} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Key representative of {literatureData.literaryMovements[selectedMovement].name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {literatureData.literaryMovements[selectedMovement].vocabulary && (
                  <div>
                    <h4 className="font-semibold mb-3">Vocabulary:</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {literatureData.literaryMovements[selectedMovement].vocabulary.map((vocab, i) => (
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
      </StyledTabs>
    </div>
  );
}