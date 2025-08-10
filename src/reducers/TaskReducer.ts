
import type { Task, TaskAction } from '../types/Task';
import { ACTIONS } from '../types/Task';

const STORAGE_KEY = 'team-task-tracker-tasks';

const saveTasksToLocalStorage = (tasks: Task[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to local storage:', error);
    }
};

export const loadTasksFromLocalStorage = (): Task[] => {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error('Error loading tasks from local storage:', error);
        return [];
    }
};

export function TaskReducer(state: Task[], action: TaskAction): Task[] {
    let newState: Task[];

    switch (action.type) {
        case ACTIONS.ADD_TASK:
            const newTask: Task = {
                ...action.payload,
                id: Date.now(), // Generate unique ID
                updatedAt: new Date().toISOString(),
                assignedOn: action.payload.assignedOn || new Date().toISOString()
            };
            newState = [...state, newTask];
            break;

        case ACTIONS.DELETE_TASK:
            newState = state.filter(task => task.id !== action.payload);
            break;

        case ACTIONS.UPDATE_TASK:
        case ACTIONS.EDIT_TASK:
            newState = state.map(task =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload, updatedAt: new Date().toISOString() }
                    : task
            );
            break;

        case ACTIONS.UPDATE_TASK_STATUS:
            newState = state.map(task =>
                task.id === action.payload.id
                    ? { ...task, status: action.payload.status, updatedAt: new Date().toISOString() }
                    : task
            );
            break;

        case ACTIONS.LOAD_TASKS:
            return action.payload; // Don't save when loading

        default:
            return state;
    }

    saveTasksToLocalStorage(newState);
    return newState;
}