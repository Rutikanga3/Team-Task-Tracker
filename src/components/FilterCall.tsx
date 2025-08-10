import React from 'react';
import { useTask } from '../hooks/useTask';
import Filter from './Filter';

const FilterCall: React.FC = () => {
    const { clearFilters, filters, setFilters } = useTask();

    const hasActiveFilters =
        filters.status !== 'all' ||
        filters.priority !== 'all' ||
        filters.dueDate !== 'all' ||
        filters.category !== 'all' ||
        filters.assignedTo !== 'all';

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-7xl mx-auto border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Filter Tasks</h2>
                    <p className="text-gray-600 text-sm">Narrow down your tasks by different criteria</p>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Filter
                    label="Status"
                    filterType="status"
                    value={filters.status}
                    onChange={(value) => setFilters((prev: typeof filters) => ({ ...prev, status: value }))}
                    options={[
                        { value: 'all', label: 'All Statuses' },
                        { value: 'Incompleted', label: 'Incompleted' },
                        { value: 'Completed', label: 'Completed' }
                    ]}
                />
                <Filter
                    label="Priority"
                    filterType="priority"
                    value={filters.priority}
                    onChange={(value) => setFilters((prev: typeof filters) => ({ ...prev, priority: value }))}
                    options={[
                        { value: 'all', label: 'All Priorities' },
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'High', label: 'High' }
                    ]}
                />
                <Filter
                    label="Due Date"
                    filterType="dueDate"
                    value={filters.dueDate}
                    onChange={(value) => setFilters((prev: typeof filters) => ({ ...prev, dueDate: value }))}
                    options={[
                        { value: 'all', label: 'All Due Dates' },
                        { value: 'Overdue', label: 'Overdue' },
                        { value: 'Today', label: 'Today' },
                        { value: 'Upcoming', label: 'Upcoming' },
                        { value: 'No Due Date', label: 'No Due Date' }
                    ]}
                />
                <Filter
                    label="Category"
                    filterType="category"
                    value={filters.category}
                    onChange={(value) => setFilters((prev: typeof filters) => ({ ...prev, category: value }))}
                    options={[
                        { value: 'all', label: 'All Categories' },
                        { value: 'Frontend', label: 'Frontend' },
                        { value: 'Backend', label: 'Backend' },
                        { value: 'Meeting', label: 'Meeting' },
                        { value: 'Design', label: 'Design' }
                    ]}
                />
                <Filter
                    label="Assigned To"
                    filterType="assignedTo"
                    value={filters.assignedTo}
                    onChange={(value) => setFilters((prev: typeof filters) => ({ ...prev, assignedTo: value }))}
                    options={[
                        { value: 'all', label: 'All Users' },
                        // Dynamic options would be populated from actual user data
                        { value: 'Joella', label: 'Joella' },
                        { value: 'Doreen', label: 'Doreen' }
                    ]}
                />
            </div>
        </div>
    );
};

export default FilterCall;