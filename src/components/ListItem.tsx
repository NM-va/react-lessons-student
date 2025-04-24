type Task = any;

export interface BaseProps {
    onTaskToggle: (id: number) => void;
    onTaskDelete: (id: number) => void;
}
export interface Props extends BaseProps {
    task: Task;
}


export const ListItem = React.memo(({task, onTaskToggle, onTaskDelete}: Props) => {
    
    return (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
                type="checkbox"
                checked={task.completed}
                data-id={task.id}
                onChange={() => onTaskToggle(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => onTaskDelete(task.id)}>Удалить</button>
        </li>
    )
});