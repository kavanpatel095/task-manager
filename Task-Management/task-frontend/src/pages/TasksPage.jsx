import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, removeTask } from '../store/slices/tasksSlice';
import { Link } from 'react-router-dom';
import TaskFilterDropdown from '../components/TaskFilterDropdown';
import TaskCard from '../components/TaskCard';

const TasksPage = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(state => state.tasks);
    const { query, filter } = useSelector(state => state.search);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(removeTask(id));
    };

    const filteredTasks = tasks.filter(task => {
        const matchesQuery =
            task.name.toLowerCase().includes(query.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(query.toLowerCase()));
        const matchesFilter = filter === 'all' || task.status === filter;
        return matchesQuery && matchesFilter;
    });

    if (loading) return <p className="flex items-center justify-center h-screen">Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <TaskFilterDropdown />
                <Link to="/tasks/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Add New Task
                </Link>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TasksPage;
