'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface SparklineProps {
    data: number[];
    color: string;
    bgColor: string;
}

const Sparkline = ({ data, color, bgColor }: SparklineProps) => {
    const chartData = {
        labels: data.map((_, i) => i),
        datasets: [{
            data,
            borderColor: color,
            backgroundColor: bgColor,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: { display: false },
            y: { display: false }
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    };

    return (
        <Box sx={{ height: 100, width: '100%' }}>
            <Line data={chartData} options={options} />
        </Box>
    );
};

export default Sparkline;
