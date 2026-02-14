import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch the latest price record
        const latestRecord = await prisma.priceRecord.findFirst({
            orderBy: { createdAt: 'desc' }
        });

        // Fetch history (last 24 records or appropriate amount)
        const historyRecords = await prisma.priceRecord.findMany({
            take: 24,
            orderBy: { createdAt: 'desc' }
        });

        // Default / Fallback values if no DB data exists
        const defaultRecord = {
            goldPrice: 154000, // INR per 10g
            silverPrice: 278000, // INR per 1kg
            createdAt: new Date()
        };

        const record = latestRecord || defaultRecord;

        // Conversion Constants
        const OZ_TO_GRAM = 31.1034768;

        // Helper to convert Input (Per 10g Gold, Per 1kg Silver) to Per Ounce (Frontend Expectation)
        const convertToOuncePrice = (price: number, type: 'gold' | 'silver') => {
            if (type === 'gold') {
                // Input is per 10g
                const pricePerGram = price / 10;
                return pricePerGram * OZ_TO_GRAM;
            } else {
                // Input is per 1kg
                const pricePerGram = price / 1000;
                return pricePerGram * OZ_TO_GRAM;
            }
        };

        const goldOunceINR = convertToOuncePrice(record.goldPrice, 'gold');
        const silverOunceINR = convertToOuncePrice(record.silverPrice, 'silver');

        // Process History
        // We need to reverse it to be chronological for the chart
        const sortedHistory = [...historyRecords].reverse().map(rec => ({
            timestamp: Math.floor(new Date(rec.createdAt).getTime() / 1000),
            gold: convertToOuncePrice(rec.goldPrice, 'gold'),
            silver: convertToOuncePrice(rec.silverPrice, 'silver')
        }));

        // If history is empty, generate single point or mock
        if (sortedHistory.length === 0) {
            sortedHistory.push({
                timestamp: Math.floor(Date.now() / 1000),
                gold: goldOunceINR,
                silver: silverOunceINR
            });
        }

        const responseData = {
            gold: {
                INR: { price: goldOunceINR, change_percent: 0 },
            },
            silver: {
                INR: { price: silverOunceINR, change_percent: 0 },
            },
            history: {
                INR: sortedHistory,
            }
        };

        return NextResponse.json({
            status: 'success',
            timestamp: Math.floor(new Date(record.createdAt).getTime() / 1000),
            data: responseData
        });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
    }
}
