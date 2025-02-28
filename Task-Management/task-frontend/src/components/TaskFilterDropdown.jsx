import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/slices/searchSlice';

const TaskFilterDropdown = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.search.filter);

    const countAll = tasks.length;
    const countPending = tasks.filter(task => task.status === 'pending').length;
    const countInProgress = tasks.filter(task => task.status === 'in progress').length;
    const countCompleted = tasks.filter(task => task.status === 'completed').length;

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    return (
        <div className="flex items-center">
            <select
                id="task-filter"
                value={filter}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All Tasks ({countAll})</option>
                <option value="pending">Pending ({countPending})</option>
                <option value="in progress">In Progress ({countInProgress})</option>
                <option value="completed">Completed ({countCompleted})</option>
            </select>
        </div>
    );
};

export default TaskFilterDropdown;
