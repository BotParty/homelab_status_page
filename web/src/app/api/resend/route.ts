import { Resend } from 'resend';

const resend = new Resend("re_VisebMXb_GgPww5wnbMNGUdibTYx8HtcX");

export async function POST(request: Request) {
  try {
    // Get the JSON data from the request body
    const body = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'daily_reminder_2025@michael-pollan.app',
      to: body.to , // Use data from request or fallback
      subject: body.subject, 
      html: body.html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


