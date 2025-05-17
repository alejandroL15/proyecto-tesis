import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800); // Simulated loading delay
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-900 p-6 text-white text-center">
          <h2 className="text-2xl font-serif font-semibold">Admin Login</h2>
          <p className="text-indigo-200 mt-2">
            Enter your credentials to manage thesis uploads
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md
              shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
              transition-all duration-200
            `}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="text-sm text-center text-gray-500 pt-2">
            <p>For demo purposes, use:</p>
            <p className="font-medium">Username: admin / Password: thesis2025</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;