/**
 * Halloween Theme Component Props
 */

export interface HalloweenMusicManagerProps {
  isHalloweenActive: boolean;
}

export interface HalloweenPageWrapperProps {
  children: React.ReactNode;
  decorationIntensity?: 'none' | 'low' | 'medium' | 'high';
  className?: string;
}

export interface HalloweenBatProps {
  delay?: number;
  duration?: number;
  className?: string;
}

export interface HalloweenGhostProps {
  delay?: number;
  duration?: number;
  className?: string;
}

export interface HalloweenPumpkinProps {
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface HalloweenSpiderProps {
  delay?: number;
  className?: string;
}

export interface HalloweenTeaBatProps {
  delay?: number;
  className?: string;
}

export interface HalloweenWitchHatProps {
  delay?: number;
  className?: string;
}

