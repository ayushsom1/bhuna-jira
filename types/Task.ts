// types/Task.ts

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    URGENT = "URGENT"
}

export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    FINISHED = "FINISHED"
}

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    order: number;
    deadline: string; // ISO date string
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    userId: number;
}