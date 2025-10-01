/**
 * Seasonal Theme Component Props
 */

// ============================================
// Seasonal Components
// ============================================

export interface SeasonalWelcomeProps {
  className?: string;
}

export interface SeasonalHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export interface SeasonalThemeToggleProps {
  className?: string;
}

export interface SafeSeasonalThemeToggleProps {
  className?: string;
}

export interface SeasonalCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export interface ThemeAwareButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export interface ThemeAwareFeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export interface ThemeAwareLearningCardProps {
  title: string;
  description: string;
  progress?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface ThemeAwareIconProps {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  size?: number;
}

// ============================================
// Draggable Learning Path
// ============================================

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface DraggableLearningPathProps {
  steps: LearningStep[];
  onReorder?: (steps: LearningStep[]) => void;
  className?: string;
}

