import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/layout/app-shell';
import { AudioButton } from '@/components/ui/audio-button';
import { ArrowRight, Volume2, Calculator } from 'lucide-react';
import numbersData from '@/data/numbers.json';

export default function NumbersPage() {
  const { numbers1to20, tens, compoundNumbers, ordinalNumbers } = numbersData;

  return (
    <AppShell>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">French Numbers</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Practice Mode
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Master French numbers from 1 to 100. French numbers have unique patterns that make them fun to learn!
          </p>

          <div className="my-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-2">
              <Calculator className="mt-0.5 h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Number Tip</p>
                <p className="text-sm text-muted-foreground">
                  French numbers from 70-99 use a unique system based on 60s and 80s. Don't worry, it's easier than it sounds!
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Numbers 1-20</h2>
          <p className="text-muted-foreground mb-6">
            These are the foundation of all French numbers:
          </p>

          {/* Numbers 1-20 Grid */}
          <div className="my-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {numbers1to20.map((item, index) => (
                <Card key={index} className="universal-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-2">{item.num}</div>
                    <div className="text-lg font-semibold mb-1">{item.french}</div>
                    <div className="text-sm text-muted-foreground mb-2">{item.pronunciation}</div>
                    <AudioButton 
                      text={`${item.num}, ${item.french}, ${item.pronunciation}`}
                      className="w-full"
                      size="sm"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Tens (20-100)</h2>
          <p className="text-muted-foreground mb-6">
            Learn the multiples of ten:
          </p>

          <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tens.map((item, index) => (
                <Card key={index} className="universal-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{item.num}</div>
                        <div className="text-lg font-semibold">{item.french}</div>
                        <div className="text-sm text-muted-foreground">{item.pronunciation}</div>
                      </div>
                      <AudioButton 
                        text={`${item.num}, ${item.french}, ${item.pronunciation}`}
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Compound Numbers</h2>
          <p className="text-muted-foreground mb-4">
            French compound numbers use hyphens. Here are some examples:
          </p>

          <div className="my-6">
            <div className="space-y-4">
              {compoundNumbers.map((number, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg universal-card">
                  <Badge variant="secondary" className="mr-4">{number.num}</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold">{number.french}</h3>
                    <p className="text-sm text-muted-foreground">{number.note}</p>
                  </div>
                  <AudioButton 
                    text={`${number.num}, ${number.french}`}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ordinal Numbers</h2>
          <p className="text-muted-foreground mb-4">
            Learn to count in order (first, second, third, etc.):
          </p>

          <div className="relative my-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">1st - 5th</h4>
                  <ul className="space-y-1 text-sm">
                    {ordinalNumbers.firstToFifth.map((ordinal, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>• {ordinal.num} - {ordinal.french}</span>
                        <AudioButton 
                          text={`${ordinal.num}, ${ordinal.french}`}
                          size="sm"
                          variant="ghost"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">6th - 10th</h4>
                  <ul className="space-y-1 text-sm">
                    {ordinalNumbers.sixthToTenth.map((ordinal, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>• {ordinal.num} - {ordinal.french}</span>
                        <AudioButton 
                          text={`${ordinal.num}, ${ordinal.french}`}
                          size="sm"
                          variant="ghost"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">Practice Your Numbers</h3>
            <p className="text-muted-foreground mb-4">
              Test your knowledge with our interactive number exercises and pronunciation practice.
            </p>
            <Link href="/practice">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
                Start Number Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
