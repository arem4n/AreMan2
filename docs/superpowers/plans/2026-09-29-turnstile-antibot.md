# Turnstile Anti-Bot Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop bot spam on `/api/contact` and `/api/newsletter` by requiring a valid Cloudflare Turnstile token before either route touches Resend.

**Architecture:** A shared `lib/verifyTurnstile.ts` helper calls Cloudflare's `siteverify` endpoint. Both API routes call it right after parsing the request body and reject with 400 if it returns `false`. Both form components (`Contact.tsx`, `Newsletter.tsx`) render a Turnstile "managed" widget, hold the resulting token in state, disable submit until a token exists, and send the token as `turnstileToken` in the POST body.

**Tech Stack:** Next.js 14 App Router route handlers, React state (no new state library), `@marsidev/react-turnstile` (new dependency), Vitest + Testing Library (existing).

## Global Constraints

- No verification happens (helper returns `true` immediately) when `TURNSTILE_SECRET_KEY` is unset — mirrors the existing `RESEND_API_KEY` dev-fallback convention so local dev and tests don't need real Cloudflare keys.
- A failed/errored call to Cloudflare's `siteverify` is treated as verification failure (fail-closed), never as success.
- `es.json` and `en.json` must keep an identical key set (enforced by `tests/i18n-messages.test.ts`) — every new message key goes in both files.
- Existing honeypot check in `/api/contact` stays as-is; Turnstile is added, not swapped in.
- Follow the existing test convention in this repo: env vars are reset per-test via `process.env = { ...ORIGINAL_ENV }` + explicit `delete`, and routes are re-imported dynamically per test (`await import('@/app/api/.../route')`) so env var changes take effect.

---

### Task 1: `lib/verifyTurnstile.ts` helper

**Files:**
- Create: `lib/verifyTurnstile.ts`
- Test: `tests/verify-turnstile.test.ts`

**Interfaces:**
- Produces: `verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean>` — used by Task 2 and Task 3.

- [ ] **Step 1: Write the failing test**

Create `tests/verify-turnstile.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/verify-turnstile.test.ts`
Expected: FAIL — `Cannot find module '@/lib/verifyTurnstile'` (or similar resolution error), since the file doesn't exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `lib/verifyTurnstile.ts`:

```ts
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return true;
  }

  if (!token) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) {
    body.set('remoteip', ip);
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
    });
    const data = await res.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/verify-turnstile.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/verifyTurnstile.ts tests/verify-turnstile.test.ts
git commit -m "$(cat <<'EOF'
feat: add Cloudflare Turnstile verification helper

Bots hitting /api/contact directly with a scripted POST never send the
honeypot field, so it never catches them. This helper will let the API
routes require a token only Cloudflare's challenge can issue.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Wire verification into `/api/contact`

**Files:**
- Modify: `app/api/contact/route.ts`
- Modify: `tests/api-contact.test.ts`

**Interfaces:**
- Consumes: `verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean>` from Task 1.

- [ ] **Step 1: Write the failing tests**

In `tests/api-contact.test.ts`, update `beforeEach` to also reset the new env var (add this line inside the existing `beforeEach`, alongside the other `delete process.env...` lines):

```ts
  delete process.env.TURNSTILE_SECRET_KEY;
```

Also update the existing `afterEach` to clean up any stubbed globals, so a `vi.stubGlobal('fetch', ...)` from one test can never leak into the next one even if that test fails partway through:

```ts
afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.unstubAllGlobals();
});
```

Then add these three tests inside the existing `describe('POST /api/contact', ...)` block (after the last existing test, before the closing `});`):

```ts
  it('con TURNSTILE_SECRET_KEY seteado y sin turnstileToken: responde 400, no llama a Resend', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const { POST } = await import('@/app/api/contact/route');

    const res = await POST(makeRequest({ name: 'Bot', email: 'bot@spam.com', message: 'spam' }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Verificación anti-bot fallida');
    expect(sendMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it('con TURNSTILE_SECRET_KEY seteado y token que Cloudflare rechaza: responde 400, no llama a Resend', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: false }) });
    vi.stubGlobal('fetch', fetchMock);

    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Bot', email: 'bot@spam.com', message: 'spam', turnstileToken: 'token-malo' }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Verificación anti-bot fallida');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('con TURNSTILE_SECRET_KEY seteado y token válido: sigue el flujo normal y llama a Resend', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetchMock);

    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Sergio', email: 'sergio@example.com', message: 'Hola', turnstileToken: 'token-bueno' }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npx vitest run tests/api-contact.test.ts`
Expected: the 3 new tests FAIL (route doesn't check Turnstile yet, so it responds 200/400-for-missing-email instead of the expected "Verificación anti-bot fallida" 400). All pre-existing tests still PASS.

- [ ] **Step 3: Wire the check into the route**

Replace the full contents of `app/api/contact/route.ts` with:

```ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { escape } from 'html-escaper';
import { verifyTurnstile } from '@/lib/verifyTurnstile';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { name, email, message, honeypot, turnstileToken } = await request.json();

    const clientIp = request.headers.get('x-forwarded-for') ?? undefined;
    const isHuman = await verifyTurnstile(turnstileToken, clientIp);
    if (!isHuman) {
      return NextResponse.json({ error: 'Verificación anti-bot fallida' }, { status: 400 });
    }

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

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
        to: process.env.CONTACT_EMAIL ?? 'sergio.areman@gmail.com',
        subject: `Nuevo Lead Web: ${name}`,
        replyTo: email,
        html: `
          <h1>Nuevo contacto desde la web</h1>
          <p><strong>Nombre:</strong> ${escape(name)}</p>
          <p><strong>Email:</strong> ${escape(email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escape(message).replace(/\n/g, '<br>')}</p>
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
```

- [ ] **Step 4: Run tests to verify everything passes**

Run: `npx vitest run tests/api-contact.test.ts`
Expected: PASS (all previous tests + 3 new ones)

- [ ] **Step 5: Commit**

```bash
git add app/api/contact/route.ts tests/api-contact.test.ts
git commit -m "$(cat <<'EOF'
feat: require Turnstile verification on /api/contact

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Wire verification into `/api/newsletter`

**Files:**
- Modify: `app/api/newsletter/route.ts`
- Modify: `tests/api-newsletter.test.ts`

**Interfaces:**
- Consumes: `verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean>` from Task 1.

- [ ] **Step 1: Write the failing tests**

In `tests/api-newsletter.test.ts`, update `beforeEach` to also reset the new env var (add alongside the existing `delete process.env...` lines):

```ts
  delete process.env.TURNSTILE_SECRET_KEY;
```

Also add an `afterEach` (this file doesn't have one yet) to clean up any stubbed globals, so a `vi.stubGlobal('fetch', ...)` from one test can never leak into the next one even if that test fails partway through:

```ts
afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.unstubAllGlobals();
});
```

Then add these three tests inside `describe('POST /api/newsletter', ...)` (after the last existing test, before the closing `});`):

```ts
  it('con TURNSTILE_SECRET_KEY seteado y sin turnstileToken: responde 400, no llama a Resend', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const { POST } = await import('@/app/api/newsletter/route');

    const res = await POST(makeRequest({ email: 'bot@spam.com' }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Verificación anti-bot fallida');
    expect(createMock).not.toHaveBeenCalled();
  });

  it('con TURNSTILE_SECRET_KEY seteado y token que Cloudflare rechaza: responde 400, no llama a Resend', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: false }) });
    vi.stubGlobal('fetch', fetchMock);

    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({ email: 'bot@spam.com', turnstileToken: 'token-malo' }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Verificación anti-bot fallida');
    expect(createMock).not.toHaveBeenCalled();
  });

  it('con TURNSTILE_SECRET_KEY seteado y token válido: sigue el flujo normal y crea el contacto', async () => {
    process.env.RESEND_API_KEY = 'test_key';
    process.env.TURNSTILE_SECRET_KEY = 'secret_test';
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetchMock);

    const { POST } = await import('@/app/api/newsletter/route');
    const res = await POST(makeRequest({ email: 'nuevo@example.com', turnstileToken: 'token-bueno' }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(createMock).toHaveBeenCalledTimes(1);
  });
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npx vitest run tests/api-newsletter.test.ts`
Expected: the 3 new tests FAIL. Pre-existing tests still PASS.

- [ ] **Step 3: Wire the check into the route**

Replace the full contents of `app/api/newsletter/route.ts` with:

```ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { verifyTurnstile } from '@/lib/verifyTurnstile';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, turnstileToken } = await request.json();

    const clientIp = request.headers.get('x-forwarded-for') ?? undefined;
    const isHuman = await verifyTurnstile(turnstileToken, clientIp);
    if (!isHuman) {
      return NextResponse.json({ error: 'Verificación anti-bot fallida' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is missing. Simulating success for development.');
      return NextResponse.json({ success: true, simulated: true });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Try to create the contact in the default audience
    const contactPayload: any = {
      email: email,
      unsubscribed: false,
      tags: [{ name: 'source', value: 'newsletter' }],
    };

    if (process.env.RESEND_AUDIENCE_ID) {
      contactPayload.audienceId = process.env.RESEND_AUDIENCE_ID;
    }

    const response = await resend.contacts.create(contactPayload);

    if (response.error) {
      // If the error is because the contact already exists, we treat it as success
      if (response.error.message.toLowerCase().includes('already exists') || response.error.name === 'validation_error') {
        console.log('Contact already exists or validation error (likely already exists):', response.error.message);
      } else {
        console.error('Resend contacts.create error:', response.error);
        return NextResponse.json({ error: response.error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

- [ ] **Step 4: Run tests to verify everything passes**

Run: `npx vitest run tests/api-newsletter.test.ts`
Expected: PASS (all previous tests + 3 new ones)

- [ ] **Step 5: Commit**

```bash
git add app/api/newsletter/route.ts tests/api-newsletter.test.ts
git commit -m "$(cat <<'EOF'
feat: require Turnstile verification on /api/newsletter

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: i18n `captchaError` message key

**Files:**
- Modify: `messages/es.json`
- Modify: `messages/en.json`

**Interfaces:**
- Produces: `t('captchaError')` under the `Contact` namespace and under the `Newsletter` namespace, consumed by Task 5 and Task 6.

- [ ] **Step 1: Run the i18n consistency test to confirm it currently passes**

Run: `npx vitest run tests/i18n-messages.test.ts`
Expected: PASS (baseline, before the change)

- [ ] **Step 2: Add the key to `messages/es.json`**

In the `Contact` block, add `"captchaError"` right after `"errorRequired"`:

```json
    "errorRequired": "Por favor, completa todos los campos.",
    "captchaError": "No pudimos verificar que no eres un bot. Si usas un bloqueador de anuncios, desactívalo para este sitio e intenta de nuevo.",
```

In the `Newsletter` block, add `"captchaError"` right after `"errorEmail"`:

```json
    "errorEmail": "Ingresa un email válido.",
    "captchaError": "No pudimos verificar que no eres un bot. Si usas un bloqueador de anuncios, desactívalo para este sitio e intenta de nuevo.",
```

- [ ] **Step 3: Add the matching key to `messages/en.json`**

In the `Contact` block, add `"captchaError"` right after `"errorRequired"`:

```json
    "errorRequired": "Please fill in all fields.",
    "captchaError": "We couldn't verify you're not a bot. If you use an ad blocker, disable it for this site and try again.",
```

In the `Newsletter` block, add `"captchaError"` right after `"errorEmail"`:

```json
    "errorEmail": "Please enter a valid email.",
    "captchaError": "We couldn't verify you're not a bot. If you use an ad blocker, disable it for this site and try again.",
```

- [ ] **Step 4: Run the i18n consistency test to verify it still passes**

Run: `npx vitest run tests/i18n-messages.test.ts`
Expected: PASS — both files have matching keys, no empty strings, no placeholder mismatches (this key has no `{variable}` placeholders in either language).

- [ ] **Step 5: Commit**

```bash
git add messages/es.json messages/en.json
git commit -m "$(cat <<'EOF'
feat: add captchaError message for Contact and Newsletter forms

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Turnstile widget in `Contact.tsx`

**Files:**
- Modify: `package.json` (new dependency)
- Modify: `components/Contact.tsx`
- Create: `tests/contact-form.test.tsx`

**Interfaces:**
- Consumes: `Turnstile` component + `TurnstileInstance` type from `@marsidev/react-turnstile`; `t('captchaError')` from Task 4.
- Produces: POST body to `/api/contact` now includes `turnstileToken: string`.

- [ ] **Step 1: Install the dependency**

Run: `npm install @marsidev/react-turnstile`

- [ ] **Step 2: Write the failing test**

Create `tests/contact-form.test.tsx`:

```tsx
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
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/contact-form.test.tsx`
Expected: FAIL — the submit button isn't disabled yet (no `turnstileToken` state exists), and no `Turnstile` element is rendered so `getByTestId('fake-turnstile')` throws.

- [ ] **Step 4: Wire the widget into the component**

Replace the full contents of `components/Contact.tsx` with:

```tsx

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { trackEvent } from '../analytics';
import { EmailIcon, WhatsAppIcon, InstagramIcon, BehanceIcon } from './icons/SocialIcons';

const ContactInfoItem = ({ icon, title, value, href, linkClass }: { icon: React.ReactNode, title: string, value: string, href: string, linkClass?: string }) => (
    <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-symbolic-600 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <div>
            <div className="font-semibold">{title}</div>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${value} (abre en nueva ventana)`} className={`opacity-90 transition-colors ${linkClass || 'text-creative-400 hover:text-creative-300'}`}>{value}</a>
        </div>
    </div>
);

interface ContactProps {
    selectedPackage: string | null;
    clearSelectedPackage: () => void;
}

const Contact: React.FC<ContactProps> = ({ selectedPackage, clearSelectedPackage }) => {
    const t = useTranslations('Contact');
    const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
    const [formState, setFormState] = useState({ submitting: false, success: false, error: '' });
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef<TurnstileInstance>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (selectedPackage) {
            if (messageRef.current) {
                const newMessage = t('packageMessage', { package: selectedPackage });
                setFormData(prev => ({ ...prev, message: newMessage }));
            }

            const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const outerTimer = setTimeout(() => {
                if (sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (!shouldReduce && titleRef.current) {
                        titleRef.current.classList.add('scale-110', 'text-creative-400');
                    }
                }
            }, 500);

            const innerTimer = setTimeout(() => {
                if (titleRef.current) {
                    titleRef.current.classList.remove('scale-110', 'text-creative-400');
                }
                clearSelectedPackage();
            }, 2500);

            return () => {
                clearTimeout(outerTimer);
                clearTimeout(innerTimer);
            };
        }
    }, [selectedPackage, clearSelectedPackage, t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.honeypot) {
            setFormState({ submitting: false, success: true, error: '' });
            setFormData({ name: '', email: '', message: '', honeypot: '' });
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            setFormState({ submitting: false, success: false, error: t('errorRequired') });
            return;
        }

        if (!turnstileToken) {
            setFormState({ submitting: false, success: false, error: t('captchaError') });
            return;
        }

        setFormState({ submitting: true, success: false, error: '' });

        trackEvent('submit_contact_form', { fromPackage: selectedPackage || 'N/A' });

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, turnstileToken }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setFormState({ submitting: false, success: true, error: '' });
                    setFormData({ name: '', email: '', message: '', honeypot: '' });
                    setTurnstileToken('');
                    turnstileRef.current?.reset();
                    setTimeout(() => setFormState(fs => ({ ...fs, success: false })), 5000);
                } else {
                    setFormState({ submitting: false, success: false, error: data.error || t('errorConnection') });
                    setTurnstileToken('');
                    turnstileRef.current?.reset();
                }
            })
            .catch(() => {
                setFormState({ submitting: false, success: false, error: t('errorConnection') });
                setTurnstileToken('');
                turnstileRef.current?.reset();
            });
    };

    return (
        <section id="contacto" ref={sectionRef} className="py-16 lg:py-24 bg-deep-900 relative">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center text-white mb-12">
                    <h2
                        ref={titleRef}
                        className="text-3xl lg:text-5xl font-display font-bold mb-6 transition-all duration-500 transform origin-center"
                    >
                        {t('title')}
                    </h2>
                    <div className="text-lg opacity-90 mb-8 max-w-2xl mx-auto space-y-4">
                        <p>{t('p1')}</p>
                        <p>{t('p2')}</p>
                        <p className="font-semibold text-creative-400">{t('p3')}</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <form onSubmit={handleSubmit} noValidate className="bg-deep-800 p-8 rounded-2xl shadow-xl flex flex-col space-y-4 border border-deep-600">
                        <div className="mb-2 text-sm text-creative-400 font-semibold uppercase tracking-wider">{t('formTag')}</div>

                        <label htmlFor="contact-name" className="sr-only">{t('nameLabel')}</label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            placeholder={t('namePlaceholder')}
                            className="p-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder-deep-400 focus:outline-none focus:ring-2 focus:ring-symbolic-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="contact-email" className="sr-only">{t('emailLabel')}</label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            placeholder={t('emailPlaceholder')}
                            className="p-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder-deep-400 focus:outline-none focus:ring-2 focus:ring-symbolic-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="contact-message" className="sr-only">{t('messageLabel')}</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            ref={messageRef}
                            placeholder={t('messagePlaceholder')}
                            rows={5}
                            className="p-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder-deep-400 focus:outline-none focus:ring-2 focus:ring-symbolic-500 transition-shadow duration-300"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="honeypot"
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                            value={formData.honeypot}
                            onChange={handleChange}
                        />

                        <Turnstile
                            ref={turnstileRef}
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''}
                            onSuccess={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken('')}
                            onError={() => setTurnstileToken('')}
                        />

                        <div className="h-14 pt-1">
                            <button type="submit" disabled={formState.submitting || !turnstileToken} className="w-full bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-deep-600 disabled:cursor-not-allowed">
                                {formState.submitting ? t('submitting') : t('submit')}
                            </button>
                            {formState.success && <p className="text-center text-sm text-creative-300 pt-2">{t('successMessage')}</p>}
                            {formState.error && <p className="text-center text-sm text-symbolic-400 pt-2">{formState.error}</p>}
                        </div>
                    </form>

                    <div className="space-y-6 text-white">
                        <ContactInfoItem icon={<EmailIcon />} title={t('emailTitle')} value="contacto@arem4n.com" href="mailto:contacto@arem4n.com" />
                        <ContactInfoItem icon={<WhatsAppIcon />} title={t('whatsappTitle')} value="+56 9 3497 3287" href="https://wa.me/56934973287" />
                        <ContactInfoItem icon={<InstagramIcon />} title={t('instagramTitle')} value="@arem4n" href="https://www.instagram.com/arem4n" />
                        <ContactInfoItem icon={<BehanceIcon />} title={t('behanceTitle')} value="behance.net/arem4n" href="https://www.behance.net/arem4n" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/contact-form.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Run the full existing test suite to check for regressions**

Run: `npx vitest run`
Expected: PASS — includes `tests/data-integrity.test.ts`, `tests/smoke.test.ts`, etc., none of which touch `Contact.tsx` directly, so they should be unaffected.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json components/Contact.tsx tests/contact-form.test.tsx
git commit -m "$(cat <<'EOF'
feat: add Turnstile widget to the contact form

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Turnstile widget in `Newsletter.tsx`

**Files:**
- Modify: `components/Newsletter.tsx`
- Create: `tests/newsletter-form.test.tsx`

**Interfaces:**
- Consumes: `Turnstile` component + `TurnstileInstance` type from `@marsidev/react-turnstile` (already installed in Task 5); `t('captchaError')` from Task 4.
- Produces: POST body to `/api/newsletter` now includes `turnstileToken: string`.

- [ ] **Step 1: Write the failing test**

Create `tests/newsletter-form.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Newsletter from '@/components/Newsletter';

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

describe('Newsletter form + Turnstile', () => {
  it('el botón de enviar está deshabilitado hasta resolver el captcha', () => {
    render(<Newsletter />);
    expect(screen.getByRole('button', { name: 'submit' })).toBeDisabled();
  });

  it('al resolver el captcha, el botón se habilita y el token viaja en el POST', async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'sergio@example.com');
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/newsletter-form.test.tsx`
Expected: FAIL — submit button isn't disabled yet, no `Turnstile` element rendered.

- [ ] **Step 3: Wire the widget into the component**

Replace the full contents of `components/Newsletter.tsx` with:

```tsx

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { trackEvent } from '../analytics';

const Newsletter: React.FC = () => {
    const t = useTranslations('Newsletter');
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState({ submitting: false, success: false, error: '' });
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setFormState({ submitting: false, success: false, error: t('errorEmail') });
            return;
        }

        if (!turnstileToken) {
            setFormState({ submitting: false, success: false, error: t('captchaError') });
            return;
        }

        setFormState({ submitting: true, success: false, error: '' });

        trackEvent('submit_newsletter_form', { offer: 'Creatividad Expandida Book' });

        fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, turnstileToken }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setFormState({ submitting: false, success: true, error: '' });
                    setEmail('');
                    setTurnstileToken('');
                    turnstileRef.current?.reset();
                    setTimeout(() => setFormState(fs => ({ ...fs, success: false })), 5000);
                } else {
                    setFormState({ submitting: false, success: false, error: data.error || t('errorConnection') });
                    setTurnstileToken('');
                    turnstileRef.current?.reset();
                }
            })
            .catch(() => {
                setFormState({ submitting: false, success: false, error: t('errorConnection') });
                setTurnstileToken('');
                turnstileRef.current?.reset();
            });
    };

    return (
        <section className="py-16 bg-deep-900 text-white text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-creative-400/10 text-creative-400 text-xs font-bold tracking-widest uppercase mb-4 border border-creative-400/20">
                    {t('tag')}
                </span>
                <h3 className="text-3xl lg:text-5xl font-display font-bold mb-6">
                    {t('title1')} <br /><span className="text-creative-400">{t('title2')}</span>
                </h3>
                <p className="text-lg text-deep-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                    {t('description1')} <strong>{t('descriptionBold')}</strong>.
                    <br /><br />
                    {t('description2')} <em>{t('descriptionBook')}</em>{t('description3')}
                </p>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                    <label htmlFor="newsletter-email" className="sr-only">{t('emailLabel')}</label>
                    <input
                        type="email"
                        id="newsletter-email"
                        placeholder={t('emailPlaceholder')}
                        className="w-full md:w-2/3 px-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-creative-400 transition-all"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" disabled={formState.submitting || !turnstileToken} className="w-full md:w-auto whitespace-nowrap bg-creative-500 hover:bg-creative-600 text-deep-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-creative-500/20 disabled:bg-deep-700 disabled:opacity-75 disabled:cursor-not-allowed">
                        {formState.submitting ? t('submitting') : t('submit')}
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <Turnstile
                        ref={turnstileRef}
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''}
                        onSuccess={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken('')}
                        onError={() => setTurnstileToken('')}
                    />
                </div>
                <div className="h-6 mt-4">
                    {formState.success && <p className="text-sm text-creative-300 font-medium">{t('successMessage')}</p>}
                    {formState.error && <p className="text-sm text-symbolic-400">{formState.error}</p>}
                </div>
                <p className="text-xs text-deep-500 mt-8 tracking-wide">{t('disclaimer')}</p>
            </div>
        </section>
    );
};

export default Newsletter;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/newsletter-form.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Run the full existing test suite to check for regressions**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/Newsletter.tsx tests/newsletter-form.test.tsx
git commit -m "$(cat <<'EOF'
feat: add Turnstile widget to the newsletter form

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Document env vars, full verification, final commit

**Files:**
- Modify: `CLAUDE.md`

**Interfaces:**
- None (documentation + verification task).

- [ ] **Step 1: Update the API Routes table in `CLAUDE.md`**

Replace:

```markdown
| `/api/contact` | Contact form — sends email via Resend, has a honeypot field |
| `/api/newsletter` | Newsletter signup — creates a Resend contact |

Both no-op gracefully (simulate success) if `RESEND_API_KEY` is absent. Both treat a Resend "contact already exists" error as success rather than failure. See `tests/api-contact.test.ts` / `tests/api-newsletter.test.ts` for the full behavior matrix, including how to mock the `resend` module.
```

With:

```markdown
| `/api/contact` | Contact form — sends email via Resend, has a honeypot field + Cloudflare Turnstile verification |
| `/api/newsletter` | Newsletter signup — creates a Resend contact + Cloudflare Turnstile verification |

Both no-op gracefully (simulate success) if `RESEND_API_KEY` is absent. Both treat a Resend "contact already exists" error as success rather than failure. Both reject with a 400 if `lib/verifyTurnstile.ts` can't confirm the submission came from a real browser — it fails closed if `TURNSTILE_SECRET_KEY` is set but Cloudflare's `siteverify` call errors out, and no-ops (like the Resend key) if `TURNSTILE_SECRET_KEY` is absent. See `tests/api-contact.test.ts` / `tests/api-newsletter.test.ts` for the full behavior matrix, including how to mock the `resend` module.
```

- [ ] **Step 2: Update the Environment Variables block in `CLAUDE.md`**

Replace:

```
RESEND_API_KEY        # Email sending
RESEND_AUDIENCE_ID    # Optional: Resend audience for newsletter contacts
CONTACT_EMAIL         # Override destination email (default: sergio.areman@gmail.com)
```

With:

```
RESEND_API_KEY                  # Email sending
RESEND_AUDIENCE_ID              # Optional: Resend audience for newsletter contacts
CONTACT_EMAIL                   # Override destination email (default: sergio.areman@gmail.com)
NEXT_PUBLIC_TURNSTILE_SITE_KEY  # Cloudflare Turnstile site key (public, sent to the client)
TURNSTILE_SECRET_KEY            # Cloudflare Turnstile secret key (server-side verification)
```

- [ ] **Step 3: Run the full test suite**

Run: `npx vitest run`
Expected: PASS, all test files including the 3 new ones from Tasks 1, 5, 6 and the modified ones from Tasks 2, 3, 4.

- [ ] **Step 4: Run typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. If `@marsidev/react-turnstile` ships its own types (it does), `TurnstileInstance` and the `Turnstile` component props should type-check without extra `@types` packages.

- [ ] **Step 5: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Run the production build**

Run: `npm run build`
Expected: build succeeds. This is the real confirmation that `Contact.tsx` and `Newsletter.tsx` compile correctly with the new widget, since no component test renders the actual Cloudflare iframe.

- [ ] **Step 7: Commit**

```bash
git add CLAUDE.md
git commit -m "$(cat <<'EOF'
docs: document Turnstile env vars in CLAUDE.md

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

## After merging: manual setup Sergio still needs to do

This plan ships the code, but the anti-bot protection won't actually activate until real Cloudflare keys exist:

1. Create a free Cloudflare account (if not already) and add the `arem4n.com` domain (or use "no domain" Turnstile mode) at https://dash.cloudflare.com/?to=/:account/turnstile
2. Create a Turnstile widget for the site, mode "Managed", get the **Site Key** and **Secret Key**.
3. In Vercel project settings, add:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = the Site Key
   - `TURNSTILE_SECRET_KEY` = the Secret Key
4. Redeploy. Until step 3 is done, both forms keep working exactly as before (no-op verification), so there's no outage risk from merging this before the keys are set — but the bots keep getting through until the keys are actually in Vercel.
