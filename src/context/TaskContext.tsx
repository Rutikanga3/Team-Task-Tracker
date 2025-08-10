import React, { createContext, useContext, useReducer, useState, useEffect, useMemo } from 'react';
import type { Task, TaskAction, TaskStatus, TaskPriority, DueDate, TaskCategory } from '../types/Task';
import { ACTIONS } from '../types/Task';
import { TaskReducer, loadTasksFromLocalStorage } from '../reducers/TaskReducer';

interface FilterState {
    status: string;
    priority: string;
    dueDate: string;
    category: string;
    assignedTo: string;
}

interface TaskContextType {
    tasks: Task[];
    filteredTasks: Task[];
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    dispatch: React.Dispatch<TaskAction>;
    addTask: (task: Omit<Task, 'id' | 'updatedAt'>) => void;
    deleteTask: (taskId: number) => void;
    updateTask: (task: Task) => void;
    updateTaskStatus: (taskId: number, status: TaskStatus) => void;
    clearFilters: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: React.ReactNode;
}

// Sample tasks to populate the app initially
const getSampleTasks = (): Task[] => [
    {
        id: 1,
        name: 'Design User Interface Mockups',
        category: 'Design',
        priority: 'High',
        dueDate: 'Today',
        assignedTo: 'Joella',
        status: 'Incompleted',
        updatedAt: new Date().toISOString(),
        assignedOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
        id: 2,
        name: 'Implement User Authentication',
        category: 'Backend',
        priority: 'High',
        dueDate: 'Upcoming',
        assignedTo: 'Doreen',
        status: 'Incompleted',
        updatedAt: new Date().toISOString(),
        assignedOn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 3,
        name: 'Create React Components',
        category: 'Frontend',
        priority: 'Medium',
        dueDate: 'Upcoming',
        assignedTo: 'Joella',
        status: 'Completed',
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        assignedOn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
        id: 4,
        name: 'Setup Database Schema',
        category: 'Backend',
        priority: 'Medium',
        dueDate: 'Overdue',
        assignedTo: 'Doreen',
        status: 'Incompleted',
        updatedAt: new Date().toISOString(),
        assignedOn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    }
];

export const TaskProvider = ({ children }: TaskProviderProps) => {
    // Initialize with sample tasks if no tasks exist in localStorage
    const getInitialTasks = (): Task[] => {
        const storedTasks = loadTasksFromLocalStorage();
        if (storedTasks.length === 0) {
            // If no tasks in localStorage, return sample tasks
            const sampleTasks = getSampleTasks();
            // Save sample tasks to localStorage
            try {
                localStorage.setItem('team-task-tracker-tasks', JSON.stringify(sampleTasks));
            } catch (error) {
                console.error('Error saving sample tasks to local storage:', error);
            }
            return sampleTasks;
        }
        return storedTasks;
    };

    const [tasks, dispatch] = useReducer(TaskReducer, getInitialTasks());
    const [filters, setFilters] = useState<FilterState>({
        status: 'all',
        priority: 'all',
        dueDate: 'all',
        category: 'all',
        assignedTo: 'all'
    });

    // Load tasks from localStorage on mount
    useEffect(() => {
        const storedTasks = loadTasksFromLocalStorage();
        if (storedTasks.length > 0) {
            dispatch({ type: ACTIONS.LOAD_TASKS, payload: storedTasks });
        }
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filters.status !== 'all' && task.status !== filters.status) return false;
            if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
            if (filters.dueDate !== 'all' && task.dueDate !== filters.dueDate) return false;
            if (filters.category !== 'all' && task.category !== filters.category) return false;
            if (filters.assignedTo !== 'all' && task.assignedTo !== filters.assignedTo) return false;
            return true;
        });
    }, [tasks, filters]);

    const addTask = (task: Omit<Task, 'id' | 'updatedAt'>) => {
        dispatch({
            type: ACTIONS.ADD_TASK,
            payload: task
        });
    };

    const deleteTask = (taskId: number) => {
        dispatch({
            type: ACTIONS.DELETE_TASK,
            payload: taskId
        });
    };

    const updateTask = (task: Task) => {
        dispatch({
            type: ACTIONS.UPDATE_TASK,
            payload: task
        });
    };

    const updateTaskStatus = (taskId: number, status: TaskStatus) => {
        dispatch({
            type: ACTIONS.UPDATE_TASK_STATUS,
            payload: { id: taskId, status }
        });
    };

    const clearFilters = () => {
        setFilters({
            status: 'all',
            priority: 'all',
            dueDate: 'all',
            category: 'all',
            assignedTo: 'all'
        });
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            filteredTasks,
            filters,
            setFilters,
            dispatch,
            addTask,
            deleteTask,
            updateTask,
            updateTaskStatus,
            clearFilters
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};