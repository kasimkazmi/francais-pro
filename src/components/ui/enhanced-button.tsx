'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  tooltip?: string | React.ReactNode;
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function EnhancedButton({
  children,
  variant = 'default',
  size = 'default',
  className,
  tooltip,
  tooltipSide = 'top',
  onClick,
  disabled = false,
  asChild = false,
  ...props
}: EnhancedButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    
    if (onClick) {
      onClick();
    }
  };

  const buttonElement = (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all duration-200 ease-in-out group",
        "hover:scale-105 hover:shadow-lg",
        "active:scale-95 active:shadow-md",
        "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        // Enhanced hover background effects
        "hover:bg-primary/90 hover:text-primary-foreground",
        "hover:border-primary/20",
        isClicked && "animate-pulse",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      asChild={asChild}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-1">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
    </Button>
  );

  if (tooltip) {
    return (
      <SimpleTooltip content={tooltip} side={tooltipSide}>
        {buttonElement}
      </SimpleTooltip>
    );
  }

  return buttonElement;
}
