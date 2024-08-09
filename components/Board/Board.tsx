"use client"

import { DndContext, closestCorners, PointerSensor, useSensor, useSensors, TouchSensor } from "@dnd-kit/core";
import { useState, useEffect, useCallback } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSession } from "next-auth/react";
import { ScrollArea } from "../ui/scroll-area";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedStatusState, taskSheetOpenState } from "@/store/atom";
import debounce from "lodash/debounce";
import TaskSheet from "../TaskSheet";
import Column from "./Column";

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

interface Column {
    id: Status;
    title: string;
    tasks: Task[];
}

export default function Board() {

    const [isTaskSheetOpen, setIsTaskSheetOpen] = useRecoilState(taskSheetOpenState);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const selectedStatus = useRecoilValue(selectedStatusState);
    const [tasks, setTasks] = useState<Task[]>([]);
    const { data: session } = useSession();


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            }
        }),
        useSensor(TouchSensor)
    );

    const [columns, setColumns] = useState<Column[]>([
        { id: Status.TODO, title: 'To Do', tasks: [] },
        { id: Status.IN_PROGRESS, title: 'In Progress', tasks: [] },
        { id: Status.UNDER_REVIEW, title: 'Under Review', tasks: [] },
        { id: Status.FINISHED, title: 'Finished', tasks: [] }
    ]);

    const handleCreateOrUpdateTask = async (taskData: Partial<Task>) => {
        try {
            const url = selectedTask?.id ? `/api/tasks/${selectedTask.id}` : '/api/tasks';
            const method = selectedTask?.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${selectedTask?.id ? 'update' : 'create'} task`);
            }

            const task: Task = await response.json();

            setColumns(prevColumns => {
                const newColumns = [...prevColumns];
                const columnIndex = newColumns.findIndex(col => col.id === task.status);

                if (columnIndex !== -1) {
                    if (selectedTask?.id) {
                        // Update existing task
                        const taskIndex = newColumns[columnIndex].tasks.findIndex(t => t.id === task.id);
                        if (taskIndex !== -1) {
                            newColumns[columnIndex].tasks[taskIndex] = task;
                        }
                    }
                } else {
                    // Add new task
                    newColumns[columnIndex].tasks.push(task);
                }
                return newColumns;
            });

            handleCloseTaskSheet();

            await fetchTasks();

        } catch (error) {
            console.error(`Failed to ${selectedTask?.id ? 'update' : 'create'} task:`, error);
        }

    };

    const handleDeleteTask = async (taskId: number) => {
        try {

            console.log(taskId)
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setColumns(prevColumns =>
                prevColumns.map(column => ({
                    ...column,
                    tasks: column.tasks.filter(task => task.id !== taskId)
                }))
            );
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const fetchTasks = useCallback(async () => {
        try {

            const response = await fetch('/api/tasks');

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const fetchedTasks: Task[] = await response.json();

            setTasks(fetchedTasks);

            setColumns(prevColumns => prevColumns.map(column => ({
                ...column,
                tasks: fetchedTasks.filter(task => task.status === column.id)
            })));

        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    }, []);

    useEffect(() => {
        if (session) {
            fetchTasks();
        }
    }, [session, fetchTasks]);

    // for debouncing
    // const updateTaskStatusDebounced = useCallback(
    //     debounce((taskId: number, newStatus: Status, newOrder: number) => {
    //         updateTaskStatus(taskId, newStatus, newOrder);
    //     }, 200),
    //     []
    // );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        setColumns(prevColumns => {
            const newColumns = JSON.parse(JSON.stringify(prevColumns));
            const activeColumnIndex = newColumns.findIndex((col: { tasks: any[]; }) => col.tasks.some(task => task.id === activeId));
            const overColumnIndex = newColumns.findIndex((col: { id: any; tasks: any[]; }) => col.id === overId || col.tasks.some(task => task.id === overId));

            if (activeColumnIndex === -1 || overColumnIndex === -1) return prevColumns;

            const activeColumn = newColumns[activeColumnIndex];
            const overColumn = newColumns[overColumnIndex];

            const activeTaskIndex = activeColumn.tasks.findIndex((task: Task) => task.id === activeId);
            let overTaskIndex = overId === overColumn.id
                ? overColumn.tasks.length
                : overColumn.tasks.findIndex((task: Task) => task.id === overId);

            if (activeColumnIndex === overColumnIndex) {
                // Reordering within the same column
                overColumn.tasks = arrayMove(overColumn.tasks, activeTaskIndex, overTaskIndex);
            } else {
                // Moving to a different column
                const [movedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);
                movedTask.status = overColumn.id;
                if (overTaskIndex === -1) {
                    // If dropping at the end of the column
                    overTaskIndex = overColumn.tasks.length;
                }
                overColumn.tasks.splice(overTaskIndex, 0, movedTask);
            }
            const columnsToUpdate = activeColumnIndex === overColumnIndex ? [overColumn] : [activeColumn, overColumn];
            columnsToUpdate.forEach(column => {
                column.tasks.forEach((task: { id: number; }, index: number) => {
                    // updateTaskStatus(task.id, column.id as Status, index);
                    // updateTaskStatusDebounced(task.id, column.id as Status, index);
                    updateTaskStatus(task.id, column.id as Status, index);


                });
            });

            // // Update task status in the backend
            // if (updatedTask) {
            //     const updatedTask = overColumn.tasks[overTaskIndex];
            // }

            return newColumns;
        });
    };

    const updateTaskStatus = async (taskId: number, newStatus: Status, newOrder: number) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus, order: newOrder }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    }

    const handleCloseTaskSheet = () => {
        setIsTaskSheetOpen(false);
        setSelectedTask(null);
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setIsTaskSheetOpen(true);
    };

    if (!session) {
        return <div>Please sign in to view your tasks.</div>;
    }

    return (
        <ScrollArea className="h-full w-full">
            <div className="flex justify-center">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max w-full">
                            {columns.map(column => (
                                <Column
                                    key={column.id}
                                    id={column.id}
                                    title={column.title}
                                    tasks={column.tasks}
                                    onCreateTask={() => {
                                        setIsTaskSheetOpen(true);
                                    }}
                                    onEditTask={handleEditTask}
                                    onDeleteTask={handleDeleteTask}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
            <TaskSheet
                isOpen={isTaskSheetOpen}
                onClose={handleCloseTaskSheet}
                onSubmit={handleCreateOrUpdateTask}
                initialData={selectedTask || undefined}
                initialStatus={selectedStatus || undefined}
            />
        </ScrollArea>
    );
}