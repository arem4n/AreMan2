'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

interface LazyTurnstileProps {
    siteKey: string;
    onToken: (token: string) => void;
    /** El token expiró o Cloudflare no pudo cargar/verificar. */
    onClear: (failed: boolean) => void;
    /** Cloudflare va a mostrar la casilla: la persona tiene que marcarla. */
    onNeedsInteraction?: () => void;
    className?: string;
}

/**
 * Turnstile en tema oscuro, visible solo si Cloudflare necesita que la persona
 * haga algo (`interaction-only`), y cargado recién cuando el formulario se
 * acerca a la pantalla: el script de Cloudflare ya no compite con la carga
 * inicial de la portada, que tiene dos formularios.
 *
 * Como el widget suele ser invisible, el formulario que lo usa debe mostrar
 * por su cuenta el estado "verificando" mientras no haya token.
 */
const LazyTurnstile = forwardRef<TurnstileInstance | undefined, LazyTurnstileProps>(
    ({ siteKey, onToken, onClear, onNeedsInteraction, className }, ref) => {
        const holderRef = useRef<HTMLDivElement>(null);
        const [near, setNear] = useState(false);

        useEffect(() => {
            const node = holderRef.current;
            if (!node || typeof IntersectionObserver === 'undefined') {
                setNear(true);
                return;
            }
            const observer = new IntersectionObserver(
                entries => {
                    if (entries.some(entry => entry.isIntersecting)) {
                        setNear(true);
                        observer.disconnect();
                    }
                },
                { rootMargin: '600px 0px' }
            );
            observer.observe(node);
            return () => observer.disconnect();
        }, []);

        return (
            <div ref={holderRef} className={className}>
                {near && (
                    <Turnstile
                        ref={ref}
                        siteKey={siteKey}
                        options={{ theme: 'dark', appearance: 'interaction-only' }}
                        onSuccess={onToken}
                        onBeforeInteractive={onNeedsInteraction}
                        onExpire={() => onClear(false)}
                        onError={() => onClear(true)}
                    />
                )}
            </div>
        );
    }
);

LazyTurnstile.displayName = 'LazyTurnstile';

export default LazyTurnstile;
