'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StyledTabs, TabsContent } from '@/components/ui/styled-tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Users, 
  Award,
  CheckCircle,
  Play,
  FileText,
  Headphones,
  Mic
} from 'lucide-react';
import tefData from '@/data/tef-preparation.json';

export function TEFContent() {
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedDay, setSelectedDay] = useState('monday');

  const currentPlan = tefData.studyPlan[selectedLevel as keyof typeof tefData.studyPlan];
  const currentPhase = currentPlan.phases[selectedPhase];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Target className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TEF Canada Preparation
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive roadmap to achieve your target TEF Canada scores. 
          Choose your level and follow our structured study plan.
        </p>
      </div>

      {/* Level Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Choose Your Preparation Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(tefData.studyPlan).map(([level, plan]) => (
              <Card 
                key={level}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLevel === level ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{level} Level</CardTitle>
                  <CardDescription>Target: {plan.targetScore}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{plan.weeklyHours} per week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <StyledTabs 
        defaultValue="roadmap" 
        className="space-y-6"
        tabs={[
          {
            value: "roadmap",
            label: "Roadmap",
            shortLabel: "Roadmap",
            icon: <Target className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-blue-500",
            iconColor: "text-blue-600 dark:text-blue-400"
          },
          {
            value: "schedule",
            label: "Schedule",
            shortLabel: "Schedule",
            icon: <Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-green-500",
            iconColor: "text-green-600 dark:text-green-400"
          },
          {
            value: "sections",
            label: "Test Sections",
            shortLabel: "Sections",
            icon: <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-purple-500",
            iconColor: "text-purple-600 dark:text-purple-400"
          },
          {
            value: "scoring",
            label: "Scoring",
            shortLabel: "Scoring",
            icon: <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-orange-500",
            iconColor: "text-orange-600 dark:text-orange-400"
          },
          {
            value: "resources",
            label: "Resources",
            shortLabel: "Resources",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />,
            color: "bg-red-500",
            iconColor: "text-red-600 dark:text-red-400"
          }
        ]}
      >

        {/* Roadmap */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {currentPlan.targetScore} Study Plan - {currentPlan.duration}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPlan.phases.map((phase, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedPhase === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPhase(index)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{phase.phase}</CardTitle>
                          <CardDescription>{phase.focus}</CardDescription>
                        </div>
                        <Badge variant="outline">{phase.target}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">Activities:</h4>
                          <ul className="space-y-1">
                            {phase.activities.map((activity, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Resources:</h4>
                          <div className="flex flex-wrap gap-1">
                            {phase.resources.map((resource, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Schedule */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Weekly Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(tefData.weeklySchedule).map(([day, schedule]) => (
                    <Card 
                      key={day}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedDay === day ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedDay(day)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm capitalize">{day}</CardTitle>
                        <CardDescription className="text-xs">{schedule.focus}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-1">
                          {schedule.activities.map((activity, i) => (
                            <div key={i} className="text-xs text-muted-foreground">
                              • {activity}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Routine */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Daily Routine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Morning (30 min)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {tefData.dailyRoutine.weekdays.morning.activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Afternoon (45-60 min)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {tefData.dailyRoutine.weekdays.afternoon.activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Evening (30 min)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {tefData.dailyRoutine.weekdays.evening.activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Test Sections */}
        <TabsContent value="sections" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(tefData.testSections).map(([section, data]) => (
              <Card key={section}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section === 'reading' && <FileText className="h-5 w-5" />}
                    {section === 'listening' && <Headphones className="h-5 w-5" />}
                    {section === 'writing' && <FileText className="h-5 w-5" />}
                    {section === 'speaking' && <Mic className="h-5 w-5" />}
                    {data.title}
                  </CardTitle>
                  <CardDescription>
                    {data.duration} • {data.questions || data.tasks} {data.questions ? 'questions' : 'tasks'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {data.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Preparation:</h4>
                    <ul className="space-y-1">
                      {data.preparation.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Tips:</h4>
                    <ul className="space-y-1">
                      {data.tips.map((tip, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scoring Guide */}
        <TabsContent value="scoring" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(tefData.scoringGuide).map(([level, scores]) => (
              <Card key={level}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {level}
                  </CardTitle>
                  <CardDescription>{scores.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Score Requirements:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Reading:</span>
                        <span className="font-medium">{scores.reading}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Listening:</span>
                        <span className="font-medium">{scores.listening}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Writing:</span>
                        <span className="font-medium">{scores.writing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Speaking:</span>
                        <span className="font-medium">{scores.speaking}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">
                      {scores.requirements}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Platform Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Platform Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tefData.resources.platform.map((resource, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {resource}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Official Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Official Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tefData.resources.official.map((resource, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-medium">{resource.name}</div>
                      <div className="text-xs text-muted-foreground">{resource.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* External Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  External Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tefData.resources.external.map((resource, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-medium">{resource.name}</div>
                      <div className="text-xs text-muted-foreground">{resource.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </StyledTabs>
    </div>
  );
}
