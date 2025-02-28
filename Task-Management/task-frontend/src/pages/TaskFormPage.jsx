import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../store/slices/tasksSlice';
import { useNavigate, useParams } from 'react-router-dom';

const TaskFormPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        status: 'pending',
    });

    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks } = useSelector(state => state.tasks);

    const existingTask = tasks.find(task => task.id === Number(id));

    useEffect(() => {
        if (existingTask) {
            setFormState({
                name: existingTask.name,
                description: existingTask.description,
                status: existingTask.status,
            });
        }
    }, [existingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (existingTask) {
            reduxDispatch(updateTask({ id: existingTask.id, taskData: formState }));
        } else {
            reduxDispatch(addTask(formState));
        }
        navigate('/tasks');
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {existingTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Task Name"
                    value={formState.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formState.description}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <select
                    name="status"
                    value={formState.status}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {existingTask ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskFormPage;
