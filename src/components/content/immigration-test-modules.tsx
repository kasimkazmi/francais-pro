"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { CLBCalculator } from "@/components/calculators/clb-calculator";
import { ExpressEntryCalculator } from "@/components/calculators/express-entry-calculator";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import immigrationData from "@/data/immigration.json";
import { TipSection } from "../ui/tip-section";

export function ImmigrationTools() {
  const { preparation } = immigrationData;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Immigration Tools</h1>
        {/* <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="outline"
            size="sm"
            tooltip="Calculate your immigration chances"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Quick Assessment
          </EnhancedButton>
        </div> */}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Use these powerful tools to calculate your CLB scores, Express Entry points, and prepare for your French language tests.
        </p>

          <TipSection
            title="About CLB (Canadian Language Benchmarks)"
            content="CLB is the national standard for measuring English and French language proficiency for Canadian immigration. Used in programs like Express Entry and citizenship applications to assess your language skills."
          />

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

        {/* Test Preparation */}
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Test Preparation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="universal-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Study Tips
              </CardTitle>
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
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Resources
              </CardTitle>
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

        {/* Practice Section */}
        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Ready to Start Your Immigration Journey?
          </h3>
          <p className="text-muted-foreground mb-4">
            Use these calculators to understand your current standing and plan your French language learning path for Canadian immigration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton 
              onClick={() => window.open('https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-franco-pilots/franco-immigration/permanent-residence.html', '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              tooltip="Start comprehensive immigration assessment"
            >
              Start Immigration Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </EnhancedButton>
            <EnhancedButton 
              variant="outline"
              tooltip="Learn more about French immigration programs"
              onClick={() => window.open('https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-franco-pilots/franco-immigration/eligibility.html', '_blank')}
            >
              Learn More
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
