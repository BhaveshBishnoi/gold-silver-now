import 'dotenv/config'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    const email = 'admin@example.com'
    const password = 'password' // Change this to a secure password
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
