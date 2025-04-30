import { useMemo } from 'react';
import { ListItem, BaseProps } from './ListItem';

type Task = any;

export interface Props extends BaseProps {
    tasks: Task[];
}

export function TaskList({ tasks, onTaskToggle, onTaskDelete } : Props) {
    
    //массив не должен пересоздаваться при каждом рендере иначе это заставит пересчитывать функцию completedCount, для этого используем хук useMemo
    let stableTasks = useMemo(() => tasks, []);
    
    //для сложных, больших вычислений используем хук useMemo чтобы при обновлении страницы вычисления не выполнялись заново,
    // заново вычисления будут выполняться при изменении массива tasks
    const completedCount: number = useMemo((): number => {
        return stableTasks.filter(task => task.completed).length
    }, [stableTasks]);
    
    
    //спользование useMemo здесь возможно будет лишним
    const pendingCount: number = tasks.length - completedCount;
    
    const sortedTasks: Task[] = useMemo(() => {
        return tasks.slice().sort((a, b) => {
            if (a.completed === b.completed) {
                return a.title.localeCompare(b.title);
            }
            return a.completed ? 1 : -1;
        });
    }, [tasks])
    
    
    
    return (
        <div>
            <div className="stats">
                <p>Всего задач: {tasks.length}</p>
                <p>Выполнено: {completedCount}</p>
                <p>Осталось: {pendingCount}</p>
            </div>
            
            <ul className="task-list">
                {sortedTasks.map(task => (
                    <ListItem task={task} onTaskToggle={onTaskToggle} onTaskDelete={onTaskDelete} />
                ))}
            </ul>
        </div>
    );
}