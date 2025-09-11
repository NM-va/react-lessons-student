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


export const transformTaskIncDto = (dtoIncData: TaskIncDto): TaskType => {
    const createdTimestampTransform = dtoIncData.startDate ? new Date(dtoIncData.startDate).toISOString() : null;
    const updatedTimestampTransform = dtoIncData.addedDate ? new Date(dtoIncData.addedDate).toISOString() : null;
    const dueDateTransform = dtoIncData.deadline ? new Date(dtoIncData.deadline).toISOString() : null;

    
    return {
        todoListId: dtoIncData.todoListId,
        taskId: dtoIncData.id,
        title: dtoIncData.title,
        description: dtoIncData.description || '',
        isCompleted: Boolean(dtoIncData.completed),
        priorityLevel: dtoIncData.priority,
        createdTimestamp: createdTimestampTransform,
        updatedTimestamp: updatedTimestampTransform,
        dueDate: dueDateTransform,
        status: dtoIncData.status,
        order: dtoIncData.order
    }
};

export const transformToTaskIncDto = (task: Partial<TaskType>):Partial<TaskIncDto> => {
    const dtoInc:Partial<TaskIncDto> = {};
    if (task.todoListId) dtoInc.todoListId = task.todoListId;
    if (task.taskId) dtoInc.id = task.taskId;
    if (task.title) dtoInc.title = task.title;
    if (task.description) dtoInc.description = task.description;
    if (task.isCompleted !== undefined) dtoInc.completed = task.isCompleted;
    if (task.priorityLevel) dtoInc.priority = task.priorityLevel;
    if (task.dueDate) dtoInc.addedDate = new Date(task.dueDate.toISOString().split('T')[0]);
    if (task.createdTimestamp) dtoInc.startDate = new Date(task.createdTimestamp.toISOString().split('T')[0]);
    if (task.updatedTimestamp) dtoInc.deadline = new Date(task.updatedTimestamp.toISOString().split('T')[0]);
    if (task.status) dtoInc.status = task.status;
    if (task.order) dtoInc.order = task.order;
    return dtoInc;
};