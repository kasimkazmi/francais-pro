'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { CLBCalculator } from '@/components/calculators/clb-calculator';
import { ExpressEntryCalculator } from '@/components/calculators/express-entry-calculator';
import { ArrowRight, MapPin, Calculator, Star, CheckCircle, Users, BookOpen, Briefcase } from 'lucide-react';
import immigrationData from '@/data/immigration.json';

export function ImmigrationContent() {
  const { expressEntry, tefCanada, francophoneCommunities, preparation } = immigrationData;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">French Immigration to Canada</h1>
        <div className="flex items-center space-x-2">
          <EnhancedButton variant="outline" size="sm" tooltip="Calculate your immigration chances">
            Immigration Assessment
          </EnhancedButton>
          <EnhancedButton variant="ghost" size="sm">
            <ArrowRight className="h-4 w-4" />
          </EnhancedButton>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Discover how your French language skills can help you immigrate to Canada through Express Entry and other programs.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <Star className="mt-0.5 h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Immigration Advantage</p>
              <p className="text-sm text-muted-foreground">
                French speakers can earn up to 50 additional points in Express Entry, giving you a significant advantage in the immigration process.
              </p>
            </div>
          </div>
        </div>

        {/* Express Entry Overview */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          Express Entry for French Speakers
        </h2>
        
        <Card className="universal-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              {expressEntry.overview.title}
            </CardTitle>
            <CardDescription>
              {expressEntry.overview.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {expressEntry.overview.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 p-3 border rounded-lg universal-card">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How Express Entry Works */}
        <h3 className="text-xl font-bold mb-4">How Express Entry Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {expressEntry.howItWorks.steps.map((step, index) => (
            <Card key={index} className="universal-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </Badge>
                  <h4 className="font-semibold">{step.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <p className="text-xs text-muted-foreground">{step.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* French Language Benefits */}
        <h3 className="text-xl font-bold mb-4">French Language Benefits</h3>
        <Card className="bg-primary/10 border-primary/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Star className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-2">{expressEntry.frenchLanguageBenefits.title}</h4>
                <p className="text-muted-foreground mb-4">{expressEntry.frenchLanguageBenefits.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expressEntry.frenchLanguageBenefits.pointsBreakdown.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-background/50">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-primary text-primary-foreground">
                          +{item.points} points
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">{item.condition}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Note:</strong> {expressEntry.frenchLanguageBenefits.note}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligible Programs */}
        <h3 className="text-xl font-bold mb-4">Eligible Immigration Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {expressEntry.eligiblePrograms.map((program, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {program.name}
                </CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {program.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TEF Canada Information */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          TEF Canada Test Information
        </h2>
        
        <Card className="universal-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {tefCanada.overview.title}
            </CardTitle>
            <CardDescription>{tefCanada.overview.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Recognition</h4>
                <p className="text-sm text-muted-foreground mb-4">{tefCanada.overview.recognition}</p>
                
                <h4 className="font-semibold mb-2">Requirements</h4>
                <p className="text-sm text-muted-foreground">{tefCanada.overview.requirement}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Test Modules</h4>
                <div className="space-y-2">
                  {tefCanada.testModules.map((module, index) => (
                    <div key={index} className="p-2 border rounded universal-card">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{module.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {module.duration}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CLB Calculator */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          CLB Score Calculator
        </h2>
        <CLBCalculator />

        {/* Express Entry Calculator */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Express Entry Points Calculator
        </h2>
        <ExpressEntryCalculator />

        {/* Francophone Communities */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Francophone Communities Outside Quebec
        </h2>
        
        <Card className="universal-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {francophoneCommunities.title}
            </CardTitle>
            <CardDescription>{francophoneCommunities.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {francophoneCommunities.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 p-3 border rounded-lg universal-card">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            
            <h4 className="font-semibold mb-4">Featured Communities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {francophoneCommunities.communities.map((community, index) => (
                <div key={index} className="p-4 border rounded-lg universal-card">
                  <h5 className="font-semibold mb-2">{community.name}</h5>
                  <p className="text-sm text-muted-foreground mb-2">{community.population}</p>
                  <div className="space-y-1">
                    {community.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preparation Tips */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Test Preparation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="universal-card">
            <CardHeader>
              <CardTitle>Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {preparation.studyTips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="universal-card">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {preparation.resources.map((resource, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <BookOpen className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    {resource}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Start Your Immigration Journey</h3>
          <p className="text-muted-foreground mb-4">
            Use the calculators above to assess your chances and start preparing for your French language tests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              tooltip="Calculate your immigration score"
            >
              Calculate My Score
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnhancedButton>
            <EnhancedButton 
              variant="outline"
              tooltip="Find TEF Canada test centers"
            >
              Find Test Centers
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
