'use client';

import ErrorScreen from '@/components/ui/ErrorScreens';
import React from 'react';

const UserDetailError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return <ErrorScreen error={error} reset={reset} />;
};

export default UserDetailError;
