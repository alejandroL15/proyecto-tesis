import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-indigo-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm opacity-80">© {year} Thesis Progress Tracker</p>
          </div>
          
          <div className="flex space-x-4 items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-200 transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
            <p className="text-sm opacity-80">
              Hosted on GitHub Pages
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;