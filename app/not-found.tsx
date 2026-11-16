// 404 de último recurso, para peticiones que no pasan por el middleware de
// idioma (por ejemplo, rutas con extensión como /algo.php). El layout raíz no
// define <html>, así que esta página trae el suyo y no depende de Tailwind ni
// de los proveedores de `app/[locale]/layout.tsx`.
export const metadata = {
    title: 'Página no encontrada | AREM4N',
    robots: { index: false, follow: true },
};

export default function RootNotFound() {
    return (
        <html lang="es">
            <body
                style={{
                    margin: 0,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0d0e22',
                    color: '#ffffff',
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                    textAlign: 'center',
                    padding: '24px',
                }}
            >
                <div style={{ maxWidth: 520 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-white.webp" alt="AREM4N" style={{ height: 64, width: 'auto', marginBottom: 32 }} />
                    <p style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#EEB21D', margin: '0 0 12px' }}>
                        Error 404
                    </p>
                    <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: '0 0 16px' }}>Esta página no existe.</h1>
                    <p style={{ fontSize: 18, lineHeight: 1.6, color: '#e2e8f0', margin: '0 0 32px' }}>
                        Puede que el enlace esté mal escrito o que la página haya cambiado de lugar.
                    </p>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/"
                        style={{
                            display: 'inline-block',
                            background: '#cc1f72',
                            color: '#ffffff',
                            fontWeight: 600,
                            padding: '16px 32px',
                            borderRadius: 9999,
                            textDecoration: 'none',
                        }}
                    >
                        Volver al inicio
                    </a>
                </div>
            </body>
        </html>
    );
}
