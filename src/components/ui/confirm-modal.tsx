'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Portal } from '@/components/ui/portal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Portal>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <Card 
          className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl relative animate-in zoom-in-95 duration-300 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              {variant === 'destructive' ? (
                <AlertTriangle className="h-8 w-8 text-red-500" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 active:scale-95"
            >
              {cancelText}
            </Button>
            <Button 
              variant={variant === 'destructive' ? 'destructive' : 'default'}
              onClick={handleConfirm}
              className="flex-1 bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800 hover:text-white transition-all duration-200 active:scale-95"
            >
              {confirmText}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Portal>
  );
}
