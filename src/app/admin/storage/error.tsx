'use client';

import ErrorScreen from '@/components/ui/ErrorScreens';
import React from 'react';

const StorageError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return <ErrorScreen error={error} reset={reset} />;
};

export default StorageError;
