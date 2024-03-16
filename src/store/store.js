import { configureStore } from '@reduxjs/toolkit';
import todoReducer, { addTask, toggleTaskStatus } from './todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export const addTaskToStore = (task) => {
  const existingTask = store.getState().todo.tasks.find(t => t.id === task.id);
  if (!existingTask) {
    store.dispatch(addTask(task));
  }
};

// Toggle task status
export const toggleTaskStatusInStore = (taskId) => {
  store.dispatch(toggleTaskStatus(taskId));
};


export default store;