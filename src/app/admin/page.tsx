'use client';

import React, { useCallback, useEffect, useState } from 'react';

type Row = {
  id: number;
  timestamp: string;
  name: string;
  phone: string;
  guests: string | number;
  guestNames: string;
  attending: string;
  event?: string;
};

const gold = '#D8B36A';
const burgundy = '#5C111E';
const ivory = '#FAF7F2';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete the RSVP from "${row.name}"? This cannot be undone.`)) return;
    setDeletingId(row.id);
    try {
      const res = await fetch('/api/admin/rsvps', {
        method: 'DELETE',
        headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert(data.error || 'Could not delete');
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch {
      alert('Could not reach the server');
    } finally {
      setDeletingId(null);
    }
  };

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/rsvps', {
        headers: { 'x-admin-password': pw },
        cache: 'no-store',
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthed(false);
        setError(data.error || 'Something went wrong');
        return;
      }
      setRows(data.rows);
      setAuthed(true);
      sessionStorage.setItem('admin-pw', pw);
    } catch {
      setError('Could not reach the server');
    } finally {
      setLoading(false);
    }
  }, []);

  // restore session
  useEffect(() => {
    const saved = sessionStorage.getItem('admin-pw');
    if (saved) {
      setPassword(saved);
      load(saved);
    }
  }, [load]);

  const attendingRows = rows.filter((r) => String(r.attending).toLowerCase() === 'yes');
  const declinedRows = rows.filter((r) => String(r.attending).toLowerCase() === 'no');
  const totalGuests = attendingRows.reduce((sum, r) => sum + (Number(r.guests) || 0), 0);

  const visible = filter === 'all' ? rows : filter === 'yes' ? attendingRows : declinedRows;

  const exportCsv = () => {
    const header = ['Timestamp', 'Name', 'Phone', 'Guests', 'Guest Names', 'Attending', 'Event'];
    const lines = rows.map((r) =>
      [r.timestamp, r.name, r.phone, r.guests, r.guestNames, r.attending, r.event ?? 'nikah']
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(','),
    );
    const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wedding-rsvps.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // ── Login screen ─────────────────────────────────────────────
  if (!authed) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: `linear-gradient(160deg, ${burgundy} 0%, #3a0b14 100%)` }}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); load(password); }}
          className="w-full max-w-sm px-8 py-12 text-center"
          style={{
            background: 'rgba(242,237,228,0.06)',
            border: `1px solid rgba(216,179,106,0.35)`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: gold, fontFamily: 'var(--font-body)' }}>
            Mohamed &amp; Gelan
          </p>
          <h1 className="mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: '1.8rem', color: ivory }}>
            Admin Panel
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-transparent text-center py-3 mb-6 outline-none"
            style={{ color: ivory, borderBottom: `1px solid ${gold}`, fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}
          />
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 text-xs tracking-[0.25em] uppercase transition-opacity disabled:opacity-50"
            style={{ background: gold, color: burgundy, fontFamily: 'var(--font-body)' }}
          >
            {loading ? 'Checking…' : 'Enter'}
          </button>
          {error && (
            <p className="mt-5 text-sm" style={{ color: '#e07070', fontFamily: 'var(--font-body)' }}>{error}</p>
          )}
        </form>
      </main>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────
  const stats = [
    { label: 'Responses', value: rows.length },
    { label: 'Accepted', value: attendingRows.length },
    { label: 'Declined', value: declinedRows.length },
    { label: 'Total Guests', value: totalGuests },
  ];

  return (
    <main className="min-h-screen px-6 py-10" style={{ background: ivory }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold, fontFamily: 'var(--font-body)' }}>
              Mohamed &amp; Gelan · 30.09.2026
            </p>
            <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '2.2rem', color: burgundy }}>
              RSVP Dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => load(password)}
              disabled={loading}
              className="px-5 py-2 text-xs tracking-[0.2em] uppercase disabled:opacity-50"
              style={{ border: `1px solid ${burgundy}`, color: burgundy, fontFamily: 'var(--font-body)' }}
            >
              {loading ? 'Loading…' : 'Refresh'}
            </button>
            <button
              onClick={exportCsv}
              disabled={rows.length === 0}
              className="px-5 py-2 text-xs tracking-[0.2em] uppercase disabled:opacity-50"
              style={{ background: burgundy, color: ivory, fontFamily: 'var(--font-body)' }}
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-6 text-center"
              style={{ background: '#FFFFFF', border: '1px solid rgba(216,179,106,0.4)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '2.4rem', color: burgundy, lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="mt-2 text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: '#A99F95', fontFamily: 'var(--font-body)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {([['all', 'All'], ['yes', 'Accepted'], ['no', 'Declined']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="px-4 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-body)',
                background: filter === key ? burgundy : 'transparent',
                color: filter === key ? ivory : burgundy,
                border: `1px solid ${filter === key ? burgundy : 'rgba(92,17,30,0.3)'}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto" style={{ background: '#FFFFFF', border: '1px solid rgba(216,179,106,0.4)' }}>
          <table className="w-full text-left" style={{ fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${gold}` }}>
                {['Date', 'Name', 'Phone', 'Guests', 'Guest Names', 'Event', 'Status', ''].map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-[0.65rem] tracking-[0.2em] uppercase whitespace-nowrap"
                    style={{ color: '#8a6d4a', fontFamily: 'var(--font-body)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center" style={{ color: '#A99F95', fontSize: '1.05rem' }}>
                    No responses {filter !== 'all' ? 'in this category ' : ''}yet.
                  </td>
                </tr>
              )}
              {visible.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(216,179,106,0.2)' }}>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#6b5e56' }}>
                    {r.timestamp ? new Date(r.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                  </td>
                  <td className="px-4 py-3" style={{ color: burgundy, fontSize: '1.05rem' }}>{r.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#6b5e56' }}>{r.phone || '—'}</td>
                  <td className="px-4 py-3 text-center" style={{ color: '#6b5e56' }}>{r.guests}</td>
                  <td className="px-4 py-3" style={{ color: '#6b5e56' }}>{r.guestNames || '—'}</td>
                  <td className="px-4 py-3" style={{ color: '#6b5e56' }}>
                    {(r.event ?? 'nikah') === 'cruise' ? 'Nile Cruise' : 'Nikah'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-[0.6rem] tracking-[0.15em] uppercase whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--font-body)',
                        background: String(r.attending).toLowerCase() === 'yes' ? 'rgba(216,179,106,0.2)' : 'rgba(92,17,30,0.08)',
                        color: String(r.attending).toLowerCase() === 'yes' ? '#8a6d4a' : burgundy,
                      }}>
                      {String(r.attending).toLowerCase() === 'yes' ? 'Accepted' : 'Declined'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(r)}
                      disabled={deletingId === r.id}
                      title="Delete this RSVP"
                      aria-label={`Delete RSVP from ${r.name}`}
                      className="transition-opacity disabled:opacity-40"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: burgundy,
                        border: `1px solid rgba(92,17,30,0.35)`,
                        borderRadius: 4,
                        padding: '0.3rem 0.7rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {deletingId === r.id ? '…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => { sessionStorage.removeItem('admin-pw'); setAuthed(false); setPassword(''); setRows([]); }}
          className="mt-8 text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: '#A99F95', fontFamily: 'var(--font-body)' }}
        >
          Log out
        </button>
      </div>
    </main>
  );
}
