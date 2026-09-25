import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save the digital key to the browser's memory
        localStorage.setItem('token', data.token);
        // Save basic user info to customize the UI later
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setMessage('Login successful!');
        
        // Send them to the dashboard after 1 second
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setMessage('Server error. Please check your backend connection.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-amber-700">Welcome Back</h2>
        
        {message && (
          <div className={`p-3 mb-4 text-sm text-center text-white rounded ${message.includes('successful') ? 'bg-green-600' : 'bg-amber-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 mt-4 font-bold text-white transition-colors rounded-md bg-amber-700 hover:bg-amber-800"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}