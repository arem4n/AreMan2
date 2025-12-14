import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// TODO: Re-enable Resend and set API key in environment variables before deploying to production.
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // const body = await request.json();
    // const { email, message, name } = body;

    // const data = await resend.emails.send({
    //   from: 'AreMan <onboarding@resend.dev>',
    //   to: ['Sergio.areman@gmail.com'],
    //   subject: `Nuevo contacto de: ${name}`,
    //   html: `
    //     <h1>Nuevo mensaje de la web</h1>
    //     <p><strong>Nombre:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Mensaje:</strong> ${message}</p>
    //   `,
    // });

    // return NextResponse.json(data);

    // Dummy response to allow build to succeed without API key.
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
