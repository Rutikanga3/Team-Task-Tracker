import { useContext } from 'react';
import { TaskContext, type TaskContextType } from '../context/TaskContext';

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};