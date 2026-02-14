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

    const renderTable = (metal: 'gold' | 'silver', metalData: any) => {
        const basePrice = metalData.price;
        const ozToGram = 31.1034768;
        const pricePerGram = basePrice / ozToGram;

        const purities = metal === 'gold' ? [
            { label: '24 Karat (99.9%)', purity: 1.0, badge: 'Pure' },
            { label: '22 Karat (91.6%)', purity: 0.916, badge: 'Standard' },
            { label: '21 Karat (87.5%)', purity: 0.875, badge: null },
            { label: '18 Karat (75.0%)', purity: 0.750, badge: null },
            { label: '14 Karat (58.3%)', purity: 0.583, badge: null },
        ] : [
            { label: 'Fine Silver (99.9%)', purity: 1.0, badge: 'Pure' },
            { label: 'Sterling Silver (92.5%)', purity: 0.925, badge: 'Standard' },
            { label: 'Standard Silver (80.0%)', purity: 0.800, badge: null },
        ];

        return (
            <div className="rounded-xl border border-slate-100 overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="hover:bg-slate-50 border-slate-100">
                            <TableHead className="font-semibold text-slate-600 pl-6 h-12">Purity / Karat</TableHead>
                            <TableHead className="text-right font-semibold text-slate-600 h-12">Price ({unit === 1 ? '1g' : (unit === 1000 ? '1kg' : `${unit}g`)})</TableHead>
                            <TableHead className="text-right font-semibold text-slate-600 pr-6 h-12">24h Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purities.map((item, index) => {
                            const price = pricePerGram * item.purity * unit;
                            const changeAmount = (price * metalData.change_percent) / 100;
                            const isPositive = metalData.change_percent >= 0;

                            return (
                                <TableRow key={item.label} className="hover:bg-slate-50 border-slate-100 group transition-colors">
                                    <TableCell className="font-medium text-slate-700 pl-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {item.label}
                                            {item.badge && (
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${metal === 'gold' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-900 text-base">
                                        <span className="text-slate-400 text-sm font-normal mr-1">{exchangeRates[currency].symbol}</span>
                                        {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell className={`text-right font-semibold pr-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-md ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                                            {isPositive ? '+' : ''}
                                            {changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            <span className="ml-1 opacity-70">({Math.abs(metalData.change_percent)}%)</span>
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
        <Card className="mt-8 border-none shadow-sm bg-white rounded-xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-white pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Live Market Rates</CardTitle>
                        <CardDescription className="text-slate-500 mt-1">
                            Detailed breakdown of {currency} rates by purity.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <Tabs defaultValue="gold" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-slate-100 rounded-lg">
                        <TabsTrigger
                            value="gold"
                            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
                        >
                            Gold Rates
                        </TabsTrigger>
                        <TabsTrigger
                            value="silver"
                            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-semibold transition-all"
                        >
                            Silver Rates
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="gold" className="animate-in fade-in-50 duration-300 mt-0">
                        {renderTable('gold', data.gold[currency])}
                    </TabsContent>
                    <TabsContent value="silver" className="animate-in fade-in-50 duration-300 mt-0">
                        {renderTable('silver', data.silver[currency])}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default RateTable;
