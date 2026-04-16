import type { Session } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import ChartCard from '../components/charts/ChartCard';
import DataTable from '../components/table/DataTable';
import { supabase } from '../lib/supabaseClient';
import { EXPERIENCE_NUMBER_REGEX, type DoctorResponse } from '../types/doctorResponse';

const ADMIN_EMAIL = 'admin@curex24.com';

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError('');

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setAuthError('Access denied. Only the admin account can log in here.');
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError(error.message);
      setSubmitting(false);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Login</h1>
        <p className="text-slate-500 text-sm mb-6">Sign in to access the Curex24 analytics dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder={ADMIN_EMAIL}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {authError ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{authError}</p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

function normalizeBinary(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

function getExperienceBucket(value: DoctorResponse['experience']) {
  if (value == null) return 'Unknown';
  if (typeof value === 'number') {
    if (value < 5) return '0-5';
    if (value < 10) return '5-10';
    return '10+';
  }

  const text = String(value).trim().toLowerCase();
  if (text === 'less-1' || text === '1-3' || text === '3-5') return '0-5';
  if (text === '5-10') return '5-10';
  if (text === '10+' || text.includes('more than')) return '10+';

  const match = text.match(EXPERIENCE_NUMBER_REGEX);
  const firstNumber = match ? Number(match[1]) : Number.NaN;
  if (!Number.isFinite(firstNumber)) return 'Unknown';
  if (firstNumber < 5) return '0-5';
  if (firstNumber < 10) return '5-10';
  return '10+';
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [responses, setResponses] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Restore and track auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s && s.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        supabase.auth.signOut();
        setAuthLoading(false);
        return;
      }
      setSession(s);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession && newSession.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        supabase.auth.signOut();
        setSession(null);
        return;
      }
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setResponses([]);
  };

  // Fetch analytics data when session becomes available
  useEffect(() => {
    if (!session) return;

    const fetchResponses = async () => {
      try {
        setLoading(true);
        setError('');

        const { data, error: fetchError } = await supabase
          .from('doctor_onboarding_questionnaire')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setResponses((data || []) as DoctorResponse[]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch onboarding responses.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [session]);

  const homeVisitData = useMemo(() => {
    const yes = responses.filter((item) => normalizeBinary(item.home_visits) === 'yes').length;
    const no = responses.filter((item) => normalizeBinary(item.home_visits) === 'no').length;
    return [
      { name: 'Yes', value: yes },
      { name: 'No', value: no },
    ];
  }, [responses]);

  const specializationData = useMemo(() => {
    const map = new Map<string, number>();

    responses.forEach((item) => {
      const key = String(item.specialization || 'Unknown').trim() || 'Unknown';
      map.set(key, (map.get(key) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [responses]);

  const experienceData = useMemo(() => {
    const map = new Map<string, number>([
      ['0-5', 0],
      ['5-10', 0],
      ['10+', 0],
      ['Unknown', 0],
    ]);

    responses.forEach((item) => {
      const bucket = getExperienceBucket(item.experience);
      map.set(bucket, (map.get(bucket) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([range, count]) => ({ range, count }))
      .filter((item) => item.count > 0);
  }, [responses]);

  const consultationTypeData = useMemo(() => {
    const yes = responses.filter((item) => normalizeBinary(item.online_consultations) === 'yes').length;
    const no = responses.filter((item) => normalizeBinary(item.online_consultations) === 'no').length;

    return [
      { name: 'Online Enabled', value: yes },
      { name: 'Physical Only', value: no },
    ];
  }, [responses]);

  const summary = useMemo(() => {
    const total = responses.length;
    const homeVisitYes = responses.filter((item) => normalizeBinary(item.home_visits) === 'yes').length;
    const onlineYes = responses.filter((item) => normalizeBinary(item.online_consultations) === 'yes').length;
    const homeVisitPercent = total ? Math.round((homeVisitYes / total) * 100) : 0;

    return {
      total,
      homeVisitYes,
      homeVisitPercent,
      onlineEnabled: onlineYes,
    };
  }, [responses]);

  // While checking existing session
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Checking authentication…</p>
      </div>
    );
  }

  // Show login form when not authenticated
  if (!session) {
    return <LoginForm onLogin={() => {}} />;
  }

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Doctor onboarding insights from Supabase responses.">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-300 rounded-xl px-4 py-2 transition bg-white"
        >
          Sign out
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-gray-600">Loading dashboard data...</div>
      ) : null}

      {error ? (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-red-700">
          Failed to load responses: {error}
        </div>
      ) : null}

      {!loading && !error ? (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Total doctors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.total}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Home visit (yes)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.homeVisitYes}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Home visit rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.homeVisitPercent}%</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Online consultations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.onlineEnabled}</p>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ChartCard title="Home Visit Preference" subtitle="Yes vs No responses">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={homeVisitData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={4}>
                    {homeVisitData.map((entry, index) => (
                      <Cell key={`home-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Specialization Distribution" subtitle="Count of doctors per specialization">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specializationData} margin={{ top: 16, right: 16, left: 0, bottom: 48 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} height={70} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Experience Levels" subtitle="Grouped by 0-5, 5-10, 10+ years">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={experienceData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Consultation Type" subtitle="Online enabled vs physical only">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consultationTypeData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>

          <DataTable rows={responses} />
        </>
      ) : null}
    </DashboardLayout>
  );
}
