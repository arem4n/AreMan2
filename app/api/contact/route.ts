import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is missing. Simulating success for development.');
      return NextResponse.json({ success: true, simulated: true });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // split name into first and last if possible
    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // 1. Send notification email to Sergio
    try {
      await resend.emails.send({
        from: 'Formulario Web <noreply@arem4n.com>',
        to: 'sergio.areman@gmail.com',
        subject: `Nuevo Lead Web: ${name}`,
        replyTo: email,
        html: `
          <h1>Nuevo contacto desde la web</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // We continue to create the contact even if the notification fails
    }

    // 2. Create the contact in the audience
    const contactPayload: any = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      unsubscribed: false,
      tags: [{ name: 'source', value: 'contact_form' }],
    };

    // If audienceId is provided in env, we must use it (Legacy API)
    if (process.env.RESEND_AUDIENCE_ID) {
      contactPayload.audienceId = process.env.RESEND_AUDIENCE_ID;
      // In legacy API, tags might not be supported this way or might need a different format
      // but we'll keep it as any to avoid TS errors as per the SDK types check
    }

    const response = await resend.contacts.create(contactPayload);

    if (response.error) {
      if (response.error.message.toLowerCase().includes('already exists') || response.error.name === 'validation_error') {
        console.log('Contact already exists or validation error:', response.error.message);
      } else {
        console.error('Resend contacts.create error:', response.error);
        return NextResponse.json({ error: response.error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
