
import { auth } from "@/lib/auth";
import { Container, Box, Typography, Paper, TextField, Button, Grid, Divider, Alert, Switch, FormControlLabel } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default async function AdminPricingPage() {
    const session = await auth();
    if (!session) return <Typography>Access Denied</Typography>;

    // In a real app, you would fetch these from a database or config
    const defaultSettings = {
        goldMargin: 2.5,
        silverMargin: 3.0,
        currency: 'INR',
        autoUpdate: true,
        updateInterval: 60
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Price Configuration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage margins, currency settings, and API update frequency.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                            Margin Settings
                        </Typography>
                        <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
                            Margins are added on top of the live API market rates.
                        </Alert>

                        <form>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Gold Margin (%)"
                                        type="number"
                                        defaultValue={defaultSettings.goldMargin}
                                        InputProps={{ endAdornment: <Typography color="text.secondary">%</Typography> }}
                                        helperText="Percentage added to Gold spot price"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Silver Margin (%)"
                                        type="number"
                                        defaultValue={defaultSettings.silverMargin}
                                        InputProps={{ endAdornment: <Typography color="text.secondary">%</Typography> }}
                                        helperText="Percentage added to Silver spot price"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Base Currency"
                                        defaultValue={defaultSettings.currency}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="INR">INR (₹)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Update Interval"
                                        type="number"
                                        defaultValue={defaultSettings.updateInterval}
                                        InputProps={{ endAdornment: <Typography color="text.secondary">sec</Typography> }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <FormControlLabel
                                        control={<Switch defaultChecked={defaultSettings.autoUpdate} />}
                                        label="Auto-update prices from API"
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    sx={{ borderRadius: 2, px: 4 }}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'primary.main', color: 'white', mb: 3 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            Live Status
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>API Status</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, bgcolor: '#4ade80', borderRadius: '50%' }} />
                                    <Typography variant="body2" fontWeight={600}>Connected</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>Last Update</Typography>
                                <Typography variant="body2" fontWeight={600}>Just now</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                            API Usage
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Monthly quota usage for Metals-API.
                        </Typography>

                        <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.100', borderRadius: 4, mb: 1, overflow: 'hidden' }}>
                            <Box sx={{ width: '45%', height: '100%', bgcolor: 'warning.main' }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption" color="text.secondary">450 Requests</Typography>
                            <Typography variant="caption" color="text.secondary">1000 Limit</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
