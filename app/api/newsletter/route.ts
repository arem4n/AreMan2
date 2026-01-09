import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  console.log('Newsletter API route hit.');

  if (!process.env.RESEND_API_KEY) {
    console.error('CRITICAL: RESEND_API_KEY is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error: Missing API key.' }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { email } = body;

    console.log(`Received request for email: ${email}`);

    if (!email) {
      console.log('Validation failed: Email is required.');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Step 1: Save the contact, ignore errors if the contact already exists.
    try {
      console.log(`Attempting to save contact: ${email}`);
      const contact = await resend.contacts.create({
        email: email,
        unsubscribed: false,
      });
      console.log('Successfully saved contact:', contact.id);
    } catch (error) {
      // Log the error for debugging but don't block the email sending.
      console.warn('Failed to save contact, probably already exists.');
    }

    // Step 2: Send the eBook email.
    const emailHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu copia de Creatividad Expandida</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:sans-serif;color:#e2e8f0;">
    <div style="width:100%;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background-color:#1e293b;border:1px solid #334155;border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.6);">

            <div style="text-align:center;padding:48px 0 32px;">
                <img src="https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png" alt="AREM4N" style="height:105px;width:auto;display:block;margin:0 auto;">
            </div>

            <div style="padding:0 40px;color:#e2e8f0;line-height:1.6;text-align:left;">
                <h1 style="color:#f8fafc;font-size:24px;margin-bottom:24px;text-align:center;">Tu copia de Creatividad Expandida está lista.</h1>

                <p>Hola,</p>
                <p>Descargaste el manual porque algo te hizo ruido. Probablemente esto: <span style="color:#facc15;font-weight:600;">la IA está saturada de prompts vacíos</span>.</p>
                <p><em>Creatividad Expandida</em> no es un cheatsheet de prompts. Es un mapa de tus propias grietas para crear con IA sin perder tu alma.</p>

                <p><strong>Si no te llegó el PDF adjunto</strong>, accede directo acá:</p>

                <div style="text-align:center;margin:35px 0;">
                    <a href="https://drive.google.com/file/d/1tBLM1SOYSAWg4GSbUBW0Ya5W7mCcbDdf/view?usp=drivesdk" style="background-color:#db2777;color:#ffffff;text-decoration:none;padding:16px 40px;font-weight:bold;border-radius:50px;display:inline-block;box-shadow:0 4px 20px rgba(219,39,119,0.4);">Descargar Manual</a>
                </div>

                <div style="margin-top:40px;padding-top:30px;border-top:1px solid #334155;">
                    <p><strong style="color:white;">Qué va a pasar ahora:</strong></p>
                    <p>Te voy a mandar emails directos. Sin automatización de 47 pasos. Vas a recibir análisis de casos reales donde apliqué <strong style="color:white;">LogoCodeX™</strong>.</p>
                </div>

                <div style="text-align:center;color:#cbd5e1;font-size:14px;margin-top:40px;font-style:italic;">
                    Sin chamullo. Sin plantillas.<br>— Sergio (AreMan)
                </div>
            </div>

            <div style="padding:30px 40px 40px;text-align:center;background-color:#162032;border-top:1px solid #334155;margin-top:40px;">
                <div style="color:#e2e8f0;font-size:13px;margin-bottom:12px;font-weight:500;">
                    © 2026 AREM4N. Puerto Montt, Chile.<br>Ingeniería de Diseño.
                </div>
                <div style="font-size:12px;">
                    <a href="https://www.linkedin.com/in/arem4n/" style="color:#ffffff;text-decoration:none;margin:0 8px;">LinkedIn</a> |
                    <a href="https://arem4n.com/" style="color:#ffffff;text-decoration:none;margin:0 8px;">Web</a> |
                    <a href="https://instagram.com/arem4n" style="color:#ffffff;text-decoration:none;margin:0 8px;">Instagram</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

    console.log(`Attempting to send eBook email to: ${email}`);
    const data = await resend.emails.send({
      from: 'Sergio de AREM4N <noreply@arem4n.com>',
      to: [email],
      subject: 'Tu copia de Creatividad Expandida está lista',
      html: emailHtml,
    });

    console.log('Successfully sent email:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unhandled error in newsletter API:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
