import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DashboardLayout({ title, subtitle, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
          {subtitle ? <p className="text-slate-600 mt-2">{subtitle}</p> : null}
        </header>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
