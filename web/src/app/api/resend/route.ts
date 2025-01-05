import { Resend } from 'resend';

const resend = new Resend("re_VisebMXb_GgPww5wnbMNGUdibTYx8HtcX");
const headers = {
  'Access-Control-Allow-Origin': '*', // Be more restrictive in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};



export async function POST(request: Request) {
  try {
    // Add CORS headers
  
    // Handle OPTIONS request (preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    const body = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'daily_reminder_2025@michael-pollan.app',
      to: body.to,
      subject: body.subject, 
      html: body.html,
    });

    if (error) {
      return Response.json({ error }, { status: 500, headers });
    }

    return Response.json({ data }, { headers });
  } catch (error) {
    return Response.json({ error }, { status: 500, headers });
  }
}


