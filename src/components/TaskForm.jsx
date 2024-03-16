
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTask } from '../store/todoSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = e => {
    e.preventDefault();
    const newTask = { id: uuid(), title, priority, completed: false };
    dispatch(addTask(newTask));
    setTitle('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title" required />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
