'use client';

import { AudioButton } from '@/components/ui/audio-button';
import { LazyCardGrid } from '@/components/ui/lazy-card';

interface AudioItem {
  title: string;
  subtitle?: string;
  pronunciation?: string;
  description?: string;
  audioText: string;
}

interface InteractiveAudioGridProps {
  items: AudioItem[];
  columns?: string;
  staggerDelay?: number;
  className?: string;
}

export function InteractiveAudioGrid({ 
  items, 
  columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3",
  staggerDelay = 50,
  className = "my-6"
}: InteractiveAudioGridProps) {
  return (
    <div className={className}>
      <LazyCardGrid className={columns} staggerDelay={staggerDelay}>
        {items.map((item, index) => (
          <div key={index} className="universal-card p-3 rounded-lg text-center">
            <div className="font-bold text-lg">{item.title}</div>
            {item.subtitle && (
              <div className="text-sm text-muted-foreground">{item.subtitle}</div>
            )}
            {item.pronunciation && (
              <div className="text-xs text-muted-foreground mt-1">{item.pronunciation}</div>
            )}
            {item.description && (
              <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
            )}
            <AudioButton 
              text={item.audioText} 
              size="sm" 
              className="mt-2" 
            />
          </div>
        ))}
      </LazyCardGrid>
    </div>
  );
}
