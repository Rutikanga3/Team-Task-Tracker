import React, { useState } from 'react';
import type { Task } from '../types/Task';
import { useTask } from '../hooks/useTask';

export interface CardsProps {
  cardData: Task;
}

const Cards: React.FC<CardsProps> = ({ cardData }) => {
  const { deleteTask, updateTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Task>(cardData);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(cardData.id);
    }
  };

  const handleEdit = () => {
    // For now, we'll just toggle the editing state
    // In a real app, this would open an edit modal or form
    setIsEditing(!isEditing);
    console.log('Edit button clicked for task:', cardData.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'bg-green-500' : 'bg-orange-500';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-lg text-gray-800 flex-1">{cardData.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`${getPriorityColor(cardData.priority)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                {cardData.priority}
              </span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {cardData.category}
              </span>
              <span className={`${getStatusColor(cardData.status)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                {cardData.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Assigned to:</strong> {cardData.assignedTo}</p>
              <p><strong>Assigned on:</strong> {new Date(cardData.assignedOn).toLocaleDateString()}</p>
              <p><strong>Due:</strong> {cardData.dueDate}</p>
              <p><strong>Updated:</strong> {new Date(cardData.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleEdit}
          className="flex-1 bg-gray-700 hover:bg-gray-500 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
          title="Edit Task"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
          title="Delete Task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Cards;

