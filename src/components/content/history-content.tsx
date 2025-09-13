'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { Clock, MapPin, Users, BookOpen } from 'lucide-react';
import historyData from '@/data/history.json';

export function HistoryContent() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Clock className="h-8 w-8 text-amber-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            French History
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Journey through French history and learn vocabulary related to different historical periods, 
          key events, and important figures.
        </p>
      </div>

      <StyledTabs 
        defaultValue="periods" 
        className="space-y-6"
        tabs={[
          {
            value: "periods",
            label: "Historical Periods",
            shortLabel: "Periods",
            icon: <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "figures",
            label: "Famous Figures",
            shortLabel: "Figures",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          }
        ]}
      >

        {/* Historical Periods */}
        <TabsContent value="periods" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {historyData.periods.map((period, index) => (
              <Card 
                key={period.name} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPeriod === index ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => setSelectedPeriod(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{period.name}</CardTitle>
                  <CardDescription>{period.dates}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {period.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {period.key_events.slice(0, 2).map((event, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Period Details */}
          {historyData.periods[selectedPeriod] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {historyData.periods[selectedPeriod].name}
                </CardTitle>
                <CardDescription>{historyData.periods[selectedPeriod].dates}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Key Events:</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {historyData.periods[selectedPeriod].key_events.map((event, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 border rounded">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Historical Vocabulary:</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {historyData.periods[selectedPeriod].vocabulary.map((vocab, i) => (
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

        {/* Famous Figures */}
        <TabsContent value="figures" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {historyData.famousFigures.map((figure, index) => (
              <Card key={figure.name}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {figure.name}
                  </CardTitle>
                  <CardDescription>{figure.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <AudioButton text={figure.name} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {figure.pronunciation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {figure.description}
                  </p>
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {figure.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </StyledTabs>
    </div>
  );
}
