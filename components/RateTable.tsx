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

    const renderTable = (metal: 'gold' | 'silver') => {
        const metalData = data[metal][currency];
        const basePrice = metalData.price; // Price per oz in current currency
        const ozToGram = 31.1034768;
        const pricePerGram = basePrice / ozToGram;

        const purities = metal === 'gold' ? [
            { label: '24K (99.9%)', purity: 1.0 },
            { label: '22K (91.6%)', purity: 0.916 },
            { label: '21K (87.5%)', purity: 0.875 },
            { label: '18K (75.0%)', purity: 0.750 },
            { label: '14K (58.3%)', purity: 0.583 },
        ] : [
            { label: 'Fine Silver (99.9%)', purity: 1.0 },
            { label: 'Sterling Silver (92.5%)', purity: 0.925 },
            { label: 'Standard Silver (80.0%)', purity: 0.800 },
        ];

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Purity</TableHead>
                        <TableHead className="text-right">Price per {unit === 1 ? '1g' : (unit === 1000 ? '1kg' : `${unit}g`)}</TableHead>
                        <TableHead className="text-right">Change (24h)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {purities.map((item) => {
                        const price = pricePerGram * item.purity * unit;
                        const changeAmount = (price * metalData.change_percent) / 100;

                        return (
                            <TableRow key={item.label}>
                                <TableCell className="font-medium">{item.label}</TableCell>
                                <TableCell className="text-right font-bold">
                                    {exchangeRates[currency].symbol}{price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell className={`text-right font-medium ${metalData.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {metalData.change_percent >= 0 ? '+' : ''}{changeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({Math.abs(metalData.change_percent)}%)
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    };

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Detailed Rate Table</CardTitle>
                <CardDescription>
                    Live rates for different purities in {currency}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="gold" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="gold">Gold Rates</TabsTrigger>
                        <TabsTrigger value="silver">Silver Rates</TabsTrigger>
                    </TabsList>
                    <TabsContent value="gold">
                        {renderTable('gold')}
                    </TabsContent>
                    <TabsContent value="silver">
                        {renderTable('silver')}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default RateTable;
