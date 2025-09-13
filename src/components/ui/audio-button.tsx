'use client';

import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { NoSSR } from '@/components/ui/no-ssr';
import { Play, Pause, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isMobileDevice } from '@/lib/utils/mobile-detection';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  showTooltip?: boolean;
  tooltipContent?: string;
}

export function AudioButton({ 
  text, 
  className, 
  size = 'sm', 
  variant = 'ghost',
  showTooltip = true,
  tooltipContent
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const speakText = async () => {
    if (isPlaying) return;
    
    setIsLoading(true);
    setIsPlaying(true);
    setHasError(false);

    try {
      // Use Web Speech API for text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onend = () => {
          setIsPlaying(false);
          setIsLoading(false);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsPlaying(false);
          setIsLoading(false);
          setHasError(true);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // Fallback for browsers without speech synthesis
        console.log('Speech synthesis not supported');
        setIsPlaying(false);
        setIsLoading(false);
        setHasError(true);
      }
    } catch (error) {
      console.error('Error with speech synthesis:', error);
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsLoading(false);
  };

  const getIcon = () => {
    if (hasError) return <VolumeX className="h-4 w-4 text-red-500" />;
    if (isLoading) return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
    if (isPlaying) return <Pause className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    return <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
  };

  const getTooltipText = () => {
    if (tooltipContent) return tooltipContent;
    if (hasError) return "Audio not available";
    if (isPlaying) return "Click to stop";
    return "Click to hear pronunciation";
  };

  const buttonElement = (
    <EnhancedButton
      variant={variant}
      size={size}
      className={cn(
        "group relative",
        hasError && "opacity-50",
        isPlaying && "bg-primary/20 text-primary",
        className
      )}
      onClick={isPlaying ? stopSpeaking : speakText}
      disabled={isLoading}
    >
      <span className="relative z-10 flex items-center justify-center">
        {getIcon()}
      </span>
      {isPlaying && (
        <div className="absolute inset-0 bg-primary/10 animate-pulse rounded" />
      )}
    </EnhancedButton>
  );

  if (showTooltip) {
    return (
      <NoSSR fallback={
        <EnhancedButton
          variant={variant}
          size={size}
          className={cn(
            "group relative",
            hasError && "opacity-50",
            isPlaying && "bg-primary/20 text-primary",
            className
          )}
          disabled={true}
        >
          <span className="relative z-10 flex items-center justify-center">
            <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </span>
        </EnhancedButton>
      }>
      {!isMobileDevice() && showTooltip ? (
        <SimpleTooltip 
          content={getTooltipText()} 
          side="top"
          delay={200}
        >
          {buttonElement}
        </SimpleTooltip>
      ) : (
        buttonElement
      )}
      </NoSSR>
    );
  }

  return (
    <NoSSR fallback={
      <EnhancedButton
        variant={variant}
        size={size}
        className={cn(
          "group relative",
          hasError && "opacity-50",
          isPlaying && "bg-primary/20 text-primary",
          className
        )}
        disabled={true}
      >
        <span className="relative z-10 flex items-center justify-center">
          <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </span>
      </EnhancedButton>
    }>
      {buttonElement}
    </NoSSR>
  );
}
