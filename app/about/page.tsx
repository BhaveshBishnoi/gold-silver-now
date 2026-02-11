import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Gold Silver Now',
    description: 'Learn about our mission to provide real-time precious metal tracking.',
};

export default function AboutPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight={800}>
                    About Us
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Empowering investors and enthusiasts with real-time precious metal market data.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ position: 'relative', height: '100%', minHeight: 300, bgcolor: 'secondary.main', borderRadius: 4, overflow: 'hidden' }}>
                        {/* Placeholder for an image if needed, or just a styled box */}
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 0.1,
                            backgroundImage: 'radial-gradient(circle at 20% 50%, #d97706 0%, transparent 50%)'
                        }} />
                        <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                            <Typography variant="h4" gutterBottom fontWeight={700}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                                At Gold Silver Now, we believe that access to accurate, real-time financial data is a fundamental right for every investor. Whether you are tracking the market for jewelry purchases, industrial applications, or investment portfolios, our goal is to provide you with the most reliable and up-to-date prices for Gold and Silver in your local currency.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="h5" gutterBottom fontWeight={600} color="primary.main">
                            Why Choose Us?
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, typography: 'body1', '& li': { mb: 2 } }}>
                            <li>
                                <Typography variant="subtitle1" fontWeight={600}>Real-Time Updates</Typography>
                                <Typography variant="body2" color="text.secondary">Our data feeds are updated continually to reflect the latest global market movements.</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" fontWeight={600}>Multi-Currency Support</Typography>
                                <Typography variant="body2" color="text.secondary">Seamlessly switch between USD, INR, and EUR to see prices that matter to you.</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1" fontWeight={600}>Accurate Conversions</Typography>
                                <Typography variant="body2" color="text.secondary">Instant calculations for various purities (24K, 22K, 18K) and weights.</Typography>
                            </li>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'background.default', borderRadius: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight={700}>
                    Trusted by Thousands
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    Join a growing community of users who rely on Gold Silver Now for their daily market insights.
                </Typography>
            </Box>
        </Container>
    );
}
