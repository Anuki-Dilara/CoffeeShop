import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Use Navigate for redirects
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('adminToken'); // Check if JWT exists in localStorage

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} // Use Navigate instead of Redirect
        />
      </Routes>
    </Router>
  );
};

export default App;
