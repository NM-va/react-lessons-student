import { TaskDto, TaskIncDto } from './dto';
import { Task, TaskType } from './domain';

export const transformTaskDto = (dtoData: TaskDto): Task => {
    const createdTimestampTransform = new Date(dtoData.created_timestamp);
    const updatedTimestampTransform = new Date(dtoData.updated_timestamp);
    const dueDateTransform = new Date(dtoData.due_date_string);
    const tagsCsvTransform = dtoData.tags_csv.split(',').map(tag => tag.trim()).filter(Boolean);

    
    return {
        taskId: dtoData.task_id,
        title: dtoData.title,
        description: dtoData.description,
        isCompleted: dtoData.is_completed,
        priorityLevel: dtoData.priority_level,
        createdTimestamp: createdTimestampTransform,
        updatedTimestamp: updatedTimestampTransform,
        dueDate: dueDateTransform,
        tagsCsv: tagsCsvTransform,
        assignedUser: dtoData.assigned_user ? {
            userId: dtoData.assigned_user.user_id,
            fullName: dtoData.assigned_user.full_name,
            avatarUrl:  dtoData.assigned_user.avatar_url
        } : null,
        categoryInfo: {
            categoryId: dtoData.category_info.category_id,
            categoryName: dtoData.category_info.category_name,
            colorHex:  dtoData.category_info.color_hex
        }
    }
};

export const transformToTaskDto = (task: Partial<Task>):Partial<TaskDto> => {
    const dto:Partial<TaskDto> = {};
    
    if (task.title) dto.title = task.title;
    if (task.description) dto.description = task.description;
    if (task.isCompleted !== undefined) dto.is_completed = task.isCompleted;
    if (task.priorityLevel) dto.priority_level = task.priorityLevel;
    if (task.dueDateString) dto.due_date_string = task.dueDate.toISOString().split('T')[0];
    if (task.tags) dto.tags_csv = task.tags.join(',');
    
    return dto;
};


export const transformTaskIncDto = (dtoData: TaskIncDto): TaskType => {
    const createdTimestampTransform = dtoData.startDate ? new Date(dtoData.startDate) : null;
    const updatedTimestampTransform = dtoData.addedDate ? new Date(dtoData.addedDate): null;
    const dueDateTransform = dtoData.deadline ? new Date(dtoData.deadline) : null;

    
    return {
        todoListId: Number(dtoData.todoListId),
        taskId: Number(dtoData.id),
        title: dtoData.title,
        description: dtoData.description || '',
        isCompleted: Boolean(dtoData.completed),
        priorityLevel: dtoData.priority,
        createdTimestamp: createdTimestampTransform,
        updatedTimestamp: updatedTimestampTransform,
        dueDate: dueDateTransform,
        status: dtoData.status,
        order: dtoData.order
    }
};

export const transformToTaskIncDto = (task: Partial<TaskType>):Partial<TaskIncDto> => {
    const dto:Partial<TaskIncDto> = {};
    if (task.todoListId) dto.todoListId = task.todoListId;
    if (task.taskId) dto.id = task.taskId;
    if (task.title) dto.title = task.title;
    if (task.description) dto.description = task.description;
    if (task.isCompleted !== undefined) dto.completed = task.isCompleted;
    if (task.priorityLevel) dto.priority = task.priorityLevel;
    if (task.dueDate) dto.addedDate = new Date(task.dueDate.toISOString().split('T')[0]);
    if (task.createdTimestamp) dto.startDate = new Date(task.createdTimestamp.toISOString().split('T')[0]);
    if (task.updatedTimestamp) dto.deadline = new Date(task.updatedTimestamp.toISOString().split('T')[0]);
    if (task.status) dto.status = task.status;
    if (task.order) dto.order = task.order;
    return dto;
};