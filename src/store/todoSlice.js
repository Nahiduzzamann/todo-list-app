import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const saveTasksToLocalStorage = tasks => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;
      const existingTask = state.tasks.find(task => task.id === newTask.id);
      if (!existingTask) {
        state.tasks.push(newTask);
        saveTasksToLocalStorage(state.tasks);
      }
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
        saveTasksToLocalStorage(state.tasks);
      }
    },
    toggleTaskStatus: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const { addTask, editTask, toggleTaskStatus, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
