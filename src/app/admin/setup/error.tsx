'use client';

import ErrorScreen from '@/components/ui/ErrorScreen';
import React from 'react';

const SetupError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return (
        <ErrorScreen 
            error={error}
            reset={reset}
            title="Setup Error"
            description="Something went wrong while loading the setup. Please try again or contact support if the problem persists."
        />
    );
};

export default SetupError;