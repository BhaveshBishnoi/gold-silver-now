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
        <Card className="h-full relative overflow-hidden rounded-xl animate-in fade-in duration-500 border-none shadow-sm bg-white">
            {/* Removed top border gradient for cleaner look, added subtle accent */}
            <div className={cn(
                "absolute top-0 left-0 w-1 h-full",
                type === 'gold' ? "bg-primary" : "bg-slate-400"
            )} />

            <CardContent className="p-6 pl-8">
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center tracking-tight">
                        {title}
                        <Badge variant={change >= 0 ? "default" : "destructive"} className={cn("ml-3 h-5 px-1.5 text-[10px] font-bold uppercase tracking-wider", change >= 0 ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" : "bg-red-100 text-red-700 hover:bg-red-100 border-red-200")}>
                            Live
                        </Badge>
                    </h3>
                    <div className={cn("text-sm font-bold flex items-center bg-opacity-10 px-2 py-1 rounded-full", change >= 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50")}>
                        {change >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                        {Math.abs(change)}%
                    </div>
                </div>

                <div className="flex items-baseline mb-2">
                    <span className="text-2xl text-slate-400 mr-2 font-medium">{currency}</span>
                    <span className={cn("text-5xl font-extrabold tracking-tight", type === 'gold' ? "text-slate-900" : "text-slate-900")}>
                        {format(price).replace(currencySym, '')}
                    </span>
                </div>

                <div className="text-sm text-slate-500 flex items-center mb-8 font-medium">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    Per {unitLabel} • Real-time Market Rate
                </div>

                {/* Sparkline Container */}
                <div className="h-[120px] -mx-2">
                    <Sparkline data={sparkData} color={color} bgColor={`${color}10`} />
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatCard
                title="Gold"
                price={goldDisplayPrice}
                change={goldChange}
                sparkData={goldSparkData}
                color="#d36700" /* New primary orange */
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
