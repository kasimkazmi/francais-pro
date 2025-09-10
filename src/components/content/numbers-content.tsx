import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';
import { ArrowRight, Volume2, Calculator } from 'lucide-react';
import numbersData from '@/data/numbers.json';

export function NumbersContent() {
  const { numbers1to20, tens, compoundNumbers, ordinalNumbers } = numbersData;
  
  // Convert ordinalNumbers object to array for easier mapping
  const ordinalNumbersArray = [
    ...ordinalNumbers.firstToFifth,
    ...ordinalNumbers.sixthToTenth
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">French Numbers</h1>
        <div className="flex items-center space-x-2">
          <Link href="/practice?category=numbers">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Numbers Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          Master French numbers from 1 to 100 and beyond. Numbers are essential for everyday conversations, telling time, and counting.
        </p>

        <div className="my-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm font-medium">Numbers Tip</p>
              <p className="text-sm text-muted-foreground">
                French numbers follow specific patterns. Once you learn 1-20 and the tens, you can build any number!
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Numbers 1-20</h2>
        <p className="text-muted-foreground mb-6">
          These are the foundation numbers you need to memorize:
        </p>

        <div className="my-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Basic Numbers
              </CardTitle>
              <CardDescription>Essential numbers for everyday use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {numbers1to20.map((number, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">{number.num}</span>
                      <div className="text-sm font-medium">{number.french}</div>
                      <div className="text-xs text-muted-foreground">{number.pronunciation}</div>
                    </div>
                    <AudioButton 
                      text={number.french} 
                      size="sm" 
                      tooltipContent={`Click to hear "${number.french}"`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Tens (20, 30, 40...)</h2>
        <p className="text-muted-foreground mb-6">
          Learn the tens to build larger numbers:
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {tens.map((ten, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-bold text-2xl text-green-600 dark:text-green-400">{ten.num}</span>
                      <div className="text-sm font-medium">{ten.french}</div>
                      <div className="text-xs text-muted-foreground">{ten.pronunciation}</div>
                    </div>
                    <AudioButton 
                      text={ten.french} 
                      size="sm" 
                      tooltipContent={`Click to hear "${ten.french}"`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Compound Numbers (21-99)</h2>
        <p className="text-muted-foreground mb-6">
          French compound numbers use "et" (and) for 21, 31, 41, etc., but not for others:
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {compoundNumbers.map((number, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">{number.num}</span>
                      <div className="text-sm font-medium">{number.french}</div>
                      {number.note && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {number.note}
                        </Badge>
                      )}
                    </div>
                    <AudioButton 
                      text={number.french} 
                      size="sm" 
                      tooltipContent={`Click to hear "${number.french}"`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Ordinal Numbers</h2>
        <p className="text-muted-foreground mb-6">
          Ordinal numbers indicate position or order (first, second, third...):
        </p>

        <div className="my-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ordinalNumbersArray.map((ordinal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <span className="font-bold text-2xl text-orange-600 dark:text-orange-400">{ordinal.num}</span>
                      <div className="text-sm font-medium">{ordinal.french}</div>
                    </div>
                    <AudioButton 
                      text={ordinal.french} 
                      size="sm" 
                      tooltipContent={`Click to hear "${ordinal.french}"`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="my-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Ready to Practice?</h3>
          <p className="text-muted-foreground mb-4">
            Test your knowledge of French numbers with our interactive exercises.
          </p>
          <Link href="/practice?category=numbers">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
              Start Numbers Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
