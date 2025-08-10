import React, { useState } from 'react';
import { useTask } from '../hooks/useTask';
import InPut from './InPut';
import { type TaskPriority, type TaskStatus, type DueDate, type TaskCategory, ACTIONS } from '../types/Task';
import Button from './Button';

interface InPutCallProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskFormState {
  name: string;
  category: TaskCategory | '';
  priority: TaskPriority | '';
  dueDate: DueDate | '';
  status: TaskStatus;
  assignedTo: string;
  assignedOn: string;
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
    dueDate: '',
    status: 'Incompleted',
    assignedTo: '',
    assignedOn: new Date().toISOString().split('T')[0],
    errors: {},
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
    if (!formState.category) errors.category = 'Category is required';
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

    addTask({
      name: formState.name,
      category: formState.category as TaskCategory,
      priority: formState.priority as TaskPriority,
      dueDate: formState.dueDate as DueDate,
      assignedTo: formState.assignedTo,
      status: formState.status,
      assignedOn: formState.assignedOn
    });

    // Reset form
    setFormState({
      name: '',
      category: '',
      priority: '',
      dueDate: '',
      status: 'Incompleted',
      assignedTo: '',
      assignedOn: new Date().toISOString().split('T')[0],
      errors: {}
    });

    onClose();
  };

  const handleClose = () => {
    setFormState({
      name: '',
      category: '',
      priority: '',
      dueDate: '',
      status: 'Incompleted',
      assignedTo: '',
      assignedOn: new Date().toISOString().split('T')[0],
      errors: {}
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Add New Task</h2>
            <p className="text-gray-600 text-sm">Fill in the details of your new task</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InPut
            label="Task Name"
            name="name"
            placeholder="Enter task name"
            value={formState.name}
            onChange={handleInputChange}
          />
          {formState.errors.name && (
            <p className="text-red-500 text-sm">{formState.errors.name}</p>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={formState.priority}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {formState.errors.priority && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.priority}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              value={formState.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Meeting">Meeting</option>
              <option value="Design">Design</option>
            </select>
            {formState.errors.category && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Due Date</label>
            <select
              name="dueDate"
              value={formState.dueDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select due date</option>
              <option value="Overdue">Overdue</option>
              <option value="Today">Today</option>
              <option value="Upcoming">Upcoming</option>
              <option value="No Due Date">No Due Date</option>
            </select>
            {formState.errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.dueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Incompleted">Incompleted</option>
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
            <p className="text-red-500 text-sm">{formState.errors.assignedTo}</p>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Assigned On</label>
            <input
              type="date"
              name="assignedOn"
              value={formState.assignedOn}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formState.errors.assignedOn && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.assignedOn}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={false}
              label="Add Task"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            />
            <Button
              type="button"
              onClick={handleClose}
              label="Cancel"
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}