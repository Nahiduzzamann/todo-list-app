import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { addTask } from "./store/todoSlice";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      savedTasks.forEach((task) => dispatch(addTask(task)));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="bg-blue-500  py-4 px-2">
        <h1 className="container mx-auto text-white text-3xl">Todo List App</h1>
      </div>

      <div className="container mx-auto">
        <TaskForm></TaskForm>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
