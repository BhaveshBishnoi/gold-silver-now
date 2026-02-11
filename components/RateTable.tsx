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
        gold: any; // Using any or specific MetalData type if imported
        silver: any;
    };
}

const RateTable = ({ data }: RateTableProps) => {
    const { currency, unit, exchangeRates } = useSettings();
    const currencySym = exchangeRates[currency].symbol;
    // const rate = exchangeRates[currency].rate; // Removed
    const unitLabel = unit === 1000 ? 'kg' : (unit === 1 ? 'g' : `${unit}g`);

    // const convert = (price: number) => price * rate; // Removed
    const format = (price: number) => `${currencySym}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const ozToGram = 31.1034768;

    // Get Currency Data
    // @ts-ignore
    const goldData = data.gold[currency];
    // @ts-ignore
    const silverData = data.silver[currency];

    // Gold Calcs
    const goldPricePerGram = goldData.price / ozToGram;
    const g24k = goldPricePerGram * unit;
    const g22k = goldPricePerGram * 0.916 * unit;
    const g21k = goldPricePerGram * 0.875 * unit;
    const g18k = goldPricePerGram * 0.750 * unit;

    // Silver Calcs
    const silverPricePerGram = silverData.price / ozToGram;
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
        { name: '24K (99.9%)', price: format(g24k) },
        { name: '22K (91.6%)', price: format(g22k) },
        { name: '21K (87.5%)', price: format(g21k) },
        { name: '18K (75.0%)', price: format(g18k) },
    ];

    const silverRows = [
        { name: 'Fine Silver (99.9%)', price: format(sFine) },
        { name: 'Sterling (92.5%)', price: format(sSterling) },
    ];

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <RateCard title="Gold Rates" type="gold" rows={goldRows} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <RateCard title="Silver Rates" type="silver" rows={silverRows} />
            </Grid>
        </Grid>
    );
};

export default RateTable;
