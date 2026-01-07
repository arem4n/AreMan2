
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTransitionContext } from '../context/TransitionContext';
import React, { MouseEvent, ComponentProps } from 'react';

type TransitionLinkProps = ComponentProps<typeof Link>;

const TransitionLink: React.FC<TransitionLinkProps> = ({ children, href, ...props }) => {
    const router = useRouter();
    const { handleTransition } = useTransitionContext();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleTransition(href.toString());
        setTimeout(() => {
            router.push(href.toString());
        }, 800);
    };

    return (
        <Link href={href} {...props} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default TransitionLink;
