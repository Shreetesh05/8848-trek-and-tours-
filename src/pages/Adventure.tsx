import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMountain, 
  FaWater, 
  FaWind, 
  FaTree, 
  FaArrowRight,
  FaStar,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaFilter,
  FaSearch,
  FaHeart,
  FaShare,
  FaUserFriends
} from 'react-icons/fa';

interface Tour {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  elevation?: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  category: string[];
  bestSeason: string[];
  includes: string[];
  featured?: boolean;
}

const NepalAdventures: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteTours, setFavoriteTours] = useState<number[]>([]);
  
  const tours: Tour[] = [
    {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "Conquer the world's highest mountain trails with sherpa guides through the legendary Khumbu Valley. Experience breathtaking views and authentic Sherpa culture.",
      highlights: ["Kala Patthar viewpoint", "Tengboche Monastery", "Namche Bazaar", "Sherpa Culture", "Khumbu Icefall"],
      image: "/images/adventure/Everestbasecamp.jpg",
      difficulty: "Challenging",
      elevation: "5,364m",
      duration: "14 Days",
      price: "$1250",
      rating: 4.9,
      reviews: 342,
      category: ["Trekking", "Mountain", "Cultural"],
      bestSeason: ["Mar-May", "Sep-Nov"],
      includes: ["Permits", "Guide", "Accommodation", "Meals"],
      featured: true
    },
    {
      id: 2,
      title: "Annapurna Circuit",
      description: "Journey through diverse landscapes from lush rice terraces to the majestic Thorong La pass. A complete Himalayan experience.",
      highlights: ["Poon Hill sunrise", "Muktinath Temple", "Marpha village", "Thorong La Pass", "Hot Springs"],
      image: "/images/adventure/annapurnacircuit.jpg",
      difficulty: "Moderate",
      elevation: "5,416m",
      duration: "18 Days",
      price: "$980",
      rating: 4.8,
      reviews: 289,
      category: ["Trekking", "Mountain", "Cultural"],
      bestSeason: ["Mar-May", "Sep-Nov"],
      includes: ["Permits", "Guide", "Accommodation", "Transport"]
    },
    {
      id: 3,
      title: "Skydiving over Himalayas",
      description: "Experience the ultimate adrenaline rush with a tandem skydive above the world's highest peaks. Breathtaking 360° mountain views.",
      highlights: ["15,000ft freefall", "Panoramic mountain views", "Professional instructors", "Video Package", "Certificate"],
      image: "/images/adventure/skydiving.jpg",
      difficulty: "Extreme",
      elevation: "15,000ft",
      duration: "1 Day",
      price: "$450",
      rating: 4.9,
      reviews: 156,
      category: ["Air Sports", "Extreme", "Adventure"],
      bestSeason: ["Oct-Dec", "Mar-May"],
      includes: ["Equipment", "Instructor", "Certificate", "Video"]
    },
    {
      id: 4,
      title: "Chitwan Jungle Safari",
      description: "Spot rhinos, tigers and crocodiles in Nepal's first national park on thrilling jungle excursions with expert naturalists.",
      highlights: ["Elephant safari", "Tharu cultural show", "Bird watching", "Jungle Walk", "Canoe Ride"],
      image: "/images/adventure/chitwanjunglesafari.jpg",
      difficulty: "Easy",
      elevation: "415m",
      duration: "3 Days",
      price: "$320",
      rating: 4.6,
      reviews: 187,
      category: ["Wildlife", "Nature", "Cultural"],
      bestSeason: ["Sep-May"],
      includes: ["Park Fees", "Guide", "Accommodation", "Meals"]
    },
    {
      id: 5,
      title: "Pokhara Paragliding",
      description: "Soar above Phewa Lake with panoramic Himalayan views on a tandem paragliding adventure. Experience the freedom of flight.",
      highlights: ["30min flight", "Professional pilots", "GoPro footage included", "Lake Views", "Thermal Flying"],
      image: "/images/adventure/pokharaparagliding.jpg",
      difficulty: "Moderate",
      elevation: "1,600m",
      duration: "2 Hours",
      price: "$120",
      rating: 4.7,
      reviews: 423,
      category: ["Air Sports", "Adventure", "Scenic"],
      bestSeason: ["Sep-Dec", "Feb-May"],
      includes: ["Equipment", "Pilot", "Video", "Insurance"]
    },
    {
      id: 6,
      title: "Bhote Koshi Bungee",
      description: "Plunge 160m into the Bhote Koshi gorge on one of the world's highest bungee jumps. Adrenaline guaranteed!",
      highlights: ["160m freefall", "Spectacular gorge views", "Professional safety", "Video Recording", "Certificate"],
      image: "/images/adventure/bhotekoshibungeejump.jpg",
      difficulty: "Extreme",
      elevation: "1,600m",
      duration: "4 Hours",
      price: "$85",
      rating: 4.8,
      reviews: 234,
      category: ["Extreme", "Adventure", "Thrill"],
      bestSeason: ["Sep-May"],
      includes: ["Equipment", "Instructor", "Video", "Certificate"]
    },
    {
      id: 7,
      title: "Upper Mustang Trek",
      description: "Explore the forbidden kingdom with its unique Tibetan culture and lunar landscapes. A journey back in time.",
      highlights: ["Lo Manthang", "Ancient monasteries", "Cave dwellings", "Tibetan Culture", "Desert Landscape"],
      image: "/images/adventure/uppermustang.jpg",
      difficulty: "Moderate",
      elevation: "3,840m",
      duration: "16 Days",
      price: "$1800",
      rating: 4.7,
      reviews: 123,
      category: ["Trekking", "Cultural", "Desert"],
      bestSeason: ["Mar-Nov"],
      includes: ["Special Permit", "Guide", "Accommodation", "Transport"]
    },
    {
      id: 8,
      title: "Trishuli River Rafting",
      description: "Navigate thrilling rapids through scenic gorges on Nepal's most popular rafting river. Perfect for beginners and experts.",
      highlights: ["Class III-IV rapids", "Riverside camping", "Jungle scenery", "White Water", "Beach BBQ"],
      image: "/images/adventure/trishuli.jpg",
      difficulty: "Moderate",
      duration: "2 Days",
      price: "$180",
      rating: 4.5,
      reviews: 198,
      category: ["Water Sports", "Adventure", "River"],
      bestSeason: ["Sep-Dec", "Feb-May"],
      includes: ["Equipment", "Guide", "Meals", "Camping"]
    },
    {
      id: 9,
      title: "Pokhara Hot Air Balloon",
      description: "Float serenely above Pokhara valley with breathtaking views of the Annapurna range at sunrise.",
      highlights: ["Sunrise flight", "360° mountain views", "Champagne breakfast", "Lake Views", "Photo Session"],
      image: "/images/adventure/hotairballon.jpg",
      difficulty: "Easy",
      duration: "2 Hours",
      price: "$250",
      rating: 4.9,
      reviews: 167,
      category: ["Air Sports", "Scenic", "Luxury"],
      bestSeason: ["Sep-May"],
      includes: ["Flight", "Pilot", "Breakfast", "Photos"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Adventures', icon: <FaMountain />, count: tours.length },
    { id: 'Trekking', label: 'Trekking', icon: <FaMountain />, count: tours.filter(t => t.category.includes('Trekking')).length },
    { id: 'Air Sports', label: 'Air Sports', icon: <FaWind />, count: tours.filter(t => t.category.includes('Air Sports')).length },
    { id: 'Water Sports', label: 'Water Sports', icon: <FaWater />, count: tours.filter(t => t.category.includes('Water Sports')).length },
    { id: 'Wildlife', label: 'Wildlife', icon: <FaTree />, count: tours.filter(t => t.category.includes('Wildlife')).length },
    { id: 'Extreme', label: 'Extreme Sports', icon: <FaWind />, count: tours.filter(t => t.category.includes('Extreme')).length },
    { id: 'Cultural', label: 'Cultural', icon: <FaTree />, count: tours.filter(t => t.category.includes('Cultural')).length }
  ];

  const difficultyColors = {
    "Easy": "bg-green-100 text-green-800 border border-green-200",
    "Moderate": "bg-yellow-100 text-yellow-800 border border-yellow-200",
    "Challenging": "bg-orange-100 text-orange-800 border border-orange-200",
    "Extreme": "bg-red-100 text-red-800 border border-red-200"
  };

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      // Filter by category
      if (activeFilter !== 'all' && !tour.category.includes(activeFilter)) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          tour.title.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query) ||
          tour.highlights.some(h => h.toLowerCase().includes(query)) ||
          tour.category.some(c => c.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [activeFilter, searchQuery]);

  const toggleFavorite = (id: number) => {
    setFavoriteTours(prev => 
      prev.includes(id) 
        ? prev.filter(tourId => tourId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-blue-900/60 to-indigo-900/70"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white text-sm font-semibold mb-6">
              <span>🏔️</span>
              <span>World's Best Adventure Destination</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              NEPAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ADVENTURES</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
              Experience the Himalayas like never before with our expertly crafted expeditions. 
              From trekking to paragliding, we offer the ultimate adventure tours in Nepal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3">
                <span>🚀</span>
                Explore All Adventures
                <FaArrowRight />
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-3">
                <FaCalendar />
                Book Consultation
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated mountains */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Adventures Completed", icon: "🥾" },
              { number: "98%", label: "Success Rate", icon: "✅" },
              { number: "500+", label: "Expert Guides", icon: "👨‍🏫" },
              { number: "15", label: "Years Experience", icon: "🏆" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Categories */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b flex items-center gap-2">
                    <FaFilter />
                    Adventure Types
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveFilter(category.id)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all ${
                          activeFilter === category.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                            : 'hover:bg-blue-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.label}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          activeFilter === category.id ? 'bg-white/20' : 'bg-gray-100'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Difficulty Filter */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FaTree />
                      Difficulty
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(difficultyColors).map(([diff, classes]) => (
                        <button
                          key={diff}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${classes}`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Tours Grid */}
              <div className="lg:w-3/4">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search adventures, activities, or destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-4 pl-12 rounded-2xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Results Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {activeFilter === 'all' ? 'All Adventures' : `${activeFilter} Adventures`}
                      <span className="text-gray-500 text-lg font-normal ml-2">
                        ({filteredTours.length} found)
                      </span>
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Discover epic adventures in the Himalayas
                    </p>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilter('all');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                {/* Featured Tour */}
                {filteredTours.length > 0 && filteredTours[0].featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl">
                      <div className="md:flex">
                        <div className="md:w-2/5 relative">
                          <img 
                            src={filteredTours[0].image} 
                            alt={filteredTours[0].title}
                            className="w-full h-64 md:h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold">
                            🌟 FEATURED
                          </div>
                        </div>
                        <div className="md:w-3/5 p-6 text-white">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold">{filteredTours[0].title}</h3>
                            <button 
                              onClick={() => toggleFavorite(filteredTours[0].id)}
                              className="text-2xl hover:scale-110 transition-transform"
                            >
                              <FaHeart className={favoriteTours.includes(filteredTours[0].id) ? "text-red-500" : "text-white/70"} />
                            </button>
                          </div>
                          <p className="text-white/90 mb-4">{filteredTours[0].description}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {filteredTours[0].highlights.slice(0, 3).map((highlight, index) => (
                              <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                {highlight}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <FaClock />
                              <span>{filteredTours[0].duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaStar className="text-yellow-300" />
                              <span>{filteredTours[0].rating} ({filteredTours[0].reviews} reviews)</span>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${difficultyColors[filteredTours[0].difficulty]}`}>
                              {filteredTours[0].difficulty}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">{filteredTours[0].price}</div>
                            <button 
                              onClick={() => setSelectedTour(filteredTours[0])}
                              className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tours Grid */}
                {filteredTours.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                    <div className="text-6xl mb-4">🏔️</div>
                    <h3 className="text-2xl font-bold mb-2">No adventures found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilter('all');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTours.slice(1).map((tour, index) => (
                      <motion.div
                        key={tour.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={tour.image} 
                              alt={tour.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                            
                            {/* Favorite Button */}
                            <button 
                              onClick={() => toggleFavorite(tour.id)}
                              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-white/30 transition-colors"
                            >
                              <FaHeart className={favoriteTours.includes(tour.id) ? "text-red-500" : "text-white"} />
                            </button>
                            
                            {/* Difficulty Badge */}
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[tour.difficulty]}`}>
                                {tour.difficulty}
                              </span>
                            </div>
                            
                            {/* Categories */}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                              {tour.category.slice(0, 2).map((cat, i) => (
                                <span key={i} className="px-2 py-1 bg-black/60 text-white text-xs rounded backdrop-blur-sm">
                                  {cat}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="p-5 flex-grow">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {tour.title}
                              </h3>
                              <div className="flex items-center gap-1 text-amber-500">
                                <FaStar className="text-sm" />
                                <span className="font-bold">{tour.rating}</span>
                                <span className="text-gray-500 text-sm">({tour.reviews})</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                            
                            {/* Highlights */}
                            <div className="mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <FaMapMarkerAlt />
                                <span className="font-medium">Highlights</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {tour.highlights.slice(0, 2).map((highlight, i) => (
                                  <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                    {highlight}
                                  </span>
                                ))}
                                {tour.highlights.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{tour.highlights.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-6">
                              <div className="flex items-center gap-2">
                                <FaClock className="text-blue-500" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaUserFriends className="text-green-500" />
                                <span>Group Tour</span>
                              </div>
                              <div className="flex items-center gap-2 col-span-2">
                                <FaCalendar className="text-purple-500" />
                                <span>Best: {tour.bestSeason.join(', ')}</span>
                              </div>
                            </div>
                            
                            {/* Bottom Section */}
                            <div className="mt-auto">
                              <div className="flex justify-between items-center">
                                <div className="text-xl font-bold text-gray-900">{tour.price}</div>
                                <button 
                                  onClick={() => setSelectedTour(tour)}
                                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Himalayan Adventure?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Book your adventure today and get a free adventure gear kit and 24/7 support from our expert guides.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              🚀 Book Your Adventure
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
              📞 Talk to Our Experts
            </button>
          </div>
        </div>
      </div>

      {/* Tour Detail Modal */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTour(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img 
                  src={selectedTour.image} 
                  alt={selectedTour.title}
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => setSelectedTour(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors shadow-lg"
                >
                  &times;
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white">{selectedTour.title}</h2>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-700">{selectedTour.price}</div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-700">{selectedTour.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <div className="text-2xl font-bold text-amber-700">⭐ {selectedTour.rating}</div>
                    <div className="text-sm text-gray-600">Rating ({selectedTour.reviews} reviews)</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-700">{selectedTour.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Adventure Overview</h3>
                  <p className="text-gray-700">{selectedTour.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    {/* Highlights */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Adventure Highlights</h3>
                      <ul className="space-y-2">
                        {selectedTour.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Best Season */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Best Season</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTour.bestSeason.map((season, index) => (
                          <span key={index} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                            {season}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div>
                    {/* What's Included */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">What's Included</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedTour.includes.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Categories */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">Adventure Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTour.category.map((cat, index) => (
                          <span key={index} className="px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-lg font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all text-lg">
                      🚀 Book This Adventure
                    </button>
                    <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                      <FaShare className="inline mr-2" />
                      Share
                    </button>
                  </div>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Free cancellation up to 30 days before departure
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NepalAdventures;