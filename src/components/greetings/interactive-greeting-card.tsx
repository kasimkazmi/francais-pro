'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AudioButton } from '@/components/ui/audio-button';

interface Greeting {
  french: string;
  english: string;
  pronunciation: string;
  usage: string;
}

interface InteractiveGreetingCardProps {
  greeting: Greeting;
  index: number;
}

export function InteractiveGreetingCard({ greeting, index }: InteractiveGreetingCardProps) {
  return (
    <Card className="universal-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{greeting.french}</h3>
          <AudioButton 
            text={`${greeting.french}, ${greeting.english}`}
            size="sm"
          />
        </div>
        <p className="text-sm text-muted-foreground mb-2">{greeting.english}</p>
        <p className="text-xs text-muted-foreground mb-2">Pronunciation: {greeting.pronunciation}</p>
        <p className="text-xs text-muted-foreground italic">{greeting.usage}</p>
      </CardContent>
    </Card>
  );
}

interface InteractiveGreetingListProps {
  greetings: Greeting[];
}

export function InteractiveGreetingList({ greetings }: InteractiveGreetingListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {greetings.map((greeting, index) => (
        <InteractiveGreetingCard key={index} greeting={greeting} index={index} />
      ))}
    </div>
  );
}
