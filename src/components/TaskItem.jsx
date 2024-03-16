import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus, editTask } from "../store/todoSlice";
import {
  Button,
  Checkbox,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Tooltip,
} from "antd";
const { Option } = Select;
const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEditTask = () => {
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    dispatch(editTask({ id: task.id, updatedTask: editedTask }));
    setIsModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div
      className={` ${
        task.completed ? "bg-gray-100" : "bg-blue-100"
      } mb-2 md:flex justify-between items-center px-4 py-2 rounded`}
    >
      <div className="max-w-[500px] flex items-center gap-2">
        <div>
          {task.completed ? (
            <Tooltip placement="topRight" title="Task Completed">
              <Checkbox
                checked={task.completed}
                onChange={handleToggleStatus}
              />
            </Tooltip>
          ) : (
            <Tooltip placement="topRight" title="Mark as Done!">
              <Checkbox
                checked={task.completed}
                onChange={handleToggleStatus}
              />
            </Tooltip>
          )}
        </div>

       <div>
       <span
          style={{
           
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#131313" : "#000000",
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
              color: task.completed ? "#131313" : "#000000",
            }}
          >
            ( Completed )
          </span>
        )}
       </div>
      </div>
      <div className="my-2 md:my-0 flex justify-end md:block">
        {task.completed || (
          <Button className="border border-blue-500" onClick={handleEditTask}>
            Edit
          </Button>
        )}
        <Button
          danger
          onClick={handleDeleteTask}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
      </div>
      <Modal
        okButtonProps={{
          className: "text-black",
        }}
        title="Edit Task"
        visible={isModalVisible}
        onOk={handleSaveEdit}
        onCancel={handleCancelEdit}
      >
        <Form layout="vertical">
          <Form.Item label="Task Title">
            <Input
              maxLength={100}
              name="title"
              value={editedTask.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="priority" initialValue="low">
            <Select
              style={{ width: "100%" }}
              onChange={(value) =>
                setEditedTask({ ...editedTask, priority: value })
              }
            >
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskItem;
