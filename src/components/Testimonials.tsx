// components/Testimonials.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  text: string;
  rating: number;
  image: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "Australia",
      text: "The Everest Base Camp trek was the most incredible experience of my life. The guides were knowledgeable and supportive, and the scenery was beyond breathtaking.",
      rating: 5,
      image: "/sarah.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      country: "Canada",
      text: "8848 Trekking provided an authentic cultural experience while ensuring our safety and comfort throughout the journey. Highly recommended!",
      rating: 5,
      image: "/michael.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      country: "Spain",
      text: "The attention to detail and personalized service made our Annapurna Circuit trek absolutely perfect. Will definitely return for another adventure!",
      rating: 5,
      image: "/emma.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-deep-blue text-snow-white px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          What Our Travelers Say
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Hear from adventurers who have experienced the Himalayas with us
        </motion.p>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-accent-orange text-xl">★</span>
                ))}
              </div>
              
              <p className="text-lg italic mb-8">"{testimonials[currentIndex].text}"</p>
              
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-snow-white mr-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-300">{testimonials[currentIndex].country}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-accent-orange text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            &lt;
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-accent-orange text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            &gt;
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-accent-orange' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;