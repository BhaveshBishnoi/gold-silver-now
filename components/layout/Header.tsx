'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const { currency, setCurrency, exchangeRates } = useSettings();
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const drawer = (
        <Box sx={{ width: 250, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton component={Link} href={item.path} onClick={handleDrawerToggle}>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{
                                    fontWeight: isActive(item.path) ? 700 : 400,
                                    color: isActive(item.path) ? 'primary.main' : 'text.primary'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            href="/"
                            sx={{
                                fontWeight: 800,
                                color: 'text.primary',
                                textDecoration: 'none',
                                letterSpacing: '-0.025em',
                                display: 'flex',
                                fontSize: '1.5rem'
                            }}
                        >
                            Gold<Box component="span" sx={{ color: 'primary.main' }}>Silver</Box>Now
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                        {navItems.map((item) => (
                            <Typography
                                key={item.name}
                                component={Link}
                                href={item.path}
                                sx={{
                                    color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                                    fontWeight: isActive(item.path) ? 700 : 500,
                                    textDecoration: 'none',
                                    '&:hover': { color: 'primary.main' },
                                    cursor: 'pointer'
                                }}
                            >
                                {item.name}
                            </Typography>
                        ))}

                        <FormControl size="small" variant="outlined">
                            <Select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as any)}
                                sx={{ borderRadius: 2, height: 36, fontWeight: 600, bgcolor: 'background.paper' }}
                            >
                                {Object.keys(exchangeRates).map((curr) => (
                                    <MenuItem key={curr} value={curr}>
                                        {curr} ({exchangeRates[curr as keyof typeof exchangeRates].symbol})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <FormControl size="small" variant="outlined">
                            <Select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as any)}
                                sx={{ borderRadius: 2, height: 36, fontWeight: 600, bgcolor: 'background.paper', mr: 1 }}
                            >
                                {Object.keys(exchangeRates).map((curr) => (
                                    <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' } }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Header;
