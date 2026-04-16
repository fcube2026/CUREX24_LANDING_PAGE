import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onLogout?: () => void;
}

export default function DashboardLayout({ title, subtitle, children, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
            {subtitle ? <p className="text-slate-600 mt-2">{subtitle}</p> : null}
          </div>
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Sign out
            </button>
          ) : null}
        </header>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
