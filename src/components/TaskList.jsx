import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.todo.tasks);

  return (
    <div className='px-2'>
      <h1 className='text-blue-500 text-xl md:text-3xl underline'>Task List:</h1>
      <div className='m-2 md:m-4'>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
      </div>
    </div>
  );
};

export default TaskList;