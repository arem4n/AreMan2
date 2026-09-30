import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Contact from '@/components/Contact';

// El widget real de Turnstile es un iframe de terceros -- no aporta nada
// probarlo en jsdom. Se mockea como un botón que dispara onSuccess, para
// verificar solo lo que nos importa: que el submit queda bloqueado sin
// token, y que el token resuelto viaja en el POST.
vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button type="button" data-testid="fake-turnstile" onClick={() => onSuccess('fake-token')}>
      resolve captcha
    </button>
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/analytics', () => ({ trackEvent: vi.fn() }));

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset().mockResolvedValue({ json: async () => ({ success: true }) });
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function renderContact() {
  return render(<Contact selectedPackage={null} clearSelectedPackage={vi.fn()} />);
}

describe('Contact form + Turnstile', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('el botón de enviar está deshabilitado hasta resolver el captcha', () => {
    renderContact();
    expect(screen.getByRole('button', { name: 'submit' })).toBeDisabled();
  });

  it('al resolver el captcha, el botón se habilita y el token viaja en el POST', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByPlaceholderText('namePlaceholder'), 'Sergio');
    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'sergio@example.com');
    await user.type(screen.getByPlaceholderText('messagePlaceholder'), 'Hola');
    await user.click(screen.getByTestId('fake-turnstile'));

    const submitButton = screen.getByRole('button', { name: 'submit' });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [, options] = fetchMock.mock.calls[0];
    const sentBody = JSON.parse(options.body as string);
    expect(sentBody.turnstileToken).toBe('fake-token');
  });
});

describe('Contact form sin NEXT_PUBLIC_TURNSTILE_SITE_KEY configurado', () => {
  it('el botón de enviar está habilitado sin resolver ningún captcha y el submit llega a fetch', async () => {
    expect(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY).toBeUndefined();

    const user = userEvent.setup();
    renderContact();

    expect(screen.queryByTestId('fake-turnstile')).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('namePlaceholder'), 'Sergio');
    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'sergio@example.com');
    await user.type(screen.getByPlaceholderText('messagePlaceholder'), 'Hola');

    const submitButton = screen.getByRole('button', { name: 'submit' });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  });
});
