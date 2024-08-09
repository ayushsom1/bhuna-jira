import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { useSortable } from '@dnd-kit/sortable';
import { Button } from '../ui/button';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Trash2 } from "lucide-react"

interface TaskProps {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    order: number;
    deadline: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    onEdit: (task: Omit<TaskProps, 'onEdit' | 'onDelete'>) => void;
    onDelete: (taskId: number) => void;
}

enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    URGENT = "URGENT"
}

export default function Task({ onEdit, onDelete, ...task }: TaskProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        transition: {
            duration: 300,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
        position: isDragging ? 'relative' : 'static' as 'relative' | 'static',
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case Priority.LOW: return 'hover:bg-green-200 border-green-500';
            case Priority.MEDIUM: return 'hover:bg-yellow-200 border-yellow-500';
            case Priority.URGENT: return 'hover:bg-red-200 border-red-500';
            default: return 'border-gray-200';
        }
    };

    const handleEdit = () => {
        onEdit(task);
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-2 drop-shadow-md shadow-slate-400 hover:drop-shadow-xl  hover:text-slate-500 cursor-grab ${getPriorityColor(task.priority)} ${isDragging ? 'shadow-lg' : ''}`}
        >
            <CardContent className="p-4">
                <CardTitle className="mb-2 text-xl">{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
                <Button variant="outline" className={`text-sm my-3 ${getPriorityColor(task.priority)}`}>{task.priority}</Button>
                <p className="text-sm">
                    {new Date(task.deadline).toLocaleDateString()}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end p-2">
                <Button size="sm" variant="ghost" onClick={handleEdit}> <Edit className="w-5" /></Button>
                <Button size="sm" variant="ghost" onClick={handleDelete}> <Trash2 className="w-5" /></Button>
            </CardFooter>
        </Card>
    );
}

