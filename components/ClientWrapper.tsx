"use client";

import React from 'react';
import { LoadingProvider, useLoading } from "./LoadingContext";
import Preloader from "./Preloader";

const LoadingManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useLoading();

    return (
        <>
            <Preloader isHiding={!isLoading} />
            <div className={`main-content-wrapper ${!isLoading ? 'visible' : ''}`}>
                {children}
            </div>
        </>
    );
};

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <LoadingManager>
                {children}
            </LoadingManager>
        </LoadingProvider>
    );
}
