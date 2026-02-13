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
        <Card className="h-full rounded-lg">
            <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                </div>
                <div className="flex items-baseline mb-2">
                    <Skeleton className="h-10 w-10 mr-2" />
                    <Skeleton className="h-14 w-32" />
                </div>
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-[100px] w-full rounded-md" />
            </CardContent>
        </Card>
    );

    if (loading || !data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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

    const StatCard = ({ title, price, change, sparkData, color, type }: any) => (
        <Card className="h-full relative overflow-hidden rounded-lg animate-in fade-in duration-500">
            <div
                className={cn(
                    "absolute top-0 left-0 w-full h-1",
                    type === 'gold'
                        ? "bg-gradient-to-r from-amber-600 to-amber-700"
                        : "bg-gradient-to-r from-slate-500 to-slate-600"
                )}
            />
            <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold text-muted-foreground flex items-center">
                        {title}
                        <Badge variant={change >= 0 ? "default" : "destructive"} className={cn("ml-2 h-5 text-[10px] font-bold", change >= 0 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700")}>
                            LIVE
                        </Badge>
                    </h3>
                    <div className={cn("text-sm font-bold flex items-center", change >= 0 ? "text-green-600" : "text-red-600")}>
                        {change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                        {Math.abs(change)}%
                    </div>
                </div>

                <div className="flex items-baseline mb-2">
                    <span className="text-2xl text-muted-foreground mr-1">{currency}</span>
                    <span className="text-4xl font-bold text-foreground">
                        {format(price).replace(currencySym, '')}
                    </span>
                </div>

                <div className="text-sm text-muted-foreground flex items-center mb-6">
                    <Clock className="mr-1 h-3 w-3" />
                    Per {unitLabel} • Real-time
                </div>

                {/* Sparkline Container */}
                <div className="h-[100px]">
                    <Sparkline data={sparkData} color={color} bgColor={`${color}1A`} />
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <StatCard
                title="Gold"
                price={goldDisplayPrice}
                change={goldChange}
                sparkData={goldSparkData}
                color="#d97706"
                type="gold"
            />
            <StatCard
                title="Silver"
                price={silverDisplayPrice}
                change={silverChange}
                sparkData={silverSparkData}
                color="#64748b"
                type="silver"
            />
        </div>
    );
};

export default Dashboard;
