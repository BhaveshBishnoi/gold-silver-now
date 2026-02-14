const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
    try {
        console.log('\n=== Create Admin User ===\n');

        const name = await question('Enter admin name: ');
        const email = await question('Enter admin email: ');
        const password = await question('Enter admin password: ');

        if (!name || !email || !password) {
            console.error('All fields are required!');
            process.exit(1);
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.error(`\nUser with email ${email} already exists!`);
            process.exit(1);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'admin',
            }
        });

        console.log('\n✅ Admin user created successfully!');
        console.log(`\nName: ${user.name}`);
        console.log(`Email: ${user.email}`);
        console.log(`Role: ${user.role}`);
        console.log(`\nYou can now login at: /admin/login\n`);

    } catch (error) {
        console.error('\n❌ Error creating admin user:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        rl.close();
    }
}

createAdmin();
