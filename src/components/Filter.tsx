import React from "react";
import { useTask } from "../hooks/useTask";

interface FilterProps {
    label: string;
    filterType: 'status' | 'priority' | 'dueDate' | 'category' | 'assignedTo';
}

const Filter: React.FC<FilterProps> = ({ label, filterType }) => {
    const { filters, setFilters, tasks } = useTask();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [filterType]: e.target.value
        });
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                value={filters[filterType]}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500 sm:text-sm"
            >
                <option value="all">All</option>
                {filterType === 'category' && tasks.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
                {filterType === 'status' && ['Pending', 'In Progress', 'Completed'].map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
                {filterType === 'priority' && ['Low', 'Medium', 'High'].map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                ))}
                {filterType === 'dueDate' && ['Overdue', 'Today', 'Upcoming', 'No Due Date'].map((dueDate) => (
                    <option key={dueDate} value={dueDate}>{dueDate}</option>
                ))}
                {filterType === 'assignedTo' && ['User1', 'User2', 'User3'].map((user) => (
                    <option key={user} value={user}>{user}</option>
                ))}
            </select>
        </div>
    );

};
export default Filter