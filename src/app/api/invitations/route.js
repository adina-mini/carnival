import { NextResponse } from 'next/server';
import { saveInvitation, getInvitationById, listUserInvitations } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const invitation = await getInvitationById(id);
    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }
    return NextResponse.json(invitation);
  }

  const all = await listUserInvitations();
  return NextResponse.json(all);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.id) {
      return NextResponse.json({ error: 'Invalid invitation payload' }, { status: 400 });
    }

    const saved = await saveInvitation(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
  }
}
