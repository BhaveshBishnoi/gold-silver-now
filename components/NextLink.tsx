'use client';
import { Button, IconButton, ButtonProps, IconButtonProps } from '@mui/material';
import Link from 'next/link';
import { ComponentProps } from 'react';

// Combine MUI ButtonProps with Next.js LinkProps and HTML anchor attributes
type NextLinkButtonProps = ButtonProps & ComponentProps<typeof Link> & { href: string; target?: string };

export function NextLinkButton(props: NextLinkButtonProps) {
    const { href, ...other } = props;
    // @ts-ignore - MUI component prop type mismatch with Next Link
    return <Button component={Link} href={href} {...other} />;
}

// Combine MUI IconButtonProps with Next.js LinkProps
type NextLinkIconButtonProps = IconButtonProps & ComponentProps<typeof Link> & { href: string; target?: string };

export function NextLinkIconButton(props: NextLinkIconButtonProps) {
    const { href, ...other } = props;
    // @ts-ignore
    return <IconButton component={Link} href={href} {...other} />;
}

import { CardActionArea, CardActionAreaProps } from '@mui/material';

type NextLinkCardActionAreaProps = CardActionAreaProps & ComponentProps<typeof Link> & { href: string; target?: string };

export function NextLinkCardActionArea(props: NextLinkCardActionAreaProps) {
    const { href, ...other } = props;
    // @ts-ignore
    return <CardActionArea component={Link} href={href} {...other} />;
}
