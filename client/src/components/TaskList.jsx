import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editableTask, setEditableTask] = useState(null);
  const statusOptions = ['todo', 'doing', 'done'];
  


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
    <div>
      <h2>Your Tasks:</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editableTask && editableTask.id === task.id ? (
                <div>
                  <input
                    type="text"
                    name="aim"
                    value={editableTask.aim}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="dueDate"
                    value={editableTask.dueDate}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="updatedStatus"
                    value={editableTask.updatedStatus}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div>
                  {task.aim}
                  <br />
                  {task.dueDate}
                  <br/>
                  {task.updatedStatus}
                  <br/>
                  <button onClick={() => handleEdit(task)} >Edit</button>
                  <br/>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                  <hr/>
                </div>
                
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
};

export default TaskList;






