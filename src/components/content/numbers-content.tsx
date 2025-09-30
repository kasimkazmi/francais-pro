import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveAudioGrid } from '@/components/shared/interactive-audio-grid';
import { InteractivePracticeSection } from '@/components/shared/interactive-practice-section';
import { TipSection } from '@/components/ui/tip-section';
import { ArrowRight, Calculator } from 'lucide-react';
import numbersData from '@/data/numbers.json';

export function NumbersContent() {
  const { numbers1to20: numbers, tens } = numbersData;

  // Transform data for the audio grid
  const basicNumbers = numbers.slice(0, 10).map(num => ({
    title: num.num.toString(),
    subtitle: num.french,
    pronunciation: num.pronunciation,
    audioText: num.french,
    description: `Number ${num.num} in French`
  }));

  const tensNumbers = tens.slice(0, 10).map(num => ({
    title: num.num.toString(),
    subtitle: num.french,
    pronunciation: num.pronunciation,
    audioText: num.french,
    description: `Number ${num.num} in French`
  }));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">French Numbers</h1>
        <div className="flex items-center space-x-2">
         
        
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {/* Static Description */}
        <p className="text-muted-foreground">
          Master French numbers from zero to millions. Learn pronunciation, counting patterns, and practical usage.
        </p>

        <TipSection 
          title="Number Tip"
          content="French numbers follow specific patterns. Once you learn 1-20, the rest become easier to master."
        />

        {/* Basic Numbers Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Numbers 1-10</h2>
        <p className="text-muted-foreground mb-6">
          Start with these fundamental numbers:
        </p>

        <InteractiveAudioGrid 
          items={basicNumbers}
          columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3"
          staggerDelay={50}
        />

        {/* Tens Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Tens (10, 20, 30...)</h2>
        <p className="text-muted-foreground mb-6">
          Learn the tens pattern:
        </p>

        <InteractiveAudioGrid 
          items={tensNumbers}
          columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3"
          staggerDelay={75}
        />

        {/* Static Content Sections */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Number Patterns</h2>
        <p className="text-muted-foreground mb-6">
          Understanding French number patterns will help you master larger numbers:
        </p>

        <div className="my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teen Numbers (11-19)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  French teen numbers are formed by combining &ldquo;dix&rdquo; (ten) with the unit number.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">11</span>
                    <span>onze</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">12</span>
                    <span>douze</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">13</span>
                    <span>treize</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">14</span>
                    <span>quatorze</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">15</span>
                    <span>quinze</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compound Numbers (21-99)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Numbers 21-99 use &ldquo;et&rdquo; (and) for 21, 31, 41, etc., and hyphens for others.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">21</span>
                    <span>vingt-et-un</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">22</span>
                    <span>vingt-deux</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">31</span>
                    <span>trente-et-un</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">32</span>
                    <span>trente-deux</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Practice Section */}
        <InteractivePracticeSection
          title="Practice French Numbers"
          description="Test your knowledge with our interactive number exercises and pronunciation practice."
          buttonText="Start Number Practice"
          href="/practice"
        />
      </div>
    </div>
  );
}