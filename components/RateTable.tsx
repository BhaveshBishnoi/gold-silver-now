'use client';

import { useSettings } from '@/components/layout/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetalData } from '@/types';

interface RateTableProps {
    data: {
        gold: MetalData;
        silver: MetalData;
    };
}

const RateTable = ({ data }: RateTableProps) => {
    const { currency, unit, exchangeRates } = useSettings();

    const renderTable = (metal: 'gold' | 'silver', metalData: { price: number; change_percent: number }) => {
        const basePrice = metalData.price;
        const ozToGram = 31.1034768;
        const pricePerGram = basePrice / ozToGram;

        const purities = metal === 'gold' ? [
            { label: '24 Karat (99.9%)', purity: 1.0, badge: 'Investment Grade' },
            { label: '22 Karat (91.6%)', purity: 0.916, badge: 'Jewelry Standard' },
            { label: '21 Karat (87.5%)', purity: 0.875, badge: null },
            { label: '18 Karat (75.0%)', purity: 0.750, badge: null },
            { label: '14 Karat (58.3%)', purity: 0.583, badge: null },
        ] : [
            { label: 'Fine Silver (99.9%)', purity: 1.0, badge: 'Investment Grade' },
            { label: 'Sterling Silver (92.5%)', purity: 0.925, badge: 'Standard' },
            { label: 'Standard Silver (80.0%)', purity: 0.800, badge: null },
        ];

        return (
            <div className="rounded-[2rem] border border-slate-100 overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100/60">
                            <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px] pl-8 h-16">Purity / Karat</TableHead>
                            <TableHead className="text-right font-black text-slate-400 uppercase tracking-widest text-[10px] h-16">Price ({unit === 1 ? '1g' : (unit === 1000 ? '1kg' : `${unit}g`)})</TableHead>
                            <TableHead className="text-right font-black text-slate-400 uppercase tracking-widest text-[10px] pr-8 h-16">24h Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purities.map((item) => {
                            const price = pricePerGram * item.purity * unit;
                            const changeAmount = (price * metalData.change_percent) / 100;
                            const isPositive = metalData.change_percent >= 0;

                            return (
                                <TableRow key={item.label} className="hover:bg-slate-50/30 border-slate-100/60 group transition-all duration-300">
                                    <TableCell className="font-bold text-slate-700 pl-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-900">{item.label}</span>
                                            {item.badge && (
                                                <span className={`text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full ${metal === 'gold' ? 'bg-orange-100/60 text-orange-700' : 'bg-slate-100/60 text-slate-600'}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-black text-slate-950 text-lg tabular-nums">
                                        <span className="text-slate-300 text-sm font-bold mr-1.5">{exchangeRates[currency].symbol}</span>
                                        {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell className={`text-right font-bold pr-8 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black tracking-tight ${isPositive ? 'bg-green-50/80 border border-green-100/50' : 'bg-red-50/80 border border-red-100/50'}`}>
                                            {isPositive ? '+' : ''}
                                            {changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            <span className="ml-1.5 opacity-60 font-bold">({Math.abs(metalData.change_percent)}%)</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return (
        <Card className="mt-12 border-none shadow-none bg-transparent overflow-visible">
            <CardHeader className="bg-transparent pb-10 px-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <CardTitle className="text-3xl font-black text-slate-950 tracking-tight">Market Breakdown</CardTitle>
                        <CardDescription className="text-slate-500 mt-2 font-medium text-lg">
                            Precisely calculated {currency} rates by Karat.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue="gold" className="w-full">
                    <TabsList className="inline-flex w-auto mb-10 p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                        <TabsTrigger
                            value="gold"
                            className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-lg font-black text-xs uppercase tracking-widest transition-all duration-300"
                        >
                            Gold
                        </TabsTrigger>
                        <TabsTrigger
                            value="silver"
                            className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-black text-xs uppercase tracking-widest transition-all duration-300"
                        >
                            Silver
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="gold" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 mt-0 focus-visible:outline-none">
                        {renderTable('gold', data.gold[currency])}
                    </TabsContent>
                    <TabsContent value="silver" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 mt-0 focus-visible:outline-none">
                        {renderTable('silver', data.silver[currency])}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default RateTable;
