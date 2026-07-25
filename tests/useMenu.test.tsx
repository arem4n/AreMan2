import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useMenu } from '@/hooks/useMenu';

// useMenu maneja accesibilidad al abrir el menú mobile: bloquea scroll del
// <html> con la clase 'modal-open' y marca <main> como inert/aria-hidden
// para que el lector de pantalla y el teclado no puedan interactuar con el
// contenido de fondo mientras el menú está abierto.

function TestComponent() {
  const { isMenuOpen, toggleMenu } = useMenu();
  return (
    <>
      <button onClick={toggleMenu}>toggle</button>
      <span data-testid="state">{isMenuOpen ? 'open' : 'closed'}</span>
    </>
  );
}

function renderWithMain() {
  const main = document.createElement('main');
  document.body.appendChild(main);
  const utils = render(<TestComponent />);
  return { ...utils, main };
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
  document.documentElement.classList.remove('modal-open');
});

describe('useMenu', () => {
  it('empieza cerrado, sin modal-open ni inert en <main>', () => {
    const { main } = renderWithMain();
    expect(screen.getByTestId('state')).toHaveTextContent('closed');
    expect(document.documentElement.classList.contains('modal-open')).toBe(false);
    expect(main.hasAttribute('inert')).toBe(false);
    expect(main.hasAttribute('aria-hidden')).toBe(false);
  });

  it('toggleMenu abre: agrega modal-open al <html> y inert/aria-hidden a <main>', async () => {
    const user = userEvent.setup();
    const { main } = renderWithMain();

    await user.click(screen.getByText('toggle'));

    expect(screen.getByTestId('state')).toHaveTextContent('open');
    expect(document.documentElement.classList.contains('modal-open')).toBe(true);
    expect(main.getAttribute('inert')).toBe('');
    expect(main.getAttribute('aria-hidden')).toBe('true');
  });

  it('toggleMenu dos veces vuelve a cerrar y limpia los atributos de <main>', async () => {
    const user = userEvent.setup();
    const { main } = renderWithMain();

    await user.click(screen.getByText('toggle'));
    await user.click(screen.getByText('toggle'));

    expect(screen.getByTestId('state')).toHaveTextContent('closed');
    expect(document.documentElement.classList.contains('modal-open')).toBe(false);
    expect(main.hasAttribute('inert')).toBe(false);
    expect(main.hasAttribute('aria-hidden')).toBe(false);
  });

  it('al desmontar con el menú abierto, limpia modal-open e inert/aria-hidden de <main>', () => {
    const main = document.createElement('main');
    document.body.appendChild(main);
    const { unmount, getByText } = render(<TestComponent />);

    act(() => {
      getByText('toggle').click();
    });
    expect(document.documentElement.classList.contains('modal-open')).toBe(true);

    unmount();

    expect(document.documentElement.classList.contains('modal-open')).toBe(false);
    expect(main.hasAttribute('inert')).toBe(false);
    expect(main.hasAttribute('aria-hidden')).toBe(false);
  });
});
