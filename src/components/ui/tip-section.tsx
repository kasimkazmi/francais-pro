import { Info } from 'lucide-react';

interface TipSectionProps {
  title: string;
  content: string;
  className?: string;
}

export function TipSection({ title, content, className = "" }: TipSectionProps) {
  return (
    <div className={`my-6 rounded-lg border bg-muted/50 p-4 ${className}`}>
      <div className="flex items-start space-x-2">
        <Info className="mt-0.5 h-4 w-4 text-blue-500" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
