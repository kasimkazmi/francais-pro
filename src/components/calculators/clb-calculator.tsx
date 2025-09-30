"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";

interface CLBScore {
  module: string;
  moduleKey: string;
  score: number;
  clb: number;
  level: string;
  color: string;
}

// TEF Canada score ranges for dropdown options by skill
const SCORE_RANGES = {
  reading: [
    { label: "Select...", value: "select"},
    { label: "263-300", value: "263-300"},
    { label: "248-262", value: "248-262"},
    { label: "233-247", value: "233-247"},
    { label: "207-232", value: "207-232"},
    { label: "181-206", value: "181-206"},
    { label: "151-180", value: "151-180"},
    { label: "121-150", value: "121-150"},
    { label: "0-120", value: "0-120"},
  ],
  listening: [
  { label: "Select...", value: "select"},
    { label: "316-360", value: "316-360" },
    { label: "298-315", value: "298-315" },
    { label: "280-297", value: "280-297" },
    { label: "249-279", value: "249-279" },
    { label: "217-248", value: "217-248" },
    { label: "181-216", value: "181-216" },
    { label: "145-180", value: "145-180" },
    { label: "0-144", value: "0-144" },
  ],
  writing: [
    { label: "Select...", value: "select"},
    { label: "393-450", value: "393-450" },
    { label: "371-392", value: "371-392" },
    { label: "349-370", value: "349-370" },
    { label: "310-348", value: "310-348" },
    { label: "271-309", value: "271-309" },
    { label: "226-270", value: "226-270" },
    { label: "181-225", value: "181-225" },
    { label: "0-180", value: "0" },
  ],
  speaking: [
    { label: "Select...", value: "select"},
    { label: "393-450", value: "393-450" },
    { label: "371-392", value: "371-392" },
    { label: "349-370", value: "349-370" },
    { label: "310-348", value: "310-348" },
    { label: "271-309", value: "271-309" },
    { label: "226-270", value: "226-270" },
    { label: "181-225", value: "181-225" },
    { label: "0-180", value: "0-180" },
  ],
};

// Accurate TEF Canada to CLB conversion tables (2024)
const CLB_CONVERSION = {
  Reading: {
    0: { clb: 0, level: "No proficiency", color: "bg-red-500" },
    121: { clb: 4, level: "Basic", color: "bg-orange-500" },
    151: { clb: 5, level: "Intermediate", color: "bg-yellow-500" },
    181: { clb: 6, level: "Intermediate+", color: "bg-lime-500" },
    207: { clb: 7, level: "Advanced", color: "bg-green-500" },
    233: { clb: 8, level: "Advanced+", color: "bg-emerald-500" },
    248: { clb: 9, level: "Expert", color: "bg-teal-500" },
    263: { clb: 10, level: "Expert+", color: "bg-blue-500" },
  },
  Listening: {
    0: { clb: 0, level: "No proficiency", color: "bg-red-500" },
    145: { clb: 4, level: "Basic", color: "bg-orange-500" },
    181: { clb: 5, level: "Intermediate", color: "bg-yellow-500" },
    217: { clb: 6, level: "Intermediate+", color: "bg-lime-500" },
    249: { clb: 7, level: "Advanced", color: "bg-green-500" },
    280: { clb: 8, level: "Advanced+", color: "bg-emerald-500" },
    298: { clb: 9, level: "Expert", color: "bg-teal-500" },
    316: { clb: 10, level: "Expert+", color: "bg-blue-500" },
  },
  Writing: {
    0: { clb: 0, level: "No proficiency", color: "bg-red-500" },
    181: { clb: 4, level: "Basic", color: "bg-orange-500" },
    226: { clb: 5, level: "Intermediate", color: "bg-yellow-500" },
    271: { clb: 6, level: "Intermediate+", color: "bg-lime-500" },
    310: { clb: 7, level: "Advanced", color: "bg-green-500" },
    349: { clb: 8, level: "Advanced+", color: "bg-emerald-500" },
    371: { clb: 9, level: "Expert", color: "bg-teal-500" },
    393: { clb: 10, level: "Expert+", color: "bg-blue-500" },
  },
  Speaking: {
    0: { clb: 0, level: "No proficiency", color: "bg-red-500" },
    181: { clb: 4, level: "Basic", color: "bg-orange-500" },
    226: { clb: 5, level: "Intermediate", color: "bg-yellow-500" },
    271: { clb: 6, level: "Intermediate+", color: "bg-lime-500" },
    310: { clb: 7, level: "Advanced", color: "bg-green-500" },
    349: { clb: 8, level: "Advanced+", color: "bg-emerald-500" },
    371: { clb: 9, level: "Expert", color: "bg-teal-500" },
    393: { clb: 10, level: "Expert+", color: "bg-blue-500" },
  },
};

export function CLBCalculator() {
  // Maximum scores for each TEF Canada module
  const MAX_SCORES = {
    reading: 300,
    listening: 360,
    writing: 450,
    speaking: 450
  };

  const [scores, setScores] = useState({
    reading: "select",
    listening: "select",
    writing: "select",
    speaking: "select",
  });

  const [results, setResults] = useState<CLBScore[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const calculateCLB = (module: string, score: number) => {
    // Capitalize the module name to match CLB_CONVERSION keys
    const capitalizedModule = module.charAt(0).toUpperCase() + module.slice(1);
    const conversion = CLB_CONVERSION[capitalizedModule as keyof typeof CLB_CONVERSION];
    
    if (!conversion) {
      return { clb: 0, level: "No proficiency", color: "bg-red-500" };
    }
    
    const thresholds = Object.keys(conversion)
      .map(Number)
      .sort((a, b) => b - a);

    for (const threshold of thresholds) {
      if (score >= threshold) {
        return conversion[threshold as keyof typeof conversion];
      }
    }
    return conversion[0 as keyof typeof conversion];
  };

  const validateScores = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(scores).forEach(([module, score]) => {
      if (score === "" || score === "select") {
        newErrors[module] = `${
          module.charAt(0).toUpperCase() + module.slice(1)
        } score is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateScores()) {
      return;
    }

    const newResults: CLBScore[] = [];

    Object.entries(scores).forEach(([module, scoreStr]) => {
      // Extract the lower bound from the range (e.g., "263-300" -> 263)
      const score = parseInt(scoreStr.split('-')[0]);
      const clbData = calculateCLB(module, score);
      newResults.push({
        module: module.charAt(0).toUpperCase() + module.slice(1),
        moduleKey: module,
        score,
        clb: clbData.clb,
        level: clbData.level,
        color: clbData.color,
      });
    });

    setResults(newResults);
    setShowResults(true);
  };

  const getOverallCLB = () => {
    if (results.length === 0) return 0;
    return Math.min(...results.map((r) => r.clb));
  };

  const getExpressEntryPoints = () => {
    const overallCLB = getOverallCLB();
    if (overallCLB >= 7) {
      return 25; // Assuming English is CLB 4 or lower
    }
    return 0;
  };

  const resetCalculator = () => {
    setScores({
      reading: "select",
      listening: "select",
      writing: "select",
      speaking: "select",
    });
    setResults([]);
    setShowResults(false);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            TEF Canada CLB Score Calculator
          </CardTitle>
          <CardDescription>
            Select your TEF Canada score ranges to calculate your Canadian
            Language Benchmark (CLB) levels. CLB is the national standard for
            measuring French and English language proficiency for Canadian
            immigration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(scores).map(([module, value]) => (
              <div key={module} className="space-y-2">
                <Label htmlFor={module} className="text-sm font-medium">
                  {module.charAt(0).toUpperCase() + module.slice(1)} Score
                </Label>
                <Select
                  value={value}
                  onValueChange={(selectedValue) => {
                    setScores((prev) => ({ ...prev, [module]: selectedValue }));
                    // Clear error when user selects a value
                    if (errors[module]) {
                      setErrors((prev) => ({ ...prev, [module]: "" }));
                    }
                  }}
                >
                  <SelectTrigger
                    className={`universal-card ${
                      errors[module] ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select score range" />
                  </SelectTrigger>
                   <SelectContent
                     className="!border-border"
                     style={{
                       backgroundColor: isDark ? "#111827" : "#f3f4f6",
                     }}
                   >
                     {SCORE_RANGES[module as keyof typeof SCORE_RANGES].map((range) => (
                       <SelectItem
                         key={range.value}
                         value={range.value}
                         className="bg-background hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-blue-900 dark:hover:text-blue-100 focus:bg-green-100 focus:text-green-900 dark:focus:bg-green-900 dark:focus:text-green-100 transition-colors duration-200"
                       >
                         {range.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                </Select>
                {errors[module] && (
                  <p className="text-sm text-red-500">{errors[module]}</p>
                )}
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
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>

          {showResults && results.length > 0 && (
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Your CLB scores have been calculated. The overall CLB level is
                  the lowest score across all modules.
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
                        Score: {result.score}/{MAX_SCORES[result.moduleKey as keyof typeof MAX_SCORES]}
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
                      <h3 className="font-semibold text-lg">
                        Overall CLB Level
                      </h3>
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
                        You can earn {getExpressEntryPoints()} additional points
                        for French language proficiency
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
                        Focus on your weakest module to reach CLB 7 and earn
                        bonus points
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
