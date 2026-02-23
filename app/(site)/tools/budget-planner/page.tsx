'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Wallet, Plus, Trash2, PieChart } from 'lucide-react';
import Link from 'next/link';

type BudgetCategory = {
    id: string;
    name: string;
    amount: number;
};

export default function BudgetPlanner() {
    const [income, setIncome] = useState(100000);
    const [categories, setCategories] = useState<BudgetCategory[]>([
        { id: '1', name: 'Rent/Mortgage', amount: 25000 },
        { id: '2', name: 'Groceries', amount: 10000 },
        { id: '3', name: 'Utilities', amount: 5000 },
        { id: '4', name: 'Transport', amount: 4000 },
        { id: '5', name: 'Health', amount: 3000 },
    ]);
    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState<number>(0);

    const addCategory = () => {
        if (newName && newAmount > 0) {
            setCategories([...categories, { id: Date.now().toString(), name: newName, amount: newAmount }]);
            setNewName('');
            setNewAmount(0);
        }
    };

    const removeCategory = (id: string) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    const totalExpenses = categories.reduce((sum, c) => sum + c.amount, 0);
    const savings = income - totalExpenses;
    const savingsPercent = (savings / income) * 100;

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
                            <Wallet className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Advanced Budget Planner</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                    <Input
                                        type="number"
                                        value={income}
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        className="pl-8 text-xl font-bold h-12"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Expenses</CardTitle>
                                <span className="text-sm text-slate-500">{categories.length} Categories</span>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {categories.map(cat => (
                                    <div key={cat.id} className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <Label className="text-xs text-slate-400">{cat.name}</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-slate-500 text-xs">₹</span>
                                                <Input
                                                    type="number"
                                                    value={cat.amount}
                                                    onChange={(e) => {
                                                        const val = Number(e.target.value);
                                                        setCategories(categories.map(c => c.id === cat.id ? { ...c, amount: val } : c));
                                                    }}
                                                    className="pl-6 h-9 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="mt-5 text-slate-300 hover:text-red-500" onClick={() => removeCategory(cat.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}

                                <Separator className="my-6" />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="md:col-span-2">
                                        <Label className="text-xs">Category Name</Label>
                                        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Dining, Gym" className="h-9" />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Amount</Label>
                                        <div className="flex gap-2">
                                            <Input type="number" value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value))} className="h-9" />
                                            <Button size="sm" onClick={addCategory} className="bg-orange-600 hover:bg-orange-700">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-900 text-white shadow-xl h-fit sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-slate-300 text-sm font-medium uppercase tracking-wider">Budget Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Total Expenses</span>
                                        <span className="font-bold">₹ {totalExpenses.toLocaleString('en-IN')}</span>
                                    </div>
                                    <Progress value={(totalExpenses / income) * 100} className="h-2 bg-slate-800" />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Projected Savings</span>
                                        <span className={`font-bold ${savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            ₹ {savings.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 text-right">
                                        {savingsPercent.toFixed(1)}% of income
                                    </div>
                                </div>

                                <Separator className="bg-slate-800" />

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase">Analysis</h4>
                                    {savingsPercent < 20 ? (
                                        <p className="text-xs text-orange-300 leading-relaxed italic">
                                            "Your savings rate is below the recommended 20%. Consider reducing non-essential expenses."
                                        </p>
                                    ) : (
                                        <p className="text-xs text-green-300 leading-relaxed italic">
                                            "Excellent! You are saving {savingsPercent.toFixed(1)}% of your income. Ready to invest?"
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="prose prose-slate lg:prose-lg mx-auto">
                        <h2 className="text-3xl font-bold mb-6">The 50/30/20 Budgeting Rule</h2>
                        <p className="text-slate-600 mb-8">
                            A simple, yet effective budgeting method is the 50/30/20 rule. It suggests dividing your after-tax income into three categories:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="p-6 border rounded-xl bg-blue-50/50">
                                <h4 className="font-bold text-blue-900 border-b border-blue-100 pb-2 mb-4">50% Needs</h4>
                                <ul className="text-sm space-y-2 text-blue-800 list-none pl-0">
                                    <li>• Rent / mortgage</li>
                                    <li>• Groceries</li>
                                    <li>• Utilities</li>
                                    <li>• Minimum debt payments</li>
                                </ul>
                            </div>
                            <div className="p-6 border rounded-xl bg-orange-50/50">
                                <h4 className="font-bold text-orange-900 border-b border-orange-100 pb-2 mb-4">30% Wants</h4>
                                <ul className="text-sm space-y-2 text-orange-800 list-none pl-0">
                                    <li>• Dining out</li>
                                    <li>• Hobbies</li>
                                    <li>• Entertainment</li>
                                    <li>• Streaming services</li>
                                </ul>
                            </div>
                            <div className="p-6 border rounded-xl bg-green-50/50">
                                <h4 className="font-bold text-green-900 border-b border-green-100 pb-2 mb-4">20% Savings</h4>
                                <ul className="text-sm space-y-2 text-green-800 list-none pl-0">
                                    <li>• Emergency fund</li>
                                    <li>• Retirement savings</li>
                                    <li>• Extra debt payments</li>
                                    <li>• Investments</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
