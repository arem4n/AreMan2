// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock de 'resend' antes de importar la ruta: el SDK real intentaría pegarle
// a la API de Resend. Se expone sendMock/createMock para configurar la
// respuesta por test.
const sendMock = vi.fn();
const createMock = vi.fn();

vi.mock('resend', () => ({
  // function normal, NO arrow function: se invoca como `new Resend(key)` en la
  // ruta real, y una arrow function no puede usarse como constructor.
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: { send: sendMock },
      contacts: { create: createMock },
    };
  }),
}));

const ORIGINAL_ENV = { ...process.env };

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  sendMock.mockReset().mockResolvedValue({ data: {}, error: null });
  createMock.mockReset().mockResolvedValue({ data: { id: 'contact_1' }, error: null });
  process.env = { ...ORIGINAL_ENV };
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_AUDIENCE_ID;
  delete process.env.CONTACT_EMAIL;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe('POST /api/contact', () => {
  it('honeypot lleno: responde éxito sin llamar a Resend (trampa anti-bot)', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Bot', email: 'bot@spam.com', message: 'x', honeypot: 'relleno' }));
    const json = await res.json();

    expect(json).toEqual({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it('sin RESEND_API_KEY: simula éxito para desarrollo, no llama a Resend', async () => {
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Sergio', email: 'sergio@example.com', message: 'Hola' }));
    const json = await res.json();

    expect(json).toEqual({ success: true, simulated: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('con RESEND_API_KEY pero sin email: responde 400', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Sergio', message: 'Hola' }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Email is required');
  });

  it('caso feliz: separa nombre/apellido, escapa HTML del mensaje, y crea el contacto', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({
      name: 'Sergio Arellano',
      email: 'sergio@example.com',
      message: '<script>alert(1)</script>\nSegunda línea',
    }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    expect(sendMock).toHaveBeenCalledTimes(1);
    const emailArg = sendMock.mock.calls[0][0];
    expect(emailArg.html).not.toContain('<script>alert(1)</script>');
    expect(emailArg.html).toContain('&lt;script&gt;');
    expect(emailArg.html).toContain('<br>'); // el salto de línea se convierte a <br>
    expect(emailArg.replyTo).toBe('sergio@example.com');

    expect(createMock).toHaveBeenCalledWith(expect.objectContaining({
      email: 'sergio@example.com',
      firstName: 'Sergio',
      lastName: 'Arellano',
    }));
  });

  it('nombre de una sola palabra: lastName queda vacío, no undefined', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/contact/route');

    await POST(makeRequest({ name: 'Sergio', email: 'sergio@example.com', message: 'Hola' }));

    expect(createMock).toHaveBeenCalledWith(expect.objectContaining({ firstName: 'Sergio', lastName: '' }));
  });

  it('si falla el envío de la notificación por email, igual crea el contacto (no aborta)', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    sendMock.mockRejectedValue(new Error('SMTP caído'));
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Sergio', email: 'sergio@example.com', message: 'Hola' }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it('contacto ya existente: se trata como éxito, no como error', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    createMock.mockResolvedValue({ data: null, error: { message: 'Contact already exists', name: 'conflict' } });
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Sergio', email: 'sergio@example.com', message: 'Hola' }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('otro error real de Resend al crear el contacto: responde 500 con el mensaje', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    createMock.mockResolvedValue({ data: null, error: { message: 'Rate limit exceeded', name: 'rate_limit' } });
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Sergio', email: 'sergio@example.com', message: 'Hola' }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe('Rate limit exceeded');
  });

  it('JSON inválido en el body: responde 500 sin explotar', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/contact/route');

    const badRequest = new Request('http://localhost/api/contact', { method: 'POST', body: '{no es json' });
    const res = await POST(badRequest);
    expect(res.status).toBe(500);
  });
});
