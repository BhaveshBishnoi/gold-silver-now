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

const getMockHistory = (basePrice: number) => {
    const history = [];
    const now = Math.floor(Date.now() / 1000);
    const points = 24; // 24 Hours

    for (let i = 0; i < points; i++) {
        const time = now - ((points - 1 - i) * 3600);
        // Sine wave fluctuation
        const fluctuation = Math.sin(i * 0.5) * (basePrice * 0.005) + (Math.random() * (basePrice * 0.002));

        history.push({
            timestamp: time,
            gold: basePrice + fluctuation, // This function is generic but we only use gold field here? No, let's make it return just value
            value: basePrice + fluctuation
        });
    }
    return history;
};

// Helper to generate history for gold and silver in a specific currency
const generateHistory = (goldBase: number, silverBase: number) => {
    const history = [];
    const now = Math.floor(Date.now() / 1000);
    const points = 24;

    for (let i = 0; i < points; i++) {
        const time = now - ((points - 1 - i) * 3600);
        const goldFluc = Math.sin(i * 0.5) * (goldBase * 0.005) + (Math.random() * (goldBase * 0.002));
        const silverFluc = Math.sin(i * 0.5) * (silverBase * 0.005) + (Math.random() * (silverBase * 0.002));

        history.push({
            timestamp: time,
            gold: goldBase + goldFluc,
            silver: silverBase + silverFluc
        });
    }
    return history;
};

export async function GET() {
    try {
        const CACHE_DURATION = 28800; // 8 hours
        // Check Cache
        if (fs.existsSync(CACHE_FILE)) {
            const cacheRaw = fs.readFileSync(CACHE_FILE, 'utf-8');
            const cache: CacheData = JSON.parse(cacheRaw);

            if (Date.now() / 1000 - cache.timestamp < CACHE_DURATION) {
                return NextResponse.json(cache);
            }
        }

        const headers = { 'x-access-token': API_KEY, 'Content-Type': 'application/json' };

        // Static Exchange Rates (to save API calls)
        const RATES = {
            USD: 1,
            INR: 84.50,
            EUR: 0.92
        };

        // Fetch ONLY USD prices to minimize API usage (2 requests per update)
        const [goldRes, silverRes] = await Promise.all([
            fetch('https://www.goldapi.io/api/XAU/USD', { headers }),
            fetch('https://www.goldapi.io/api/XAG/USD', { headers })
        ]);

        const goldJson = await goldRes.json();
        const silverJson = await silverRes.json();

        // Initializing structure
        const goldData: any = {};
        const silverData: any = {};
        const historyData: any = {};

        // Helper to convert and format data
        const processMetalData = (apiData: any, rate: number, isGold: boolean) => {
            if (apiData.error) {
                // Fallback Mock
                const mockBase = isGold ? 2650 : 31;
                const price = mockBase * rate;
                return {
                    price: price,
                    change_percent: isGold ? 0.5 : -0.2,
                    details: {
                        price_gram_24k: (price / 31.1035),
                        price_gram_22k: (price / 31.1035) * 0.916,
                        price_gram_21k: (price / 31.1035) * 0.875,
                        price_gram_18k: (price / 31.1035) * 0.750,
                    }
                };
            }

            const price = apiData.price * rate;
            return {
                price: price,
                change_percent: apiData.chp, // Assuming % change is similar across currencies
                details: {
                    price_gram_24k: apiData.price_gram_24k * rate,
                    price_gram_22k: apiData.price_gram_22k * rate,
                    price_gram_21k: apiData.price_gram_21k * rate,
                    price_gram_18k: apiData.price_gram_18k * rate,
                }
            };
        };

        // Populate data for all currencies based on USD fetch
        ['USD', 'INR', 'EUR'].forEach((curr) => {
            // @ts-ignore
            const rate = RATES[curr];

            goldData[curr] = processMetalData(goldJson, rate, true);
            silverData[curr] = processMetalData(silverJson, rate, false);
            historyData[curr] = generateHistory(goldData[curr].price, silverData[curr].price);
        });

        const responseData = {
            gold: goldData,
            silver: silverData,
            history: historyData
        };

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
