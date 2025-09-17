import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, ButtonGroup, Checkbox, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../../api/tasksApi';
import { TaskType } from '../../../schemas/task/domain';
import { TaskStatus } from '../../../types';

interface TaskItemProps {
    task: TaskType;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
    const [newTitle, setNewTitle] = useState<string>(task.title);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        setNewTitle(task.title);
    }, [task.title]);

    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    const saveNewTitle = () => {
        const trimTitle = newTitle.trim();

        if (!trimTitle || trimTitle === task.title) {
            setEditMode(false);
            setNewTitle(task.title);
            return
        }

        if (trimTitle !== "") {
            editTask(task);
            setNewTitle("");
            setEditMode(false);
        }
    };

    const handleToggleComplete = async (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = task.status === TaskStatus.COMPLETED 
            ? TaskStatus.INPROGRESS 
            : TaskStatus.COMPLETED;

        try {
            await updateTask({
                ...task,
                taskId: task.taskId,
                status: newStatus
            }).unwrap();
        } catch (error) {
            console.error('Ошибка обновления задачи:', error);
        }
    };

    const saveTask = async () => {
        saveNewTitle();
        try {
            await updateTask({
                ...task,
                taskId: task.taskId,
                title: newTitle
            }).unwrap();
        } catch (error) {
            console.error('Ошибка обновления задачи:', error);
        }
    };

    const editTask = () => {
        setEditMode(prev => !prev);
        setNewTitle(editMode ? task.title : '');
    };

    const handleDelete = async () => {
        if (!confirm('Удалить задачу?')) return;
        
        try {
            await deleteTask(task.taskId).unwrap();
        } catch (error) {
            console.error('Ошибка удаления задачи:', error);
        }
    };
    
    return (
        <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2}>
                <Checkbox
                    checked={task.status === TaskStatus.COMPLETED}
                    onChange={handleToggleComplete}
                    disabled={isUpdating}
                />
                {!editMode && <Typography variant="body1" component="p">{task.title}</Typography> }
                {editMode && <TextField value={newTitle} onChange={changeTitleHandler} />}

                <ButtonGroup>
                    { !editMode
                        ? <Button onClick={editTask}><EditIcon/></Button>
                        : <Button onClick={saveTask}><SaveIcon/></Button> }
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <DeleteIcon/>
                    </Button>
                </ButtonGroup>
            </Stack>
            <Typography variant="body1" component="p">{task.description}</Typography>
        </Box>
    );
};