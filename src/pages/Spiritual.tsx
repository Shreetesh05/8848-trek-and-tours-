import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
   
  Star, 
  Clock, 
  Users, 
  MapPin, 
  
  ChevronRight,
  Globe,
  Heart,
  Calendar,
  TrendingUp,
  Shield,
  Phone,
  Mail,
 
  Brain,
  Sparkles,
  Moon,
  Flower,
  Zap,
  Target,
} from 'lucide-react';

// Type definitions
interface SpiritualTourPackage {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  groupSize: number;
  focus: 'Meditation' | 'Yoga' | 'Pilgrimage' | 'Retreat' | 'Healing';
  rating: number;
  image: string;
  featured: boolean;
  locations: string[];
  spiritualHighlights: string[];
  includes: string[];
  intensity: 'Gentle' | 'Moderate' | 'Deep' | 'Transformative';
  benefits: string[];
  bestFor: string[];
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

// Mock data for Nepal spiritual tour packages
const spiritualTours: SpiritualTourPackage[] = [
  {
    id: 1,
    title: "Himalayan Meditation Retreat",
    description: "Experience deep meditation in the serene Himalayas with expert guides and ancient techniques passed down through generations.",
    price: 1299,
    duration: "7 Days",
    groupSize: 8,
    focus: "Meditation",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Pokhara", "Annapurna Foothills", "Begnas Lake"],
    spiritualHighlights: ["Silent Meditation", "Mindfulness Training", "Nature Immersion", "Guided Visualization", "Dharma Talks"],
    includes: ["Luxury Retreat Accommodation", "All Organic Meals", "Daily Meditation Sessions", "Yoga Classes", "Private Guide"],
    intensity: "Deep",
    benefits: ["Stress Reduction", "Mental Clarity", "Emotional Balance", "Spiritual Connection"],
    bestFor: ["Beginners seeking guidance", "Experienced practitioners", "Stress relief seekers"]
  },
  {
    id: 2,
    title: "Sacred Buddhist Pilgrimage",
    description: "Follow in the footsteps of Buddha with profound visits to sacred sites and ancient monasteries across Nepal's spiritual landscape.",
    price: 1599,
    duration: "10 Days",
    groupSize: 12,
    focus: "Pilgrimage",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581434681381-1d27c029a0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Lumbini", "Kathmandu", "Swayambhunath", "Boudhanath"],
    spiritualHighlights: ["Lumbini Birthplace", "Monastery Stays", "Prayer Ceremonies", "Monk Teachings", "Circumambulation"],
    includes: ["Monastery Accommodation", "Vegetarian Meals", "Expert Buddhist Guide", "All Entrance Fees", "Private Meditation Sessions"],
    intensity: "Transformative",
    benefits: ["Spiritual Awakening", "Cultural Immersion", "Ancient Wisdom", "Personal Transformation"],
    bestFor: ["Buddhist practitioners", "Spiritual seekers", "Cultural explorers"]
  },
  {
    id: 3,
    title: "Yoga & Ayurveda Wellness Journey",
    description: "Rejuvenate your mind, body and spirit with traditional yoga practices and authentic Ayurvedic treatments in Nepal's peaceful environment.",
    price: 1799,
    duration: "12 Days",
    groupSize: 10,
    focus: "Yoga",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1545389336-8c6dfde0b0d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Pokhara", "Kathmandu", "Nagarkot"],
    spiritualHighlights: ["Daily Yoga Practice", "Ayurvedic Consultations", "Panchakarma Treatments", "Pranayama", "Meditation"],
    includes: ["Wellness Resort Stay", "Ayurvedic Meals", "Daily Yoga Sessions", "Personalized Treatments", "Wellness Coach"],
    intensity: "Moderate",
    benefits: ["Physical Rejuvenation", "Mental Peace", "Detoxification", "Lifestyle Balance"],
    bestFor: ["Wellness enthusiasts", "Stress management", "Holistic health seekers"]
  },
  {
    id: 4,
    title: "Shamanic Healing Experience",
    description: "Connect with ancient healing traditions through authentic shamanic practices, ceremonies, and energy work guided by experienced shamans.",
    price: 1399,
    duration: "8 Days",
    groupSize: 6,
    focus: "Healing",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Kathmandu Valley", "Shamanic Village", "Sacred Sites"],
    spiritualHighlights: ["Healing Ceremonies", "Energy Clearing", "Traditional Rituals", "Plant Medicine", "Soul Retrieval"],
    includes: ["Traditional Accommodation", "Healing Sessions", "Cultural Experiences", "Local Shaman Guide", "Ceremonial Materials"],
    intensity: "Deep",
    benefits: ["Emotional Release", "Energy Balance", "Spiritual Healing", "Ancestral Connection"],
    bestFor: ["Energy healers", "Spiritual explorers", "Emotional healing seekers"]
  },
  {
    id: 5,
    title: "Mountain Spiritual Awakening",
    description: "Find spiritual inspiration amidst the majestic Himalayas with daily practices, breathtaking views, and profound self-reflection.",
    price: 1999,
    duration: "14 Days",
    groupSize: 8,
    focus: "Retreat",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Langtang Region", "Gosaikunda Lake", "Helambu"],
    spiritualHighlights: ["Mountain Meditation", "Spiritual Dialogues", "Self-Reflection", "Nature Connection", "Silent Walks"],
    includes: ["Lodge Accommodation", "All Meals", "Personal Guide", "Porters", "Meditation Teacher", "Yoga Instructor"],
    intensity: "Transformative",
    benefits: ["Deep Connection", "Personal Insight", "Natural Harmony", "Spiritual Growth"],
    bestFor: ["Nature lovers", "Solitude seekers", "Deep spiritual practitioners"]
  },
  {
    id: 6,
    title: "Vipassana Silent Retreat",
    description: "Deepen your practice with a traditional 10-day silent meditation retreat following the ancient Vipassana technique in peaceful settings.",
    price: 899,
    duration: "10 Days",
    groupSize: 20,
    focus: "Meditation",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506003093669-40c8d57283df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Dhamma Shringa", "Kathmandu Valley"],
    spiritualHighlights: ["Noble Silence", "Vipassana Technique", "Dharma Talks", "Mindful Eating", "Walking Meditation"],
    includes: ["Retreat Accommodation", "Simple Vegetarian Meals", "Course Instruction", "Meditation Hall", "Teacher Support"],
    intensity: "Deep",
    benefits: ["Mind Purification", "Insight Development", "Self-Realization", "Peace of Mind"],
    bestFor: ["Meditation practitioners", "Self-discipline seekers", "Mindfulness enthusiasts"]
  },
  {
    id: 7,
    title: "Tantric Yoga & Mysticism",
    description: "Explore the ancient paths of Tantric yoga and mystical practices in sacred temples with experienced gurus.",
    price: 2199,
    duration: "9 Days",
    groupSize: 6,
    focus: "Yoga",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    locations: ["Kathmandu", "Patan", "Bhaktapur"],
    spiritualHighlights: ["Tantric Rituals", "Kundalini Yoga", "Mantra Chanting", "Energy Centers", "Sacred Geometry"],
    includes: ["Temple Accommodation", "Sattvic Meals", "Daily Tantric Practice", "Guru Guidance", "Ritual Materials"],
    intensity: "Transformative",
    benefits: ["Energy Awakening", "Consciousness Expansion", "Mystical Experience", "Divine Connection"],
    bestFor: ["Advanced practitioners", "Energy workers", "Mystical seekers"]
  },
  {
    id: 8,
    title: "Sound Healing & Nada Yoga",
    description: "Experience the transformative power of sound healing with Himalayan singing bowls, mantras, and nada yoga practices.",
    price: 1499,
    duration: "5 Days",
    groupSize: 10,
    focus: "Healing",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    locations: ["Pokhara", "Fewa Lake"],
    spiritualHighlights: ["Sound Baths", "Mantra Meditation", "Singing Bowl Therapy", "Nada Yoga", "Vibrational Healing"],
    includes: ["Lakeside Resort", "Healing Meals", "Sound Sessions", "Yoga Nidra", "Personal Bowl"],
    intensity: "Gentle",
    benefits: ["Stress Relief", "Emotional Release", "Vibrational Balance", "Deep Relaxation"],
    bestFor: ["Sound therapy enthusiasts", "Stress sufferers", "Meditation beginners"]
  }
];

const SpiritualToursPage: React.FC = () => {
  const [tours] = useState<SpiritualTourPackage[]>(spiritualTours);
  const [filteredTours, setFilteredTours] = useState<SpiritualTourPackage[]>(spiritualTours);
  const [selectedFocus, setSelectedFocus] = useState<string>('All');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTourId, setExpandedTourId] = useState<number | null>(null);

  // Filter tours based on selected criteria
  const filterTours = () => {
    let filtered = tours;
    
    // Filter by focus
    if (selectedFocus !== 'All') {
      filtered = filtered.filter(tour => tour.focus === selectedFocus);
    }
    
    // Filter by intensity
    if (selectedIntensity !== 'All') {
      filtered = filtered.filter(tour => tour.intensity === selectedIntensity);
    }
    
    // Filter by price range
    filtered = filtered.filter(tour => tour.price >= priceRange[0] && tour.price <= priceRange[1]);
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tour => 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.locations.some(location => location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tour.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredTours(filtered);
  };

  // Apply filters when any filter criteria changes
  useEffect(() => {
    filterTours();
  }, [selectedFocus, selectedIntensity, priceRange, searchQuery]);

  const toggleTourDetails = (tourId: number) => {
    if (expandedTourId === tourId) {
      setExpandedTourId(null);
    } else {
      setExpandedTourId(tourId);
    }
  };

  // Focus icons mapping
  const focusIcons = {
    Meditation: <Brain className="w-6 h-6" />,
    Yoga: <Flower className="w-6 h-6" />,
    Pilgrimage: <Target className="w-6 h-6" />,
    Retreat: <Moon className="w-6 h-6" />,
    Healing: <Zap className="w-6 h-6" />
  };

  // Intensity colors mapping
  const intensityColors = {
    Gentle: "from-green-400 to-emerald-500",
    Moderate: "from-blue-400 to-cyan-500",
    Deep: "from-purple-400 to-violet-500",
    Transformative: "from-rose-400 to-pink-500"
  };

  // Statistics data
  const stats = [
    { label: "Years Experience", value: "15+", icon: <Calendar className="w-6 h-6" /> },
    { label: "Happy Travelers", value: "5,000+", icon: <Heart className="w-6 h-6" /> },
    { label: "Success Rate", value: "99%", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Expert Guides", value: "50+", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Meditation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-800/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-transparent"></div>
          
          {/* Animated elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-amber-100 text-sm font-medium">Spiritual Awakening</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Spiritual <span className="text-purple-400">Journeys</span> in Nepal
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover inner peace, healing, and transformation through ancient spiritual practices in the sacred lands of the Himalayas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2">
              Begin Your Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Watch Testimonials
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
                <div className="flex justify-center mb-2 text-purple-300">
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

      {/* Spiritual Paths Overview */}
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
              Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Spiritual</span> Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect spiritual experience tailored to your journey of growth and transformation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
          >
            {Object.entries(focusIcons).map(([focus, icon]) => (
              <motion.div
                key={focus}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.05 }}
                onClick={() => setSelectedFocus(focus)}
                className={`bg-white rounded-xl p-6 shadow-lg border cursor-pointer transition-all duration-300 ${
                  selectedFocus === focus ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    selectedFocus === focus 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{focus}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {focus === 'Meditation' && 'Mindfulness & inner peace'}
                    {focus === 'Yoga' && 'Physical & spiritual balance'}
                    {focus === 'Pilgrimage' && 'Sacred journeys & devotion'}
                    {focus === 'Retreat' && 'Deep immersion & reflection'}
                    {focus === 'Healing' && 'Energy & emotional wellness'}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-purple-50">
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
                <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Retreats
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Meditation, Yoga, Healing..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {/* Focus Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Spiritual Focus
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={selectedFocus}
                  onChange={(e) => setSelectedFocus(e.target.value)}
                >
                  <option value="All">All Focus Areas</option>
                  <option value="Meditation">Meditation</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Pilgrimage">Pilgrimage</option>
                  <option value="Retreat">Retreat</option>
                  <option value="Healing">Healing</option>
                </select>
              </div>
              
              {/* Intensity Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Intensity Level
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={selectedIntensity}
                  onChange={(e) => setSelectedIntensity(e.target.value)}
                >
                  <option value="All">All Intensities</option>
                  <option value="Gentle">Gentle</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Deep">Deep</option>
                  <option value="Transformative">Transformative</option>
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Price Range: <span className="text-purple-600">${priceRange[0]} - ${priceRange[1]}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="100"
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
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
                  expandedTourId === tour.id ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-200'
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
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {tour.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full text-sm">
                        Featured
                      </span>
                    )}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${intensityColors[tour.intensity]} text-white`}>
                      {tour.intensity}
                    </span>
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
                    <div className="flex items-center gap-2">
                      <div className="text-purple-600">
                        {focusIcons[tour.focus]}
                      </div>
                    </div>
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
                      <MapPin className="w-4 h-4" />
                      <span>{tour.locations[0]}</span>
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.benefits.slice(0, 2).map((benefit, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
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
                              <Sparkles className="w-4 h-4" />
                              Spiritual Highlights
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {tour.spiritualHighlights.map((highlight, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs rounded-lg border border-purple-100"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              What's Included
                            </h4>
                            <ul className="space-y-1">
                              {tour.includes.slice(0, 3).map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Best For
                            </h4>
                            <p className="text-sm text-gray-600">{tour.bestFor.join(", ")}</p>
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
                    
                    <button className="py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300">
                      Book Now
                    </button>
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
              Showing <span className="font-bold text-purple-600">{filteredTours.length}</span> of {tours.length} spiritual journeys
            </p>
            {filteredTours.length === 0 && (
              <p className="text-gray-500 mt-2">No journeys match your filters. Try adjusting your criteria.</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Journey Guide Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Spiritual <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journey</span> Guide
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={scaleIn}
              className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choosing Your Path</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Meditation & Mindfulness</h4>
                    <p className="text-gray-600">Perfect for beginners and advanced practitioners seeking inner peace and mental clarity through ancient techniques.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                    <Flower className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Yoga & Movement</h4>
                    <p className="text-gray-600">Combine physical practice with spiritual growth. From gentle Hatha to transformative Tantric yoga.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pilgrimage & Devotion</h4>
                    <p className="text-gray-600">Walk sacred paths, visit ancient temples, and connect with centuries of spiritual tradition.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={scaleIn}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>Expert guidance from certified spiritual teachers</span>
                </li>
                
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span>Safe and supportive environment for personal growth</span>
                </li>
                
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span>Cultural immersion and authentic experiences</span>
                </li>
                
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Like-minded community of spiritual seekers</span>
                </li>
              </ul>
              
              <button className="mt-8 w-full py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Download Journey Guide PDF
              </button>
            </motion.div>
          </div>
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
            className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for Spiritual Transformation?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Begin your journey of self-discovery and spiritual growth in the sacred lands of Nepal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Book Spiritual Consultation
                </button>
                
                <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get Personalized Recommendations
                </button>
              </div>
              
              <div className="mt-8 text-gray-400">
                <p className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact: +977-01-5912660 (Nepal) | +82-010-5877-5512 (International)
                </p>
                <p className="mt-2 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email: infolinkasiatours@gmail.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpiritualToursPage;