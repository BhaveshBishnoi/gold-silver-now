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

const ChartComponent = ({ data, labels, type, range }: any) => {
    const { currency, exchangeRates } = useSettings();

    // Pixel Perfect Colors
    // Gold: Amber-500 (#f59e0b) to Amber-600 (#d97706)
    // Silver: Slate-400 (#94a3b8) to Slate-500 (#64748b)
    const color = type === 'gold' ? '#d97706' : '#64748b';
    const gradientStart = type === 'gold' ? 'rgba(217, 119, 6, 0.25)' : 'rgba(100, 116, 139, 0.25)';
    const gradientEnd = type === 'gold' ? 'rgba(217, 119, 6, 0.0)' : 'rgba(100, 116, 139, 0.0)';

    const chartData = {
        labels,
        datasets: [
            {
                label: type === 'gold' ? 'Gold Price' : 'Silver Price',
                data,
                borderColor: color,
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, gradientStart);
                    gradient.addColorStop(1, gradientEnd);
                    return gradient;
                },
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Smooth curve
                pointRadius: 0,
                pointHitRadius: 10, // Larger hit area for tooltip
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: color,
                pointHoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#0f172a',
                bodyColor: '#334155',
                borderColor: 'rgba(148, 163, 184, 0.2)',
                borderWidth: 1,
                padding: 10,
                boxPadding: 4,
                cornerRadius: 8,
                titleFont: { family: 'Inter, sans-serif', size: 13, weight: '600' },
                bodyFont: { family: 'Inter, sans-serif', size: 12 },
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            const symbol = exchangeRates[currency]?.symbol || '';
                            label += symbol + context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false },
                ticks: {
                    color: '#94a3b8',
                    font: { family: 'Inter, sans-serif', size: 11 },
                    maxTicksLimit: range === '1D' ? 6 : 8,
                    maxRotation: 0
                },
            },
            y: {
                grid: {
                    color: 'rgba(226, 232, 240, 0.6)',
                    drawBorder: false,
                    tickLength: 0
                },
                ticks: {
                    color: '#94a3b8',
                    font: { family: 'Inter, sans-serif', size: 11 },
                    padding: 10,
                    callback: function (value: any) {
                        return exchangeRates[currency]?.symbol + value.toLocaleString();
                    }
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    };

    // @ts-ignore
    return <Line data={chartData} options={options} />;
};

export default ChartComponent;
