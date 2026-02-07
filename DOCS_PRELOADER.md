# Guía de Implementación del Preloader (Vite + React)

Esta guía detalla cómo replicar el efecto de preloader de este proyecto en una aplicación basada en Vite y React.

## 1. Estilos CSS (`Preloader.css`)

```css
/* Contenedor Principal */
#preloader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f172a;
    transition: opacity 0.5s ease-in-out;
}

#preloader.preloader-hiding {
    opacity: 0;
    pointer-events: none;
}

.preloader-container {
    position: relative;
    width: 170px;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Spinner: Efecto Fireball/Cometa */
.preloader-spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
        from 90deg,
        transparent 0%,
        rgba(249, 168, 212, 0.1) 50%,
        #ec4899 95%,
        #fbcfe8 100%
    );
    -webkit-mask-image: radial-gradient(transparent 65%, black 66%);
    mask-image: radial-gradient(transparent 65%, black 66%);
    filter: blur(8px);
    animation: spin 2s linear infinite;
}

/* Logo con máscara de color */
#preloader .preloader-logo {
    width: 110px;
    height: 110px;
    background-color: #ec4899;
    -webkit-mask-image: url('/logo.png');
    mask-image: url('/logo.png');
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    animation: preloader-pulse 2s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes preloader-pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
        filter: drop-shadow(0 0 5px #fbcfe8);
    }
    50% {
        transform: scale(1.05);
        opacity: 0.9;
        filter: drop-shadow(0 0 12px #ec4899);
    }
}
```

## 2. Componente React (`Preloader.jsx`)

```jsx
import React from 'react';
import './Preloader.css';

const Preloader = ({ isHiding }) => {
    return (
        <div id="preloader" className={isHiding ? 'preloader-hiding' : ''}>
            <div className="preloader-container">
                <div className="preloader-spinner"></div>
                <div className="preloader-logo" role="img" aria-label="Cargando..."></div>
            </div>
        </div>
    );
};

export default Preloader;
```

## 3. Contexto de Carga (`LoadingContext.jsx`)

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
```
