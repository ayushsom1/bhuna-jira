import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    const session = await getServerSession(NEXT_AUTH);

    if (!session) {
        return NextResponse.json({
            message: "Not Autherised",
        })
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: Number(session.user.id),
        },
    })
    console.log(tasks)
    return NextResponse.json(tasks);

}

export async function POST(req: NextRequest) {

    const session = await getServerSession(NEXT_AUTH)

    if (!session) {
        return NextResponse.json({
            message: "Not Autherised",
        })
    }

    try {
        const { title, description, priority, status, deadline } = await req.json();
        const user = await prisma.user.findUnique({ where: { id: Number(session?.user?.id) } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                priority,
                status,
                deadline: new Date(deadline),
                order: 0, // You might want to implement a more sophisticated ordering system
                userId: user.id,
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error('Failed to create task:', error);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}