'use client';

import { useEffect, useState } from 'react';

interface DefaultInitialLoaderProps {
  isLoading?: boolean;
  duration?: number;
  onComplete?: () => void;
}

export function DefaultInitialLoader({ isLoading = true, duration = 1200, onComplete }: DefaultInitialLoaderProps) {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) { setShow(false); return; }
    const t = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(t);
  }, [isLoading, duration, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}


