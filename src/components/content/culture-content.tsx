'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { Calendar, Utensils, Palette, BookOpen, MapPin, Star, Heart } from 'lucide-react';
import cultureData from '@/data/culture.json';
import { TipSection } from '../ui/tip-section';

export function CultureContent() {
  const { traditions, cuisine, art, literature, geography } = cultureData;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">French Culture & Traditions</h1>
        {/* <div className="flex items-center space-x-2">
          <EnhancedButton variant="outline" size="sm" tooltip="Explore French cultural activities">
            Cultural Activities
          </EnhancedButton>
          <EnhancedButton variant="ghost" size="sm">
            <ArrowRight className="h-4 w-4" />
          </EnhancedButton>
        </div> */}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Immerse yourself in the rich tapestry of French culture, from traditional celebrations to world-renowned cuisine and art.
        </p>

       <TipSection 
          title="Cultural Insight"
          content="Understanding French culture is essential for mastering the language. Culture and language are deeply intertwined."
        />

        {/* Traditions Section */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          French Traditions & Celebrations
        </h2>
        <div className="space-y-6 mb-12">
          {traditions.map((tradition, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      {tradition.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {tradition.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {tradition.date}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tradition.vocabulary.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{word.french}</h4>
                        <p className="text-xs text-muted-foreground">{word.english}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {word.pronunciation}
                        </Badge>
                      </div>
                      <AudioButton 
                        text={`${word.french}, ${word.english}`}
                        size="sm"
                        tooltipContent={`Listen to: ${word.french}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cuisine Section */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          French Cuisine
        </h2>
        <div className="space-y-6 mb-12">
          {cuisine.map((category, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.dishes.map((dish, dishIndex) => (
                    <div key={dishIndex} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{dish.french}</h4>
                        <p className="text-xs text-muted-foreground">{dish.english}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {dish.pronunciation}
                        </Badge>
                      </div>
                      <AudioButton 
                        text={`${dish.french}, ${dish.english}`}
                        size="sm"
                        tooltipContent={`Listen to: ${dish.french}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Art Section */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          French Art Movements
        </h2>
        <div className="space-y-6 mb-12">
          {art.map((movement, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  {movement.movement}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Famous Artists:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {movement.artists.map((artist, artistIndex) => (
                      <div key={artistIndex} className="p-3 border rounded-lg universal-card">
                        <h5 className="font-semibold text-sm">{artist.name}</h5>
                        <p className="text-xs text-muted-foreground">{artist.famous_work}</p>
                        <p className="text-xs text-muted-foreground italic">{artist.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Art Vocabulary:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {movement.vocabulary.map((word, wordIndex) => (
                      <div key={wordIndex} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm">{word.french}</h5>
                          <p className="text-xs text-muted-foreground">{word.english}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {word.pronunciation}
                          </Badge>
                        </div>
                        <AudioButton 
                          text={`${word.french}, ${word.english}`}
                          size="sm"
                          tooltipContent={`Listen to: ${word.french}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Literature Section */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          French Literature
        </h2>
        <div className="space-y-6 mb-12">
          {literature.map((period, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {period.period}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Famous Authors:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {period.authors.map((author, authorIndex) => (
                      <div key={authorIndex} className="p-3 border rounded-lg universal-card">
                        <h5 className="font-semibold text-sm">{author.name}</h5>
                        <p className="text-xs text-muted-foreground">{author.work}</p>
                        <p className="text-xs text-muted-foreground italic">{author.century} century</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Literary Vocabulary:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {period.vocabulary.map((word, wordIndex) => (
                      <div key={wordIndex} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm">{word.french}</h5>
                          <p className="text-xs text-muted-foreground">{word.english}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {word.pronunciation}
                          </Badge>
                        </div>
                        <AudioButton 
                          text={`${word.french}, ${word.english}`}
                          size="sm"
                          tooltipContent={`Listen to: ${word.french}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Geography Section */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          French Geography & Landmarks
        </h2>
        <div className="space-y-6 mb-12">
          {geography.map((region, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {region.region}
                </CardTitle>
                <CardDescription>
                  Capital: {region.capital}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {region.landmarks.map((landmark, landmarkIndex) => (
                    <div key={landmarkIndex} className="flex items-center justify-between p-3 border rounded-lg universal-card">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{landmark.name}</h4>
                        <p className="text-xs text-muted-foreground">{landmark.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {landmark.pronunciation}
                        </Badge>
                      </div>
                      <AudioButton 
                        text={`${landmark.name}, ${landmark.description}`}
                        size="sm"
                        tooltipContent={`Listen to: ${landmark.name}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Explore French Culture</h3>
          <p className="text-muted-foreground mb-4">
            Understanding French culture will enhance your language learning and help you connect with French speakers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              tooltip="Start cultural immersion activities"
            >
              Start Cultural Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnhancedButton>
            <EnhancedButton 
              variant="outline"
              tooltip="Join French cultural events"
            >
              Join Cultural Events
            </EnhancedButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}
