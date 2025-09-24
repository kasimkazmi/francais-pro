'use client';

import dynamic from 'next/dynamic';

const InnerDraggableLearningPath = dynamic(
  () => import('./draggable-learning-path').then(m => m.DraggableLearningPath),
  { ssr: false }
);

type Props = React.ComponentProps<typeof InnerDraggableLearningPath>;

export function ClientDraggableLearningPath(props: Props) {
  return <InnerDraggableLearningPath {...props} />;
}


