import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus } from "../store/todoSlice";
import { Button, Checkbox, Tag } from "antd";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className={` ${task.completed ?'bg-gray-100':'bg-blue-100'} mb-2 flex justify-between items-center px-4 py-2 rounded`}>
      <div>
        <Checkbox checked={task.completed} onChange={handleToggleStatus} />
        <span
          style={{
            marginLeft: "10px",
            textDecoration: task.completed ? "line-through" : "none",
            color:task.completed ? "#131313" : "#000000",
          }}
        >
          {task.title}
        </span>
        <Tag
          color={
            task.priority === "high"
              ? "red"
              : task.priority === "medium"
              ? "orange"
              : "green"
          }
        >
          {task.priority}
        </Tag>
        {task.completed && (
          <span
            style={{
              marginLeft: "10px",
              color:task.completed ? "#131313" : "#000000",
            }}
          >
            ( Completed )
          </span>
        )}
      </div>
      <Button danger onClick={handleDeleteTask}>
        Delete
      </Button>
    </div>
  );
};

export default TaskItem;
