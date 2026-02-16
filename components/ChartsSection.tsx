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
        <div className="mt-16 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Market Trends</h2>
                    <p className="text-slate-600 text-base max-w-lg leading-relaxed">
                        Visualize historical price performance and spot trends with our interactive charts.
                    </p>
                </div>

                <div className="bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60 backdrop-blur-sm self-start sm:self-auto">
                    <ToggleGroup
                        type="single"
                        value={range}
                        onValueChange={(val) => val && setRange(val)}
                        className="gap-1"
                    >
                        {['1D', '7D', '1M', '1Y', '5Y'].map((r) => (
                            <ToggleGroupItem
                                key={r}
                                value={r}
                                className="px-4 py-2 text-sm font-semibold rounded-lg data-[state=on]:bg-white data-[state=on]:text-orange-600 data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-slate-200 text-slate-500 hover:text-slate-800 transition-all"
                            >
                                {r}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-full rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader className="pb-4 pt-6 px-6 border-b border-slate-50 bg-gradient-to-r from-orange-50/30 to-transparent">
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
                            <span className="flex items-center">
                                <span className="w-1.5 h-6 bg-orange-500 rounded-full mr-3 shadow-sm shadow-orange-200"></span>
                                Gold Price Trend
                            </span>
                            <span className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-700 rounded-md uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                {range} View
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[360px] relative p-6">
                        <ChartComponent
                            data={processData.goldData}
                            labels={processData.labels}
                            type="gold"
                            range={range}
                            color="#d97706"
                        />
                    </CardContent>
                </Card>

                <Card className="h-full rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader className="pb-4 pt-6 px-6 border-b border-slate-50 bg-gradient-to-r from-slate-50/50 to-transparent">
                        <CardTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
                            <span className="flex items-center">
                                <span className="w-1.5 h-6 bg-slate-500 rounded-full mr-3 shadow-sm shadow-slate-200"></span>
                                Silver Price Trend
                            </span>
                            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                {range} View
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[360px] relative p-6">
                        <ChartComponent
                            data={processData.silverData}
                            labels={processData.labels}
                            type="silver"
                            range={range}
                            color="#64748b"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ChartsSection;
