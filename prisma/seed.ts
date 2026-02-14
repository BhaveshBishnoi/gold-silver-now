import 'dotenv/config'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    const email = 'admin@bhaveshbishnoi.com'
    const password = 'Gold@123' // Change this to a secure password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Using upsert to avoid error if user exists
    const user = await (prisma as any).user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin User',
            password: hashedPassword,
            role: 'admin',
        },
    })

    console.log({ user })

    // --- SEED PRICE RECORDS ---
    console.log('Seeding price records...')

    // Optional: Clear existing records if you want a fresh start
    // await prisma.priceRecord.deleteMany({})

    const daysToSeed = 365;
    const recordsPerDay = 3; // Morning, Afternoon, Evening
    const data = [];

    // Base prices (approximate starting point for a year ago)
    let currentGoldPrice = 65000; // Starting lower to show trend up
    let currentSilverPrice = 75000;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - daysToSeed);

    for (let i = 0; i < daysToSeed; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        // Daily trend
        const dailyGoldChange = (Math.random() - 0.45) * 400; // Slight upward bias
        const dailySilverChange = (Math.random() - 0.45) * 600;

        currentGoldPrice += dailyGoldChange;
        currentSilverPrice += dailySilverChange;

        // Ensure we don't drop too low or go too high accidentally
        if (currentGoldPrice < 60000) currentGoldPrice = 60000;
        if (currentSilverPrice < 70000) currentSilverPrice = 70000;

        // 3 times a day: 10 AM, 2 PM, 6 PM
        const times = [10, 14, 18];

        for (const hour of times) {
            const recordDate = new Date(date);
            recordDate.setHours(hour, Math.floor(Math.random() * 60), 0, 0);

            // Intraday fluctuation
            const intraDayGold = currentGoldPrice + (Math.random() - 0.5) * 150;
            const intraDaySilver = currentSilverPrice + (Math.random() - 0.5) * 200;

            data.push({
                goldPrice: parseFloat(intraDayGold.toFixed(2)),
                silverPrice: parseFloat(intraDaySilver.toFixed(2)),
                createdAt: recordDate,
            });
        }
    }

    // Batch insert might trigger limits, so we chunk it or just loop
    console.log(`Generated ${data.length} price records.`);

    // Using createMany if supported by the DB provider (postgres supports it)
    await prisma.priceRecord.createMany({
        data: data,
        skipDuplicates: true,
    });

    console.log('Seeding completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
