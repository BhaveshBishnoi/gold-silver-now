import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import type { Metadata } from 'next';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const metadata: Metadata = {
    title: 'Contact Us - Gold Silver Now',
    description: 'Get in touch with the Gold Silver Now team.',
};

export default function ContactPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight={800}>
                    Contact Us
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Have questions or suggestions? We'd love to hear from you.
                </Typography>
            </Box>

            <Grid container spacing={6}>
                <Grid item xs={12} md={5}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                                <Typography variant="h6" fontWeight={600}>Email Us</Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                For support and inquiries:
                            </Typography>
                            <Typography variant="body1" fontWeight={500} component="a" href="mailto:support@goldsilvernow.com" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                support@goldsilvernow.com
                            </Typography>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                                <Typography variant="h6" fontWeight={600}>Office</Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                                Gold Silver Now HQ<br />
                                123 Financial District,<br />
                                Mumbai, Maharashtra 400001
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
                            Send us a Message
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="First Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Last Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email Address" type="email" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Subject" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Message" multiline rows={4} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" size="large" fullWidth sx={{ py: 1.5, fontWeight: 700 }}>
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
