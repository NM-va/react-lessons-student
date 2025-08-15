import React from 'react';
import { Task } from '../../schemas/task/domain';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../../api/tasksApi';

interface TaskItemProps {
    task: Task;
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
    
    const getPriorityColor = (priority: Task['priority']) => {
        const colors = {
            low: '#28a745',
            medium: '#ffc107',
            high: '#dc3545'
        };
        return colors[priority];
    };
    
    const getStatusColor = (status: Task['status']) => {
        const colors = {
            pending: '#6c757d',
            urgent: '#fd7e14',
            overdue: '#dc3545',
            completed: '#28a745'
        };
        return colors[status];
    };
    
    return (
        <div className={`task-item ${task.isCompleted ? 'completed' : ''} ${task.status}`}>
            <div className="task-header">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={handleToggleComplete}
                    disabled={isUpdating}
                />
                <h3 className="task-title">{task.title}</h3>
                
                <div className="task-badges">
                    <span
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                        {task.displayPriority}
                    </span>
                    <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                        {task.status}
                    </span>
                </div>
            </div>
            
            <p className="task-description">{task.description}</p>
            
            <div className="task-meta">
                <div className="task-dates">
                    <span>Срок: {task.formattedDueDate}</span>
                    {task.isOverdue && (
                        <span className="overdue-warning">
                            Просрочено на {Math.abs(task.daysUntilDue)} дн.
                        </span>
                    )}
                    {!task.isOverdue && task.daysUntilDue >= 0 && (
                        <span>Осталось: {task.daysUntilDue} дн.</span>
                    )}
                </div>
                
                {task.assignedUser && (
                    <div className="assigned-user">
                        {task.assignedUser.avatar && (
                            <img
                                src={task.assignedUser.avatar}
                                alt={task.assignedUser.name}
                                className="user-avatar"
                            />
                        )}
                        <span>{task.assignedUser.name}</span>
                    </div>
                )}
            </div>
            
            <div className="task-tags">
                {task.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                ))}
            </div>
            
            <div className="task-category">
                <span
                    className="category-badge"
                    style={{ backgroundColor: task.category.color }}
                >
                    {task.category.name}
                </span>
            </div>
            
            <div className="task-actions">
                <button>
                    Редактировать
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="delete-button"
                >
                    {isDeleting ? 'Удаление...' : 'Удалить'}
                </button>
            </div>
        </div>
    );
};