import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { email, message, name } = body;
    const data = await resend.emails.send({
      from: 'AreMan <onboarding@resend.dev>',
      to: ['Sergio.areman@gmail.com'],
      subject: `Nuevo contacto de: ${name}`,
      html: `
        <h1>Nuevo mensaje de la web</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
