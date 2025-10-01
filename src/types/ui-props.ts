/**
 * UI Component Props
 * Props for reusable UI components
 */

import { SearchResult } from './search-types';

// ============================================
// Modal Props
// ============================================

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UploadPictureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults?: SearchResult[];
}

// ============================================
// Interactive Components
// ============================================

export interface AudioButtonProps {
  text: string;
  variant?: 'default' | 'sm' | 'lg';
  className?: string;
}

export interface AvatarGeneratorProps {
  gender: 'male' | 'female' | null;
  currentSeed: string;
  onStyleSelect: (style: string) => void;
  selectedStyle: string | null;
}

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export interface SimpleTooltipProps {
  text: string;
  children: React.ReactNode;
}

// ============================================
// Layout Components
// ============================================

export interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// ============================================
// Loading & Skeleton
// ============================================

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

// ============================================
// Data Display
// ============================================

export interface LeaderboardProps {
  entries: Array<{
    rank: number;
    displayName: string;
    xp: number;
    streak: number;
    photoURL?: string;
  }>;
  currentUserId?: string;
}

export interface TipSectionProps {
  tips: string[];
}

// ============================================
// Search
// ============================================

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// ============================================
// Tabs & Cards
// ============================================

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StyledTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export interface LazyCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface LazyCardGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

// ============================================
// Chat
// ============================================

export interface CommunityChatProps {
  isOpen: boolean;
  onClose: () => void;
}

