'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { ContentManagement } from '@/components/admin/content-management';

export default function AdminContentPage() {
  return (
    <AdminLayout>
      <ContentManagement />
    </AdminLayout>
  );
}




