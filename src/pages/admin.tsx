import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type QuestionnaireRow = {
  id?: string | number;
  created_at?: string;
  specialization?: string | null;
  experience?: string | number | null;
  hospital?: string | null;
  home_visits?: string | null;
  online_consultations?: string | null;
};

function normalizeYesNo(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

export default function AdminDashboardPage() {
  const [rows, setRows] = useState<QuestionnaireRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error: fetchError } = await supabase
          .from("doctor_onboarding_questionnaire")
          .select("id, created_at, specialization, experience, hospital, home_visits, online_consultations")
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        setRows((data || []) as QuestionnaireRow[]);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load analytics data.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const summary = useMemo(() => {
    const total = rows.length;
    const homeVisitYes = rows.filter((item) => normalizeYesNo(item.home_visits) === "yes").length;
    const onlineYes = rows.filter((item) => normalizeYesNo(item.online_consultations) === "yes").length;
    const homeVisitRate = total ? Math.round((homeVisitYes / total) * 100) : 0;
    const onlineRate = total ? Math.round((onlineYes / total) * 100) : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newToday = rows.filter((item) => {
      if (!item.created_at) return false;
      const created = new Date(item.created_at);
      return created >= today;
    }).length;

    return {
      total,
      homeVisitYes,
      homeVisitRate,
      onlineYes,
      onlineRate,
      newToday,
    };
  }, [rows]);

  const specializationBreakdown = useMemo(() => {
    const map = new Map<string, number>();

    rows.forEach((item) => {
      const key = String(item.specialization || "Unknown").trim() || "Unknown";
      map.set(key, (map.get(key) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [rows]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin Analytics Dashboard</h1>
          <p className="text-slate-600 mt-1">Live onboarding insights from Supabase.</p>
        </header>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-600 shadow-sm">
            Loading analytics...
          </div>
        ) : null}

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 shadow-sm">
            Could not load data: {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-500">Total responses</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{summary.total}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-500">New today</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{summary.newToday}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-500">Home visit (yes)</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{summary.homeVisitYes}</p>
                <p className="text-sm text-slate-500 mt-1">{summary.homeVisitRate}% rate</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-500">Online consultations</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{summary.onlineYes}</p>
                <p className="text-sm text-slate-500 mt-1">{summary.onlineRate}% rate</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-500">Top specialization</p>
                <p className="text-lg font-semibold text-slate-900 mt-2">
                  {specializationBreakdown[0]?.name || "-"}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {specializationBreakdown[0]?.count || 0} doctors
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Specialization distribution</h2>
                {specializationBreakdown.length === 0 ? (
                  <p className="text-slate-500 mt-4">No responses available yet.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {specializationBreakdown.map((item) => {
                      const pct = summary.total ? Math.round((item.count / summary.total) * 100) : 0;
                      return (
                        <div key={item.name}>
                          <div className="flex justify-between text-sm text-slate-700 mb-1">
                            <span>{item.name}</span>
                            <span>
                              {item.count} ({pct}%)
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
                <h2 className="text-lg font-semibold text-slate-900">Recent responses</h2>
                {rows.length === 0 ? (
                  <p className="text-slate-500 mt-4">No responses available yet.</p>
                ) : (
                  <table className="w-full mt-4 text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 border-b border-slate-200">
                        <th className="py-2 pr-3">Date</th>
                        <th className="py-2 pr-3">Specialization</th>
                        <th className="py-2 pr-3">Experience</th>
                        <th className="py-2 pr-3">Hospital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 10).map((item, idx) => (
                        <tr key={String(item.id || idx)} className="border-b border-slate-100 last:border-b-0">
                          <td className="py-2 pr-3 text-slate-700">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-2 pr-3 text-slate-900">{item.specialization || "-"}</td>
                          <td className="py-2 pr-3 text-slate-700">{String(item.experience || "-")}</td>
                          <td className="py-2 pr-3 text-slate-700">{item.hospital || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
