'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, CheckCircle, AlertCircle, Info, Star } from 'lucide-react';

interface ExpressEntryForm {
  age: string;
  education: string;
  workExperience: string;
  canadianWorkExperience: string;
  frenchCLB: string;
  englishCLB: string;
  spouseFrenchCLB: string;
  spouseEnglishCLB: string;
  canadianEducation: string;
  jobOffer: string;
  provincialNomination: string;
  siblingInCanada: string;
}

const POINTS_TABLES = {
  age: {
    '18': 99, '19': 105, '20': 110, '21': 110, '22': 110, '23': 110, '24': 110, '25': 110,
    '26': 110, '27': 110, '28': 110, '29': 110, '30': 105, '31': 99, '32': 94, '33': 88,
    '34': 83, '35': 77, '36': 72, '37': 66, '38': 61, '39': 55, '40': 50, '41': 39,
    '42': 28, '43': 17, '44': 6, '45': 0
  },
  education: {
    'no-education': 0,
    'high-school': 30,
    'one-year': 90,
    'two-year': 98,
    'three-year': 120,
    'bachelor': 120,
    'two-bachelor': 128,
    'master': 135,
    'phd': 150
  },
  workExperience: {
    'none': 0,
    '1-year': 40,
    '2-year': 53,
    '3-year': 64,
    '4-year': 72,
    '5-year': 80
  },
  canadianWorkExperience: {
    'none': 0,
    '1-year': 40,
    '2-year': 53,
    '3-year': 64,
    '4-year': 72,
    '5-year': 80
  },
  language: {
    'clb4': 6, 'clb5': 6, 'clb6': 9, 'clb7': 17, 'clb8': 23, 'clb9': 31, 'clb10': 34
  },
  frenchBonus: {
    'clb7-english4': 25,
    'clb7-english5': 50
  }
};

export function ExpressEntryCalculator() {
  const [form, setForm] = useState<ExpressEntryForm>({
    age: '',
    education: '',
    workExperience: '',
    canadianWorkExperience: '',
    frenchCLB: '',
    englishCLB: '',
    spouseFrenchCLB: '',
    spouseEnglishCLB: '',
    canadianEducation: 'no',
    jobOffer: 'no',
    provincialNomination: 'no',
    siblingInCanada: 'no'
  });

  const [totalPoints, setTotalPoints] = useState(0);
  const [breakdown, setBreakdown] = useState<any>({});
  const [showResults, setShowResults] = useState(false);

  const calculatePoints = () => {
    let points = 0;
    const breakdown: any = {};

    // Age points
    const agePoints = POINTS_TABLES.age[form.age as keyof typeof POINTS_TABLES.age] || 0;
    points += agePoints;
    breakdown.age = agePoints;

    // Education points
    const educationPoints = POINTS_TABLES.education[form.education as keyof typeof POINTS_TABLES.education] || 0;
    points += educationPoints;
    breakdown.education = educationPoints;

    // Work experience points
    const workPoints = POINTS_TABLES.workExperience[form.workExperience as keyof typeof POINTS_TABLES.workExperience] || 0;
    points += workPoints;
    breakdown.workExperience = workPoints;

    // Canadian work experience points
    const canadianWorkPoints = POINTS_TABLES.canadianWorkExperience[form.canadianWorkExperience as keyof typeof POINTS_TABLES.canadianWorkExperience] || 0;
    points += canadianWorkPoints;
    breakdown.canadianWorkExperience = canadianWorkPoints;

    // Language points (French)
    const frenchPoints = POINTS_TABLES.language[form.frenchCLB as keyof typeof POINTS_TABLES.language] || 0;
    points += frenchPoints;
    breakdown.frenchLanguage = frenchPoints;

    // Language points (English)
    const englishPoints = POINTS_TABLES.language[form.englishCLB as keyof typeof POINTS_TABLES.language] || 0;
    points += englishPoints;
    breakdown.englishLanguage = englishPoints;

    // French bonus points
    let frenchBonus = 0;
    if (form.frenchCLB === 'clb7' || form.frenchCLB === 'clb8' || form.frenchCLB === 'clb9' || form.frenchCLB === 'clb10') {
      if (form.englishCLB === 'clb4' || form.englishCLB === 'clb5' || form.englishCLB === 'clb6') {
        frenchBonus = 25;
      } else if (form.englishCLB === 'clb7' || form.englishCLB === 'clb8' || form.englishCLB === 'clb9' || form.englishCLB === 'clb10') {
        frenchBonus = 50;
      }
    }
    points += frenchBonus;
    breakdown.frenchBonus = frenchBonus;

    // Additional points
    let additionalPoints = 0;
    if (form.canadianEducation === 'yes') additionalPoints += 15;
    if (form.jobOffer === 'yes') additionalPoints += 50;
    if (form.provincialNomination === 'yes') additionalPoints += 600;
    if (form.siblingInCanada === 'yes') additionalPoints += 15;

    points += additionalPoints;
    breakdown.additional = additionalPoints;

    setTotalPoints(points);
    setBreakdown(breakdown);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setForm({
      age: '',
      education: '',
      workExperience: '',
      canadianWorkExperience: '',
      frenchCLB: '',
      englishCLB: '',
      spouseFrenchCLB: '',
      spouseEnglishCLB: '',
      canadianEducation: 'no',
      jobOffer: 'no',
      provincialNomination: 'no',
      siblingInCanada: 'no'
    });
    setTotalPoints(0);
    setBreakdown({});
    setShowResults(false);
  };

  const getScoreStatus = (points: number) => {
    if (points >= 470) return { status: 'Excellent', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (points >= 400) return { status: 'Good', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (points >= 350) return { status: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { status: 'Needs Improvement', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const scoreStatus = getScoreStatus(totalPoints);

  return (
    <div className="space-y-6">
      <Card className="universal-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Express Entry Points Calculator
          </CardTitle>
          <CardDescription>
            Calculate your Comprehensive Ranking System (CRS) score for Express Entry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Core Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Select value={form.age} onValueChange={(value) => setForm(prev => ({ ...prev, age: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(POINTS_TABLES.age).map(age => (
                      <SelectItem key={age} value={age}>{age} years old</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Select value={form.education} onValueChange={(value) => setForm(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-education">No formal education</SelectItem>
                    <SelectItem value="high-school">High school diploma</SelectItem>
                    <SelectItem value="one-year">One-year program</SelectItem>
                    <SelectItem value="two-year">Two-year program</SelectItem>
                    <SelectItem value="three-year">Three-year program</SelectItem>
                    <SelectItem value="bachelor">Bachelor's degree</SelectItem>
                    <SelectItem value="two-bachelor">Two or more bachelor's degrees</SelectItem>
                    <SelectItem value="master">Master's degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workExperience">Foreign Work Experience</Label>
                <Select value={form.workExperience} onValueChange={(value) => setForm(prev => ({ ...prev, workExperience: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Select work experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="1-year">1 year</SelectItem>
                    <SelectItem value="2-year">2 years</SelectItem>
                    <SelectItem value="3-year">3 years</SelectItem>
                    <SelectItem value="4-year">4 years</SelectItem>
                    <SelectItem value="5-year">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canadianWorkExperience">Canadian Work Experience</Label>
                <Select value={form.canadianWorkExperience} onValueChange={(value) => setForm(prev => ({ ...prev, canadianWorkExperience: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Select Canadian work experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="1-year">1 year</SelectItem>
                    <SelectItem value="2-year">2 years</SelectItem>
                    <SelectItem value="3-year">3 years</SelectItem>
                    <SelectItem value="4-year">4 years</SelectItem>
                    <SelectItem value="5-year">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Language Proficiency */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Language Proficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frenchCLB">French CLB Level</Label>
                <Select value={form.frenchCLB} onValueChange={(value) => setForm(prev => ({ ...prev, frenchCLB: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Select French CLB level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clb4">CLB 4</SelectItem>
                    <SelectItem value="clb5">CLB 5</SelectItem>
                    <SelectItem value="clb6">CLB 6</SelectItem>
                    <SelectItem value="clb7">CLB 7</SelectItem>
                    <SelectItem value="clb8">CLB 8</SelectItem>
                    <SelectItem value="clb9">CLB 9</SelectItem>
                    <SelectItem value="clb10">CLB 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="englishCLB">English CLB Level</Label>
                <Select value={form.englishCLB} onValueChange={(value) => setForm(prev => ({ ...prev, englishCLB: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Select English CLB level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clb4">CLB 4</SelectItem>
                    <SelectItem value="clb5">CLB 5</SelectItem>
                    <SelectItem value="clb6">CLB 6</SelectItem>
                    <SelectItem value="clb7">CLB 7</SelectItem>
                    <SelectItem value="clb8">CLB 8</SelectItem>
                    <SelectItem value="clb9">CLB 9</SelectItem>
                    <SelectItem value="clb10">CLB 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="canadianEducation">Canadian Education</Label>
                <Select value={form.canadianEducation} onValueChange={(value) => setForm(prev => ({ ...prev, canadianEducation: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Canadian education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (+15 points)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobOffer">Valid Job Offer</Label>
                <Select value={form.jobOffer} onValueChange={(value) => setForm(prev => ({ ...prev, jobOffer: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Job offer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (+50 points)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provincialNomination">Provincial Nomination</Label>
                <Select value={form.provincialNomination} onValueChange={(value) => setForm(prev => ({ ...prev, provincialNomination: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Provincial nomination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (+600 points)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siblingInCanada">Sibling in Canada</Label>
                <Select value={form.siblingInCanada} onValueChange={(value) => setForm(prev => ({ ...prev, siblingInCanada: value }))}>
                  <SelectTrigger className="universal-card">
                    <SelectValue placeholder="Sibling in Canada" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (+15 points)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={calculatePoints}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Calculate CRS Score
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
            >
              Reset
            </Button>
          </div>

          {showResults && (
            <div className="space-y-4">
              <Card className={`${scoreStatus.bg} border-current`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">Your CRS Score</h3>
                      <p className="text-muted-foreground">Comprehensive Ranking System</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${scoreStatus.color}`}>
                        {totalPoints}
                      </div>
                      <Badge className={`${scoreStatus.color} bg-transparent`}>
                        {scoreStatus.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="universal-card">
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.age || 0}</div>
                      <div className="text-sm text-muted-foreground">Age</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.education || 0}</div>
                      <div className="text-sm text-muted-foreground">Education</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.workExperience || 0}</div>
                      <div className="text-sm text-muted-foreground">Work Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.canadianWorkExperience || 0}</div>
                      <div className="text-sm text-muted-foreground">Canadian Work</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.frenchLanguage || 0}</div>
                      <div className="text-sm text-muted-foreground">French Language</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.englishLanguage || 0}</div>
                      <div className="text-sm text-muted-foreground">English Language</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{breakdown.frenchBonus || 0}</div>
                      <div className="text-sm text-muted-foreground">French Bonus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{breakdown.additional || 0}</div>
                      <div className="text-sm text-muted-foreground">Additional</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {breakdown.frenchBonus > 0 && (
                <Alert>
                  <Star className="h-4 w-4" />
                  <AlertDescription>
                    Great! You're earning {breakdown.frenchBonus} bonus points for your French language skills. 
                    This gives you a significant advantage in the Express Entry pool.
                  </AlertDescription>
                </Alert>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Recent Express Entry draws typically require scores between 470-500 points. 
                  Consider improving your language skills or gaining Canadian work experience to increase your chances.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
