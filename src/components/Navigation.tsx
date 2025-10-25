import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl">☕</span>
              <span className="ml-2 text-xl font-bold text-cafe-brown">CDO Café Explorer</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/') 
                  ? 'text-cafe-dark' 
                  : 'text-cafe-brown hover:text-cafe-dark'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/nominate" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/nominate') 
                  ? 'text-cafe-dark' 
                  : 'text-cafe-brown hover:text-cafe-dark'
              }`}
            >
              Nominate
            </Link>
            <Link 
              to="/map" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/map') 
                  ? 'text-cafe-dark' 
                  : 'text-cafe-brown hover:text-cafe-dark'
              }`}
            >
              Map
            </Link>
            <Link 
              to="/admin" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/admin') 
                  ? 'text-cafe-dark' 
                  : 'text-cafe-brown hover:text-cafe-dark'
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

