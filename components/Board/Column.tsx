import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDroppable } from '@dnd-kit/core';
import AddTaskButton from './AddTaskButton';
import Task from './Task';
import { Separator } from "@radix-ui/react-select";

enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    URGENT = "URGENT"
}

enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    FINISHED = "FINISHED"
}

interface Task {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    order: number;
    deadline: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

interface ColumnProps {
    id: Status;
    title: string;
    tasks: Task[];
    onCreateTask: () => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: number) => void;
}

export default function Column({ id, title, tasks, onCreateTask, onEditTask, onDeleteTask }: ColumnProps) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <Card ref={setNodeRef} className="w-full">
            <CardHeader className="flex flex-row justify-center">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        onEdit={() => onEditTask(task)}
                        onDelete={() => onDeleteTask(task.id)}
                    />
                ))}
                <AddTaskButton status={id} />
            </CardContent>
        </Card>
    );
}