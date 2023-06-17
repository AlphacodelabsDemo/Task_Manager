import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Icon1 from '../../asset/icon1';
import Icon2 from '../../asset/icon2';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editableTask, setEditableTask] = useState({
    aim: '',
    assignees: '',
    updatedStatus: '',
    dueDate: dayjs().format('YYYY-MM-DD'),
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  const [dueDateQuery, setDueDateQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch tasks');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditableTask(task);
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/tasks/${editableTask._id}`,
        editableTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditableTask({ aim: '', assignees: '', updatedStatus: '', dueDate: dayjs().format('YYYY-MM-DD') });
      toast.success('Task updated successfully');
      fetchTasks();
      handleCloseModal(); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task');
    }
  };
  

  const handleCancel = () => {
    setEditableTask(null);
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setEditableTask({
      ...editableTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          assignees: searchQuery,
          updatedStatus: statusQuery,
          dueDate: dueDateQuery,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
      toast.error('Failed to search tasks');
    }
  };

  const handleCloseModal = () => {
    setEditableTask(null);
    setOpenModal(false);
  };

  return (
    <div className="bg-white">
      <p className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl text-center title p-12 animate-color-change">
        All Assigned Task
      </p>
      <div className="relative">
        <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 mb-16 rounded-full" />
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Assignees"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <select
          className="p-2 border border-gray-300 rounded-md mr-2"
          placeholder="Search Status"
          type="text"
          name="updatedStatus"
          id="updatedStatus"
          value={statusQuery}
          onChange={(e) => setStatusQuery(e.target.value)}
        >
          <option value=""></option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <input
          type="text"
          placeholder="Search Due Date"
          value={dueDateQuery}
          onChange={(e) => setDueDateQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </div>

      {tasks.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="flex-shrink-0">
              <div className="flex mb-4 items-center justify-center px-12 bg-white dark:bg-gray-950">
                <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800">
                  <div className="rounded-[calc(1.5rem-1px)] p-6 bg-white dark:bg-gray-900">
                    <div className="w-96 h-64 bg-gradient-to-b from-blue-100 to-pink-100 dark:from-blue-700 dark:to-purple-700 p-6  rounded-lg">
                      <div className="flex justify-end">
                        <button onClick={() => handleEdit(task)} className="ml-2 rounded-full bg-transparent">
                          <Icon1 />
                        </button>
                        <button onClick={() => deleteTask(task._id)} className="ml-2 rounded-full bg-transparent">
                          <Icon2 />
                        </button>
                      </div>
                      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-300">Description :</h2>
                      <div className="relative">
                        <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 my-2 rounded-full" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{task.aim}</p>
                      <div className="mt-8 flex gap-4 items-center w-96 mx-auto">
                        <img
                          className="h-12 w-12 rounded-full"
                          src="https://pbs.twimg.com/profile_images/1599029039297077249/p0znhFdE_400x400.jpg"
                          alt=""
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                            Assigned to : <span>{task.assignees}</span>
                          </h3>
                          <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                            Status : <span>{task.updatedStatus}</span> <span className="text-black">|</span>{' '}
                          </span>
                          <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                            DueDate : <span>{task.dueDate}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading tasks...</p>
      )}

      {/* Edit Task Modal */}
      {editableTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="bg-white rounded-lg p-8 max-w-md z-10">
            <h2 className="text-2xl font-bold mb-4 justify-center">Edit Task</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aim">
                Aim
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                id="aim"
                name="aim"
                value={editableTask.aim}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignees">
                Assignees
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                id="assignees"
                name="assignees"
                value={editableTask.assignees}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="updatedStatus">
                Updated Status
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                id="updatedStatus"
                name="updatedStatus"
                value={editableTask.updatedStatus}
                onChange={handleInputChange}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
              Due Date
           </label>
      <input
        className="w-full p-2 border border-gray-300 rounded-md"
        type="date" 
        id="dueDate"
        name="dueDate"
        value={editableTask.dueDate}
        onChange={handleInputChange}
      />
    </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
                Save
              </button>
              <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TaskList;
