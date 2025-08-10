import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import FilterCall from "./components/FilterCall";
import { TaskProvider } from "./context/TaskContext";
import CardCall from "./components/CardCall";
import InPutCall from "./components/InPutCall";

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onAddTask={() => setIsAddTaskOpen(true)} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <FilterCall />
            <CardCall />
          </div>
        </div>
        <InPutCall isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
      </div>
    </TaskProvider>
  );
}

export default App;
