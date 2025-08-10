export interface Task {
  id: number;
  name: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: DueDate;
  assignedTo: string;
  status: TaskStatus;
  updatedAt: string;
  assignedOn: string;
}

export type TaskStatus = 'Incompleted' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type DueDate = 'Overdue' | 'Today' | 'Upcoming' | 'No Due Date';
export type TaskCategory = 'Frontend' | 'Backend' | 'Meeting' | 'Design';

export interface Category {
  id: number;
  name: string;
}

export interface TaskAction {
  type: string;
  payload: any;
}

export const ACTIONS = {
  ADD_TASK: 'add-task',
  EDIT_TASK: 'edit-task',
  DELETE_TASK: 'delete-task',
  UPDATE_TASK: 'update-task',
  UPDATE_TASK_STATUS: 'update-task-status',
  LOAD_TASKS: 'load-tasks'
} as const;

export type ActionType = typeof ACTIONS[keyof typeof ACTIONS];