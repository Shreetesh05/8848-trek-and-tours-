import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Thermometer, Globe, Users, Star, 
  Clock, ChevronLeft, Phone, Mail, MapPin, 
  CheckCircle, 
} from 'lucide-react';
import { trekPackages } from './PackagesPage';

const TrekDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const trek = trekPackages.find(p => p.id === Number(id));

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Trek not found</h2>
          <Link to="/trekking" className="text-cyan-600 hover:underline">← Back to all treks</Link>
        </div>
      </div>
    );
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-8">
        <Link
          to="/trekking"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to all treks
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] mt-4 mx-4 md:mx-8 lg:mx-16 rounded-3xl overflow-hidden">
        <img 
          src={trek.image} 
          alt={trek.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${trek.colorClass} text-white font-semibold`}>
                {trek.difficulty}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(trek.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2">{trek.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{trek.name}</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{trek.highlight}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { icon: <Calendar className="w-6 h-6" />, label: "Duration", value: trek.duration },
                { icon: <Thermometer className="w-6 h-6" />, label: "Max Altitude", value: trek.maxAltitude },
                { icon: <Globe className="w-6 h-6" />, label: "Best Season", value: trek.bestSeason },
                { icon: <Users className="w-6 h-6" />, label: "Group Size", value: trek.groupSize },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${trek.colorClass} text-white`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                      <div className="font-bold text-lg text-gray-900">{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trek Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{trek.description}</p>
            </div>

            {/* Full Itinerary */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
              <div className="space-y-4">
                {trek.itinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${trek.colorClass} flex flex-col items-center justify-center text-white font-bold`}>
                        <span className="text-sm">DAY</span>
                        <span className="text-lg">{day.day}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{day.title}</div>
                        <div className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Thermometer className="w-4 h-4" />
                            {day.altitude}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {day.trekkingTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{day.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book This Trek</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Dates</label>
                  <input
                    type="text"
                    placeholder="MM/YYYY - MM/YYYY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
                <button className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  Request Booking Details
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  We'll contact you within 24 hours to confirm availability.
                </p>
              </form>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3">
                {[
                  "Professional trekking guide & porter",
                  "All necessary trekking permits",
                  "Teahouse accommodations",
                  "Three meals per day",
                  "Airport transfers",
                  "First aid kit & oxygen cylinders",
                  "Duffel bag for trekking gear",
                  "Farewell dinner in Kathmandu"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-cyan-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Quick Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Phone className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Nepal Office</div>
                    <div className="font-bold text-gray-900">+977-01-5912660</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Globe className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">International</div>
                    <div className="font-bold text-gray-900">+82-010-5877-5512</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-bold text-gray-900">infolinkasiatours@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Address</div>
                    <div className="font-bold text-gray-900">Kathmandu, Nepal</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 px-4 bg-white text-cyan-700 font-semibold rounded-lg border border-cyan-200 hover:bg-cyan-50 transition-all duration-300">
                Schedule a Call
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetail;