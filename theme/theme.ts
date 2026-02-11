'use client';
import { createTheme } from '@mui/material/styles';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: { fontFamily: outfit.style.fontFamily, fontWeight: 700 },
        h2: { fontFamily: outfit.style.fontFamily, fontWeight: 700 },
        h3: { fontFamily: outfit.style.fontFamily, fontWeight: 700 },
        h4: { fontFamily: outfit.style.fontFamily, fontWeight: 600 },
        h5: { fontFamily: outfit.style.fontFamily, fontWeight: 600 },
        h6: { fontFamily: outfit.style.fontFamily, fontWeight: 600 },
        subtitle1: { fontFamily: outfit.style.fontFamily },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#d97706', // Gold
            light: '#f59e0b',
            dark: '#b45309',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#64748b', // Silver
            light: '#94a3b8',
            dark: '#475569',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        success: {
            main: '#10b981',
        },
        error: {
            main: '#ef4444',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                },
                head: {
                    fontWeight: 600,
                    backgroundColor: '#f8fafc',
                    color: '#64748b',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
});

export default theme;
