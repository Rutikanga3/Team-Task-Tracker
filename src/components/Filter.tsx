import React from "react";

interface FilterProps {
    label: string;
    filterType: 'status' | 'priority' | 'dueDate' | 'category' | 'assignedTo';
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; }[];
}

const Filter: React.FC<FilterProps> = ({ label, filterType, value, onChange, options }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                value={value}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;