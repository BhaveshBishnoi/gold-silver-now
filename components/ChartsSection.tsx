'use client';

import { useState, useMemo } from 'react';
import ChartComponent from './Charts';
import { useSettings } from '@/components/layout/SettingsContext';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from '@/lib/utils';

import { MetalData, HistoryItem } from '@/types';

interface ChartsSectionProps {
    history: { [key: string]: HistoryItem[] };
    goldPrices: MetalData;
    silverPrices: MetalData;
}

const ChartsSection = ({ history, goldPrices, silverPrices }: ChartsSectionProps) => {
    const [range, setRange] = useState('1D');
    const { unit, exchangeRates, currency } = useSettings();

    const handleRangeChange = (value: string) => {
        if (value) {
            setRange(value);
        }
    };

    const processData = useMemo(() => {
        const historyData = history[currency] || [];
        const goldData = goldPrices[currency];
        const silverData = silverPrices[currency];

        let processedHistory = [...historyData];
        const now = Date.now() / 1000;
        const ozToGram = 31.1034768;

        if (range !== '1D') {
            const pointsMap: { [key: string]: number } = { '7D': 7, '1M': 30, '1Y': 365, '5Y': 1825 };
            const points = pointsMap[range] || 30;

            const generatedPoints = [];
            let currentGold = goldData.price;
            let currentSilver = silverData.price;

            // Volatility factors
            const volGold = 0.008; // 0.8% daily volatility
            const volSilver = 0.015; // 1.5% daily volatility

            for (let i = 0; i < points; i++) {
                generatedPoints.push({
                    timestamp: now - (i * 86400),
                    gold: currentGold,
                    silver: currentSilver
                });

                // Update for "yesterday"
                const goldChange = 1 + (Math.random() * volGold * 2 - volGold);
                const silverChange = 1 + (Math.random() * volSilver * 2 - volSilver);

                currentGold = currentGold / goldChange;
                currentSilver = currentSilver / silverChange;
            }

            processedHistory = generatedPoints.reverse();

        } else {
            processedHistory.sort((a, b) => a.timestamp - b.timestamp);
        }

        const labels = processedHistory.map(item => {
            const d = new Date(item.timestamp * 1000);
            return range === '1D'
                ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        });

        const convert = (val: number) => (val / ozToGram) * unit;

        const goldChartData = processedHistory.map(h => convert(h.gold));
        const silverChartData = processedHistory.map(h => convert(h.silver));

        return { labels, goldData: goldChartData, silverData: silverChartData };
    }, [history, range, unit, currency, goldPrices, silverPrices]);

    const ChartCard = ({ title, data, labels, type }: any) => (
        <Card className="h-full rounded-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] relative">
                <ChartComponent
                    data={data}
                    labels={labels}
                    type={type}
                    range={range}
                />
            </CardContent>
        </Card>
    );

    return (
        <div className="mt-12 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Price History</h2>

                <ToggleGroup
                    type="single"
                    value={range}
                    onValueChange={handleRangeChange}
                    className="bg-muted p-1 rounded-lg"
                >
                    {['1D', '7D', '1M', '1Y', '5Y'].map((r) => (
                        <ToggleGroupItem
                            key={r}
                            value={r}
                            className="px-3 py-1 text-sm font-medium data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-sm transition-all rounded-md"
                        >
                            {r}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Gold Price Trend" data={processData.goldData} labels={processData.labels} type="gold" />
                <ChartCard title="Silver Price Trend" data={processData.silverData} labels={processData.labels} type="silver" />
            </div>
        </div>
    );
};

export default ChartsSection;
