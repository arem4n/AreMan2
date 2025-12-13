import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializamos Resend con la clave segura
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message, name } = body; // Asegúrate que tu formulario envíe estos datos

    const data = await resend.emails.send({
      from: 'AreMan <onboarding@resend.dev>', // Si ya verificaste tu dominio, usa contacto@tudominio.com
      to: ['Sergio.areman@gmail.com'], // A dónde quieres que te lleguen los avisos
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
