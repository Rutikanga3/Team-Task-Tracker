
import { useState } from 'react';
import Button from './Button';
import InPutCall from './InPutCall';
import { TaskProvider } from '../context/TaskContext';


export default function Navbar() {
    const [isInPutCallOpen, setIsInPutCallOpen]= useState(false)
  return (
    <>
    <TaskProvider>
    <InPutCall isOpen={isInPutCallOpen} onClose={()=> setIsInPutCallOpen(false)}/>
    </TaskProvider>
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b-gray-50 mb-4 ">
   
      <h2 className="text-xl font-bold text-gray-800">Team Task Tracker</h2>

      
      <Button
        label="Add Task"
        onClick={() => {
            setIsInPutCallOpen(true)
        }}
        className="bg-black text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 active:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-6 rounded-md transition-all"
      />
    </div>
    </>
  );
}