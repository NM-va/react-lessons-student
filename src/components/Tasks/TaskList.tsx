import React, { useState } from 'react';

import { TaskItem } from './TaskItem';
import { TasksFilter, useGetTasksQuery } from '../../api/tasksApi';
import { LoadingSpinner } from '../../RouterTest/components/common/LoadingSpinner';


export const TaskList: React.FC = () => {
    const [filters, setFilters] = useState<TasksFilter>({});
    
    const {
        data: tasks,
        error,
        isLoading,
        isFetching,
        refetch
    } = useGetTasksQuery(filters);
    
    
    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Ошибка</div>;
    if (!tasks?.length) return <div>Пусто</div>;
    
    return (
        <div className="task-list">
            <div className="task-list-header">
                <h2>Мои задачи ({tasks.length})</h2>
                {/*<TaskFilters filters={filters} onFiltersChange={setFilters} />*/}
                {isFetching && <span className="refresh-indicator">Обновление...</span>}
            </div>
            
            <div className="task-grid">
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};