import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import ChartCard from '../components/charts/ChartCard';
import DataTable from '../components/table/DataTable';
import { supabase } from '../lib/supabaseClient';
import { EXPERIENCE_NUMBER_REGEX, type DoctorResponse } from '../types/doctorResponse';

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
  const navigate = useNavigate();
  const [responses, setResponses] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  useEffect(() => {
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
  }, []);

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

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Doctor onboarding insights from Supabase responses." onLogout={handleLogout}>
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
