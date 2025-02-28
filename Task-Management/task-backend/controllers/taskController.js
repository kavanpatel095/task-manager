const { Task } = require('../models');

exports.createTask = async (req, res) => {
    const { name, description, status } = req.body;
    const { userId } = req.user;

    try {
        const newTask = await Task.create({ name, description, status, userId });
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const { userId } = req.user;

    try {
        const tasks = await Task.findAll({ where: { userId } });
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    }
};

exports.getTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const task = await Task.findOne({ where: { id, userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching task', error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const { userId } = req.user;

    try {
        const task = await Task.findOne({ where: { id, userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.name = name;
        task.description = description;
        task.status = status;
        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const task = await Task.findOne({ where: { id, userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
};
