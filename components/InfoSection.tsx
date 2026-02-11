'use client';
import {
    Box,
    Card,
    Grid,
    Typography,
    Avatar,
    Container
} from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import FactoryIcon from '@mui/icons-material/Factory';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function InfoSection() {
    const items = [
        {
            title: 'About Gold Standards',
            desc: 'Gold purity is measured in Karats (K). 24K gold is 99.9% pure and is primarily used for investment in the form of coins and bars. 22K gold (91.6% pure) is the standard for jewelry making as it is more durable.',
            icon: <BalanceIcon />,
            color: '#d97706'
        },
        {
            title: 'Industrial Use of Silver',
            desc: 'Unlike gold, silver has massive industrial applications including in electronics, solar panels, and medical instruments. This industrial demand makes silver prices more volatile compared to gold.',
            icon: <FactoryIcon />,
            color: '#64748b'
        },
        {
            title: 'Why Track Live Prices?',
            desc: 'Precious metal prices fluctuate throughout the day based on global market trading. Tracking live rates helps investors buy the dips and sell at peaks. Our platform provides real-time data.',
            icon: <ShowChartIcon />,
            color: '#1e293b'
        }
    ];

    return (
        <Box sx={{ py: 6, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {items.map((item, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                p: 3,
                                bgcolor: 'background.paper',
                                borderRadius: 2
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: `${item.color}20`, color: item.color, mr: 2 }}>
                                        {item.icon}
                                    </Avatar>
                                    <Typography variant="h6" fontWeight={700} color="text.primary">
                                        {item.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    {item.desc}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
