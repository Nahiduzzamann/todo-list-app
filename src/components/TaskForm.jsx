import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTask } from '../store/todoSlice';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const TaskForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [priority, setPriority] = useState('low');

  const onFinish = values => {
    const newTask = { id: uuid(), title: values.title, priority, completed: false };
    dispatch(addTask(newTask));
    form.resetFields();
    setPriority('low');
  };

  return (
    <div className="bg-gray-200 py-3 md:py-6 rounded-lg flex flex-col items-center my-6 mx-2">
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: '300px', width: '100%' }}>
        <Form.Item name="title" rules={[{ required: true, message: 'Please enter task title' }]}>
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item name="priority" initialValue="low">
          <Select style={{ width: '100%' }} onChange={value => setPriority(value)}>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} className='text-black'>
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
