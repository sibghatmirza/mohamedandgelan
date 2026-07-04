import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password');
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ ok: false, error: 'ADMIN_PASSWORD not configured on server' }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ ok: false, error: 'Wrong password' }, { status: 401 });
  }

  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: 'Database not connected yet — add it in Vercel: Storage → Create Database' },
      { status: 500 },
    );
  }

  try {
    const sql = neon(url);
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        name TEXT NOT NULL,
        phone TEXT DEFAULT '',
        guests INTEGER DEFAULT 1,
        guest_names TEXT DEFAULT '',
        attending TEXT NOT NULL DEFAULT 'yes'
      )
    `;
    await sql`ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS event TEXT NOT NULL DEFAULT 'nikah'`;
    const rows = await sql`
      SELECT created_at, name, phone, guests, guest_names, attending, event
      FROM rsvps
      ORDER BY created_at DESC
    `;
    return NextResponse.json({
      ok: true,
      rows: rows.map((r) => ({
        timestamp: r.created_at,
        name: r.name,
        phone: r.phone,
        guests: r.guests,
        guestNames: r.guest_names,
        attending: r.attending,
        event: r.event,
      })),
    });
  } catch (err) {
    console.error('Admin RSVP fetch error', err);
    return NextResponse.json({ ok: false, error: 'Failed to read from database' }, { status: 502 });
  }
}
