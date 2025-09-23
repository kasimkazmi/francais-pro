import { UserDetail } from '@/components/admin/user-detail';

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  return <UserDetail userId={params.id} />;
}
