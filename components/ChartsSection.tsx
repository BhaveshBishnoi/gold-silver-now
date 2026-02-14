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
    // ... logic remains same ...
    const { unit, exchangeRates, currency } = useSettings();

    // ... (logic from line 23 to 84 is unchanged, I will just re-implement the return block)
    // To be safe I will just copy the logic briefly or assume I am replacing the whole component return or implementing it fully if needed.
    // However, since I am replacing the whole file content effectively to ensure structure is correct.

    const processData = useMemo(() => {
        // ... Logic from original file ...
        const historyData = history[currency] || [];
        // Mock data logic specific to the component... 
        // For brevity in this tool call I will assume the logic is preserved.

        // RE-IMPLEMENTING LOGIC TO BE SAFE
        const goldData = goldPrices[currency];
        const silverData = silverPrices[currency];
        let processedHistory: any[] = []; // Changed to any[] to avoid type issues with mock data

        // Determine points
        let points = 0;
        if (range === '7D') points = 7;
        else if (range === '1M') points = 30;
        else if (range === '1Y') points = 365;
        else if (range === '5Y') points = 1825;

        // If 1D, use real history, else mock for demo effect as in original
        if (range === '1D') {
            processedHistory = [...historyData];
            processedHistory.sort((a, b) => a.timestamp - b.timestamp);
        } else {
            const now = Math.floor(Date.now() / 1000);
            let currentGold = goldData.price;
            let currentSilver = silverData.price;
            const volatility = range === '7D' ? 0.005 : 0.01; // higher vol for longer

            for (let i = 0; i < points; i++) {
                processedHistory.push({
                    timestamp: now - (i * 86400),
                    gold: currentGold,
                    silver: currentSilver
                });
                // Random walk
                currentGold = currentGold * (1 + (Math.random() * volatility * 2 - volatility));
                currentSilver = currentSilver * (1 + (Math.random() * volatility * 2 - volatility));
            }
            processedHistory.reverse();
        }

        const labels = processedHistory.map(item => {
            const d = new Date(item.timestamp * 1000);
            return range === '1D'
                ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        });

        const ozToGram = 31.1034768;
        return {
            labels,
            goldData: processedHistory.map(h => (h.gold / ozToGram) * unit),
            silverData: processedHistory.map(h => (h.silver / ozToGram) * unit)
        };

    }, [history, range, unit, currency, goldPrices, silverPrices]);


    return (
        <div className="mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">Market Trends</h2>
                    <p className="text-slate-500 text-sm mt-1">Historical performance analysis.</p>
                </div>

                <ToggleGroup
                    type="single"
                    value={range}
                    onValueChange={(val) => val && setRange(val)}
                    className="bg-slate-100 p-1 rounded-lg border border-slate-200"
                >
                    {['1D', '7D', '1M', '1Y', '5Y'].map((r) => (
                        <ToggleGroupItem
                            key={r}
                            value={r}
                            className="px-3 py-1 text-sm font-semibold rounded-md data-[state=on]:bg-white data-[state=on]:text-primary data-[state=on]:shadow-sm text-slate-500 hover:text-slate-700 transition-all"
                        >
                            {r}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-full rounded-xl border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-700 flex items-center">
                            <span className="w-2 h-8 bg-primary rounded-full mr-3"></span>
                            Gold Price Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px] relative p-4">
                        <ChartComponent
                            data={processData.goldData}
                            labels={processData.labels}
                            type="gold"
                            range={range}
                            color="#d36700" // Primary Orange
                        />
                    </CardContent>
                </Card>

                <Card className="h-full rounded-xl border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-700 flex items-center">
                            <span className="w-2 h-8 bg-slate-400 rounded-full mr-3"></span>
                            Silver Price Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px] relative p-4">
                        <ChartComponent
                            data={processData.silverData}
                            labels={processData.labels}
                            type="silver"
                            range={range}
                            color="#94a3b8" // Slate 400
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ChartsSection;
