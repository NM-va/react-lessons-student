import { TaskIncDto } from './dto';
export interface TaskType extends TaskIncDto {
    taskId: string;
    todoListId: string;
    description: string;
    createdTimestamp: Date | null;
    updatedTimestamp: Date | null;
    dueDate: Date | null;
    priorityLevel: number;
}