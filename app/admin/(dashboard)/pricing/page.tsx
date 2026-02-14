import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PriceInputForm from "./PriceInputForm";
import { format } from "date-fns";
import { TrendingUp, History, DollarSign, Euro, IndianRupee } from "lucide-react";

// Define interface locally to avoid import issues
interface PriceRecord {
    id: string;
    createdAt: Date;
    goldPrice: number;
    silverPrice: number;
    inrToUsd: number;
    inrToEur: number;
}

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
        <div className="min-h-screen bg-[#f0f2f5] p-4 md:p-8">
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-[#050505]">Price Management</h1>
                        <p className="text-[#65676B] text-lg font-medium mt-1">
                            Manage market rates and track history
                        </p>
                    </div>
                    {/* Optional: Add a quick status badge or date here */}
                    <div className="px-4 py-2 bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1)] text-primary font-bold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        <span>Live Market Dashboard</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column: Input Form */}
                    <div className="lg:col-span-1">
                        <PriceInputForm />
                    </div>

                    {/* Right Column: Recent Records Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
                                <h2 className="text-xl font-bold text-[#050505] flex items-center gap-2">
                                    <History className="w-5 h-5 text-primary" />
                                    Recent Updates
                                </h2>
                                <span className="text-sm font-semibold text-[#65676B] bg-[#f0f2f5] px-3 py-1 rounded-full">
                                    Last 10 Records
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#f7f8fa] text-[#65676B] text-sm uppercase tracking-wider font-semibold">
                                            <th className="p-4 border-b border-gray-100">Date & Time</th>
                                            <th className="p-4 border-b border-gray-100 text-right text-primary">Gold (10g)</th>
                                            <th className="p-4 border-b border-gray-100 text-right text-[#050505]">Silver (1kg)</th>
                                            <th className="p-4 border-b border-gray-100 text-right">USD</th>
                                            <th className="p-4 border-b border-gray-100 text-right">EUR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentRecords.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-[#65676B] font-medium">
                                                    No recent updates found.
                                                </td>
                                            </tr>
                                        ) : (
                                            recentRecords.map((record: PriceRecord) => (
                                                <tr key={record.id} className="hover:bg-[#f0f2f5] transition-colors duration-150 group">
                                                    <td className="p-4 text-[#050505] font-semibold text-sm whitespace-nowrap">
                                                        {format(new Date(record.createdAt), "MMM d, h:mm a")}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-sm inline-flex items-center gap-1">
                                                            ₹{record.goldPrice.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right text-[#050505] font-bold text-sm">
                                                        ₹{record.silverPrice.toLocaleString()}
                                                    </td>
                                                    <td className="p-4 text-right text-[#65676B] font-medium text-sm">
                                                        <span className="flex items-center justify-end gap-1">
                                                            <DollarSign className="w-3 h-3" />
                                                            {record.inrToUsd}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right text-[#65676B] font-medium text-sm">
                                                        <span className="flex items-center justify-end gap-1">
                                                            <Euro className="w-3 h-3" />
                                                            {record.inrToEur}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
