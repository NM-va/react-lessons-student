import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CircularProgress,
    LinearProgress,
    TextField,
    Typography
} from '@mui/material';
import { TaskItem } from '../Tasks/components/TaskItem';
import { TaskType } from '../../schemas/task/domain';
import { FilterType } from '../../types/index';
import React, { useEffect, useState } from 'react';
import { useCreateTaskMutation, useGetTasksQuery } from '../../api/tasksApi';
import { useAppDispatch } from '../../store/hooks';
import { setTasks, changeTasksFilter, selectFilteredTasks, setSearch, selectState, selectFilter } from './store/store';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';


export const TaskList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    // const [taskStatus, setTaskStatus] = useState<FilterType>(FilterType.ALL);
	const filteredTasks = useSelector(selectFilteredTasks);
	const state = useSelector(selectState);
	const filter = useSelector(selectFilter);
	const [createTask] = useCreateTaskMutation();
    const dispatch = useAppDispatch();


    const [titleTask, setTitleTask] = useState<string>('');
    const changeTitleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.target.value);
    };

	//Done сделать фильтр
    const {
      data: tasks = [],
      error,
      isLoading,
      isFetching,
    } = useGetTasksQuery();


    // Done: Состояние задач и фильтров
    // TODO: Функции фильтрации
    // Done: Обработчики действий

	useEffect(() => {
		console.log('%csrc/components/dashboard/TaskList.tsx:47 error', 'color: #007acc;', error);
	}, [error])


    const handleChangeFilter = (filter: FilterType) => {
        dispatch(changeTasksFilter(filter));
    };
    const changeSearchTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleCreateTask = async() => {
		try {
			await createTask(
				{
					"title": `${titleTask}`,
					"priorityLevel": 1,
					"todoListId": "08a7be65-255e-4474-8b72-3b5ec30c2dde",
					"order": 2
				}
			).unwrap();
            setTitleTask('');
		} catch (err) {
			console.error('Ошибка Создания задачи:', err);
		}
    };

    const handleSearchTask = () => {
        dispatch(setSearch(searchValue));
    };
    
    useEffect(() => {
        if(!isEqual(tasks, state.data)) {
			dispatch(setTasks(tasks));
        }
	}, [tasks, dispatch, state.data]);

    if (error) return <Box component="div">Ошибка</Box>;


    return (
        <Card>
            {isLoading && <LinearProgress/>}
            <CardContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h5" sx={{ mb: 3 }}>
                        Мои задачи ({tasks.length})
                    </Typography>
                    <ButtonGroup>
                        <Button onClick={() => handleChangeFilter(FilterType.ALL)}
                        variant={filter === FilterType.ALL ? 'contained' : "outlined"}>{FilterType.ALL}</Button>
                        <Button onClick={() => handleChangeFilter(FilterType.ACTIVE)}
                        variant={filter === FilterType.ACTIVE ? 'contained' : "outlined"}>{FilterType.ACTIVE}</Button>
                        <Button onClick={() => handleChangeFilter(FilterType.COMPLETED)}
                        variant={filter === FilterType.COMPLETED ? 'contained' : "outlined"}>{FilterType.COMPLETED}</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField id="outlined-basic" label="Search task" variant="outlined" onChange={changeSearchTask} value={searchValue}/>
                    <Button onClick={handleSearchTask}>Найти</Button>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField id="outlined-basic" label="Create task" variant="outlined" onChange={changeTitleTask} value={titleTask}/>
                    <Button onClick={handleCreateTask}>Создать</Button>
                </Box>

                {/* TODO: Поиск и фильтры */}
                {/* TODO: Список задач */}

                {isFetching && <CircularProgress/>}

                {
                    (!tasks?.length) ? <Box component="div">Пусто</Box>
                    : filteredTasks.map((task: TaskType) => (
                    <TaskItem key={task.taskId} task={task}/>
                ))}
            </CardContent>
        </Card>
    );
};
