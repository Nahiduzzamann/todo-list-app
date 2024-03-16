import { useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { Select, Pagination } from "antd";
import svg from "../assets/task.svg";
const { Option } = Select;

const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedFilteredTasks = tasks.filter((task) => task.completed);

  const getFilteredTasks = () => {
    if (selectedPriority === "all") {
      return [...incompleteTasks, ...completedFilteredTasks];
    }
    return tasks.filter((task) => task.priority === selectedPriority);
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedTasks = getFilteredTasks().slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  // console.log(tasks);
  return (
    <div className="px-2">
      <h1 className="text-gray-500 text-xl md:text-3xl">Task List</h1>
      {tasks.length <= 0 ? (
        <div className="flex flex-col justify-center items-center my-4">
          <img className="h-40 w-40" src={svg} alt="empty" />
          <p className="text-gray-400 text-lg">No Task</p>
        </div>
      ) : (
        <div className="m-2 md:m-4">
          <div className="flex justify-between items-center">
            <div>
              <PriorityFilter
                selectedPriority={selectedPriority}
                onChange={handlePriorityChange}
              />
            </div>
            <div>
              <p>Total Tasks: {totalTasks}</p>
              <p>Completed Tasks: {completedTasks}</p>
            </div>
          </div>
          {paginatedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <div className="flex justify-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={getFilteredTasks().length}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

const PriorityFilter = ({ selectedPriority, onChange }) => {
  return (
    <Select
      value={selectedPriority}
      onChange={(value) => onChange(value)}
      style={{ width: 120 }}
    >
      <Option value="all">All</Option>
      <Option value="low">Low</Option>
      <Option value="medium">Medium</Option>
      <Option value="high">High</Option>
    </Select>
  );
};
