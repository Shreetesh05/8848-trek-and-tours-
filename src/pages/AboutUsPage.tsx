import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMountain, 
  FaUsers, 
  FaAward, 
  FaHandshake, 
  FaLeaf, 
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft,
  FaGlobeAsia,
  FaShieldAlt
} from 'react-icons/fa';
import { GiMountainClimbing } from 'react-icons/gi';

const AboutUsPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Sherpa Dorje",
      role: "Founder & Lead Guide",
      experience: "15+ years",
      bio: "Everest summiteer 7 times. Born and raised in the Khumbu region.",
      specialties: ["High Altitude Trekking", "Mountain Safety", "Cultural Interpretation"],
      image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Maya Sharma",
      role: "Operations Director",
      experience: "12+ years",
      bio: "Tourism management expert with passion for sustainable travel.",
      specialties: ["Logistics", "Client Relations", "Sustainable Tourism"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Raj Thapa",
      role: "Adventure Guide",
      experience: "10+ years",
      bio: "Specializes in Annapurna region treks and cultural tours.",
      specialties: ["Wildlife Tracking", "Photography Tours", "Local Cuisine"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Anita Gurung",
      role: "Client Experience Manager",
      experience: "8+ years",
      bio: "Ensures every client's journey is personalized and memorable.",
      specialties: ["Custom Itineraries", "Wellness Travel", "Family Adventures"],
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Safety First",
      description: "Highest safety standards with certified guides and emergency protocols",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <FaLeaf />,
      title: "Sustainable Tourism",
      description: "Leave No Trace principles and support for local communities",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <FaHeart />,
      title: "Passion for Adventure",
      description: "Guides who live and breathe the Himalayan spirit",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <FaHandshake />,
      title: "Authentic Experiences",
      description: "Genuine cultural interactions and off-the-beaten-path adventures",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description: "Award-winning service and attention to detail",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: <FaGlobeAsia />,
      title: "Global Perspective",
      description: "International standards with local expertise",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const achievements = [
    { number: "5,000+", label: "Happy Clients", icon: "😊" },
    { number: "15", label: "Years Experience", icon: "🏆" },
    { number: "98%", label: "Success Rate", icon: "✅" },
    { number: "50+", label: "Expert Guides", icon: "👨‍🏫" },
    { number: "100+", label: "Adventure Routes", icon: "🗺️" },
    { number: "24/7", label: "Support", icon: "🛡️" }
  ];

  const testimonials = [
    {
      quote: "Life-changing experience with the most professional team. The Everest Base Camp trek was perfectly organized.",
      author: "Michael Chen",
      location: "Singapore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "The cultural immersion in Upper Mustang was incredible. Our guide Sherpa Dorje made it unforgettable.",
      author: "Sarah Johnson",
      location: "Australia",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "Safety standards were exceptional. As a solo female traveler, I felt completely secure and cared for.",
      author: "Emma Rodriguez",
      location: "Canada",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-indigo-900/70 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white text-sm font-semibold mb-6">
              <FaMountain />
              <span>Since 2010</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">8848</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
              Pioneering Himalayan adventures with passion, expertise, and a commitment to 
              sustainable tourism. Join us in discovering the soul of Nepal.
            </p>
          </motion.div>
        </div>
        
        {/* Animated mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                <FaMountain />
                <span>OUR JOURNEY</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Where Passion Meets The Peaks
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">
                  Founded in 2010 by Sherpa Dorje, a 7-time Everest summiteer, 8848 Trekking & Tours was born from a deep-seated passion for the Himalayas and a vision to share Nepal's majestic beauty with the world. Our name, inspired by the height of Mount Everest (8,848 meters), symbolizes our commitment to reaching the pinnacle of adventure travel excellence.
                </p>
                <p className="text-gray-700 text-lg">
                  What began as a small team of local guides with an intimate knowledge of mountain trails has evolved into one of Nepal's most trusted adventure companies. Over the years, we've carefully curated experiences that blend adrenaline-pumping adventure with profound cultural immersion, always prioritizing safety and sustainability.
                </p>
                <p className="text-gray-700 text-lg">
                  Today, we're proud to have guided thousands of travelers from across the globe, creating lifelong memories while actively supporting local communities through responsible tourism practices. Every journey with us contributes to conservation efforts and community development in the regions we explore.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                  <GiMountainClimbing />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sherpa Dorje</h3>
                  <p className="text-gray-600 text-sm">Founder & Everest Summiteer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Our Team in the Himalayas" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <div className="text-white">
                    <div className="text-sm opacity-90">The 8848 Family</div>
                    <div className="text-lg font-bold">Exploring the Himalayas since 2010</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold text-center mb-12">Our Journey in Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                    <div className="text-blue-100">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <FaHeart />
              <span>OUR PHILOSOPHY</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              To create transformative Himalayan experiences that inspire personal growth, foster cultural understanding, and promote sustainable adventure tourism that benefits both travelers and local communities.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sustainability Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                  <FaLeaf />
                  <span>SUSTAINABILITY COMMITMENT</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Responsible Adventure Travel</h2>
                <p className="text-green-100 text-lg mb-6">
                  We believe in leaving only footprints and taking only memories. Our operations follow strict Leave No Trace principles, support local conservation projects, and ensure fair wages for all team members.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      ♻️
                    </div>
                    <span>Plastic-Free Expeditions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      🌱
                    </div>
                    <span>Carbon Offset Programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      👥
                    </div>
                    <span>Community Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      🏔️
                    </div>
                    <span>Trail Maintenance</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Our Impact (2023)</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Local Employment</span>
                        <span className="font-bold">95%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-11/12"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Waste Management</span>
                        <span className="font-bold">100%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Community Support</span>
                        <span className="font-bold">$50k+</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <FaUsers />
              <span>MEET OUR FAMILY</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The 8848 Family</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our team is our greatest strength. Each member brings unique expertise, local knowledge, and a shared passion for creating unforgettable Himalayan adventures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-blue-200 text-sm">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <FaAward className="text-amber-500" />
                      <span>{member.experience} Experience</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Certifications & Awards</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Nepal Tourism Board", icon: "🏔️", year: "Certified Since 2012" },
                { name: "Sustainable Tourism Award", icon: "🌱", year: "2022" },
                { name: "TripAdvisor Excellence", icon: "⭐", year: "5 Years Running" },
                { name: "Guide Association Nepal", icon: "👨‍🏫", year: "Gold Member" }
              ].map((award, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
                    {award.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{award.name}</h3>
                  <p className="text-gray-600 text-sm">{award.year}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <FaQuoteLeft />
              <span>TRAVELER STORIES</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Our Travelers Say</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Don't just take our word for it. Here's what adventurers from around the world have to say about their experiences with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="fill-current" />
                    ))}
                  </div>
                  
                  <FaQuoteLeft className="text-4xl text-blue-100 mb-4" />
                  
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FaMapMarkerAlt />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Write Your Himalayan Story?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join thousands of adventurers who have experienced the magic of Nepal with 8848. Let us help you create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                🏔️ Explore Our Adventures
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                📞 Contact Our Team
              </button>
            </div>
            <p className="mt-8 text-blue-200">
              Free consultation • Custom itineraries • 24/7 support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;