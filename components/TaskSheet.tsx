import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from 'react-hook-form'

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

interface TaskSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
    initialData?: Partial<Task>;
    initialStatus?: Status;
}

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

export default function TaskSheet({ isOpen, onClose, onSubmit, initialData, initialStatus }: TaskSheetProps) {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        // defaultValues: {
        //     title: initialData?.title || '',
        //     description: initialData?.description || '',
        //     priority: initialData?.priority || Priority.MEDIUM,
        //     status: initialData?.status || initialStatus || Status.TODO,
        //     deadline: initialData?.deadline || new Date().toISOString().split('T')[0],
        // },
        defaultValues: {
            title: '',
            description: '',
            priority: Priority.MEDIUM,
            status: Status.TODO,
            deadline: new Date().toISOString().split('T')[0],
        },
    });

    React.useEffect(() => {
        if (isOpen) {
            reset(
                {
                    title: initialData?.title || '',
                    description: initialData?.description || '',
                    priority: initialData?.priority || Priority.MEDIUM,
                    status: initialData?.status || initialStatus || Status.TODO,
                    deadline: initialData?.deadline?.split('T')[0] || new Date().toISOString().split('T')[0],
                });
        }
    }, [isOpen, initialData, initialStatus, reset]);

    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{initialData ? 'Edit Task' : 'Create New Task'}</SheetTitle>
                    <SheetDescription>
                        {initialData ? 'Make changes to your task here.' : 'Add the details of your new task here.'}
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register('title', { required: 'Title is required' })} />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register('description')} />
                    </div>
                    <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Priority).map(priority => (
                                            <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Status).map(status => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input id="deadline" type="date" {...register('deadline', { required: 'Deadline is required' })} />
                        {errors.deadline && <span className="text-red-500 text-sm">{errors.deadline.message}</span>}
                    </div>
                    <Button type="submit">{initialData ? 'Update Task' : 'Create Task'}</Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}