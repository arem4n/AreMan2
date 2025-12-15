
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransitionContext } from '@/context/TransitionContext';
import React, { ReactNode } from 'react';

import { CSSProperties } from 'react';

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    style?: CSSProperties;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, className, onClick }) => {
    const router = useRouter();
    const { handleTransition } = useTransitionContext();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.startsWith('#')) {
            // This is an anchor link, let default behavior handle it for smooth scrolling.
            if (onClick) onClick();
            return;
        }

        if (onClick) {
            onClick();
        }

        // Don't intercept ctrl/cmd+click or right-click
        if (e.ctrlKey || e.metaKey || e.button === 1) {
            return;
        }

        e.preventDefault();
        handleTransition(href);

        setTimeout(() => {
            router.push(href);
        }, 400); // Half the preloader duration
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};

export default TransitionLink;
