import type { Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

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

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setAuthError(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.",
      );
      return;
    }

    setSubmitting(true);
    setAuthError("");

    if (email.trim().toLowerCase() !== "admin@curex24.com") {
      setAuthError("Access denied. Only the admin account can log in here.");
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
        <p className="text-slate-500 text-sm mb-6">
          Sign in to access the Curex24 analytics dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@curex24.com"
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
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              {authError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [rows, setRows] = useState<QuestionnaireRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Restore and track auth session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s && s.user.email?.toLowerCase() !== "admin@curex24.com") {
        supabase!.auth.signOut();
        setAuthLoading(false);
        return;
      }
      setSession(s);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession && newSession.user.email?.toLowerCase() !== "admin@curex24.com") {
        supabase!.auth.signOut();
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
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setRows([]);
  };

  // Fetch analytics data when session becomes available
  useEffect(() => {
    if (!session) return;

    const load = async () => {
      setLoading(true);
      setError("");

      if (!isSupabaseConfigured || !supabase) {
        setError(
          "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.",
        );
        setLoading(false);
        return;
      }

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
  }, [session]);

  const summary = useMemo(() => {
    const total = rows.length;
    const homeVisitYes = rows.filter((item) => normalizeYesNo(item.home_visits) === "yes").length;
    const onlineYes = rows.filter((item) => normalizeYesNo(item.online_consultations) === "yes").length;
    const homeVisitRate = total ? Math.round((homeVisitYes / total) * 100) : 0;
    const onlineRate = total ? Math.round((onlineYes / total) * 100) : 0;

    const now = new Date();
    const todayUtcYear = now.getUTCFullYear();
    const todayUtcMonth = now.getUTCMonth();
    const todayUtcDate = now.getUTCDate();

    const newToday = rows.filter((item) => {
      if (!item.created_at) return false;
      const created = new Date(item.created_at);
      return (
        created.getUTCFullYear() === todayUtcYear &&
        created.getUTCMonth() === todayUtcMonth &&
        created.getUTCDate() === todayUtcDate
      );
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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Analytics Dashboard</h1>
            <p className="text-slate-600 mt-1">Live onboarding insights from Supabase.</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-300 rounded-xl px-4 py-2 transition"
          >
            Sign out
          </button>
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
                      {rows.slice(0, 10).map((item) => (
                        <tr
                          key={String(item.id || `${item.created_at || "unknown"}-${item.specialization || "unknown"}`)}
                          className="border-b border-slate-100 last:border-b-0"
                        >
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
