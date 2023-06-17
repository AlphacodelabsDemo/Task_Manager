import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Backdrop, Fade, Button, TextField, Select, MenuItem } from '@mui/material';
import Calendar from 'react-calendar';
import { FiCalendar } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const CreateTask = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    aim: '',
    assignees: '',
    dueDate: dayjs().toDate(),
    updatedStatus: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const statusOptions = ['Todo', 'In Progress', 'Done'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      dueDate: date,
    }));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { aim, assignees, dueDate, updatedStatus } = formValues;

      if (!aim || !assignees || !dueDate || !updatedStatus) {
        toast.error('Please fill in all the required fields.');
        return;
      }

      const formattedDueDate = formatDate(dueDate);

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:8081/api/tasks/create',
        {
          aim,
          assignees,
          dueDate: formattedDueDate,
          updatedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setFormValues({
        aim: '',
        assignees: '',
        dueDate: dayjs().toDate(),
        updatedStatus: '',
      });

      handleCloseModal();
      // navigate('/profile');
      toast.success('Task created successfully.');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the task. Please try again.');
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  return (
    <div className="bg-white flex justify-center">
      <Button
        onClick={handleOpenModal}
        variant="contained"
        color="primary"
        sx={{ width: '200px', height: '50px' }}
      >
        Create Task
      </Button>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="flex justify-center items-center"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <Fade in={showModal}>
          <div className="bg-white rounded-lg p-8 sm:w-96 md:w-128 z-30">
            <h2 className="text-3xl mb-4">Assign a new task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="aim" className="block text-xl">
                  Description:
                </label>
                <TextField
                  type="text"
                  id="aim"
                  name="aim"
                  value={formValues.aim}
                  onChange={handleInputChange}
                  required
                  maxLength={220}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <label htmlFor="assignees" className="block text-xl">
                  Assignees:
                </label>
                <TextField
                  type="text"
                  id="assignees"
                  name="assignees"
                  value={formValues.assignees}
                  onChange={handleInputChange}
                  required
                  maxLength={25}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-xl">
                  Due Date:
                </label>
                <div className="relative">
                  <TextField
                    type="text"
                    id="dueDate"
                    name="dueDate"
                    value={formatDate(formValues.dueDate)}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <button
                          type="button"
                          onClick={handleOpenCalendar}
                          className="absolute top-0 right-0 flex items-center justify-center w-10 h-full bg-blue-500 text-white rounded-r"
                        >
                          <FiCalendar />
                        </button>
                      ),
                    }}
                  />
                  {showCalendar && (
                    <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-300 rounded z-20">
                      <Calendar onChange={handleDateChange} value={formValues.dueDate} />
                      <button
                        onClick={handleCloseCalendar}
                        className="block w-full mt-2 bg-blue-500 text-white rounded px-4 py-2 text-center"
                      >
                        <MdDone />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-xl">
                  Status:
                </label>
                <Select
                  id="status"
                  name="updatedStatus"
                  value={formValues.updatedStatus}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                >
                  <MenuItem value="">Select status</MenuItem>
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit" variant="contained" color="primary" className="mr-2">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  variant="contained"
                  color="secondary"
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTask;
