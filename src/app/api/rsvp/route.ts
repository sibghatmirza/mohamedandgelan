import { NextRequest, NextResponse } from 'next/server';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

function getDb() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

async function ensureTable(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      phone TEXT DEFAULT '',
      guests INTEGER DEFAULT 1,
      guest_names TEXT DEFAULT '',
      attending TEXT NOT NULL DEFAULT 'yes',
      event TEXT NOT NULL DEFAULT 'nikah'
    )
  `;
  await sql`ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS event TEXT NOT NULL DEFAULT 'nikah'`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, guests, guestNames, attending, event } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 });
    }

    const sql = getDb();
    if (!sql) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured (set DATABASE_URL)' },
        { status: 500 },
      );
    }

    await ensureTable(sql);
    await sql`
      INSERT INTO rsvps (name, phone, guests, guest_names, attending, event)
      VALUES (
        ${name.trim().slice(0, 200)},
        ${String(phone ?? '').slice(0, 50)},
        ${Math.min(Math.max(Number(guests) || 1, 1), 20)},
        ${String(guestNames ?? '').slice(0, 1000)},
        ${attending === 'no' ? 'no' : 'yes'},
        ${event === 'cruise' ? 'cruise' : 'nikah'}
      )
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('RSVP error', err);
    return NextResponse.json({ ok: false, error: 'Failed to submit' }, { status: 500 });
  }
}
