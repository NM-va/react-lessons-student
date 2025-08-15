import { TaskDto } from './dto';
import { Task } from './domain';

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
}

export const transformToTaskDto = (task: Partial<Task>):Partial<TaskDto> => {
    const dto:Partial<TaskDto> = {};
    
    if (task.title) dto.title = task.title;
    if (task.description) dto.description = task.description;
    if (task.isCompleted !== undefined) dto.is_completed = task.isCompleted;
    if (task.priorityLevel) dto.priority_level = task.priorityLevel;
    if (task.dueDateString) dto.due_date_string = task.dueDate.toISOString().split('T')[0];
    if (task.tags) dto.tags_csv = task.tags.join(',');
    
    return dto;
}
