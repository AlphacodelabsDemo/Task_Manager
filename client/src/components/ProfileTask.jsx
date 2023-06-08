import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All tasks added by a user for now</h1>
      <h1 className="text-xl mb-4">Profile page comes here with his list of tasks, projects, workspace and Members</h1>
      <ToastContainer />
      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className="p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="mt-2">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTask;
