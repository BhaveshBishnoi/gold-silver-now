import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PriceInputForm from "./PriceInputForm";
import { format } from "date-fns";
import { TrendingUp, History, DollarSign } from "lucide-react";
import { EditPriceDialog, DeletePriceDialog } from "./PriceDialogs";
import { Pagination } from "@/components/admin/Pagination";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 20;

interface PriceRecord {
    id: string;
    createdAt: Date;
    goldPrice: number;
    silverPrice: number;
}

export default async function AdminPricingPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const currentPage = parseInt(searchParams.page || '1');
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const [recentRecords, totalCount, latestRecord] = await Promise.all([
        prisma.priceRecord.findMany({
            take: ITEMS_PER_PAGE,
            skip,
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prisma.priceRecord.count(),
        prisma.priceRecord.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        })
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <div className="container mx-auto py-8 max-w-7xl space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-[#050505]">Price Management</h1>
                    <p className="text-[#65676B] text-lg font-medium mt-1">
                        Manage market rates and track history
                    </p>
                </div>
                <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-primary font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Live Market Dashboard</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Total Records</p>
                                <p className="text-3xl font-bold text-[#050505] mt-1">{totalCount}</p>
                            </div>
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <History className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Latest Gold (10g)</p>
                                <p className="text-3xl font-bold text-primary mt-1">
                                    ₹{latestRecord?.goldPrice.toLocaleString() || '0'}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Latest Silver (1kg)</p>
                                <p className="text-3xl font-bold text-[#050505] mt-1">
                                    ₹{latestRecord?.silverPrice.toLocaleString() || '0'}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-gray-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column: Input Form */}
                <div className="lg:col-span-1">
                    <PriceInputForm />
                </div>

                {/* Right Column: Records Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
                            <h2 className="text-xl font-bold text-[#050505] flex items-center gap-2">
                                <History className="w-5 h-5 text-primary" />
                                Price History
                            </h2>
                            <span className="text-sm font-semibold text-[#65676B] bg-[#f0f2f5] px-3 py-1 rounded-full">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f7f8fa] text-[#65676B] text-sm uppercase tracking-wider font-semibold">
                                        <th className="p-4 border-b border-gray-100">Date & Time</th>
                                        <th className="p-4 border-b border-gray-100 text-right text-primary">Gold (10g)</th>
                                        <th className="p-4 border-b border-gray-100 text-right text-[#050505]">Silver (1kg)</th>
                                        <th className="p-4 border-b border-gray-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-[#65676B] font-medium">
                                                No price records found.
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
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <EditPriceDialog record={record} />
                                                        <DeletePriceDialog recordId={record.id} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-4 border-t border-gray-100 bg-[#f7f8fa]">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    basePath="/admin/pricing"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
