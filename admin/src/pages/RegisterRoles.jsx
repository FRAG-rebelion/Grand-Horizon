import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterRoles() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/registeradmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setName('');
        setEmail('');
        setPassword('');
        setRole(0);
      } else {
        setError(data.error || 'Failed to register admin.');
      }
    } catch (err) {
      console.error('Error registering admin:', err);
      setError('Network error during registration.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-BG px-4">
      <div className="bg-BC p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-prime text-center mb-6">
          Register New Admin
        </h2>
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-text font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter admin's name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-H"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-text font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin's email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-H"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-text font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin's password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-H"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-text font-medium mb-2">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-H"
            >
              <option value={0}>No Access (0)</option>
              <option value={1}>Main Admin (1)</option>
              <option value={2}>Bookings & Users (2)</option>
              <option value={3}>Menu (3)</option>
              <option value={4}>Orders (4)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-prime hover:bg-second text-white font-semibold py-3 rounded hover:bg-opacity-90 transition duration-200"
          >
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterRoles;
