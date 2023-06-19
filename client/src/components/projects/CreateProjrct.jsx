import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';

const CreateProject = ({ setProjects }) => {
  const navigate = useNavigate();
  const [aim, setAim] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [collaborators, setCollaborators] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('ToDo'); // Default value is ToDo
  const [showCalendar, setShowCalendar] = useState(false);
  const [user, setUser] = useState(null); // Added user state

  useEffect(() => {
    fetchUser();
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user); // Set the user state
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDueDate = formatDate(dueDate);
      const collaboratorEmails = collaborators.split(',').map((email) => email.trim());

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:8081/api/project/projects/create',
        {
          aim,
          dueDate: formattedDueDate,
          collaborators: collaboratorEmails,
          updatedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAim('');
      setDueDate(new Date());
      setCollaborators('');
      setUpdatedStatus('ToDo');

      // navigate('/task');
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (date) => {
    setDueDate(date);
  };

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-3xl">Assign a new project</div>
        <br />
        <div className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="aim" className="block text-xl">
              Aim:
            </label>
            <input
              type="text"
              id="aim"
              value={aim}
              onChange={(e) => setAim(e.target.value)}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-xl">
              Due Date:
            </label>
            <div className="relative">
              <input
                type="text"
                id="dueDate"
                value={formatDate(dueDate)}
                onChange={() => {}}
                className="border border-gray-300 rounded p-2 w-full"
                readOnly
              />
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={handleToggleCalendar}
              >
                <FaCalendarAlt size={20} />
              </div>
              {showCalendar && (
                <div className="absolute top-14 z-10 bg-white border border-gray-300 rounded p-2">
                  <Calendar onChange={onChange} value={dueDate} />
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="collaborators" className="block text-xl">
              Collaborators (comma-separated emails):
            </label>
            <input
              type="text"
              id="collaborators"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="updatedStatus" className="block text-xl">
              Status:
            </label>
            <select
              id="updatedStatus"
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="ToDo">ToDo</option>
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <MdDoneOutline size={20} className="mr-2 inline" />
              Create Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
