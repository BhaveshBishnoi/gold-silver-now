'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calculator, Percent } from 'lucide-react';
import Link from 'next/link';

export default function GSTCalculator() {
    const [amount, setAmount] = useState(10000);
    const [gstRate, setGstRate] = useState(18);
    const [calculationType, setCalculationType] = useState('exclusive'); // 'exclusive' or 'inclusive'

    const calculateGST = () => {
        let gstAmount = 0;
        let totalAmount = 0;
        let originalAmount = amount;

        if (calculationType === 'exclusive') {
            gstAmount = (amount * gstRate) / 100;
            totalAmount = amount + gstAmount;
        } else {
            gstAmount = amount - (amount * (100 / (100 + gstRate)));
            originalAmount = amount - gstAmount;
            totalAmount = amount;
        }

        return {
            originalAmount: Math.round(originalAmount * 100) / 100,
            gstAmount: Math.round(gstAmount * 100) / 100,
            totalAmount: Math.round(totalAmount * 100) / 100,
            cgst: Math.round((gstAmount / 2) * 100) / 100,
            sgst: Math.round((gstAmount / 2) * 100) / 100,
        };
    };

    const results = calculateGST();

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
                            <Percent className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">GST Calculator</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardHeader>
                            <Tabs defaultValue="exclusive" onValueChange={(v) => setCalculationType(v)}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="exclusive">GST Exclusive</TabsTrigger>
                                    <TabsTrigger value="inclusive">GST Inclusive</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-6">
                            {/* Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="amount text-base">
                                        {calculationType === 'exclusive' ? 'Net Amount (Excl. GST)' : 'Total Amount (Incl. GST)'}
                                    </Label>
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
                                    min={100}
                                    max={1000000}
                                    step={100}
                                    value={[amount]}
                                    onValueChange={(val) => setAmount(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* GST Rate */}
                            <div className="space-y-4">
                                <Label className="text-base">GST Rate (%)</Label>
                                <div className="flex flex-wrap gap-2">
                                    {[5, 12, 18, 28].map((rate) => (
                                        <Button
                                            key={rate}
                                            variant={gstRate === rate ? 'default' : 'outline'}
                                            onClick={() => setGstRate(rate)}
                                            className={gstRate === rate ? 'bg-orange-600 hover:bg-orange-700' : 'border-slate-200'}
                                        >
                                            {rate}%
                                        </Button>
                                    ))}
                                    <div className="w-24 relative ml-auto">
                                        <Input
                                            type="number"
                                            value={gstRate}
                                            onChange={(e) => setGstRate(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50 text-right pr-8"
                                            placeholder="Custom"
                                        />
                                        <span className="absolute right-3 top-2.5 text-slate-500">%</span>
                                    </div>
                                </div>
                                <Slider
                                    min={0.1}
                                    max={50}
                                    step={0.1}
                                    value={[gstRate]}
                                    onValueChange={(val) => setGstRate(val[0])}
                                    className="py-4"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl h-fit">
                        <CardHeader className="bg-slate-800/50 border-b border-slate-700/50">
                            <CardTitle className="text-slate-300 text-lg font-medium">Total Amount</CardTitle>
                            <div className="text-4xl font-bold mt-2">
                                ₹ {results.totalAmount.toLocaleString('en-IN')}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Net Amount</span>
                                    <span className="font-semibold">₹ {results.originalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">GST Amount ({gstRate}%)</span>
                                    <span className="font-semibold text-orange-400">₹ {results.gstAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <Separator className="bg-slate-700" />
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>CGST ({gstRate / 2}%)</span>
                                        <span>₹ {results.cgst.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>SGST ({gstRate / 2}%)</span>
                                        <span>₹ {results.sgst.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-4 text-center text-xs text-slate-400 leading-relaxed">
                                * This calculator is for estimation purposes. Exact GST may vary based on specific item categories and regulations.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Educational Content Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="prose prose-slate lg:prose-lg mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding GST in India</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. It is a comprehensive, multi-stage, destination-based tax: comprehensive because it has subsumed almost all the indirect taxes except a few state taxes.
                        </p>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">GST Tax Slabs</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { rate: "5%", desc: "Mass consumption items like tea, coffee, oil." },
                                    { rate: "12%", desc: "Standard rate for items like processed food." },
                                    { rate: "18%", desc: "Standard rate for items like soaps, hair oil." },
                                    { rate: "28%", desc: "Luxury items like cars, tobacco, ACs." }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="text-2xl font-bold text-orange-600 mb-1">{item.rate}</div>
                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4">How GST is Calculated?</h3>
                        <p className="text-slate-600 mb-6">
                            GST calculation can be done in two ways: adding GST to the base price or finding the base price from the GST-inclusive total.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-4">
                                <h4 className="font-bold text-slate-900">GST Exclusive</h4>
                                <div className="p-4 bg-blue-50 rounded-lg font-mono text-sm text-blue-800">
                                    GST = (Price * GST%) / 100<br />
                                    Total = Price + GST
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-slate-900">GST Inclusive</h4>
                                <div className="p-4 bg-green-50 rounded-lg font-mono text-sm text-green-800">
                                    GST = Price - (Price * (100 / (100 + GST%)))<br />
                                    Net = Price - GST
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Components of GST</h3>
                        <div className="space-y-6 mb-12">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 font-bold">C</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">CGST (Central GST)</h4>
                                    <p className="text-sm text-slate-500">Collected by the Central Government on an intra-state sale (e.g., transaction happening within Maharashtra).</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-600 font-bold">S</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">SGST (State GST)</h4>
                                    <p className="text-sm text-slate-500">Collected by the State Government on an intra-state sale.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600 font-bold">I</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">IGST (Integrated GST)</h4>
                                    <p className="text-sm text-slate-500">Collected by the Central Government for inter-state sale (e.g., Maharashtra to Karnataka).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
