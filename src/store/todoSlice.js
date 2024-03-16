import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
      }
    },
    toggleTaskStatus: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
  },
});

export const { addTask, editTask, toggleTaskStatus, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
