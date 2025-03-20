import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Only once


const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  // Handle input changes for username and password
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission (Login request)
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/auth/login', credentials)
      .then((res) => {
        // Store JWT token in localStorage
        localStorage.setItem('adminToken', res.data.token);
        
        // Redirect to Admin Dashboard
        history.push('/admin');
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || 'Login failed');
      });
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
