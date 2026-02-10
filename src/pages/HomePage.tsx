import { useState,} from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  Compass, 
  Users, 
  Shield, 
  Globe,
  Star,
  Calendar,
  TrendingUp,
  MapPin,
  Phone,
  ChevronRight,
  Snowflake,
  Umbrella,
  Sun,
  Moon,
  Heart
} from 'lucide-react';
import NationalParksPage from './NationalParksPage';
import NepalTourismMap from './NepalTourismMap';

// Types
interface Trek {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  duration: string;
  difficulty: string;
  rating: number;
  featured?: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  avatar: string;
  location: string;
  rating: number;
}

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

interface TourPackage {
  id: number;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  season: string;
  duration: string;
}

// Data
const treks: Trek[] = [
  {
    id: 1,
    name: "Everest Base Camp",
    description: "Trek to the base of the world's highest mountain through stunning Himalayan landscapes.",
    price: "$1,499",
    image: "/images/everesttrek.jpeg",
    duration: "14 days",
    difficulty: "Challenging",
    rating: 4.9,
    featured: true
  },
  {
    id: 2,
    name: "Annapurna Circuit",
    description: "Experience diverse landscapes from subtropical jungle to high alpine environment.",
    price: "$1,299",
    image: "/images/annapurna.jpg",
    duration: "18 days",
    difficulty: "Moderate to Challenging",
    rating: 4.8
  },
  {
    id: 3,
    name: "Ghorepani Poon Hill",
    description: "Short trek with spectacular sunrise views over the Annapurna and Dhaulagiri ranges.",
    price: "$899",
    image: "/images/poonhill.jpg",
    duration: "7 days",
    difficulty: "Easy to Moderate",
    rating: 4.7
  },
  {
    id: 4,
    name: "Langtang Valley",
    description: "Discover the beautiful valley known as the 'valley of glaciers' with rich Tamang culture.",
    price: "$1,099",
    image: "/images/langtang.jpg",
    duration: "10 days",
    difficulty: "Moderate",
    rating: 4.6
  },
  {
    id: 5,
    name: "Manaslu Circuit",
    description: "Off-the-beaten-path trek around the world's eighth highest mountain.",
    price: "$1,599",
    image: "/images/manaslu.jpg",
    duration: "15 days",
    difficulty: "Challenging",
    rating: 4.9,
    featured: true
  },
  {
    id: 6,
    name: "Upper Mustang",
    description: "Journey to the ancient kingdom of Lo, a hidden gem in the rain shadow of the Himalayas.",
    price: "$1,899",
    image: "/images/mustang.jpg",
    duration: "12 days",
    difficulty: "Moderate",
    rating: 4.8
  }
];

const culturalTours: TourPackage[] = [
  {
    id: 1,
    name: "Kathmandu Cultural Experience",
    description: "Immerse yourself in the rich cultural heritage of Nepal's capital city.",
    image: "/images/kathmandu.jpg",
    highlights: ["UNESCO World Heritage Sites", "Ancient temples and palaces", "Local markets and cuisine", "Traditional performances"],
    season: "Year-round",
    duration: "5 days"
  },
  {
    id: 2,
    name: "Pokhara & Surroundings",
    description: "Discover the natural beauty and cultural diversity of the Pokhara region.",
    image: "/images/pokhara.webp",
    highlights: ["Phewa Lake boat ride", "Sacred caves and temples", "Traditional villages", "Annapurna sunset views"],
    season: "Sep-May",
    duration: "4 days"
  }
];

const spiritualTours: TourPackage[] = [
  {
    id: 1,
    name: "Lumbini Pilgrimage",
    description: "Journey to the birthplace of Lord Buddha and experience spiritual enlightenment.",
    image: "/images/lumbini.jpg",
    highlights: ["Maya Devi Temple", "Meditation sessions", "International monasteries", "Buddhist philosophy"],
    season: "Year-round",
    duration: "3 days"
  },
  {
    id: 2,
    name: "Muktinath Yatra",
    description: "A sacred journey to one of the most important pilgrimage sites for both Hindus and Buddhists.",
    image: "/images/muktinath.jpg",
    highlights: ["108 water springs", "Jwala Mai Temple", "Scenic flight to Jomsom", "Local culture"],
    season: "Mar-Nov",
    duration: "5 days"
  }
];

const seasonalPackages = {
  winter: [
    {
      id: 1,
      name: "Winter Wonderland Trek",
      description: "Experience the Himalayas in their serene winter beauty with fewer crowds.",
      image: "/images/manang.jpg",
      highlights: ["Snow-covered landscapes", "Crisp mountain air", "Cultural experiences", "Photography"],
      season: "Dec-Feb",
      duration: "8 days"
    },
    {
      id: 2,
      name: "Christmas in Kathmandu",
      description: "Celebrate the holiday season with a unique blend of Western and Nepali traditions.",
      image: "/images/christmas-nepal.jpg",
      highlights: ["Festive celebrations", "Special holiday meals", "Cultural performances", "Thamel shopping"],
      season: "Dec",
      duration: "7 days"
    }
  ],
  monsoon: [
    {
      id: 1,
      name: "Monsoon Magic",
      description: "Experience Nepal's lush greenery and vibrant festivals during monsoon season.",
      image: "/images/monsoon-nepal.jpg",
      highlights: ["Lush green landscapes", "Waterfall visits", "Cultural festivals", "Fewer tourists"],
      season: "Jun-Aug",
      duration: "6 days"
    },
    {
      id: 2,
      name: "Yoga Retreat",
      description: "Rejuvenate your mind and body with a yoga retreat during the peaceful monsoon.",
      image: "/images/yoga-nepal.jpg",
      highlights: ["Daily yoga sessions", "Meditation practices", "Ayurvedic meals", "Wellness workshops"],
      season: "Jun-Sep",
      duration: "7 days"
    }
  ]
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    quote: "The Everest Base Camp trek was life-changing! Professional team, stunning views, and unforgettable memories.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    location: "Australia",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    quote: "Perfectly organized trip. Guides were knowledgeable and supportive. Can't wait to return!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    location: "Canada",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Williams",
    quote: "The Annapurna Circuit exceeded all expectations. Every detail was taken care of professionally.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    location: "United Kingdom",
    rating: 5
  }
];

const features: Feature[] = [
  {
    id: 1,
    icon: <Compass className="w-8 h-8" />,
    title: "Expert Guides",
    description: "Certified guides with extensive Himalayan knowledge and local cultural insights.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8" />,
    title: "Small Groups",
    description: "Intimate group sizes for personalized attention and authentic experiences.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    icon: <Shield className="w-8 h-8" />,
    title: "Safety First",
    description: "Comprehensive safety protocols, medical kits, and emergency evacuation plans.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    icon: <Globe className="w-8 h-8" />,
    title: "Sustainable Tourism",
    description: "Eco-friendly practices and support for local communities.",
    gradient: "from-orange-500 to-red-600"
  }
];

const stats = [
  { label: "Happy Travelers", value: "10,000+", icon: <Users /> },
  { label: "Successful Trips", value: "500+", icon: <Mountain /> },
  { label: "Years Experience", value: "15+", icon: <Calendar /> },
  { label: "Satisfaction Rate", value: "98%", icon: <Star /> }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6
    }
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const Home = () => {
  const [activeSeason, setActiveSeason] = useState<'winter' | 'monsoon'>('winter');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Nepal.mp4" type="video/mp4" />
          </video>
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
              <Mountain className="w-5 h-5 text-cyan-300" />
              <span className="text-cyan-100 text-sm font-medium">Since 2010</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Conquer the <span className="text-amber-400">Himalayas</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your ultimate partner for unforgettable trekking, mountaineering, and cultural journeys in Nepal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2">
              Start Your Adventure
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Explore Packages
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
                <div className="flex justify-center mb-2 text-cyan-300">
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">8848 Trek & Tours</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine decades of experience with modern safety standards to create unforgettable Himalayan adventures.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={fadeIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Treks Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              <span className="text-cyan-700 font-medium">Most Popular</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Trekking</span> Adventures
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {treks.map((trek) => (
              <motion.div
                key={trek.id}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  trek.featured ? 'border-2 border-amber-400' : 'border border-gray-200'
                }`}
              >
                {trek.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
                
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={trek.image}
                    alt={trek.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(trek.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm">{trek.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{trek.name}</h3>
                    <span className="text-sm font-semibold px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full">
                      {trek.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{trek.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{trek.duration}</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                      {trek.price}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 group">
                    <span className="flex items-center justify-center gap-2">
                      Book Now
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              View All Treks →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Cultural & Spiritual Tours */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Cultural</span> &{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Spiritual</span> Journeys
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Cultural Tours */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-purple-700 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                Cultural Experiences
              </h3>
              <div className="space-y-6">
                {culturalTours.map((tour) => (
                  <motion.div
                    key={tour.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold mb-3 text-gray-900">{tour.name}</h4>
                    <p className="text-gray-600 mb-4">{tour.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Sun className="w-4 h-4" />
                        {tour.season}
                      </span>
                    </div>
                    <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center gap-1">
                      Explore Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Spiritual Tours */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-emerald-700 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Spiritual Journeys
              </h3>
              <div className="space-y-6">
                {spiritualTours.map((tour) => (
                  <motion.div
                    key={tour.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold mb-3 text-gray-900">{tour.name}</h4>
                    <p className="text-gray-600 mb-4">{tour.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Moon className="w-4 h-4" />
                        {tour.season}
                      </span>
                    </div>
                    <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center gap-1">
                      Begin Journey
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Adventures */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Seasonal</span> Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Nepal's beauty throughout the year with specially curated seasonal packages.
            </p>
          </motion.div>

          {/* Season Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full p-1 bg-white shadow-lg">
              <button
                onClick={() => setActiveSeason('winter')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeSeason === 'winter'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Snowflake className="w-5 h-5" />
                Winter Magic
              </button>
              <button
                onClick={() => setActiveSeason('monsoon')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeSeason === 'monsoon'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Umbrella className="w-5 h-5" />
                Monsoon Bliss
              </button>
            </div>
          </div>

          {/* Seasonal Packages */}
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {seasonalPackages[activeSeason].map((packageItem) => (
              <div
                key={packageItem.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={packageItem.image}
                    alt={packageItem.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                      {packageItem.season}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{packageItem.name}</h3>
                  <p className="text-gray-600 mb-4">{packageItem.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">{packageItem.duration}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* National Parks Section */}
      <NationalParksPage />

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Traveler <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready for Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Himalayan</span> Adventure?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have experienced Nepal with 8848 Trek & Tours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Book a Consultation
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <NepalTourismMap />
    </div>
  );
};

export default Home;