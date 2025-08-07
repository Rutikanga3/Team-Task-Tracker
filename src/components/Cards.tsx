import React from 'react'
import type { DueDate, TaskCategory, TaskPriority } from '../types/Task';

interface CardsProps {
    title: string;
    priority: TaskPriority;
    category:TaskCategory;
    assignedTo: string;
    DueDate: DueDate;
    assignedOn: string;
    
}

const Cards: React.FC<CardsProps> = ({
    title,
    priority,
    category,
    assignedTo,
    DueDate,
    assignedOn,
}) => {
    return  (
    <div >
  
  <div className="border rounded-md p-4 shadow-md w-full max-w-md mx-auto">
    <div className="flex items-start gap-2">
      {/* <input type="checkbox" className="mt-1" /> */}
      <div className="flex-2">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-lg">{title}</h1>
          <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
            {priority}
          </span>
          <span className="bg-gray-200 text-black text-sm px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          <p><strong>Assigned to:</strong> {assignedTo}</p>
          <p><strong>Assigned on:</strong> {assignedOn}</p>
          <p><strong>Due:</strong> {DueDate}</p>
        </div>
      </div>
    </div>
    
  </div>

  
</div>
  );

}


export default  Cards 

