import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'prices_cache.json');
const CACHE_DURATION = 900; // 15 minutes
const API_KEY = process.env.METALS_API_KEY || 'goldapi-402f6smlhyqjtm-io';

interface CacheData {
    timestamp: number;
    data: any;
}

const getMockHistory = (baseGold: number, baseSilver: number) => {
    const history = [];
    const now = Math.floor(Date.now() / 1000);
    const points = 24; // 24 Hours

    for (let i = 0; i < points; i++) {
        const time = now - ((points - 1 - i) * 3600);
        // Sine wave fluctuation
        const goldFluctuation = Math.sin(i * 0.5) * 15 + (Math.random() * 5);
        const silverFluctuation = Math.sin(i * 0.5) * 0.5 + (Math.random() * 0.1);

        history.push({
            timestamp: time,
            gold: baseGold + goldFluctuation,
            silver: baseSilver + silverFluctuation
        });
    }
    return history;
};

export async function GET() {
    try {
        // Check Cache
        if (fs.existsSync(CACHE_FILE)) {
            const cacheRaw = fs.readFileSync(CACHE_FILE, 'utf-8');
            const cache: CacheData = JSON.parse(cacheRaw);

            if (Date.now() / 1000 - cache.timestamp < CACHE_DURATION) {
                return NextResponse.json(cache);
            }
        }

        // Fetch Live Data
        const headers = { 'x-access-token': API_KEY, 'Content-Type': 'application/json' };

        // Fetch Gold
        const goldRes = await fetch('https://www.goldapi.io/api/XAU/USD', { headers });
        const goldData = await goldRes.json();

        // Fetch Silver
        const silverRes = await fetch('https://www.goldapi.io/api/XAG/USD', { headers });
        const silverData = await silverRes.json();

        let responseData;

        if (goldData.error || silverData.error) {
            // Mock Data Fallback
            console.warn('API Error, using mock data.');
            responseData = {
                gold: { price: 2650.50, change_percent: 0.45 },
                silver: { price: 31.20, change_percent: -0.12 },
                history: getMockHistory(2650.50, 31.20)
            };
        } else {
            responseData = {
                gold: {
                    price: goldData.price,
                    change_percent: goldData.chp,
                    details: {
                        price_gram_24k: goldData.price_gram_24k,
                        price_gram_22k: goldData.price_gram_22k,
                        price_gram_21k: goldData.price_gram_21k,
                        price_gram_18k: goldData.price_gram_18k
                    }
                },
                silver: {
                    price: silverData.price,
                    change_percent: silverData.chp,
                    details: {
                        price_gram_24k: silverData.price_gram_24k, // Silver gram API
                        price_gram_22k: silverData.price_gram_22k,
                        price_gram_21k: silverData.price_gram_21k,
                        price_gram_18k: silverData.price_gram_18k
                    }
                },
                history: getMockHistory(goldData.price, silverData.price)
            };
        }

        const finalResponse = {
            status: 'success',
            timestamp: Math.floor(Date.now() / 1000),
            data: responseData
        };

        // Write Cache
        fs.writeFileSync(CACHE_FILE, JSON.stringify(finalResponse));

        return NextResponse.json(finalResponse);

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
    }
}
