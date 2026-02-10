// src/components/NationalParksPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Park = {
  id: number;
  name: string;
  established: number;
  area: string;
  elevation: string;
  highlights: string[];
  description: string;
  image: string;
  wildlife: string[];
  activities: string[];
};

const NationalParksPage: React.FC = () => {
  const [activePark, setActivePark] = useState<number>(1);
  
  const parks: Park[] = [
    {
      id: 1,
      name: "Sagarmatha National Park",
      established: 1976,
      area: "1,148 km²",
      elevation: "2,845m - 8,848m",
      highlights: ["Mount Everest", "Sherpa culture", "Ancient monasteries"],
      description: "Home to the world's highest peak, Mount Everest, this UNESCO World Heritage site offers breathtaking landscapes, unique Sherpa culture, and diverse wildlife. The park encompasses the upper catchments of the Dudh Koshi river system.",
      image: "/images/nationalparks/sagarmathanationalpark.jpg",
      wildlife: ["Snow leopard", "Red panda", "Himalayan tahr", "Himalayan monal"],
      activities: ["Trekking", "Mountain climbing", "Cultural tours", "Wildlife viewing"]
    },
    {
      id: 2,
      name: "Chitwan National Park",
      established: 1973,
      area: "952.63 km²",
      elevation: "150m - 815m",
      highlights: ["One-horned rhinoceros", "Bengal tigers", "Tharu culture"],
      description: "Nepal's first national park and a UNESCO World Heritage site, Chitwan is famous for its population of one-horned rhinoceros and Bengal tigers. The park features diverse ecosystems including sal forests, grasslands, and riverine forests.",
      image: "/images/nationalparks/chitwannationalpark.jpg",
      wildlife: ["Bengal tiger", "One-horned rhinoceros", "Gharial crocodile", "Sloth bear"],
      activities: ["Jungle safari", "Elephant ride", "Canoeing", "Bird watching"]
    },
    {
      id: 3,
      name: "Bardia National Park",
      established: 1988,
      area: "968 km²",
      elevation: "152m - 1,440m",
      highlights: ["Tiger conservation area", "Wild elephants", "Karnali River"],
      description: "The largest and most undisturbed national park in Nepal's Terai region, Bardia provides a pristine wilderness experience. It's known for its successful tiger conservation efforts and populations of wild elephants.",
      image: "/images/nationalparks/bardiyanationalpark.jpg",
      wildlife: ["Royal Bengal tiger", "Asian elephant", "Gangetic dolphin", "Swamp deer"],
      activities: ["Jungle walks", "Tharu cultural experience", "River rafting", "Fishing"]
    },
    {
      id: 4,
      name: "Langtang National Park",
      established: 1976,
      area: "1,710 km²",
      elevation: "792m - 7,245m",
      highlights: ["Langtang Valley", "Gosainkunda Lake", "Tamang heritage"],
      description: "Closest national park to Kathmandu, Langtang features a spectacular combination of natural and cultural attractions. The park ranges from subtropical forests to alpine meadows and snow-capped peaks.",
      image: "/images/nationalparks/langtangnationalpark.jpeg",
      wildlife: ["Red panda", "Himalayan black bear", "Ghoral", "Rhesus monkey"],
      activities: ["Trekking", "Mountain biking", "Pilgrimage tours", "Wildflower viewing"]
    },
    {
      id: 5,
      name: "Rara National Park",
      established: 1976,
      area: "106 km²",
      elevation: "2,800m - 4,039m",
      highlights: ["Rara Lake", "Remote wilderness", "Pristine forests"],
      description: "Centered around Nepal's largest lake, Rara National Park is one of the most remote protected areas. The park offers stunning mountain scenery reflected in the crystal-clear waters of Rara Lake.",
      image: "/images/nationalparks/raranationalpark.jpg",
      wildlife: ["Red panda", "Himalayan black bear", "Musk deer", "Snow trout"],
      activities: ["Trekking", "Boating", "Bird watching", "Photography"]
    },
    {
      id: 6,
      name: "Shey Phoksundo National Park",
      established: 1984,
      area: "3,555 km²",
      elevation: "2,130m - 6,883m",
      highlights: ["Phoksundo Lake", "Ancient monasteries", "Snow leopards"],
      description: "Nepal's largest national park protects the trans-Himalayan ecosystem. The park features the stunning Shey Phoksundo Lake, one of Nepal's deepest and most beautiful alpine lakes.",
      image: "/images/nationalparks/sheynationalpark.jpg",
      wildlife: ["Snow leopard", "Blue sheep", "Himalayan tahr", "Tibetan wolf"],
      activities: ["Wildlife viewing", "Trekking", "Cultural tours", "Photography"]
    },
    {
      id: 7,
      name: "Khaptad National Park",
      established: 1984,
      area: "225 km²",
      elevation: "1,400m - 3,300m",
      highlights: ["Khaptad Daha", "Ashram of Khaptad Baba", "Diverse meadows"],
      description: "A mid-mountain park in the Far-Western region, Khaptad features a rolling plateau with grasslands, forests, and ponds. The park is known for its religious significance and floral diversity.",
      image: "/images/nationalparks/khaptadnationalpark.jpg",
      wildlife: ["Leopard", "Himalayan black bear", "Goral", "Rhesus macaque"],
      activities: ["Trekking", "Meditation", "Bird watching", "Wildflower viewing"]
    }
  ];

  const currentPark = parks.find(park => park.id === activePark) || parks[0];

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">HIMALAYAN TREKS</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500 mb-4">
           
NEPAL'S NATIONAL PARKS
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the breathtaking biodiversity and majestic landscapes of Nepal's protected wilderness areas
          </p>
        </div>

        
        {/* Parks Navigation */}
        <section className="py-8 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {parks.map(park => (
              <button
                key={park.id}
                onClick={() => setActivePark(park.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                  activePark === park.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {park.name}
              </button>
            ))}
          </div>
        </section>
        
        {/* Park Detail Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {currentPark.name}
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm text-blue-600 mb-1">ESTABLISHED</h3>
                <p className="text-xl font-bold">{currentPark.established}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm text-blue-600 mb-1">AREA</h3>
                <p className="text-xl font-bold">{currentPark.area}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm text-blue-600 mb-1">ELEVATION</h3>
                <p className="text-xl font-bold">{currentPark.elevation}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm text-blue-600 mb-1">UNESCO SITE</h3>
                <p className="text-xl font-bold">{currentPark.id === 1 || currentPark.id === 2 ? "Yes" : "No"}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 text-lg">{currentPark.description}</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Key Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPark.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-600">Wildlife</h3>
                <div className="flex flex-wrap gap-2">
                  {currentPark.wildlife.map((animal, index) => (
                    <span key={index} className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-600">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {currentPark.activities.map((activity, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative rounded-3xl overflow-hidden h-[500px] border border-gray-200 shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white drop-shadow-md">{currentPark.name}</h3>
              <p className="text-blue-100 drop-shadow-md">{currentPark.elevation}</p>
            </div>
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
              <div className="text-center">
               <img 
  src={currentPark.image} 
  alt={currentPark.name} 
  className="w-full h-full object-cover"
/>

                <h3 className="text-xl font-bold text-gray-800">Park Visualization</h3>
                <p className="text-gray-600 mt-2">{currentPark.name}</p>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Conservation Section */}
        <section className="py-12 mb-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Conservation Efforts</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600">
              Nepal is a global leader in conservation, with successful programs protecting endangered species and their habitats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tiger Conservation",
                stat: "126% Increase",
                description: "Nepal is on track to become the first country to double its wild tiger population",
                icon: "🐅"
              },
              {
                title: "Rhino Protection",
                stat: "90% Survival Rate",
                description: "Strict anti-poaching measures have dramatically increased rhino populations",
                icon: "🦏"
              },
              {
                title: "Community Involvement",
                stat: "100+ Buffer Zones",
                description: "Local communities actively participate in conservation through buffer zone programs",
                icon: "👥"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-blue-600">{item.title}</h3>
                <div className="text-3xl font-bold mb-2 text-cyan-600">{item.stat}</div>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 mb-12 text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ready for an Adventure?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Experience the majestic beauty of Nepal's national parks with our expert guides
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Book Your Trek
            </button>
            <button className="px-8 py-4 bg-white border border-blue-500 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors">
              Request Itinerary
            </button>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default NationalParksPage;