import React from 'react';

/**
 * Barra fina en el borde superior mientras `customNavigate` cambia de página.
 * Reemplaza al preloader de pantalla completa: el contenido nunca se oculta,
 * así que la página se ve aunque el JavaScript tarde o no cargue.
 */
const NavigationProgress: React.FC<{ active: boolean }> = ({ active }) => (
    <div className={`nav-progress ${active ? 'nav-progress-active' : ''}`} aria-hidden="true">
        <div className="nav-progress-bar" />
    </div>
);

export default NavigationProgress;
