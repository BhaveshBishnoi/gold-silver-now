'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import RateTable from '@/components/RateTable';
import ChartsSection from '@/components/ChartsSection';
import InfoSection from '@/components/InfoSection';
import { Container, Box, Typography, Fade } from '@mui/material';

export default function Home() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchPrices = async () => {
        try {
            const res = await fetch('/api/prices');
            const result = await res.json();
            if (result.status === 'success') {
                setData(result.data);
            }
        } catch (error) {
            console.error('Failed to fetch prices', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // 1 minute
        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Box sx={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 100%)',
                pt: 8, pb: 6, textAlign: 'center'
            }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1000}>
                        <Typography variant="h2" component="h1" gutterBottom sx={{
                            fontWeight: 800,
                            letterSpacing: '-0.025em',
                            background: 'linear-gradient(90deg, #d97706, #b45309)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2
                        }}>
                            Track Live Gold & Silver Prices
                        </Typography>
                    </Fade>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                        Real-time precious metal rates in your currency. Instant conversion for different purities and weights.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Dashboard data={data} loading={loading} />

                {!loading && data && (
                    <Fade in timeout={500}>
                        <Box>
                            <RateTable data={data} />
                            <ChartsSection
                                history={data.history}
                                goldPrices={data.gold}
                                silverPrices={data.silver}
                            />
                        </Box>
                    </Fade>
                )}
            </Container>

            <InfoSection />
        </Box>
    );
}
