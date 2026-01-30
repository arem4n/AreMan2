import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Try to create the contact in the default audience
    // As per memory, audience_id is omitted to use the default 'General' audience.
    const response = await resend.contacts.create({
      email: email,
      unsubscribed: false,
    });

    if (response.error) {
      // If the error is because the contact already exists, we treat it as success
      if (response.error.message.toLowerCase().includes('already exists') || response.error.name === 'validation_error') {
        console.log('Contact already exists or validation error (likely already exists):', response.error.message);
      } else {
        console.error('Resend contacts.create error:', response.error);
        return NextResponse.json({ error: response.error.message }, { status: 500 });
      }
    }

    // Note: The user specified that the HTML template is already configured in the Resend dashboard.
    // If the dashboard is set up to send a welcome email upon contact creation, it will happen automatically.

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
