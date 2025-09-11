'use client';

import { useState, useCallback, useEffect } from 'react';

interface LoadingState {
  isLoading: boolean;
  error: string | null;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export function useLoadingState(initialLoading = false): LoadingState {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
    reset
  };
}

// Hook for async operations with loading state
export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  dependencies: any[] = []
) {
  const { isLoading, error, startLoading, stopLoading, setError } = useLoadingState();

  const execute = useCallback(async () => {
    try {
      startLoading();
      const result = await operation();
      stopLoading();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      stopLoading();
      throw err;
    }
  }, [operation, startLoading, stopLoading, setError, ...dependencies]);

  return {
    isLoading,
    error,
    execute
  };
}

// Hook for component mounting loading state
export function useMountLoading(initialDelay = 0) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (initialDelay > 0) {
      const timer = setTimeout(() => setIsMounted(true), initialDelay);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(true);
    }
  }, [initialDelay]);

  return isMounted;
}
