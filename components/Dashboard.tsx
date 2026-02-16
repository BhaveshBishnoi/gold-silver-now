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

const Dashboard = ({ data, loading }: DashboardProps) => {
    const { currency, unit, exchangeRates } = useSettings();

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

    if (loading || !data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>
        );
    }

    const { gold, silver, history } = data;
    const currencySym = exchangeRates[currency].symbol;

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

    const StatCard = ({ title, price, change, sparkData, color, type }: any) => {
        const isPositive = change >= 0;
        const isGold = type === 'gold';

        return (
            <Card className={cn(
                "relative overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl group",
                isGold
                    ? "bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50"
                    : "bg-gradient-to-br from-white via-slate-50/50 to-slate-100/50"
            )}>
                {/* Background Decor */}
                <div className={cn(
                    "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20",
                    isGold ? "bg-orange-500" : "bg-slate-400"
                )} />

                <CardContent className="p-6 md:p-8 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                            <h3 className={cn(
                                "text-lg font-bold tracking-tight flex items-center gap-2",
                                isGold ? "text-amber-900" : "text-slate-700"
                            )}>
                                {title}
                                <span className="flex h-2 w-2 rounded-full relative">
                                    <span className={cn(
                                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                        isPositive ? "bg-green-400" : "bg-red-400"
                                    )}></span>
                                    <span className={cn(
                                        "relative inline-flex rounded-full h-2 w-2",
                                        isPositive ? "bg-green-500" : "bg-red-500"
                                    )}></span>
                                </span>
                            </h3>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">
                                Live Spot Price
                            </span>
                        </div>

                        <div className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm border",
                            isPositive
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-red-50 text-red-700 border-red-100"
                        )}>
                            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{Math.abs(change)}%</span>
                        </div>
                    </div>

                    <div className="space-y-1 mb-8">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-medium text-slate-400 select-none">{currency}</span>
                            <span className={cn(
                                "text-5xl lg:text-6xl font-black tracking-tight tabular-nums",
                                isGold ? "text-slate-900" : "text-slate-800"
                            )}>
                                {format(price).replace(currencySym, '')}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            Price per {unitLabel} <span className="text-slate-300">•</span> Updated just now
                        </p>
                    </div>

                    <div className="h-[80px] w-full opacity-80 group-hover:opacity-100 transition-opacity">
                        <Sparkline
                            data={sparkData}
                            color={color}
                            bgColor={isGold ? "rgba(245, 158, 11, 0.1)" : "rgba(148, 163, 184, 0.1)"}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <StatCard
                title="Gold"
                price={goldDisplayPrice}
                change={goldChange}
                sparkData={goldSparkData}
                color="#ea580c" /* Stronger Orange */
                type="gold"
            />
            <StatCard
                title="Silver"
                price={silverDisplayPrice}
                change={silverChange}
                sparkData={silverSparkData}
                color="#475569" /* Slate 600 */
                type="silver"
            />
        </div>
    );
};

export default Dashboard;
