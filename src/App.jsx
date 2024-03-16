
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Typography } from 'antd';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { addTask } from './store/todoSlice';

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      savedTasks.forEach(task => dispatch(addTask(task)));
    }
  }, [dispatch]);

  return (
    <Layout>
      <Header>
        <Title style={{ color: 'white' }}>Todo List App</Title>
      </Header>
      <Content className="content">
       <TaskForm></TaskForm>
       <TaskList />
      </Content>
    </Layout>
  );
};

export default App;
