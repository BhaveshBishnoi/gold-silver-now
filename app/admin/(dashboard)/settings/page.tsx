
import { auth } from "@/lib/auth";
import { Container, Box, Typography, Paper, TextField, Button, Grid, Avatar, Divider, Switch, FormControlLabel, Chip } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';

export default async function AdminSettingsPage() {
    const session = await auth();
    if (!session) return <Typography>Access Denied</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Account Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your profile, security, and application preferences.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Avatar
                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
                        >
                            {session.user?.name?.[0] || 'A'}
                        </Avatar>
                        <Typography variant="h6" fontWeight={700}>
                            {session.user?.name || 'Admin User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {session.user?.email}
                        </Typography>
                        <Chip label="Super Admin" color="primary" size="small" sx={{ mt: 1 }} />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                            Profile Details
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    defaultValue={session.user?.name}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    defaultValue={session.user?.email}
                                    disabled
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    multiline
                                    rows={3}
                                    placeholder="Tell us a little about yourself..."
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" startIcon={<SaveIcon />} sx={{ borderRadius: 2 }}>
                                Save Profile
                            </Button>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                            <LockIcon color="action" />
                            <Typography variant="h6" fontWeight={600}>
                                Security
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    type="password"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                {/* Spacer */}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    type="password"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            <Button variant="outlined" color="primary" sx={{ borderRadius: 2 }}>
                                Update Password
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
