"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import {
  ArrowRight,
  MapPin,
  Calculator,
  Star,
  CheckCircle,
  Users,
  BookOpen,
  Briefcase,
} from "lucide-react";
import immigrationData from "@/data/immigration.json";
import { TipSection } from "../ui/tip-section";

export function ImmigrationContent() {
  const { expressEntry, tefCanada, francophoneCommunities, preparation } =
    immigrationData;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">French Immigration to Canada</h1>
        {/* <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="outline"
            size="sm"
            tooltip="Calculate your immigration chances"
          >
            Immigration Assessment
          </EnhancedButton>
          <EnhancedButton variant="ghost" size="sm">
            <ArrowRight className="h-4 w-4" />
          </EnhancedButton>
        </div> */}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Discover how your French language skills can help you immigrate to
          Canada through Express Entry and other programs.
        </p>

        <TipSection
          title="Immigration Advantage"
          content="French speakers can earn up to 50 additional points in Express Entry, giving you a significant advantage in the immigration process."
        />

        {/* Express Entry Overview */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          Express Entry for French Speakers
        </h2>

        <Card className=" mb-8">
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
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 border rounded-lg universal-card"
                >
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
                <div className="flex items-center gap-1 mb-2">
                  <Badge
                    variant="secondary"
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    {step.step}
                  </Badge>
                  <h4 className="font-semibold">{step.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {step.description}
                </p>
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
                <h4 className="text-lg font-semibold mb-2">
                  {expressEntry.frenchLanguageBenefits.title}
                </h4>
                <p className="text-muted-foreground mb-4">
                  {expressEntry.frenchLanguageBenefits.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expressEntry.frenchLanguageBenefits.pointsBreakdown.map(
                    (item, index) => (
                      <Card
                        key={index}
                        className="p-4 border rounded-lg bg-background/50 universal-card"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-primary text-primary-foreground">
                            +{item.points} points
                          </Badge>
                        </div>
                        <p className="text-sm font-medium mb-1">
                          {item.condition}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </Card>
                    )
                  )}
                </div>

                <div className="mt-4 p-3 bg-yellow-200 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-amber-950 dark:text-amber-400">
                    <strong className="font-bold text-amber-600 dark:text-amber-400">
                      Note:
                    </strong>{" "}
                    {expressEntry.frenchLanguageBenefits.note}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligible Programs */}
        <h3 className="text-xl font-bold mb-4">
          Eligible Immigration Programs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {expressEntry.eligiblePrograms.map((program, index) => (
            <Card key={index} className="universal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {program.name}
                </CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {program.requirements.map((req, reqIndex) => (
                    <li
                      key={reqIndex}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
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

        <Card className="-card mb-8">
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
                <p className="text-sm text-muted-foreground mb-4">
                  {tefCanada.overview.recognition}
                </p>

                <h4 className="font-semibold mb-2">Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  {tefCanada.overview.requirement}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Test Modules</h4>
                <div className="space-y-2">
                  {tefCanada.testModules.map((module, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded universal-card"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {module.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {module.duration}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Francophone Communities */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Francophone Communities Outside Quebec
        </h2>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {francophoneCommunities.title}
            </CardTitle>
            <CardDescription>
              {francophoneCommunities.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {francophoneCommunities.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 border rounded-lg universal-card"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <h4 className="font-semibold mb-4">Featured Communities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {francophoneCommunities.communities.map((community, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg universal-card"
                >
                  <h5 className="font-semibold mb-2">{community.name}</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {community.population}
                  </p>
                  <div className="space-y-1">
                    {community.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
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
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
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
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <BookOpen className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    {resource}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Post-Immigration Information */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Post-Immigration Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="universal-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Canada Revenue Agency (CRA)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The CRA (Canada Revenue Agency) is the federal agency responsible for administering tax laws and social and economic benefit programs for the Government of Canada.
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  File your annual tax returns
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Apply for benefits like GST/HST credit
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Register for a Social Insurance Number (SIN)
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Access My Account for online services
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="universal-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Settlement Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Various services are available to help newcomers settle in Canada successfully.
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Language training programs
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Employment assistance
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Housing and community connections
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Healthcare system orientation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Immigration Tools */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Immigration Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="universal-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                CLB Score Calculator
              </CardTitle>
              <CardDescription>
                Calculate your Canadian Language Benchmark scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedButton
                className="w-full"
                tooltip="Calculate your CLB scores"
                onClick={() =>
                  (window.location.href = "/immigration/test-modules")
                }
              >
                Calculate CLB Scores
                <ArrowRight className="ml-2 h-4 w-4" />
              </EnhancedButton>
            </CardContent>
          </Card>

          <Card className="universal-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Express Entry Calculator
              </CardTitle>
              <CardDescription>
                Calculate your Express Entry points for immigration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedButton
                variant="outline"
                className="w-full"
                tooltip="Calculate your Express Entry points"
                onClick={() =>
                  (window.location.href = "/immigration/test-modules")
                }
              >
                Calculate Points
                <ArrowRight className="ml-2 h-4 w-4" />
              </EnhancedButton>
            </CardContent>
          </Card>

          <Card className="universal-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Test Preparation
              </CardTitle>
              <CardDescription>
                Study tips and resources for French language tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedButton
                variant="secondary"
                className="w-full"
                tooltip="Access test preparation resources"
                onClick={() =>
                  (window.location.href = "/immigration/test-modules")
                }
              >
                Prepare for Tests
                <ArrowRight className="ml-2 h-4 w-4" />
              </EnhancedButton>
            </CardContent>
          </Card>
        </div>

        {/* <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Start Your Immigration Journey
          </h3>
          <p className="text-muted-foreground mb-4">
            Use our calculators and resources to plan your French language learning journey for Canadian immigration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              tooltip="Start comprehensive immigration assessment"
              onClick={() => window.location.href = '/immigration/test-modules'}
            >
              Start Immigration Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnhancedButton>
            <EnhancedButton 
              variant="outline"
              tooltip="Learn more about French immigration programs"
            >
              Learn More
            </EnhancedButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}
