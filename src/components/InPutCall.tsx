import React, { useState } from 'react'
import { useTask } from '../hooks/useTask'
import InPut from './InPut';
import type { TaskPriority, TaskStatus, DueDate } from '../types/Task';
import Button from './Button';


interface InPutCallProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskFormState {
  name: string;
  category: string;
  priority: TaskPriority | '';
  dueDate: DueDate | ''; // Changed to DueDate type
  status: TaskStatus;
  assignedTo: string;
  assignedOn?: string;

  errors: {
    name?: string;
    category?: string;
    priority?: string;
    dueDate?: string;
    assignedTo?: string;
    assignedOn?: string;
  };
}

export default function InPutCall({ isOpen, onClose }: InPutCallProps) {
  const { addTask } = useTask();
  
  const [formState, setFormState] = useState<TaskFormState>({
    name: '',
    category: '',
    priority: '',
    dueDate: '', // Default empty
    status: 'Incompleted', // Default status
    assignedTo: '',
    errors: {},
    assignedOn:'',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  };

  const validateForm = (): boolean => {
    const errors: any = {};
    
    if (!formState.name.trim()) errors.name = 'Task name is required';
    if (!formState.category.trim()) errors.category = 'Category is required';
    if (!formState.priority) errors.priority = 'Priority is required';
    if (!formState.dueDate) errors.dueDate = 'Due date is required';
    if (!formState.assignedTo.trim()) errors.assignedTo = 'Assigned to is required';
    if (!formState.assignedOn) errors.assignedOn = 'Assigned on is required';


    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newTask = {
      id: Date.now(),
      name: formState.name,
      category: formState.category,
      priority: formState.priority as TaskPriority,
      dueDate: formState.dueDate as DueDate, // Type assertion
      status: formState.status,
      assignedTo: formState.assignedTo,
      updatedAt: new Date().toISOString(),
      assignedOn: formState.assignedOn || ''
    };

   
    addTask(newTask);
    handleClose();
  };

  const handleClose = () => {
    setFormState({
      name: '',
      category: '',
      priority: '',
      dueDate: '',
      status: 'Incompleted',
      assignedTo: '',
      assignedOn: '',
      errors: {}
    });
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="p-4 bg-black dark:bg-white rounded-lg shadow-md max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
         <div>
             <h2 className="text-xl font-semibold mb-4 text-black dark:text-black">Add New Task</h2>
             <p>Fill in the details of your new task</p>
         </div>
          <button 
            onClick={handleClose}
            className="text-black text-2xl hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 "
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <InPut 
            label="Task Name"
            name="name"
            placeholder="Enter task name"
            value={formState.name}
            onChange={handleInputChange}
          />
          {formState.errors.name && (
            <p className="text-red-500 text-sm mb-2">{formState.errors.name}</p>
          )}

          {/* <InPut 
            label="Category"
            name="category"
            placeholder="Enter category"
            value={formState.category}
            onChange={handleInputChange}
          />
          {formState.errors.category && (
            <p className="text-red-500 text-sm mb-2">{formState.errors.category}</p>
          )} */}
          <div className="mb-4">
            <label className="block text-black font-normal mb-2">Category</label>
            <select
              name="priority"
              value={formState.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            >
              <option className='text-gray-400' value="">Select category</option>
              <option value="High">Frontend</option>
              <option value="Medium">Backend</option>
              <option value="Low">Meeting</option>
              <option value="Low">Design</option>
            </select>
            {formState.errors.priority && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black font-normal mb-2">Priority</label>
            <select
              name="priority"
              value={formState.priority}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            >
              <option className='text-gray-400' value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {formState.errors.priority && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.priority}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black font-normal mb-2">Due Date</label>
            <select
              name="dueDate"
              value={formState.dueDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            >
              <option className='text-gray-400' value="">Select due date</option>
              <option value="Overdue">Overdue</option>
              <option value="Today">Today</option>
              <option value="Upcoming">Upcoming</option>
              <option value="No Due Date">No Due Date</option>
            </select>
            {formState.errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.dueDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black font-status mb-2">Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            >
              <option className='text-gray-400'  value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <InPut 
            label="Assigned To"
            name="assignedTo"
            placeholder="Enter assignee name"
            value={formState.assignedTo}
            onChange={handleInputChange}
          />
          {formState.errors.assignedTo && (
            <p className="text-red-500 text-sm mb-2">{formState.errors.assignedTo}</p>
          )}

          <div className="flex gap-3 mt-4">
            {/* <button 
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button> */}
            <Button
            type='submit'
             disabled={false}
            label="Add Task"
            className='bg-gray-500'
            />
            
            <Button
            type='button'
            onClick={handleClose}
            label='cancel'
            className='bg-red-500'
            />
          </div>
        </form>
      </div>
    </div>
  );
}