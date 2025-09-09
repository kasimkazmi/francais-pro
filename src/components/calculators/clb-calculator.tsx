'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface CLBScore {
  module: string;
  score: number;
  clb: number;
  level: string;
  color: string;
}

const CLB_CONVERSION = {
  'Reading': {
    0: { clb: 0, level: 'No proficiency', color: 'bg-red-500' },
    121: { clb: 4, level: 'Basic', color: 'bg-orange-500' },
    151: { clb: 5, level: 'Intermediate', color: 'bg-yellow-500' },
    181: { clb: 6, level: 'Intermediate+', color: 'bg-lime-500' },
    207: { clb: 7, level: 'Advanced', color: 'bg-green-500' },
    233: { clb: 8, level: 'Advanced+', color: 'bg-emerald-500' },
    248: { clb: 9, level: 'Expert', color: 'bg-teal-500' },
    263: { clb: 10, level: 'Expert+', color: 'bg-blue-500' }
  },
  'Listening': {
    0: { clb: 0, level: 'No proficiency', color: 'bg-red-500' },
    145: { clb: 4, level: 'Basic', color: 'bg-orange-500' },
    181: { clb: 5, level: 'Intermediate', color: 'bg-yellow-500' },
    217: { clb: 6, level: 'Intermediate+', color: 'bg-lime-500' },
    249: { clb: 7, level: 'Advanced', color: 'bg-green-500' },
    280: { clb: 8, level: 'Advanced+', color: 'bg-emerald-500' },
    298: { clb: 9, level: 'Expert', color: 'bg-teal-500' },
    316: { clb: 10, level: 'Expert+', color: 'bg-blue-500' }
  },
  'Writing': {
    0: { clb: 0, level: 'No proficiency', color: 'bg-red-500' },
    181: { clb: 4, level: 'Basic', color: 'bg-orange-500' },
    226: { clb: 5, level: 'Intermediate', color: 'bg-yellow-500' },
    271: { clb: 6, level: 'Intermediate+', color: 'bg-lime-500' },
    310: { clb: 7, level: 'Advanced', color: 'bg-green-500' },
    349: { clb: 8, level: 'Advanced+', color: 'bg-emerald-500' },
    371: { clb: 9, level: 'Expert', color: 'bg-teal-500' },
    393: { clb: 10, level: 'Expert+', color: 'bg-blue-500' }
  },
  'Speaking': {
    0: { clb: 0, level: 'No proficiency', color: 'bg-red-500' },
    181: { clb: 4, level: 'Basic', color: 'bg-orange-500' },
    226: { clb: 5, level: 'Intermediate', color: 'bg-yellow-500' },
    271: { clb: 6, level: 'Intermediate+', color: 'bg-lime-500' },
    310: { clb: 7, level: 'Advanced', color: 'bg-green-500' },
    349: { clb: 8, level: 'Advanced+', color: 'bg-emerald-500' },
    371: { clb: 9, level: 'Expert', color: 'bg-teal-500' },
    393: { clb: 10, level: 'Expert+', color: 'bg-blue-500' }
  }
};

export function CLBCalculator() {
  const [scores, setScores] = useState({
    reading: '',
    listening: '',
    writing: '',
    speaking: ''
  });

  const [results, setResults] = useState<CLBScore[]>([]);
  const [showResults, setShowResults] = useState(false);

  const calculateCLB = (module: string, score: number) => {
    const conversion = CLB_CONVERSION[module as keyof typeof CLB_CONVERSION];
    const thresholds = Object.keys(conversion).map(Number).sort((a, b) => b - a);
    
    for (const threshold of thresholds) {
      if (score >= threshold) {
        return conversion[threshold];
      }
    }
    return conversion[0];
  };

  const handleCalculate = () => {
    const newResults: CLBScore[] = [];
    
    Object.entries(scores).forEach(([module, scoreStr]) => {
      const score = parseInt(scoreStr);
      if (!isNaN(score) && score >= 0 && score <= 699) {
        const clbData = calculateCLB(module, score);
        newResults.push({
          module: module.charAt(0).toUpperCase() + module.slice(1),
          score,
          clb: clbData.clb,
          level: clbData.level,
          color: clbData.color
        });
      }
    });

    setResults(newResults);
    setShowResults(true);
  };

  const getOverallCLB = () => {
    if (results.length === 0) return 0;
    return Math.min(...results.map(r => r.clb));
  };

  const getExpressEntryPoints = () => {
    const overallCLB = getOverallCLB();
    if (overallCLB >= 7) {
      return 25; // Assuming English is CLB 4 or lower
    }
    return 0;
  };

  const resetCalculator = () => {
    setScores({ reading: '', listening: '', writing: '', speaking: '' });
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      <Card className="universal-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            TEF Canada CLB Score Calculator
          </CardTitle>
          <CardDescription>
            Enter your TEF Canada scores to calculate your Canadian Language Benchmark (CLB) levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(scores).map(([module, value]) => (
              <div key={module} className="space-y-2">
                <Label htmlFor={module} className="text-sm font-medium">
                  {module.charAt(0).toUpperCase() + module.slice(1)} Score
                </Label>
                <Input
                  id={module}
                  type="number"
                  min="0"
                  max="699"
                  value={value}
                  onChange={(e) => setScores(prev => ({ ...prev, [module]: e.target.value }))}
                  placeholder="Enter score (0-699)"
                  className="universal-card"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleCalculate}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Calculate CLB Scores
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
            >
              Reset
            </Button>
          </div>

          {showResults && results.length > 0 && (
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Your CLB scores have been calculated. The overall CLB level is the lowest score across all modules.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <Card key={index} className="universal-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{result.module}</h3>
                        <Badge className={`${result.color} text-white`}>
                          CLB {result.clb}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Score: {result.score}/699
                      </p>
                      <p className="text-sm font-medium">
                        Level: {result.level}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Overall CLB Level</h3>
                      <p className="text-muted-foreground">
                        Your lowest CLB score across all modules
                      </p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                      CLB {getOverallCLB()}
                    </Badge>
                  </div>
                  
                  {getOverallCLB() >= 7 && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-700 dark:text-green-300">
                          Express Entry Bonus Points Eligible!
                        </span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        You can earn {getExpressEntryPoints()} additional points for French language proficiency
                      </p>
                    </div>
                  )}

                  {getOverallCLB() < 7 && getOverallCLB() > 0 && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-yellow-700 dark:text-yellow-300">
                          Improve to CLB 7+ for Express Entry Bonus
                        </span>
                      </div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                        Focus on your weakest module to reach CLB 7 and earn bonus points
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
