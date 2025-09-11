'use client';

import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/ui/audio-button';

interface Introduction {
  french: string;
  english: string;
  pronunciation: string;
  usage: string;
}

interface InteractiveIntroductionCardProps {
  introduction: Introduction;
  index: number;
}

export function InteractiveIntroductionCard({ introduction, index }: InteractiveIntroductionCardProps) {
  return (
    <div className="flex items-center p-4 border rounded-lg universal-card">
      <Badge variant="secondary" className="mr-4">{index + 1}</Badge>
      <div className="flex-1">
        <h3 className="font-semibold">{introduction.french}</h3>
        <p className="text-sm text-muted-foreground">{introduction.english}</p>
        <p className="text-xs text-muted-foreground mt-1">Pronunciation: {introduction.pronunciation}</p>
        <p className="text-xs text-muted-foreground italic mt-1">{introduction.usage}</p>
      </div>
      <AudioButton 
        text={`${introduction.french}, ${introduction.english}`}
        size="sm"
      />
    </div>
  );
}

interface InteractiveIntroductionListProps {
  introductions: Introduction[];
}

export function InteractiveIntroductionList({ introductions }: InteractiveIntroductionListProps) {
  return (
    <div className="space-y-4">
      {introductions.map((introduction, index) => (
        <InteractiveIntroductionCard key={index} introduction={introduction} index={index} />
      ))}
    </div>
  );
}
