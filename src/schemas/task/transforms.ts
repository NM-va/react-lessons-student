import { TaskIncDto } from './dto';
import { TaskType } from './domain';


export const transformTaskIncDto = (dtoIncData: TaskIncDto): TaskType => {
    const createdTimestampTransform = dtoIncData.startDate ? new Date(dtoIncData.startDate) : null;
    const updatedTimestampTransform = dtoIncData.addedDate ? new Date(dtoIncData.addedDate) : null;
    const dueDateTransform = dtoIncData.deadline ? new Date(dtoIncData.deadline) : null;

    
    return {
        todoListId: dtoIncData.todoListId,
        taskId: dtoIncData.id,
        title: dtoIncData.title,
        description: dtoIncData.description || '',
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
    
    if (task.todoListId) dtoInc.todoListId = `${task.todoListId}`;
    if (task.taskId) dtoInc.id = `${task.taskId}`;
    if (task.title) dtoInc.title = task.title;
    if (task.description) dtoInc.description = task.description;
    if (task.priorityLevel) dtoInc.priority = task.priorityLevel;
    if (task.dueDate) dtoInc.addedDate = new Date(task.dueDate.toISOString().split('T')[0]);
    if (task.createdTimestamp) dtoInc.startDate = new Date(task?.createdTimestamp?.toISOString().split('T')[0]);
    if (task.updatedTimestamp) dtoInc.deadline = new Date(task?.updatedTimestamp?.toISOString().split('T')[0]);
    if (task.status) dtoInc.status = task.status;
    if (task.order) dtoInc.order = task.order;
    return dtoInc;
};