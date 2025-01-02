import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room') || 'test'
  const username = req.nextUrl.searchParams.get('username') || 'test'
  if (!room) {
    return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
  } else if (!username) {
    return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
  }

  
  const apiKey = process.env.LIVEKIT_API_KEY || 'APItSbwXvSjh4cf'
  const apiSecret = process.env.LIVEKIT_API_SECRET || '118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC'
  const wsUrl = process.env.LIVEKIT_URL || 'wss://omnissiah-university-kmuz0plz.livekit.cloud'

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username });

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

  return NextResponse.json({ token: await at.toJwt() });
}