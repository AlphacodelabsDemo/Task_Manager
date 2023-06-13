import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../utils/input';
import Loader from '../../utils/loader';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8081/api/auth/signup', formData);
      console.log(response.data);
      toast.success('Signup successful! Please sign in.');
      navigate('/signin');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error('Email ID already exists. Please sign in.');
        navigate('/signin');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    } else if (!hasSymbol(formData.password)) {
      errors.password = 'Password should contain at least 1 symbol';
    } else if (!hasCapitalLetter(formData.password)) {
      errors.password = 'Password should contain at least 1 capital letter';
    } else if (!hasLowerCaseLetter(formData.password)) {
      errors.password = 'Password should contain at least 1 lowercase letter';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const hasSymbol = (password) => {
    const symbolRegex = /[-!$%^&*()_+|~=`{}[\]:";@'<>?,./]/;
    return symbolRegex.test(password);
  };

  const hasCapitalLetter = (password) => {
    const capitalLetterRegex = /[A-Z]/;
    return capitalLetterRegex.test(password);
  };

  const hasLowerCaseLetter = (password) => {
    const lowerCaseLetterRegex = /[a-z]/;
    return lowerCaseLetterRegex.test(password);
  };

  const fieldError = (fieldName) => {
    if (formErrors[fieldName]) {
      return <div className="text-red-500">{formErrors[fieldName]}</div>;
    }
    return null;
  };

  const isSubmitDisabled = isLoading || Object.keys(formErrors).length > 0;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-[500px] p-8 bg-white border-2 shadow-md rounded-md">
        <h2 className="text-center mb-4 text-2xl font-semibold">Signup - It's Free</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              placeholder="Your first name"
              onChange={handleChange}
            />
            {fieldError('firstName')}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              placeholder="Your last name"
              onChange={handleChange}
            />
            {fieldError('lastName')}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
            />
            {fieldError('email')}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Your password.."
              onChange={handleChange}
            />
            {fieldError('password')}
          </div>

          <button
            className="w-full bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {isLoading ? <Loader /> : 'Submit'}
          </button>

          <div className="pt-4 text-center">
            <span>Already have an account? </span>
            <Link to="/signin" className="text-blue-400">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default SignupForm;
