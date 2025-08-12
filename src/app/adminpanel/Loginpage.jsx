
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import process from "process";
import axios from 'axios';

export default function LoginPage() {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const newErrors={};

    if (!adminName.trim()) {
      newErrors.adminName = 'Admin name is required.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send request to the correct API endpoint with credentials
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/login`, 
        { adminName, password },
        { withCredentials: true } // Important: include credentials for session
      );
      
      console.log('Login successful', response.data);
      
      if (response.data.isAdmin) {

        // Redirect to admin panel (your route is /dashboard)
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.error || 'Login failed. Please check your credentials.',
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen py-12">
      <div className="w-full max-w-md ">
        <h1 className="text-6xl font-extrabold text-center mb-8 text-[var(--primary)]">Login</h1>

        {errors.general && (
          <p className="mb-4 text-red-600 text-sm text-center">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xl font-extrabold">
              admin name
            </label>
            <input
              id="admin-name"
              name="admin-name"
              type="text"
              autoComplete="admin-name"
              required
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.adminName && <p className="text-sm text-red-600 mt-1">{errors.adminName}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-xl font-extrabold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent cursor-pointer rounded-md shadow-sm text-sm font-extrabold text-white bg-[var(--primary-color)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

     
      </div>
    </div>
  );
}
