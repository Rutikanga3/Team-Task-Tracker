
import React from 'react';
import Button from './Button';

interface NavbarProps {
  onAddTask: () => void;
}

export default function Navbar({ onAddTask }: NavbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">Team Task Tracker</h2>
      <Button
        label="Add Task"
        onClick={onAddTask}
        className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-6 rounded-md transition-all"
      />
    </div>
  );
}