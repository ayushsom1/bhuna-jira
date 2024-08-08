// /prisma/seed.ts

const { PrismaClient } = require('@prisma/client');

const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // Create a user
    const passwordHash = await hash('123123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'ayush@example.com',
            name: 'Som Ayush',
            password: passwordHash,
        },
    });

    // Create tasks
    const taskData = [
        {
            title: 'Implement login functionality',
            description: 'Create login page and integrate with backend',
            status: 'TODO',
            priority: 'HIGH',
            deadline: new Date('2024-08-15'),
            userId: user.id,
            order: 1,
        },
        {
            title: 'Design dashboard layout',
            description: 'Create wireframes for the main dashboard',
            status: 'IN_PROGRESS',
            priority: 'MEDIUM',
            deadline: new Date('2024-08-10'),
            userId: user.id,
            order: 1,
        },
        {
            title: 'Write API documentation',
            description: 'Document all API endpoints and their usage',
            status: 'UNDER_REVIEW',
            priority: 'LOW',
            deadline: new Date('2024-08-20'),
            userId: user.id,
            order: 1,
        },
        {
            title: 'Deploy to staging environment',
            description: 'Prepare and deploy the app to the staging server',
            status: 'FINISHED',
            priority: 'UR',
            deadline: new Date('2024-08-05'),
            userId: user.id,
            order: 1,
        },
    ];

    for (const task of taskData) {
        await prisma.task.create({
            data: task,
        });
    }

    console.log('Seed data inserted successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });