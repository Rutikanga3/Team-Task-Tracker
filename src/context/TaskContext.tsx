import { createContext, useReducer, useState, useMemo, type ReactNode } from "react";
import { TaskReducer } from "../reducers/TaskReducer";
import type { Task, Category, TaskAction, TaskStatus, TaskPriority, DueDate } from '../types/Task';

interface FilterState {
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    dueDate: DueDate | 'all';
    category: string | 'all';
    assignedTo?: string | 'all';
}

interface TaskContextType {
    tasks: Task[]
    filteredTasks: Task[]
    categories: Category[]
    filters: FilterState
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>
    dispatch: (action: TaskAction) => void;
    addTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
    updateTask: (task: Task) => void;
    clearFilters: () => void;
}

interface TaskProviderProps {
    children: ReactNode
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({children}: TaskProviderProps) => {
    const [tasks, dispatch] = useReducer(TaskReducer, [
        {
            id: 1,
            name: "Controllers",
            category: "Backend",
            priority: "High",
            dueDate: "Today",
            status: "Incompleted",
            assignedTo: "Joella",
            updatedAt: "2023-01-01",
            assignedOn: '2022-01-08'
        },
        {
            id: 2,
            name: "About Page",
            category: "Frontend",
            priority: "Low",
            dueDate: "Upcoming",
            status: "Completed",
            assignedTo: "Felix",
            updatedAt: "2023-02-01",
            assignedOn: '2022-01-08'
        },
        {
            id: 3,
            name: "Design Homepage",
            category: "Frontend",
            priority: "Medium",
            dueDate: "Overdue",
            status: "Incompleted",
            assignedTo: "Paccy",
            updatedAt: "2023-03-01",
            assignedOn: '2022-01-08'
        }
    ]);
    
    const [categories, setCategories] = useState<Category[]>([]);
    
    const [filters, setFilters] = useState<FilterState>({
        status: 'all',
        priority: 'all',
        dueDate: 'all',
        category: 'all',
        assignedTo: 'all'
    });

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
 
            if (filters.status !== 'all' && task.status !== filters.status) {
                return false;
            }

            if (filters.priority !== 'all' && task.priority !== filters.priority) {
                return false;
            }

            if (filters.dueDate !== 'all' && task.dueDate !== filters.dueDate) {
                return false;
            }

            if (filters.category !== 'all' && task.category !== filters.category) {
                return false;
            }
            if (filters.assignedTo && filters.assignedTo !== 'all' && task.assignedTo !== filters.assignedTo) {
                return false;
            }

            return true;
        });
    }, [tasks, filters]);

    const addTask = (task: Task) => {
        dispatch({ type: 'ADD_TASK', payload: task });
    };

    const deleteTask = (taskId: number) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    };

    const updateTask = (task: Task) => {
        dispatch({ type: 'UPDATE_TASK', payload: task });
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
            categories, 
            filters,
            setCategories, 
            setFilters,
            dispatch,
            addTask,
            deleteTask,
            updateTask,
            clearFilters,
        }}>
            {children}
        </TaskContext.Provider>
    );
}