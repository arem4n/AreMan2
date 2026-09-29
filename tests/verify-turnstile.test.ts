// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const ORIGINAL_ENV = { ...process.env };
const fetchMock = vi.fn();

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.TURNSTILE_SECRET_KEY;
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.unstubAllGlobals();
});

describe('verifyTurnstile', () => {
  it('sin TURNSTILE_SECRET_KEY: retorna true sin llamar a fetch (modo dev)', async () => {
    const { verifyTurnstile } = await import('@/lib/verifyTurnstile');
    const result = await verifyTurnstile('cualquier-token');

    expect(result).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('con TURNSTILE_SECRET_KEY pero sin token: retorna false sin llamar a fetch', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const { verifyTurnstile } = await import('@/lib/verifyTurnstile');
    const result = await verifyTurnstile(undefined);

    expect(result).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('token válido: llama a siteverify con secret/response/remoteip y retorna true', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) });
    const { verifyTurnstile } = await import('@/lib/verifyTurnstile');

    const result = await verifyTurnstile('token-bueno', '1.2.3.4');

    expect(result).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      expect.objectContaining({ method: 'POST' })
    );
    const sentBody = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(sentBody.get('secret')).toBe('secret_test');
    expect(sentBody.get('response')).toBe('token-bueno');
    expect(sentBody.get('remoteip')).toBe('1.2.3.4');
  });

  it('token inválido: siteverify responde success=false, retorna false', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    fetchMock.mockResolvedValue({ json: async () => ({ success: false, 'error-codes': ['invalid-input-response'] }) });
    const { verifyTurnstile } = await import('@/lib/verifyTurnstile');

    const result = await verifyTurnstile('token-malo');
    expect(result).toBe(false);
  });

  it('sin ip: no incluye remoteip en el body', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) });
    const { verifyTurnstile } = await import('@/lib/verifyTurnstile');

    await verifyTurnstile('token-bueno');

    const sentBody = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(sentBody.get('remoteip')).toBeNull();
  });

  it('fetch a Cloudflare falla (red caída): retorna false (fail-closed)', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    fetchMock.mockRejectedValue(new Error('network down'));
    const { verifyTurnstile } = await import('@/lib/verifyTurnstile');

    const result = await verifyTurnstile('token-cualquiera');
    expect(result).toBe(false);
  });
});
