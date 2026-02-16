'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calculator, PieChart } from 'lucide-react';
import Link from 'next/link';

export default function EMICalculator() {
    const [amount, setAmount] = useState(1000000);
    const [interest, setInterest] = useState(8.5);
    const [tenure, setTenure] = useState(120); // in months

    const calculateEMI = () => {
        const r = interest / 12 / 100;
        const n = tenure;
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const monthlyEMI = calculateEMI();
    const totalPayment = monthlyEMI * tenure;
    const totalInterest = totalPayment - amount;

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-orange-600 mb-4" asChild>
                        <Link href="/tools">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Tools
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Calculator className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">EMI Calculator</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardHeader>
                            <Tabs defaultValue="home">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="home">Home Loan</TabsTrigger>
                                    <TabsTrigger value="personal">Personal Loan</TabsTrigger>
                                    <TabsTrigger value="car">Car Loan</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-6">

                            {/* Loan Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="amount">Loan Amount</Label>
                                    <div className="w-40 relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                        <Input
                                            id="amount"
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="pl-8 h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    id="amount-slider"
                                    min={100000}
                                    max={10000000}
                                    step={10000}
                                    value={[amount]}
                                    onValueChange={(val) => setAmount(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="interest">Interest Rate (% p.a)</Label>
                                    <div className="w-24 relative">
                                        <Input
                                            id="interest"
                                            type="number"
                                            value={interest}
                                            onChange={(e) => setInterest(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    id="interest-slider"
                                    min={1}
                                    max={20}
                                    step={0.1}
                                    value={[interest]}
                                    onValueChange={(val) => setInterest(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Tenure */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="tenure">Loan Tenure (Months)</Label>
                                    <div className="w-24 relative">
                                        <Input
                                            id="tenure"
                                            type="number"
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    id="tenure-slider"
                                    min={12}
                                    max={360}
                                    step={6}
                                    value={[tenure]}
                                    onValueChange={(val) => setTenure(val[0])}
                                    className="py-4"
                                />
                                <div className="text-right text-xs text-slate-500">
                                    {(tenure / 12).toFixed(1)} Years
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl h-fit">
                        <CardHeader className="bg-slate-800/50 border-b border-slate-700/50">
                            <CardTitle className="text-slate-300 text-lg font-medium">Monthly Repayment</CardTitle>
                            <div className="text-4xl font-bold mt-2">
                                ₹ {monthlyEMI.toLocaleString('en-IN')}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Principal Amount</span>
                                    <span className="font-semibold">₹ {amount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Total Interest</span>
                                    <span className="font-semibold text-orange-400">₹ {totalInterest.toLocaleString('en-IN')}</span>
                                </div>
                                <Separator className="bg-slate-700" />
                                <div className="flex justify-between text-base font-bold">
                                    <span>Total Payment</span>
                                    <span>₹ {totalPayment.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-4 text-center text-xs text-slate-400 leading-relaxed">
                                * This calculator provides estimates. Actual loan terms may vary based on bank policies.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
