import React from 'react';
import { useTask } from '../hooks/useTask';
import Filter from './Filter';

const FilterBar: React.FC = () => {
    const { clearFilters, filters } = useTask();

    const hasActiveFilters =
        filters.status !== 'all' ||
        filters.priority !== 'all' ||
        filters.dueDate !== 'all' ||
        filters.category !== 'all' ||
        filters.assignedTo !== 'all';

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-5xl mx-auto border-b-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Filter label="Status" filterType="status" />
                <Filter label="Priority" filterType="priority" />
                <Filter label="Due Date" filterType="dueDate" />
                <Filter label="Category" filterType="category" />
                <Filter label="Assigned To" filterType="assignedTo" />
            </div>
        </div>
    );
};

export default FilterBar;