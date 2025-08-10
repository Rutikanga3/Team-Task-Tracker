

// import {  TaskProvider } from "../context/TaskContext"
import React from 'react';
import Cards from './Cards';
import { useTask } from '../hooks/useTask';
import type { Task } from '../types/Task';





// const { filteredTasks, deleteTask, updateTask } = useTask();
// const handleEdit = (task: Task) => {
//   const{tasks }= useTask()
//   // console.log(tasks)
//     let newStatus: TaskStatus;
//     switch (task.status) {
//       case 'Incompleted':
//         newStatus = 'Completed';
//         break;
//       case 'Completed':
//         newStatus = 'Incompleted';
//         break;
//       default:
//         newStatus = 'Completed';
//     }

//     const updatedTask = { 

//       ...task, 
//       status: newStatus
//     };
//     updateTask(updatedTask);
//   };




export default function CardCall() {
  const { filteredTasks, tasks } = useTask();

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
          <p className="text-gray-500">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks match your filters</h3>
          <p className="text-gray-500">Try adjusting your filter criteria or clear all filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Task Dashboard</h2>
        <p className="text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredTasks.map((task: Task) => (
          <Cards key={task.id} cardData={task} />
        ))}
      </div>
    </div>
  );
}
