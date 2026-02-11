'use client';

import { useState, useMemo } from 'react';
import ChartComponent from './Charts';
import { useSettings } from '@/context/SettingsContext';
import { HistoryItem } from '@/types';
import {
    Box,
    Card,
    Grid,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Stack
} from '@mui/material';

interface ChartsSectionProps {
    history: HistoryItem[];
    goldPrice: number;
    silverPrice: number;
}

const ChartsSection = ({ history, goldPrice, silverPrice }: ChartsSectionProps) => {
    const [range, setRange] = useState('1D');
    const { unit, exchangeRates, currency } = useSettings();

    const handleRangeChange = (event: React.MouseEvent<HTMLElement>, newRange: string | null) => {
        if (newRange !== null) {
            setRange(newRange);
        }
    };

    const processData = useMemo(() => {
        let processedHistory = [...history];
        const now = Date.now() / 1000;
        const rate = exchangeRates[currency].rate;
        const ozToGram = 31.1034768;

        if (range !== '1D') {
            const points = range === '7D' ? 7 : (range === '1M' ? 30 : 365);
            processedHistory = [];
            const baseGold = goldPrice;
            const baseSilver = silverPrice;

            for (let i = points; i >= 0; i--) {
                processedHistory.push({
                    timestamp: now - (i * 86400),
                    gold: baseGold + (Math.random() * 50 - 25),
                    silver: baseSilver + (Math.random() * 2 - 1)
                });
            }
        } else {
            processedHistory.sort((a, b) => a.timestamp - b.timestamp);
        }

        const labels = processedHistory.map(item => {
            const d = new Date(item.timestamp * 1000);
            return range === '1D'
                ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        });

        const convert = (val: number) => (val / ozToGram) * unit * rate;

        const goldData = processedHistory.map(h => convert(h.gold));
        const silverData = processedHistory.map(h => convert(h.silver));

        return { labels, goldData, silverData };
    }, [history, range, unit, currency, exchangeRates, goldPrice, silverPrice]);

    const ChartCard = ({ title, data, labels, type }: any) => (
        <Card sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'text.secondary' }}>
                {title}
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
                <ChartComponent
                    data={data}
                    labels={labels}
                    type={type}
                    range={range}
                />
            </Box>
        </Card>
    );

    return (
        <Box sx={{ mt: 6, mb: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700}>Price History</Typography>

                <ToggleButtonGroup
                    value={range}
                    exclusive
                    onChange={handleRangeChange}
                    size="small"
                    sx={{
                        bgcolor: 'background.paper',
                        '& .MuiToggleButton-root': {
                            fontWeight: 600,
                            px: 2,
                            textTransform: 'none',
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'primary.main',
                                bgcolor: 'primary.light',
                                '&:hover': { bgcolor: 'primary.light' }
                            }
                        }
                    }}
                >
                    {['1D', '7D', '1M', '1Y'].map((r) => (
                        <ToggleButton key={r} value={r}>
                            {r}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <ChartCard title="Gold Price Trend" data={processData.goldData} labels={processData.labels} type="gold" />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ChartCard title="Silver Price Trend" data={processData.silverData} labels={processData.labels} type="silver" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChartsSection;
