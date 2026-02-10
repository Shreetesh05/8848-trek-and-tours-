// components/FloatingCTA.tsx
import React from 'react';
import { motion } from 'framer-motion';

const FloatingCTA: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button className="bg-accent-orange hover:bg-opacity-90 text-snow-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center">
        <span className="mr-2">Plan Your Trip</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.div>
  );
};

export default FloatingCTA;