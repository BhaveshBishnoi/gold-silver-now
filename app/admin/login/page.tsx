'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    CircularProgress,
    Fade
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
                setLoading(false);
            } else {
                router.push('/admin');
                router.refresh(); // Refresh to update session state
            }
        } catch (err) {
            setError('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <Box sx={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '50%',
                height: '50%',
                background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '50%',
                height: '50%',
                background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }} />

            <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
                <Fade in timeout={1000}>
                    <Paper
                        elevation={24}
                        sx={{
                            p: 4,
                            mt: 3,
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 4,
                            color: 'white'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56, boxShadow: '0 0 20px rgba(217,119,6,0.5)' }}>
                                <LockOutlinedIcon fontSize="large" />
                            </Avatar>
                            <Typography component="h1" variant="h4" fontWeight={700} sx={{ mt: 2, mb: 1, letterSpacing: '-0.025em' }}>
                                Admin Access
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
                                Sign in to manage your application
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                                {error && (
                                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                        {error}
                                    </Alert>
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                        height: 48,
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: '0 4px 14px 0 rgba(217,119,6,0.39)',
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}
