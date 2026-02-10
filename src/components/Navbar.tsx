// components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "/images/logo.png";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Trekking Packages', path: '/trekking-packages' },
    { name: 'Cultural Tours', path: '/cultural-tours' },
    { name: 'Spiritual Tours', path: '/spiritual-tours' },
    { name: 'Winter Packages', path: '/winter-packages' },
    { name: 'Monsoon Packages', path: '/monsoon-packages' },
    { name: 'Adventures', path: '/adventure' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed w-full bg-white bg-fixed border-b border-gray-200 text-snow-white z-50 px-6 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
        {/* Logo Image */}
        <img
          src={logo}
          alt="8848 Trekking & Tours Logo"
          className="h-20 w-auto"
        />
      </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="hover:text-accent-orange transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-snow-white focus:outline-none"
          >
            <div className="w-6 h-0.5 bg-snow-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-snow-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-snow-white"></div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full right-0 w-64 h-screen bg-deep-blue p-6 shadow-xl"
          >
            <div className="flex flex-col space-y-6">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path}
                  className="text-snow-white hover:text-accent-orange text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;