import { Suspense } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PracticeContent } from '@/components/content/practice-content';

export default function PracticePage() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <PracticeContent />
      </Suspense>
    </MainLayout>
  );
}
