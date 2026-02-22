'use client';
import { useSettings } from '@/components/layout/SettingsContext';
import { MetalData, HistoryItem } from '@/types';
import Sparkline from './Sparkline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProps {
    data: {
        gold: MetalData;
        silver: MetalData;
        history: { [key: string]: HistoryItem[] };
    } | null;
    loading: boolean;
}

const StatCardSkeleton = () => (
    <Card className="h-full border-none shadow-md bg-white/50 backdrop-blur-sm">
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-[60px] w-full" />
                <div className="flrx justify-between">
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </CardContent>
    </Card>
);

interface StatCardProps {
    title: string;
    price: number;
    change: number;
    sparkData: number[];
    color: string;
    type: 'gold' | 'silver';
    currency: string;
    currencySym: string;
    unitLabel: string;
    format: (price: number) => string;
}

const StatCard = ({ title, price, change, sparkData, color, type, currency, currencySym, unitLabel, format }: StatCardProps) => {
    const isPositive = change >= 0;
    const isGold = type === 'gold';

    return (
        <Card className={cn(
            "relative overflow-hidden border-none shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1 group rounded-[2rem]",
            isGold
                ? "bg-gradient-to-br from-white via-orange-50/40 to-amber-50/60"
                : "bg-gradient-to-br from-white via-slate-50/40 to-slate-100/60"
        )}>
            {/* Background Decor */}
            <div className={cn(
                "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-opacity duration-500 group-hover:opacity-30",
                isGold ? "bg-orange-400" : "bg-slate-400"
            )} />

            <CardContent className="p-8 md:p-10 relative">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col">
                        <h3 className={cn(
                            "text-xl font-black tracking-tight flex items-center gap-3",
                            isGold ? "text-amber-950" : "text-slate-900"
                        )}>
                            {title}
                            <span className="flex h-2.5 w-2.5 rounded-full relative">
                                <span className={cn(
                                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                    isPositive ? "bg-green-400" : "bg-red-400"
                                )}></span>
                                <span className={cn(
                                    "relative inline-flex rounded-full h-2.5 w-2.5",
                                    isPositive ? "bg-green-500" : "bg-red-500"
                                )}></span>
                            </span>
                        </h3>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 opacity-80">
                            Live Spot Price
                        </span>
                    </div>

                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black shadow-sm border backdrop-blur-md",
                        isPositive
                            ? "bg-green-50/80 text-green-700 border-green-100/50"
                            : "bg-red-50/80 text-red-700 border-red-100/50"
                    )}>
                        {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>{Math.abs(change)}%</span>
                    </div>
                </div>

                <div className="space-y-2 mb-10">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-slate-300 select-none tracking-tighter">{currency}</span>
                        <span className={cn(
                            "text-6xl lg:text-7xl font-black tracking-tighter tabular-nums leading-none",
                            isGold ? "text-slate-950" : "text-slate-900"
                        )}>
                            {format(price).replace(currencySym, '')}
                        </span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 flex items-center gap-2.5 opacity-80">
                        Unit: {unitLabel} <span className="w-1.5 h-1.5 rounded-full bg-slate-200" /> Market Open
                    </p>
                </div>

                <div className="h-[100px] w-full opacity-60 group-hover:opacity-100 transition-all duration-700">
                    <Sparkline
                        data={sparkData}
                        color={color}
                        bgColor={isGold ? "rgba(245, 158, 11, 0.05)" : "rgba(148, 163, 184, 0.05)"}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

const Dashboard = ({ data, loading }: DashboardProps) => {
    const { currency, unit, exchangeRates } = useSettings();

    if (loading || !data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>
        );
    }

    const { gold, silver, history } = data;
    const currencySym = exchangeRates[currency]?.symbol || '';

    const format = (price: number) => `${currencySym}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const ozToGram = 31.1034768;

    // Get Currency Specific Data
    const goldData = gold[currency];
    const silverData = silver[currency];
    const historyData = history[currency] || [];

    const goldGramBase = goldData.price / ozToGram;
    const silverGramBase = silverData.price / ozToGram;

    const goldDisplayPrice = goldGramBase * unit;
    const silverDisplayPrice = silverGramBase * unit;

    const goldChange = goldData.change_percent;
    const silverChange = silverData.change_percent;

    const goldSparkData = historyData.map(h => (h.gold / ozToGram) * unit);
    const silverSparkData = historyData.map(h => (h.silver / ozToGram) * unit);

    const unitLabel = unit === 1000 ? '1kg' : (unit === 1 ? '1g' : `${unit}g`);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <StatCard
                title="Gold"
                price={goldDisplayPrice}
                change={goldChange}
                sparkData={goldSparkData}
                color="#ea580c" /* Stronger Orange */
                type="gold"
                currency={currency}
                currencySym={currencySym}
                unitLabel={unitLabel}
                format={format}
            />
            <StatCard
                title="Silver"
                price={silverDisplayPrice}
                change={silverChange}
                sparkData={silverSparkData}
                color="#475569" /* Slate 600 */
                type="silver"
                currency={currency}
                currencySym={currencySym}
                unitLabel={unitLabel}
                format={format}
            />
        </div>
    );
};

export default Dashboard;
