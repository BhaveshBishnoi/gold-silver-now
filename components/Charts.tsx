'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSettings } from '@/context/SettingsContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartProps {
    data: any[];
    labels: string[];
    type: 'gold' | 'silver';
    range: string;
}

const ChartComponent = ({ data, labels, type, range }: ChartProps) => {
    const { currency, exchangeRates } = useSettings();
    const color = type === 'gold' ? '#d97706' : '#64748b'; // Updated colors for light theme
    const gradientColor = type === 'gold' ? 'rgba(217, 119, 6, 0.4)' : 'rgba(100, 116, 139, 0.4)';

    const chartData = {
        labels,
        datasets: [
            {
                label: `${type === 'gold' ? 'Gold' : 'Silver'} Price (${currency})`,
                data,
                borderColor: color,
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, gradientColor);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    return gradient;
                },
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: color,
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: '#ffffff',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += exchangeRates[currency].symbol + context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { color: '#94a3b8', maxTicksLimit: 8 },
            },
            y: {
                grid: { color: 'rgba(0, 0, 0, 0.05)', borderDash: [5, 5] },
                ticks: { color: '#94a3b8', padding: 10 },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    return <Line data={chartData} options={options} />;
};

export default ChartComponent;
