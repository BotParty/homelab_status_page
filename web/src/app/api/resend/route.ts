import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend("re_VisebMXb_GgPww5wnbMNGUdibTYx8HtcX");

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'daily_reminder_2025_2080@michael-pollan.app',
      //to: ["eggnog.wahab@gmail.com"],

      to: ["eggnog.wahab@gmail.com", "renafkaufman@gmail.com", "goutham.patnaik@gmail.com", "farahwahab4@gmail.com"],
      subject: "Daily attempt at reconcilation or collcting a debt from 2025 till 2085",
      react: EmailTemplate({ firstName: "rena kaufman" }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


export async function GET() {
    try {
      const { data, error } = await resend.emails.send({
        from: 'daily_reminder@michael-pollan.app',
        to: ["eggnog.wahab@gmail.com"],
  
        //to: ["eggnog.wahab@gmail.com", "renafkaufman@gmail.com", "goutham.patnaik@gmail.com", "farahwahab4@gmail.com"],
        subject: "Daily attempt at reconcilation or collcting a debt from 2025-2085",
        react: EmailTemplate({ firstName: "rena kaufman" }) as React.ReactElement,
      });
  
      if (error) {
        return Response.json({ error }, { status: 500 });
      }
  
      return Response.json({ data });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }