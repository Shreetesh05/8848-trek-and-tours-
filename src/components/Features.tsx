// components/Features.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: "🧭",
      title: "Expert Guides",
      description: "Our certified guides have extensive knowledge of Himalayan terrain and local culture"
    },
    {
      id: 2,
      icon: "🛡️",
      title: "Safe Travel",
      description: "Your safety is our priority with comprehensive emergency protocols and equipment"
    },
    {
      id: 3,
      icon: "🏠",
      title: "Local Experience",
      description: "Authentic experiences with local communities for a truly immersive journey"
    },
    {
      id: 4,
      icon: "📞",
      title: "24/7 Support",
      description: "Round-the-clock assistance before, during, and after your adventure"
    },
    {
      id: 5,
      icon: "🎯",
      title: "Customized Trips",
      description: "Tailor-made itineraries to match your preferences and fitness level"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-deep-blue mb-4"
        >
          Why Choose 8848 Trekking & Tours
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          We are committed to providing exceptional adventure experiences with the highest standards of service and safety
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-deep-blue mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;