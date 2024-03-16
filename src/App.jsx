import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { addTask } from "./store/todoSlice";
import 'antd/dist/reset.css';
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

const App = () => {
  const [user,setUser]=useState(null)
  const [update,setUpdate]=useState()
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  
    return () => unsubscribe();
  }, [update]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      savedTasks.forEach((task) => dispatch(addTask(task)));
    }
  }, [dispatch]);

  return (
    <div>
      <Header user={user} setUpdate={setUpdate}></Header>

      <div className="container mx-auto">
        <TaskForm user={user}></TaskForm>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
