// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const createMock = vi.fn();

vi.mock('resend', () => ({
  // function normal, no arrow: se invoca con `new Resend(key)` en la ruta real.
  Resend: vi.fn().mockImplementation(function () {
    return { contacts: { create: createMock } };
  }),
}));

const ORIGINAL_ENV = { ...process.env };

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  createMock.mockReset().mockResolvedValue({ data: { id: 'contact_1' }, error: null });
  process.env = { ...ORIGINAL_ENV };
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_AUDIENCE_ID;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe('POST /api/newsletter', () => {
  it('sin RESEND_API_KEY: simula éxito para desarrollo, no llama a Resend', async () => {
    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const json = await res.json();

    expect(json).toEqual({ success: true, simulated: true });
    expect(createMock).not.toHaveBeenCalled();
  });

  it('con RESEND_API_KEY pero sin email: responde 400', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({}));

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Email is required');
  });

  it('caso feliz: crea el contacto con tag source=newsletter', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({ email: 'nuevo@example.com' }));

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(createMock).toHaveBeenCalledWith(expect.objectContaining({
      email: 'nuevo@example.com',
      tags: [{ name: 'source', value: 'newsletter' }],
    }));
  });

  it('incluye audienceId solo si RESEND_AUDIENCE_ID está configurado', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.RESEND_AUDIENCE_ID = 'aud_123';
    const { POST } = await import('@/app/api/newsletter/route');
    await POST(makeRequest({ email: 'nuevo@example.com' }));

    expect(createMock).toHaveBeenCalledWith(expect.objectContaining({ audienceId: 'aud_123' }));
  });

  it('no incluye audienceId cuando RESEND_AUDIENCE_ID no está seteado', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/newsletter/route');
    await POST(makeRequest({ email: 'nuevo@example.com' }));

    const payload = createMock.mock.calls[0][0];
    expect(payload.audienceId).toBeUndefined();
  });

  it('contacto ya existente: se trata como éxito', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    createMock.mockResolvedValue({ data: null, error: { message: 'Contact already exists', name: 'conflict' } });
    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({ email: 'repetido@example.com' }));

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('otro error real de Resend: responde 500 con el mensaje', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    createMock.mockResolvedValue({ data: null, error: { message: 'Rate limit exceeded', name: 'rate_limit' } });
    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({ email: 'nuevo@example.com' }));

    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe('Rate limit exceeded');
  });

  it('JSON inválido en el body: responde 500 sin explotar', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    const { POST } = await import('@/app/api/newsletter/route');
    const badRequest = new Request('http://localhost/api/newsletter', { method: 'POST', body: '{no es json' });
    const res = await POST(badRequest);
    expect(res.status).toBe(500);
  });
});
