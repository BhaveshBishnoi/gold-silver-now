import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PriceRecord } from "@prisma/client";
import PriceInputForm from "./PriceInputForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default async function AdminPricingPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const recentRecords = await prisma.priceRecord.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="container mx-auto py-8 max-w-5xl space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Price Management</h1>
                <p className="text-slate-500">
                    Update current market rates manually. Historical data is saved for trend analysis.
                </p>
            </div>

            <PriceInputForm />

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    Recent Updates
                </h2>

                <Card className="border-none shadow-sm overflow-hidden bg-white">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-700">Date & Time</TableHead>
                                <TableHead className="text-right font-semibold text-slate-700">Gold (INR)</TableHead>
                                <TableHead className="text-right font-semibold text-slate-700">Silver (INR)</TableHead>
                                <TableHead className="text-right font-semibold text-slate-700">USD Rate</TableHead>
                                <TableHead className="text-right font-semibold text-slate-700">EUR Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentRecords.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                                        No price records found. Start adding some above.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recentRecords.map((record: PriceRecord) => (
                                    <TableRow key={record.id} className="hover:bg-slate-50">
                                        <TableCell className="font-medium text-slate-600">
                                            {format(new Date(record.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                        </TableCell>
                                        <TableCell className="text-right font-bold text-primary">
                                            ₹{record.goldPrice.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right font-bold text-slate-700">
                                            ₹{record.silverPrice.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right text-slate-600">
                                            ${record.inrToUsd}
                                        </TableCell>
                                        <TableCell className="text-right text-slate-600">
                                            €{record.inrToEur}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
