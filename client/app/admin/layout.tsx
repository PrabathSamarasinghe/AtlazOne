'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin';

  if (isLoginPage) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0A0B' }}>
      <Sidebar />
      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}