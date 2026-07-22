import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { LoadingProvider, useLoading } from '@/components/LoadingContext';
import { STORAGE_KEYS } from '@/lib/storageKeys';

// customNavigate() es el corazón de "Never use <Link> or router.push
// directly" (CLAUDE.md): decide entre 4 caminos según si el link es un hash,
// si ya estamos en esa página, o si hay que navegar de verdad con el
// preloader. Se mockea @/navigation (wrapper de next-intl) para controlar
// pathname/router sin depender del App Router real.

const push = vi.fn();
const prefetch = vi.fn().mockResolvedValue(undefined);
let mockPathname = '/';

vi.mock('@/navigation', () => ({
  useRouter: () => ({ push, prefetch }),
  usePathname: () => mockPathname,
}));

function Harness({ onReady }: { onReady: (ctx: ReturnType<typeof useLoading>) => void }) {
  const ctx = useLoading();
  onReady(ctx);
  return <div id="target-section">seccion</div>;
}

let ctxRef: ReturnType<typeof useLoading>;

function renderProvider() {
  return render(
    <LoadingProvider>
      <Harness onReady={(ctx) => { ctxRef = ctx; }} />
    </LoadingProvider>
  );
}

beforeEach(() => {
  push.mockClear();
  prefetch.mockClear();
  sessionStorage.clear();
  mockPathname = '/';
  // jsdom no implementa scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
});

describe('customNavigate', () => {
  it('hash link estando ya en "/": hace scroll suave, no navega', async () => {
    renderProvider();
    await waitFor(() => expect(ctxRef).toBeDefined());

    await ctxRef.customNavigate('#target-section');

    expect(document.getElementById('target-section')?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(push).not.toHaveBeenCalled();
  });

  it('hash link estando en otra página: guarda el hash en sessionStorage y navega a "/"', async () => {
    mockPathname = '/origen';
    renderProvider();
    await waitFor(() => expect(ctxRef).toBeDefined());

    await ctxRef.customNavigate('#contacto');

    expect(sessionStorage.getItem(STORAGE_KEYS.scrollToSection)).toBe('#contacto');
    expect(push).toHaveBeenCalledWith('/');
  });

  it('navegar a la misma página con hash: hace scroll, no llama a router.push', async () => {
    mockPathname = '/portafolio';
    renderProvider();
    await waitFor(() => expect(ctxRef).toBeDefined());

    document.body.innerHTML += '<div id="target-section"></div>';
    await ctxRef.customNavigate('/portafolio#target-section');

    expect(push).not.toHaveBeenCalled();
  });

  it('navegar a una página distinta: prefetch + push, y activa isLoading', async () => {
    mockPathname = '/';
    let latestLoading: boolean | undefined;
    function Reader() {
      const { isLoading } = useLoading();
      latestLoading = isLoading;
      return null;
    }
    render(
      <LoadingProvider>
        <Harness onReady={(ctx) => { ctxRef = ctx; }} />
        <Reader />
      </LoadingProvider>
    );
    await waitFor(() => expect(ctxRef).toBeDefined());

    const navPromise = ctxRef.customNavigate('/portafolio');
    // isLoading se activa de inmediato, antes de esperar el timeout/prefetch
    await waitFor(() => expect(latestLoading).toBe(true));

    await navPromise;

    expect(prefetch).toHaveBeenCalledWith('/portafolio');
    expect(push).toHaveBeenCalledWith('/portafolio');
  });

  it('no navega ni hace scroll si el target no existe en el DOM', async () => {
    renderProvider();
    await waitFor(() => expect(ctxRef).toBeDefined());

    await expect(ctxRef.customNavigate('#no-existe')).resolves.not.toThrow();
    expect(push).not.toHaveBeenCalled();
  });
});
