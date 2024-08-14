import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

<<<<<<< HEAD
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(NEXT_AUTH);
||||||| 1dcf66b
export async function PUT(req: NextResponse, { params }: { params: { id: string } }) {
    const session = await getServerSession(NEXT_AUTH)

=======
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(NEXT_AUTH)

>>>>>>> c634c72d2b6642dedea72faa599bbdc8852e4d65
    if (!session) {
        return NextResponse.json({
            message: "Not Authorized",
        }, { status: 401 });
    }

    const taskId = parseInt(params.id);

    try {
        const body = await req.json();
        const user = await prisma.user.findUnique({ where: { id: Number(session?.user?.id) } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Prepare the data object for update
        const updateData: any = {};

        // Check which fields are provided and add them to the update data
        if ('title' in body) updateData.title = body.title;
        if ('description' in body) updateData.description = body.description;
        if ('priority' in body) updateData.priority = body.priority;
        if ('status' in body) updateData.status = body.status;
        if ('deadline' in body) updateData.deadline = new Date(body.deadline);
        if ('order' in body) updateData.order = body.order;

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: updateData,
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error('Failed to update task:', error);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(NEXT_AUTH)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taskId = parseInt(params.id);

    if (isNaN(taskId)) {
        return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    try {
        await prisma.task.delete({
            where: { id: taskId },
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error('Failed to delete task:', error);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
