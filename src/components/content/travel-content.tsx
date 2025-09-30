'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { MapPin, Plane, Hotel, Camera, Train, Bus, Car, Ship, Bike, Home, Building2, Tent, Landmark, Mountain, Church, Castle, TreePine, MessageSquare, HelpCircle, Info, AlertCircle } from 'lucide-react';
import travelData from '@/data/travel.json';

export function TravelContent() {
  const [selectedTransport, setSelectedTransport] = useState(0);

  // Function to get appropriate icon for each transport type
  const getTransportIcon = (french: string, english: string) => {
    const type = english.toLowerCase();
    const frenchType = french.toLowerCase();
    
    if (type.includes('train') || frenchType.includes('train')) return Train;
    if (type.includes('bus') || frenchType.includes('bus') || type.includes('coach')) return Bus;
    if (type.includes('car') || type.includes('taxi') || frenchType.includes('voiture') || frenchType.includes('taxi')) return Car;
    if (type.includes('plane') || type.includes('airplane') || type.includes('aircraft') || frenchType.includes('avion')) return Plane;
    if (type.includes('boat') || type.includes('ship') || type.includes('ferry') || frenchType.includes('bateau') || frenchType.includes('ferry')) return Ship;
    if (type.includes('bike') || type.includes('bicycle') || type.includes('vélo') || frenchType.includes('vélo')) return Bike;
    if (type.includes('metro') || type.includes('subway') || frenchType.includes('métro')) return Train;
    if (type.includes('tram') || frenchType.includes('tram')) return Train;
    
    return Car; // Default icon
  };

  // Function to get appropriate icon for each accommodation type
  const getAccommodationIcon = (french: string, english: string) => {
    const type = english.toLowerCase();
    const frenchType = french.toLowerCase();
    
    if (type.includes('hotel') || type.includes('hôtel') || frenchType.includes('hôtel')) return Hotel;
    if (type.includes('apartment') || type.includes('flat') || frenchType.includes('appartement')) return Building2;
    if (type.includes('house') || type.includes('home') || type.includes('cottage') || frenchType.includes('maison') || frenchType.includes('gîte')) return Home;
    if (type.includes('hostel') || type.includes('auberge') || frenchType.includes('auberge')) return Building2;
    if (type.includes('camping') || type.includes('camp') || frenchType.includes('camping')) return Tent;
    if (type.includes('bed and breakfast') || type.includes('b&b') || type.includes('chambre d\'hôtes') || frenchType.includes('chambre')) return Home;
    
    return Hotel; // Default icon
  };

  // Function to get appropriate icon for each destination type
  const getDestinationIcon = (name: string, description: string) => {
    const nameL = name.toLowerCase();
    const descL = description.toLowerCase();
    
    // Check for specific locations
    if (nameL.includes('paris')) return Landmark;
    if (nameL.includes('versailles') || descL.includes('palace') || descL.includes('château')) return Castle;
    if (nameL.includes('alps') || nameL.includes('alpes') || descL.includes('mountain') || descL.includes('ski')) return Mountain;
    if (nameL.includes('cathedral') || nameL.includes('cathédrale') || nameL.includes('notre-dame') || descL.includes('church')) return Church;
    if (nameL.includes('provence') || nameL.includes('valley') || nameL.includes('vallée')) return TreePine;
    if (nameL.includes('riviera') || nameL.includes('côte') || nameL.includes('coast')) return Camera;
    if (nameL.includes('lyon') || nameL.includes('marseille') || nameL.includes('city') || nameL.includes('ville')) return Building2;
    
    return MapPin; // Default icon
  };

  // Function to get appropriate icon for each phrase type
  const getPhraseIcon = (french: string, english: string) => {
    const frenchL = french.toLowerCase();
    const englishL = english.toLowerCase();
    
    // Check for question phrases
    if (frenchL.includes('où') || frenchL.includes('comment') || frenchL.includes('quel') || 
        englishL.includes('where') || englishL.includes('how') || englishL.includes('what')) return HelpCircle;
    
    // Check for emergency or help phrases
    if (frenchL.includes('aide') || frenchL.includes('urgence') || frenchL.includes('problème') ||
        englishL.includes('help') || englishL.includes('emergency') || englishL.includes('problem')) return AlertCircle;
    
    // Check for information or polite phrases
    if (frenchL.includes('excusez') || frenchL.includes('pardon') || frenchL.includes('s\'il vous plaît') ||
        englishL.includes('excuse') || englishL.includes('please') || englishL.includes('thank')) return Info;
    
    // Default to message icon for general conversation
    return MessageSquare;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MapPin className="h-8 w-8 text-cyan-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Travel French
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Master essential French vocabulary for travel, transportation, accommodation, and tourism. 
          Perfect for planning your next trip to France or French-speaking countries.
        </p>
      </div>

      <StyledTabs 
        defaultValue="transportation" 
        className="space-y-6"
        tabs={[
          {
            value: "transportation",
            label: "Transport",
            shortLabel: "Transport",
            icon: <Plane className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "accommodation",
            label: "Hotels",
            shortLabel: "Hotels",
            icon: <Hotel className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          },
          {
            value: "destinations",
            label: "Destinations",
            shortLabel: "Places",
            icon: <Camera className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-purple-500",
            iconColor: "text-purple-600 dark:text-purple-400"
          },
          {
            value: "phrases",
            label: "Phrases",
            shortLabel: "Phrases",
            icon: <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-orange-500",
            iconColor: "text-orange-600 dark:text-orange-400"
          }
        ]}
      >

        {/* Transportation */}
        <TabsContent value="transportation" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {travelData.transportation.slice(0, 12).map((transport, index) => (
              <Card 
                key={transport.french} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTransport === index ? 'ring-2 ring-cyan-500' : ''
                }`}
                onClick={() => setSelectedTransport(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {(() => {
                      const Icon = getTransportIcon(transport.french, transport.english);
                      return <Icon className="h-5 w-5" />;
                    })()}
                    {transport.french}
                  </CardTitle>
                  <CardDescription>{transport.english}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={transport.french} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {transport.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transport.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show more transportation options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Complete Transportation Vocabulary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {travelData.transportation.map((transport, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{transport.french}</span>
                        <AudioButton text={transport.french} size="sm" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transport.english}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transport.pronunciation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accommodation */}
        <TabsContent value="accommodation" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {travelData.accommodation.map((accommodation) => (
              <Card key={accommodation.french}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {(() => {
                      const Icon = getAccommodationIcon(accommodation.french, accommodation.english);
                      return <Icon className="h-5 w-5" />;
                    })()}
                    {accommodation.french}
                  </CardTitle>
                  <CardDescription>{accommodation.english}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={accommodation.french} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {accommodation.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {accommodation.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Destinations */}
        <TabsContent value="destinations" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {travelData.destinations.map((destination) => (
              <Card key={destination.name}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {(() => {
                      const Icon = getDestinationIcon(destination.name, destination.description);
                      return <Icon className="h-5 w-5" />;
                    })()}
                    {destination.name}
                  </CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Attractions:</h4>
                    <div className="space-y-1">
                      {destination.attractions.map((attraction, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 border rounded">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span className="text-sm">{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Vocabulary:</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.vocabulary.map((vocab, i) => (
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

        {/* Useful Phrases */}
        <TabsContent value="phrases" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {travelData.usefulPhrases.map((phrase) => (
              <Card key={phrase.french}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {(() => {
                      const Icon = getPhraseIcon(phrase.french, phrase.english);
                      return <Icon className="h-5 w-5" />;
                    })()}
                    {phrase.french}
                  </CardTitle>
                  <CardDescription>{phrase.english}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={phrase.french} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {phrase.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {phrase.description}
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
