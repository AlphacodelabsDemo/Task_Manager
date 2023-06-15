






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon1 from '../../asset/icon1';
import Icon2 from '../../asset/icon2';
// import 'tailwindcss/tailwind.css';
// import '../../index.css'
// import {BsThreeDots} from 'react-icons/bs';




const TaskList = () => {
  

  const [tasks, setTasks] = useState([]);
  const [editableTask, setEditableTask] = useState(null);
  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Send a GET request to fetch the tasks
      const response = await axios.get('http://localhost:8081/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the tasks state with the fetched tasks
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Send a DELETE request to delete the task
      await axios.delete(`http://localhost:8081/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted task from the tasks state
      setTasks(tasks.filter((task) => task.id !== taskId));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (task) => {
    setEditableTask(task);
  };

  const handleSave = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Send a PUT request to update the task
      await axios.put(
        `http://localhost:8081/api/tasks/${editableTask._id}`,
        editableTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the editable task and fetch updated tasks
      setEditableTask(null);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditableTask(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className='bg-white'>
      

      <p class="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl text-center title p-12 animate-color-change ">All Assigned Task </p>
      <div className='relative'>
<div className="h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 mb-16 rounded-full" />
</div> 
      {tasks.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          
          {tasks.map((task) => (
             <div key={task._id} className="flex-shrink-0">
              {editableTask && editableTask._id === task._id ? (
                
                <div>
                  <input
                    type="text"
                    name="aim"
                    value={editableTask.aim}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="assignees"
                    value={editableTask.assignees}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="dueDate"
                    value={editableTask.dueDate}
                    onChange={handleInputChange}
                  />
                  
                    <select type="text" name='updatedStatus' id="status" onChange={handleInputChange}>
                     <option value="todo">Todo</option>
                     <option value="doing">In Progress</option>
                     <option value="done">Done</option>
                    </select>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                

                ///-----------------------

 <div className="flex mb-4 items-center justify-center px-12 bg-white dark:bg-gray-950">
  <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
    <div className="rounded-[calc(1.5rem-1px)] p-6 bg-white dark:bg-gray-900">
     
     
      <div   className="w-96 h-64 bg-gradient-to-b from-blue-100 to-pink-100 dark:from-blue-700 dark:to-purple-700 p-6  rounded-lg">
      <div className="flex justify-end">
  <button onClick={() => handleEdit(task)} className="ml-2 rounded-full bg-transparent"><Icon1/></button>
  <button onClick={() => deleteTask(task._id)} className="ml-2 rounded-full bg-transparent"><Icon2/></button>
</div>

{/* /// ----------------*/}
 

      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-300">Description :</h2>
      <div className='relative'>
<div className="h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 my-2 rounded-full" />
</div>      
  <p className="text-gray-600 dark:text-gray-300">{task.aim}</p>
      </div>
      

      <div className="mt-8 flex gap-4 items-center">
        <img className="h-12 w-12 rounded-full" src="https://pbs.twimg.com/profile_images/1599029039297077249/p0znhFdE_400x400.jpg" alt="" />
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-white">Assigned to : <span>{task.assignees}</span> </h3>
          <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">Status : <span>{task.updatedStatus} <spam className="text-black">|</spam> </span>  </span>
          <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">DueDate : <span>{task.dueDate}</span></span>
        </div>
      </div>
    </div>
  </div>
</div> 




                ///-----------------------
                
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
};

export default TaskList;






