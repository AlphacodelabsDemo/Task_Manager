import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import {SlCalender} from 'react-icons/sl';
import {MdDoneOutline} from 'react-icons/md';

const CreateTask = () => {
  const navigate = useNavigate();
  const [aim, setAim] = useState('');
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const statusOptions = ['todo', 'doing', 'done']; ////------
  const [updatedStatus, setUpdatedStatus] = useState('');

  const onChange = (date) => {
    setDueDate(date);
  };
  const handleOpenCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Convert the dueDate to the desired format
      const formattedDueDate = formatDate(dueDate);

      // Send form data to the server with the token included in the headers
      await axios.post(
        'http://localhost:8081/api/tasks/create',
        {
          aim,
          dueDate: formattedDueDate,
          status,
          updatedStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Reset the form and set the submitted flag
      setAim('');
    //   setDueDate(new Date());
      setDueDate(new Date());
      setStatus(false);
      window.location.reload();
      

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      
        <>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <div className="mb-4 text-3xl">Enter Your Company Details</div>
            <br />
            <div className="w-full max-w-md">
              <div className="mb-4">
                <label htmlFor="aim" className="block text-xl">
                  Description:
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
                <label htmlFor="headQuarter" className="block text-xl">
                  Due Date:
                </label>
                <input
                  type="text"
                  id="dueDate"
                  value={formatDate(dueDate)}
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                  required
                  className="border border-gray-300 rounded p-2 w-full"
                />
               <div>
      <div>
        <button onClick={handleOpenCalendar}><SlCalender/></button>
      </div>
      {showCalendar && (
        <div>
          <Calendar onChange={onChange} value={dueDate} />
          <button onClick={handleCloseCalendar}><MdDoneOutline/></button>
        </div>
      )}
    </div>
  
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-xl">
                  Status
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    className="border border-gray-300 rounded p-2 mr-2"
                  />
                  <label htmlFor="status" className="text-sm">
                    completed
                  </label>
                </div>
              </div>
              {/* /* //---- */}
              <div className="mb-4">
  <label htmlFor="status" className="block text-xl">
    Status:
  </label>
  <select
    id="status"
    value={updatedStatus}
    onChange={(e) => setUpdatedStatus(e.target.value)}
    className="border border-gray-300 rounded p-2 w-full"
    required
  >
    <option value="">Select status</option>
    {statusOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>
              
              {/* //---- */ }
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      
        <p>Form submitted successfully!</p>
      
    </div>
  );
};

export default CreateTask;
