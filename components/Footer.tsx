'use client';
import { Box, Container, Typography, Link as MuiLink, Grid } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            Gold<Box component="span" sx={{ color: 'primary.light' }}>Silver</Box>Now
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Tracking precious metals since 2026.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-end' }, flexWrap: 'wrap' }}>
                        {['Privacy Policy', 'Disclaimer', 'Contact Us'].map((text) => (
                            <Link key={text} href={`/${text.toLowerCase().replace(' ', '-')}`} passHref legacyBehavior>
                                <MuiLink color="inherit" underline="hover" sx={{ cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                                    {text}
                                </MuiLink>
                            </Link>
                        ))}
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        &copy; 2026 Gold Silver Now. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
