import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const OAUTH_TOKEN = process.env.SOUNDCLOUD_OAUTH_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');

  try {
    const response = await fetch(
      `https://api.soundcloud.com/playlists/${playlistId}?client_id=${CLIENT_ID}`, {
      headers: {
        'Authorization': `OAuth ${OAUTH_TOKEN}`,
        'Accept': 'application/json; charset=utf-8'
      }
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 