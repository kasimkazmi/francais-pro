'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface InteractivePracticeSectionProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  className?: string;
}

export function InteractivePracticeSection({ 
  title, 
  description, 
  buttonText, 
  href, 
  className = "my-8 p-6 bg-primary/10 rounded-lg border border-primary/20" 
}: InteractivePracticeSectionProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link href={href}>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200">
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
