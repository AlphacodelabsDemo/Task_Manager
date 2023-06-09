import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Input from '../../utils/input';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginData } from '../../redux/actions/auth-actions';
import Loader from '../../utils/loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const authState = useSelector((state) => state.authReducer);
  const { loading, isLoggedIn, error } = authState;
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || '/');
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors) {
      return;
    }
  
    try {
      const response = await api.post('/auth/signin', formData);
      dispatch(postLoginData(response.data));
      toast.success('Login successful');
      console.log('Token:', response.data.token); // Console the token
      navigate('/profile');
    } catch (error) {
      console.error(error);
      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('An error occurred');
      }
    }
  };
  

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length > 0;
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? 'block' : 'hidden'}`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm p-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
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
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="Your Password.."
            onChange={handleChange}
          />
          {fieldError('password')}
        </div>

        <button
          className="w-full bg-primary text-white py-2 px-4 rounded font-medium hover:bg-primary-dark"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader /> : 'Submit'}
        </button>

        {error && (
          <div className="pt-2">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="pt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500">
              Signup here
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
