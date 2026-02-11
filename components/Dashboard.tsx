'use client';
import { useSettings } from '@/context/SettingsContext';
import { MetalData, HistoryItem } from '@/types';
import Sparkline from './Sparkline';
import { Box, Card, CardContent, Grid, Typography, Chip, Skeleton, Fade } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface DashboardProps {
    data: {
        gold: MetalData;
        silver: MetalData;
        history: { [key: string]: HistoryItem[] };
    } | null;
    loading: boolean;
}

const Dashboard = ({ data, loading }: DashboardProps) => {
    const { currency, unit, exchangeRates } = useSettings();

    const StatCardSkeleton = () => (
        <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Skeleton variant="text" width={100} height={32} />
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                    <Skeleton variant="text" width={40} height={40} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width={150} height={60} />
                </Box>
                <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 1 }} />
            </CardContent>
        </Card>
    );

    if (loading || !data) {
        return (
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}><StatCardSkeleton /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><StatCardSkeleton /></Grid>
            </Grid>
        );
    }

    const { gold, silver, history } = data;
    const currencySym = exchangeRates[currency].symbol;
    // const rate = exchangeRates[currency].rate; // No longer needed

    // const convert = (price: number) => price * rate; // No longer needed
    const format = (price: number) => `${currencySym}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const ozToGram = 31.1034768;

    // Get Currency Specific Data
    const goldData = gold[currency];
    const silverData = silver[currency];
    const historyData = history[currency];

    const goldGramBase = goldData.price / ozToGram;
    const silverGramBase = silverData.price / ozToGram;

    const goldDisplayPrice = goldGramBase * unit;
    const silverDisplayPrice = silverGramBase * unit;

    const goldChange = goldData.change_percent;
    const silverChange = silverData.change_percent;

    const goldSparkData = historyData.map(h => (h.gold / ozToGram) * unit);
    const silverSparkData = historyData.map(h => (h.silver / ozToGram) * unit);

    const unitLabel = unit === 1000 ? '1kg' : (unit === 1 ? '1g' : `${unit}g`);

    const StatCard = ({ title, price, change, sparkData, color, type }: any) => (
        <Fade in timeout={500}>
            <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: 4,
                    background: type === 'gold'
                        ? 'linear-gradient(90deg, #d97706, #b45309)'
                        : 'linear-gradient(90deg, #64748b, #475569)'
                }} />
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" color="text.secondary" fontWeight={600}>
                            {title}
                            <Chip label="LIVE" size="small" color={change >= 0 ? "success" : "error"} variant="filled" sx={{ ml: 1, height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{ color: change >= 0 ? 'success.main' : 'error.main', display: 'flex', alignItems: 'center' }}
                        >
                            {change >= 0 ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
                            {Math.abs(change)}%
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                        <Typography variant="h5" color="text.secondary" sx={{ mr: 0.5 }}>{currency}</Typography>
                        <Typography variant="h3" fontWeight={700} color="text.primary">
                            {format(price).replace(currencySym, '')}
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                        Per {unitLabel} • Real-time
                    </Typography>

                    {/* Sparkline Container */}
                    <Box sx={{ height: 100 }}>
                        <Sparkline data={sparkData} color={color} bgColor={`${color}1A`} />
                    </Box>
                </CardContent>
            </Card>
        </Fade>
    );

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <StatCard
                    title="Gold"
                    price={goldDisplayPrice}
                    change={goldChange}
                    sparkData={goldSparkData}
                    color="#d97706"
                    type="gold"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <StatCard
                    title="Silver"
                    price={silverDisplayPrice}
                    change={silverChange}
                    sparkData={silverSparkData}
                    color="#64748b"
                    type="silver"
                />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
