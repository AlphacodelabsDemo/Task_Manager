
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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

    fetchTasks();
  }, []);

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

  return (
    <div>
      <h2>Your Tasks:</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.aim}
              <br />
              {task.dueDate}
              <button onClick={() => deleteTask(task._id)}>Delete</button>
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





