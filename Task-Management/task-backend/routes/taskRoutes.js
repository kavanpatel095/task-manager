const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, createTask);
router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, getTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
