import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-indigo-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-serif">
            <BookOpen size={24} />
            <span className="hidden sm:inline">Seguimiento del progreso de la tesis</span>
            <span className="sm:hidden">Thesis Tracker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition-colors">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="hover:text-indigo-200 transition-colors">
                  Admin Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-1 hover:text-indigo-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3 border-t border-indigo-800 mt-4">
            <Link 
              to="/" 
              className="block hover:text-indigo-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/admin" 
                  className="block hover:text-indigo-200 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center space-x-1 hover:text-indigo-200 transition-colors py-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;