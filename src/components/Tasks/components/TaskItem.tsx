import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Checkbox, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../api/tasksApi';
import { TaskType } from '../../../schemas/task/domain';

interface TaskItemProps {
    task: TaskType;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
    
    const handleToggleComplete = async () => {
        try {
            await updateTask({
                id: task.id,
                updates: { isCompleted: !task.isCompleted }
            }).unwrap();
        } catch (error) {
            console.error('Ошибка обновления задачи:', error);
        }
    };
    
    const handleDelete = async () => {
        if (!confirm('Удалить задачу?')) return;
        
        try {
            await deleteTask(task.id).unwrap();
        } catch (error) {
            console.error('Ошибка удаления задачи:', error);
        }
    };
    
    return (
        <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2}>
                <Checkbox
                    checked={task.isCompleted}
                    onChange={handleToggleComplete}
                    disabled={isUpdating}
                />
                <Typography variant="body1" component="body1">{task.title}</Typography>
                <ButtonGroup>
                    <Button><Edit/></Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <Delete/>
                    </Button>
                </ButtonGroup>
            </Stack>
            <Typography variant="body1" component="p">{task.description}</Typography>
        </Box>
    );
};