'use client';
import { useSettings } from '@/context/SettingsContext';
import {
    Box,
    Card,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';

interface RateTableProps {
    data: {
        gold: { price: number; details?: any };
        silver: { price: number; details?: any };
    };
}

const RateTable = ({ data }: RateTableProps) => {
    const { currency, unit, exchangeRates } = useSettings();
    const currencySym = exchangeRates[currency].symbol;
    const rate = exchangeRates[currency].rate;
    const unitLabel = unit === 1000 ? 'kg' : (unit === 1 ? 'g' : `${unit}g`);

    const convert = (price: number) => price * rate;
    const format = (price: number) => `${currencySym}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const ozToGram = 31.1034768;

    // Gold Calcs
    const goldPricePerGram = data.gold.price / ozToGram;
    const g24k = goldPricePerGram * unit;
    const g22k = goldPricePerGram * 0.916 * unit;
    const g21k = goldPricePerGram * 0.875 * unit;
    const g18k = goldPricePerGram * 0.750 * unit;

    // Silver Calcs
    const silverPricePerGram = data.silver.price / ozToGram;
    const sFine = silverPricePerGram * unit;
    const sSterling = silverPricePerGram * 0.925 * unit;

    const RateCard = ({ title, type, rows }: any) => (
        <Card sx={{ borderTop: `4px solid ${type === 'gold' ? '#d97706' : '#64748b'}`, borderRadius: 2 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.default' }}>
                <Typography variant="h6" fontWeight={600}>{title}</Typography>
                <Chip label={`${currency}/${unitLabel}`} size="small" variant="outlined" />
            </Box>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Purity</TableCell>
                            <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600 }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <TableRow key={row.name} hover>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                                    {row.price}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );

    const goldRows = [
        { name: '24K (99.9%)', price: format(convert(g24k)) },
        { name: '22K (91.6%)', price: format(convert(g22k)) },
        { name: '21K (87.5%)', price: format(convert(g21k)) },
        { name: '18K (75.0%)', price: format(convert(g18k)) },
    ];

    const silverRows = [
        { name: 'Fine Silver (99.9%)', price: format(convert(sFine)) },
        { name: 'Sterling (92.5%)', price: format(convert(sSterling)) },
    ];

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
                <RateCard title="Gold Rates" type="gold" rows={goldRows} />
            </Grid>
            <Grid item xs={12} md={6}>
                <RateCard title="Silver Rates" type="silver" rows={silverRows} />
            </Grid>
        </Grid>
    );
};

export default RateTable;
