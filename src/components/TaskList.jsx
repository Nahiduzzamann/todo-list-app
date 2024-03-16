import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const sortedTasks = [
    ...incompleteTasks,
    ...tasks.filter((task) => task.completed),
  ];

  return (
    <div className="px-2">
      <h1 className="text-blue-500 text-xl md:text-3xl underline">Task List</h1>
      <div className="m-2 md:m-4">
        <div className="flex justify-between items-center">
          <div>Basic Filtering system</div>
          <div>
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
          </div>
        </div>
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
