import  { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { Select } from 'antd';
const { Option } = Select;

const TaskList = () => {
  const tasks = useSelector(state => state.todo.tasks);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedFilteredTasks = tasks.filter(task => task.completed);

  const getFilteredTasks = () => {
    if (selectedPriority === 'all') {
      return [...incompleteTasks, ...completedFilteredTasks];
    }
    return tasks.filter(task => task.priority === selectedPriority);
  };

  const handlePriorityChange = priority => {
    setSelectedPriority(priority);
  };

  return (
    <div className="px-2">
      <h1 className="text-blue-500 text-xl md:text-3xl underline">Task List</h1>
      <div className="m-2 md:m-4">
        <div className="flex justify-between items-center">
          <div>
            <PriorityFilter selectedPriority={selectedPriority} onChange={handlePriorityChange} />
          </div>
          <div>
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
          </div>
        </div>
        {getFilteredTasks().map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

const PriorityFilter = ({ selectedPriority, onChange }) => {
  return (
    <Select value={selectedPriority} onChange={value => onChange(value)} style={{ width: 120 }}>
      <Option value="all">All</Option>
      <Option value="low">Low</Option>
      <Option value="medium">Medium</Option>
      <Option value="high">High</Option>
    </Select>
  );
};
