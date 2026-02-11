'use client';

import { useState, useMemo } from 'react';
import ChartComponent from './Charts';
import { useSettings } from '@/context/SettingsContext';

import {
    Box,
    Card,
    Grid,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Stack
} from '@mui/material';

import { MetalData, HistoryItem } from '@/types';
// ... imports

interface ChartsSectionProps {
    history: { [key: string]: HistoryItem[] };
    goldPrices: MetalData;
    silverPrices: MetalData;
}

const ChartsSection = ({ history, goldPrices, silverPrices }: ChartsSectionProps) => {
    const [range, setRange] = useState('1D');
    const { unit, exchangeRates, currency } = useSettings();

    const handleRangeChange = (event: React.MouseEvent<HTMLElement>, newRange: string | null) => {
        if (newRange !== null) {
            setRange(newRange);
        }
    };

    const processData = useMemo(() => {
        const historyData = history[currency] || [];
        const goldData = goldPrices[currency];
        const silverData = silverPrices[currency];

        let processedHistory = [...historyData];
        const now = Date.now() / 1000;
        // const rate = exchangeRates[currency].rate; // Removed
        const ozToGram = 31.1034768;

        if (range !== '1D') {
            const points = range === '7D' ? 7 : (range === '1M' ? 30 : 365);
            processedHistory = [];
            const baseGold = goldData.price;
            const baseSilver = silverData.price;

            for (let i = points; i >= 0; i--) {
                processedHistory.push({
                    timestamp: now - (i * 86400),
                    gold: baseGold + (Math.random() * (baseGold * 0.02) - (baseGold * 0.01)),
                    silver: baseSilver + (Math.random() * (baseSilver * 0.02) - (baseSilver * 0.01))
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

        // Convert function just handles unit scaling now (oz -> unit), no currency rate
        const convert = (val: number) => (val / ozToGram) * unit;

        const goldChartData = processedHistory.map(h => convert(h.gold));
        const silverChartData = processedHistory.map(h => convert(h.silver));

        return { labels, goldData: goldChartData, silverData: silverChartData };
    }, [history, range, unit, currency, goldPrices, silverPrices]);

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
                <Grid size={{ xs: 12, lg: 6 }}>
                    <ChartCard title="Gold Price Trend" data={processData.goldData} labels={processData.labels} type="gold" />
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <ChartCard title="Silver Price Trend" data={processData.silverData} labels={processData.labels} type="silver" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChartsSection;
