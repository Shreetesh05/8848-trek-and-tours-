import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  difficulty: string;
  season: string;
  image: string;
  groupSize: string;
  altitude: string;
  rating: number;
  featured?: boolean;
}

const Packages: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const packages: Package[] = [
    {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "Journey to the foot of the world's highest mountain through stunning Himalayan landscapes. Experience Sherpa culture and witness breathtaking views of the Himalayas.",
      price: "$1,499",
      duration: "14 days",
      difficulty: "Moderate to Challenging",
      season: "Spring, Autumn",
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      groupSize: "2-12 people",
      altitude: "5,364m",
      rating: 4.9,
      featured: true
    },
    {
      id: 2,
      title: "Annapurna Circuit",
      description: "Experience diverse ecosystems from subtropical forests to high altitude landscapes. Cross the Thorong La Pass and witness some of Nepal's most spectacular scenery.",
      price: "$1,299",
      duration: "18 days",
      difficulty: "Moderate",
      season: "Spring, Autumn",
      image: "https://images.unsplash.com/photo-1537981262443-4a6f84c35c30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
      groupSize: "2-10 people",
      altitude: "5,416m",
      rating: 4.8
    },
    {
      id: 3,
      title: "Cultural Heritage Tour",
      description: "Explore Nepal's rich cultural heritage through ancient temples and historical sites. Visit UNESCO World Heritage Sites and experience traditional Nepalese culture.",
      price: "$899",
      duration: "7 days",
      difficulty: "Easy",
      season: "All Year",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      groupSize: "2-15 people",
      altitude: "1,400m",
      rating: 4.7
    },
    {
      id: 4,
      title: "Langtang Valley Trek",
      description: "Discover the beautiful Langtang region with its stunning valleys, traditional Tamang villages, and panoramic mountain views of Langtang Lirung.",
      price: "$1,099",
      duration: "10 days",
      difficulty: "Moderate",
      season: "Spring, Autumn",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      groupSize: "2-8 people",
      altitude: "4,984m",
      rating: 4.6
    },
    {
      id: 5,
      title: "Manaslu Circuit Trek",
      description: "A spectacular journey around the eighth highest mountain in the world. Experience remote trails, diverse cultures, and breathtaking Himalayan scenery.",
      price: "$1,599",
      duration: "16 days",
      difficulty: "Challenging",
      season: "Spring, Autumn",
      image: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      groupSize: "2-8 people",
      altitude: "5,106m",
      rating: 4.9,
      featured: true
    },
    {
      id: 6,
      title: "Upper Mustang Trek",
      description: "Explore the ancient kingdom of Mustang with its unique Tibetan culture, dramatic desert landscapes, and ancient cave monasteries.",
      price: "$1,799",
      duration: "14 days",
      difficulty: "Moderate",
      season: "Spring, Autumn",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      groupSize: "2-6 people",
      altitude: "3,840m",
      rating: 4.8
    }
  ];

  const packageTypes = [
    { id: 'all', name: 'All Packages' },
    { id: 'trekking', name: 'Trekking' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'featured', name: 'Featured' }
  ];

  const filteredPackages = activeFilter === 'all' 
    ? packages 
    : activeFilter === 'featured' 
      ? packages.filter(pkg => pkg.featured)
      : packages; // For simplicity, we're filtering only by featured. You can extend this logic.

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            Our Premium Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover handcrafted adventures designed to provide unforgettable experiences in the Himalayas
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {packageTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveFilter(type.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === type.id
                  ? 'bg-accent-orange text-snow-white shadow-lg'
                  : 'bg-white text-deep-blue hover:bg-gray-100 shadow-md'
              }`}
            >
              {type.name}
            </button>
          ))}
        </motion.div>
        
        {/* Packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, index) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {pkg.featured && (
                  <div className="absolute top-4 left-4 bg-accent-orange text-snow-white text-sm font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-snow-white text-deep-blue text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {pkg.duration}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-deep-blue">{pkg.title}</h3>
                  <div className="flex items-center bg-earth-green text-snow-white text-xs font-bold px-2 py-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {pkg.rating}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-5 h-16 overflow-hidden">{pkg.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-earth-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {pkg.difficulty}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-earth-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {pkg.groupSize}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-earth-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {pkg.altitude}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-earth-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.season}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-accent-orange">{pkg.price}</div>
                  <Link 
                    to={`/package/${pkg.id}`}
                    className="bg-deep-blue hover:bg-opacity-90 text-snow-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            to="/trekking-packages"
            className="inline-flex items-center bg-gradient-to-r from-deep-blue to-earth-green hover:opacity-90 text-snow-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300"
          >
            Explore All Packages
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;