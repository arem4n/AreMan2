import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is missing. Simulating success for development.');
      return NextResponse.json({ success: true, simulated: true });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Try to create the contact in the default audience
    const contactPayload: any = {
      email: email,
      unsubscribed: false,
      tags: [{ name: 'source', value: 'newsletter' }],
    };

    if (process.env.RESEND_AUDIENCE_ID) {
      contactPayload.audienceId = process.env.RESEND_AUDIENCE_ID;
    }

    const response = await resend.contacts.create(contactPayload);

    if (response.error) {
      // If the error is because the contact already exists, we treat it as success
      if (response.error.message.toLowerCase().includes('already exists') || response.error.name === 'validation_error') {
        console.log('Contact already exists or validation error (likely already exists):', response.error.message);
      } else {
        console.error('Resend contacts.create error:', response.error);
        return NextResponse.json({ error: response.error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
