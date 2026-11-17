"use client";

import React from 'react';
import { LoadingProvider, useLoading } from "./LoadingContext";
import NavigationProgress from "./NavigationProgress";

const LoadingManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useLoading();

    return (
        <>
            <NavigationProgress active={isLoading} />
            {children}
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
