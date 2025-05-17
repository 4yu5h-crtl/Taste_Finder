
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-restaurant-orange">Taste<span className="text-restaurant-red">Finder</span></span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`${isActive('/') ? 'text-restaurant-orange font-medium' : 'text-gray-600 hover:text-restaurant-orange'} transition-colors`}>
            Home
          </Link>
          <Link to="/explore" className={`${isActive('/explore') ? 'text-restaurant-orange font-medium' : 'text-gray-600 hover:text-restaurant-orange'} transition-colors`}>
            Explore
          </Link>
          <Button variant="default" size="sm">
            Get Random Recommendation
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden animate-fade-in p-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`${isActive('/') ? 'text-restaurant-orange font-medium' : 'text-gray-600'} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/explore" 
                className={`${isActive('/explore') ? 'text-restaurant-orange font-medium' : 'text-gray-600'} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Button variant="default" size="sm" className="w-full" onClick={() => setIsMenuOpen(false)}>
                Get Random Recommendation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
