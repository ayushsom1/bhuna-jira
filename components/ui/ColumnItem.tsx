import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/store/atom';
import TaskItem from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ColumnItemProps {
    column: TaskStatus;
    tasks: Task[];
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column, tasks }) => {
    const { setNodeRef } = useDroppable({
        id: column,
        data: {
            type: 'column',
            column,
        },
    });

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{column}</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div ref={setNodeRef} className="space-y-2">
                        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                            {tasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </SortableContext>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ColumnItem;