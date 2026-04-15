import { useMemo, useState } from 'react';

interface DoctorResponse {
  id?: string | number;
  name?: string | null;
  specialization?: string | null;
  experience?: string | number | null;
  home_visits?: string | null;
  online_consultations?: string | null;
  hospital?: string | null;
  working_schedule?: string | null;
  created_at?: string | null;
}

type SortKey = keyof DoctorResponse;

interface DataTableProps {
  rows: DoctorResponse[];
}

const HEADERS: Array<{ key: SortKey; label: string }> = [
  { key: 'name', label: 'Name' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'experience', label: 'Experience' },
  { key: 'home_visits', label: 'Home Visit' },
  { key: 'online_consultations', label: 'Consultation Type' },
  { key: 'hospital', label: 'Hospital' },
  { key: 'working_schedule', label: 'Working Schedule' },
  { key: 'created_at', label: 'Submitted At' },
];

function normalizeExperience(value: DoctorResponse['experience']) {
  if (value == null) return Number.NEGATIVE_INFINITY;
  if (typeof value === 'number') return value;

  const text = String(value).trim().toLowerCase();
  if (text === 'less-1') return 0;
  if (text === '10+' || text.includes('more')) return 10;

  const match = text.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : Number.NEGATIVE_INFINITY;
}

function normalizeBinaryValue(value: string | null | undefined) {
  return String(value || '').trim().toLowerCase();
}

export default function DataTable({ rows }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const specializations = useMemo(() => {
    const set = new Set(
      rows
        .map((row) => (row.specialization || '').trim())
        .filter(Boolean),
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filteredAndSorted = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const filtered = rows.filter((row) => {
      const specialization = (row.specialization || '').trim();
      if (specializationFilter !== 'all' && specialization !== specializationFilter) {
        return false;
      }

      if (!searchValue) return true;

      const haystack = [
        row.name,
        row.specialization,
        String(row.experience ?? ''),
        row.hospital,
        row.working_schedule,
        row.home_visits,
        row.online_consultations,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(searchValue);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'experience') {
        const delta = normalizeExperience(a.experience) - normalizeExperience(b.experience);
        return sortDirection === 'asc' ? delta : -delta;
      }

      const aValue = String(a[sortKey] ?? '').toLowerCase();
      const bValue = String(b[sortKey] ?? '').toLowerCase();

      const delta = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
      return sortDirection === 'asc' ? delta : -delta;
    });

    return sorted;
  }, [rows, search, specializationFilter, sortKey, sortDirection]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Doctor Responses</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor, specialization, hospital..."
            className="w-full sm:w-72 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All specializations</option>
            {specializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {HEADERS.map((header) => (
                <th key={header.key} className="text-left py-3 pr-4 font-semibold text-gray-700">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 hover:text-gray-900"
                    onClick={() => toggleSort(header.key)}
                  >
                    {header.label}
                    {sortKey === header.key ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredAndSorted.map((row, index) => (
              <tr key={row.id ?? `${row.created_at ?? 'row'}-${index}`} className="border-b border-gray-100">
                <td className="py-3 pr-4">{row.name || '-'}</td>
                <td className="py-3 pr-4">{row.specialization || '-'}</td>
                <td className="py-3 pr-4">{String(row.experience ?? '-')}</td>
                <td className="py-3 pr-4">{normalizeBinaryValue(row.home_visits) || '-'}</td>
                <td className="py-3 pr-4">{normalizeBinaryValue(row.online_consultations) || '-'}</td>
                <td className="py-3 pr-4">{row.hospital || '-'}</td>
                <td className="py-3 pr-4">{row.working_schedule || '-'}</td>
                <td className="py-3 pr-4">
                  {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No responses found for the selected filters.</p>
      ) : null}
    </section>
  );
}
