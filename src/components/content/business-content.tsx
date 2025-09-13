'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioButton } from '@/components/ui/audio-button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { Briefcase, Users, Phone, FileText, TrendingUp } from 'lucide-react';
import businessData from '@/data/business.json';

export function BusinessContent() {
  const [selectedMeeting, setSelectedMeeting] = useState(0);
  const [selectedPresentation, setSelectedPresentation] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Business French
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Master essential French phrases for professional settings, meetings, presentations, and business communications.
        </p>
      </div>
        {/* Module Tabs */}

      <StyledTabs 
        defaultValue="meetings" 
        className="space-y-6"
        tabs={[
          {
            value: "meetings",
            label: "Meetings",
            shortLabel: "Meet",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "presentations",
            label: "Presentations",
            shortLabel: "Present",
            icon: <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          },
          {
            value: "phone",
            label: "Phone Calls",
            shortLabel: "Phone",
            icon: <Phone className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-purple-500",
            iconColor: "text-purple-600 dark:text-purple-400"
          },
          {
            value: "emails",
            label: "Emails",
            shortLabel: "Email",
            icon: <FileText className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-orange-500",
            iconColor: "text-orange-600 dark:text-orange-400"
          },
          {
            value: "negotiations",
            label: "Negotiations",
            shortLabel: "Negotiate",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-red-500",
            iconColor: "text-red-600 dark:text-red-400"
          }
        ]}
      >

        {/* Meetings */}
        <TabsContent value="meetings" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {businessData.meetings.map((meeting, index) => (
              <Card 
                key={meeting.situation} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedMeeting === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedMeeting(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {meeting.situation}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {meeting.phrases.slice(0, 2).map((phrase, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{phrase.french}</span>
                          <AudioButton text={phrase.french} size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phrase.english}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {phrase.pronunciation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Meeting Details */}
          {businessData.meetings[selectedMeeting] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {businessData.meetings[selectedMeeting].situation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {businessData.meetings[selectedMeeting].phrases.map((phrase, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{phrase.french}</span>
                        <AudioButton text={phrase.french} size="sm" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {phrase.english}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {phrase.pronunciation}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Presentations */}
        <TabsContent value="presentations" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {businessData.presentations.map((presentation, index) => (
              <Card 
                key={presentation.situation} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPresentation === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedPresentation(index)}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {presentation.situation}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {presentation.phrases.slice(0, 2).map((phrase, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{phrase.french}</span>
                          <AudioButton text={phrase.french} size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phrase.english}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {phrase.pronunciation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Presentation Details */}
          {businessData.presentations[selectedPresentation] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {businessData.presentations[selectedPresentation].situation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {businessData.presentations[selectedPresentation].phrases.map((phrase, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{phrase.french}</span>
                        <AudioButton text={phrase.french} size="sm" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {phrase.english}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {phrase.pronunciation}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Phone Calls */}
        <TabsContent value="phone" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {businessData.telephone.map((call) => (
              <Card key={call.situation}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {call.situation}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {call.phrases.map((phrase, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{phrase.french}</span>
                          <AudioButton text={phrase.french} size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phrase.english}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {phrase.pronunciation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Emails */}
        <TabsContent value="emails" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {businessData.email.map((email) => (
              <Card key={email.situation}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {email.situation}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {email.phrases.map((phrase, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{phrase.french}</span>
                          <AudioButton text={phrase.french} size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phrase.english}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {phrase.pronunciation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Negotiations */}
        <TabsContent value="negotiations" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {businessData.negotiations.map((negotiation) => (
              <Card key={negotiation.situation}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {negotiation.situation}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {negotiation.phrases.map((phrase, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{phrase.french}</span>
                          <AudioButton text={phrase.french} size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phrase.english}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {phrase.pronunciation}
                        </div>
                      </div>
                    ))}
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
