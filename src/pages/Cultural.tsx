import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';  
import { 
  Search,
  Star, 
  Clock, 
  Users,
  ChevronRight,
  Mountain,
  Globe,
  Heart,
  Calendar,
  TrendingUp,
  Shield,
  Phone,
  Mail,
  Navigation,
  Eye,
  BookOpen
} from 'lucide-react';

// Type definitions
interface TourPackage {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  groupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  rating: number;
  image: string;
  featured: boolean;
  locations: string[];
  culturalHighlights: string[];
  religion: string;
  keySignificance: string;
  accessFromIndia: string;
  indianVisitors: string;
  category: 'Hindu' | 'Buddhist' | 'Mixed';
  bestTimeToVisit: string;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Mock data for Nepal cultural and religious sites
const nepalTourPackages: TourPackage[] = [
  {
    id: 1,
    title: "Pashupatinath Temple",
    description: "Oldest and holiest Shiva temple in Nepal; UNESCO World Heritage Site. Considered Shiva's sacred liṅga, with origins in the Skanda Purana legend.",
    price: 299,
    duration: "1 Day",
    groupSize: 15,
    difficulty: "Easy",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Kathmandu"],
    culturalHighlights: ["Shiva Temple", "Sacred River", "Cremation Rituals", "Sadhus", "Mahashivaratri Festival"],
    religion: "Hindu (Shiva)",
    keySignificance: "Oldest and holiest Shiva temple in Nepal; UNESCO World Heritage Site. Considered Shiva's sacred liṅga, with origins in the Skanda Purana legend (Shiva's head on the Bagmati River).",
    accessFromIndia: "Via Kathmandu (Tribhuvan Airport) or by bus/car from India (e.g. via Gorakhpur–Sunauli border to Kathmandu).",
    indianVisitors: "Hundreds of thousands of Indian pilgrims visit annually, especially on Maha Shivaratri",
    category: "Hindu",
    bestTimeToVisit: "Feb-Mar (Maha Shivaratri), Oct-Nov"
  },
  {
    id: 2,
    title: "Muktinath Temple",
    description: "Sacred Mukti Kṣetra (liberation site) high in the Himalayas. Revered by Hindus (Vishnu shrine) and Tibetan Buddhists.",
    price: 899,
    duration: "3 Days",
    groupSize: 8,
    difficulty: "Moderate",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Muktinath", "Mustang"],
    culturalHighlights: ["108 Water Spouts", "Eternal Flame", "Hindu-Buddhist Syncretism", "Mountain Scenery"],
    religion: "Hindu (Vishnu) & Buddhist (Avalokiteśvara)",
    keySignificance: "Sacred Mukti Kṣetra (liberation site) high in the Himalayas. Revered by Hindus (Vishnu shrine) and Tibetan Buddhists (Chumig Gyatsa - 'Hundred Waters' spring). One of Nepal's Char Dhams.",
    accessFromIndia: "Accessible via road from Pokhara through Beni–Jomsom or by small aircraft to Jomsom (Nepal). Many Indians travel by their own vehicles after entering Nepal via land borders.",
    indianVisitors: "≈96,000 Indian visitors in FY 2023/24 (nearly 100,000/year)",
    category: "Mixed",
    bestTimeToVisit: "Mar-Jun, Sep-Nov"
  },
  {
    id: 3,
    title: "Lumbini - Birthplace of Buddha",
    description: "Birthplace of Siddhārtha Gautama (Lord Buddha). UNESCO World Heritage Site with Mayadevi Temple and Ashoka Pillar.",
    price: 599,
    duration: "2 Days",
    groupSize: 20,
    difficulty: "Easy",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Lumbini", "Rupandehi District"],
    culturalHighlights: ["Mayadevi Temple", "Ashoka Pillar", "Monasteries", "Peace Pagoda", "Buddha's Birthplace"],
    religion: "Buddhist",
    keySignificance: "Birthplace of Siddhārtha Gautama (Lord Buddha) (c.563 BCE). UNESCO World Heritage Site (Mayadevi Temple, Ashoka Pillar). Monument complex marks Buddha's nativity and early life.",
    accessFromIndia: "By road: nearest border at Sunauli (Uttar Pradesh); buses from Gorakhpur to Lumbini. By air: Gautam Buddha Int'l Airport (Bhairahawa) or via Kathmandu.",
    indianVisitors: "1,172,304 total visitors in 2024, including ~300,889 from India (up from 266,510 in 2023)",
    category: "Buddhist",
    bestTimeToVisit: "Oct-Apr (Buddha Jayanti in May)"
  },
  {
    id: 4,
    title: "Janaki Mandir",
    description: "Temple of Goddess Sītā (Janaki) – birthplace/home of Sītā and site of Rām–Sītā marriage. Built 1910 (Mughal-style white temple).",
    price: 399,
    duration: "1 Day",
    groupSize: 12,
    difficulty: "Easy",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Janakpur", "Dhanusha"],
    culturalHighlights: ["Sita's Birthplace", "Ram-Sita Marriage Site", "Mithila Art", "Vivah Panchami"],
    religion: "Hindu (Sita/Ram)",
    keySignificance: "Temple of Goddess Sītā (Janaki) – birthplace/home of Sītā and site of Rām–Sītā marriage. Built 1910 (Mughal-style white temple, 60 rooms). Central to Mithilā culture and the Ramāyaṇa legend.",
    accessFromIndia: "Next to India–Nepal border: connected to Jaynagar (Bihar) by rail/road. Easy road access from Patna/Gaya via Sitamarhi–Janakpur.",
    indianVisitors: "Pilgrims flock here by the thousands to pay homage (especially on Vivah Panchami in Dec). Significant surge in Indian interest after 2018 diplomatic visits.",
    category: "Hindu",
    bestTimeToVisit: "Nov-Feb (Vivah Panchami in Dec)"
  },
  {
    id: 5,
    title: "Swayambhunath Stupa",
    description: "Ancient sacred stupa (origin 5th c.), known as the 'Monkey Temple'. UNESCO World Heritage Site with panoramic valley views.",
    price: 199,
    duration: "Half Day",
    groupSize: 10,
    difficulty: "Easy",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Kathmandu"],
    culturalHighlights: ["Buddha's Eyes", "365 Steps", "Monkey Population", "Panoramic Views"],
    religion: "Buddhist (Newar/Tibetan)",
    keySignificance: "Ancient sacred stupa (origin 5th c.), known as the 'Monkey Temple'. UNESCO World Heritage Site. Enshrines the eyes of Buddha; perched on a hill above Kathmandu, it offers panoramic valley views.",
    accessFromIndia: "Within Kathmandu city (2 km west of downtown). Reachable by taxi/bus to the hill base; then climb the eastern stone stairway or approach from west.",
    indianVisitors: "One of Nepal's most eminent Buddhist monuments, drawing hundreds of visitors daily from Nepal and India (especially Buddhist pilgrims and sightseers).",
    category: "Buddhist",
    bestTimeToVisit: "Year-round, best Oct-Mar"
  },
  {
    id: 6,
    title: "Boudhanath Stupa",
    description: "One of the world's largest stupas and a UNESCO World Heritage Site. Focal point for Tibetan Buddhism in Nepal.",
    price: 199,
    duration: "Half Day",
    groupSize: 10,
    difficulty: "Easy",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580548254596-1ef61221cef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Kathmandu"],
    culturalHighlights: ["World's Largest Stupa", "Tibetan Buddhism", "Prayer Wheels", "Monasteries"],
    religion: "Buddhist (Tibetan)",
    keySignificance: "One of the world's largest stupas and a UNESCO World Heritage Site. Believed to house relics of the Buddha's predecessors. Focal point for Tibetan Buddhism in Nepal; ringed by monasteries. Prayer wheels and devotees encircle it daily.",
    accessFromIndia: "In northeast Kathmandu (6 km from city center). Served by city microbuses and taxis.",
    indianVisitors: "A major Buddhist pilgrimage hub: often crowded on Tibetan New Year (Lhosar) and Buddha Jayanti. Daily thousands of devotees (Nepali, Tibetans) and international tourists visit.",
    category: "Buddhist",
    bestTimeToVisit: "Oct-Mar, Tibetan New Year (Feb-Mar)"
  },
  {
    id: 7,
    title: "Manakamana Temple",
    description: "19th-century Shakti Peeth temple ('wish-fulfilling' Manakamana). Devotees come to have their wishes granted by Goddess Bhagawati.",
    price: 499,
    duration: "1 Day",
    groupSize: 8,
    difficulty: "Easy",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559311640-4a855acf439d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Gorkha"],
    culturalHighlights: ["Cable Car Ride", "Wish Fulfillment", "Mountain Views", "Shakti Worship"],
    religion: "Hindu (Durga/Shakti)",
    keySignificance: "19th-century Shakti Peeth temple ('wish-fulfilling' Manakamana). Devotees come to have their wishes granted by Goddess Bhagawati.",
    accessFromIndia: "Accessible by road from Kathmandu or Pokhara, with a scenic cable car ride to the temple hilltop.",
    indianVisitors: "Popular among Indian pilgrims, especially from neighboring Indian states, with significant visits during Navratri and other Hindu festivals.",
    category: "Hindu",
    bestTimeToVisit: "Navratri (Mar-Apr & Sep-Oct)"
  }
];

const NepalCulturalToursPage: React.FC = () => {
  const [tours] = useState<TourPackage[]>(nepalTourPackages);
  const [filteredTours, setFilteredTours] = useState<TourPackage[]>(nepalTourPackages);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTourId, setExpandedTourId] = useState<number | null>(null);

  // Filter tours based on selected criteria
  const filterTours = () => {
    let filtered = tours;
    
    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tour => tour.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(tour => tour.price >= priceRange[0] && tour.price <= priceRange[1]);
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tour => 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.locations.some(location => location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tour.religion.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTours(filtered);
  };

  // Apply filters when any filter criteria changes
  useEffect(() => {
    filterTours();
  }, [selectedDifficulty, selectedCategory, priceRange, searchQuery]);

  const toggleTourDetails = (tourId: number) => {
    if (expandedTourId === tourId) {
      setExpandedTourId(null);
    } else {
      setExpandedTourId(tourId);
    }
  };

  // Statistics data
  const stats = [
    { label: "Total Sites", value: "7+", icon: <Globe className="w-6 h-6" /> },
    { label: "Indian Visitors", value: "500K+", icon: <Users className="w-6 h-6" /> },
    { label: "UNESCO Sites", value: "4", icon: <Shield className="w-6 h-6" /> },
    { label: "Success Rate", value: "98%", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Nepal Temple"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 md:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Heart className="w-5 h-5 text-amber-300" />
              <span className="text-amber-100 text-sm font-medium">Sacred Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Nepal's <span className="text-amber-400">Sacred</span> Heritage
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover ancient temples, sacred stupas, and pilgrimage sites that embody Nepal's rich spiritual legacy and cultural diversity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 flex items-center gap-2">
              Start Your Pilgrimage
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Watch Virtual Tour
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-center mb-2 text-amber-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className="flex text-sm font-semibold mb-2 text-gray-700 items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Sites
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pashupatinath, Lumbini..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="flex text-sm font-semibold mb-2 text-gray-700 items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Religion
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Religions</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="flex text-sm font-semibold mb-2 text-gray-700 items-center gap-2">
                  <Mountain className="w-4 h-4" />
                  Difficulty
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Price Range: <span className="text-amber-600">${priceRange[0]} - ${priceRange[1]}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Tours Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Explore <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Sacred</span> Sites
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Nepal's most revered pilgrimage sites, each offering a unique spiritual journey and cultural experience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTours.map((tour) => (
              <motion.div
                key={tour.id}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                  expandedTourId === tour.id ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-gray-200'
                }`}
              >
                {/* Image with Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    {tour.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full text-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-white font-bold rounded-full text-sm">
                      ${tour.price}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2">{tour.rating}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tour.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                  
                  {/* Quick Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.groupSize} people</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{tour.bestTimeToVisit}</span>
                    </div>
                  </div>
                  
                  {/* Category */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      tour.category === 'Hindu' ? 'bg-red-100 text-red-800' :
                      tour.category === 'Buddhist' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {tour.religion}
                    </span>
                  </div>
                  
                  {/* Cultural Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.culturalHighlights.slice(0, 3).map((highlight, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {highlight}
                      </span>
                    ))}
                    {tour.culturalHighlights.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        +{tour.culturalHighlights.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {expandedTourId === tour.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Key Significance
                            </h4>
                            <p className="text-gray-600 text-sm">{tour.keySignificance}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Navigation className="w-4 h-4" />
                              Access from India
                            </h4>
                            <p className="text-gray-600 text-sm">{tour.accessFromIndia}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Indian Visitors
                            </h4>
                            <p className="text-gray-600 text-sm">{tour.indianVisitors}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={() => toggleTourDetails(tour.id)}
                      className="flex-1 py-2 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                      {expandedTourId === tour.id ? 'Show Less' : 'View Details'}
                    </button>
                    
                    <button className="py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300">
<Link
  to="/book-now"
>
  Book Now
</Link>                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600">
              Showing <span className="font-bold text-amber-600">{filteredTours.length}</span> of {tours.length} sacred sites
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">8848</span> for Pilgrimage?
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Authentic Experience",
                description: "Deep cultural immersion with local guides who understand religious significance and traditions."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Easy India Access",
                description: "Specialized packages for Indian pilgrims with border crossing assistance and familiar comforts."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Spiritual Guidance",
                description: "Arrange meetings with temple priests and meditation sessions for deeper spiritual connection."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Begin Your Spiritual Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let us guide you through Nepal's sacred sites with respect, understanding, and authentic cultural experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Book Consultation
              </button>
              
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Get Pilgrimage Guide
              </button>
            </div>
            
            <div className="mt-8 text-gray-400">
              <p>Contact: +977-01-5912660 (Nepal) | +82-010-5877-5512 (International)</p>
              <p className="mt-2">Email: infolinkasiatours@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NepalCulturalToursPage;