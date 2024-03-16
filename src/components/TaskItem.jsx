import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../store/todoSlice';
import { Button, Checkbox, Tag } from 'antd';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div>
      <Checkbox checked={task.completed} onChange={handleToggleStatus} />
      <span style={{ marginLeft: '10px', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
      <Tag color={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green'}>{task.priority}</Tag>
      <Button danger onClick={handleDeleteTask}>Delete</Button>
    </div>
  );
};

export default TaskItem;