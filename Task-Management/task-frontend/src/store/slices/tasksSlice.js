import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from '../../services/taskService';
import { toast } from 'react-toastify';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, thunkAPI) => {
        try {
            const data = await taskService.getTasks();
            return data.tasks;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData, thunkAPI) => {
        try {
            const data = await taskService.createTask(taskData);
            return data.task;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, taskData }, thunkAPI) => {
        try {
            const data = await taskService.updateTask(id, taskData);
            return data.task;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (id, thunkAPI) => {
        try {
            const data = await taskService.deleteTask(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                toast.success('Task created successfully!');
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                toast.success('Task updated successfully!');

            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
                toast.success('Task deleted successfully!');

            });
    },
});

export default tasksSlice.reducer;
