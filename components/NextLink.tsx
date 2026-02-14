'use client';

import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

// Shadcn Button works differently. We can use asChild if we want clean markup, 
// or just wrap Button with Link. Shadcn/radix Slot is powerful.

interface NextLinkButtonProps extends ButtonProps {
    href: string;
    target?: string;
    children: ReactNode;
    className?: string;
}

export function NextLinkButton({ href, target, children, className, variant = "default", ...props }: NextLinkButtonProps) {
    return (
        <Button asChild variant={variant} className={className} {...props}>
            <Link href={href} target={target}>
                {children}
            </Link>
        </Button>
    );
}

// Previously IconButton was separate. In Shadcn, Button with size="icon" is the equivalent.
interface NextLinkIconButtonProps extends ButtonProps {
    href: string;
    target?: string;
    children: ReactNode;
    className?: string;
}

export function NextLinkIconButton({ href, target, children, className, variant = "ghost", ...props }: NextLinkIconButtonProps) {
    return (
        <Button asChild variant={variant} size="icon" className={className} {...props}>
            <Link href={href} target={target}>
                {children}
            </Link>
        </Button>
    );
}

// NextLinkCardActionArea was a wrapper around MUI CardActionArea (which adds ripple).
// Shadcn/Tailwind doesn't have a direct equivalent but we can style a Link to cover the card.
// Or make the Card interactive.
import { ComponentProps } from 'react';

// We'll mimic CardActionArea by just making a Link block that covers content or wraps it.
// The `Card` component in Shadcn is just a div.
// So we can just return a Link that contains children, with appropriate hover styles.

type NextLinkCardActionAreaProps = ComponentProps<typeof Link> & {
    className?: string;
    children: ReactNode;
};

export function NextLinkCardActionArea({ href, className, children, ...props }: NextLinkCardActionAreaProps) {
    return (
        <Link
            href={href}
            className={cn("block w-full h-full transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}
            {...props}
        >
            {children}
        </Link>
    );
}
