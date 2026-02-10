import { useState, useMemo } from 'react';

// Mock data for winter packages in Nepal
const winterPackages = [
  {
    id: 1,
    title: "Everest Base Camp Winter Trek",
    description: "Experience the majestic Himalayas in winter with fewer crowds and stunning snow-capped views. Perfect for adventure seekers.",
    price: 1250,
    duration: "12 days",
    rating: 4.8,
    featured: true,
    discount: 15,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Trekking", "Cultural Experience", "Mountain Views"],
    difficulty: "Challenging",
    groupSize: "4-12 people",
    season: "Dec-Feb"
  },
  {
    id: 2,
    title: "Pokhara Winter Retreat",
    description: "Relax in the lakeside city of Pokhara with stunning views of the Annapurna range. Includes spa and wellness activities.",
    price: 850,
    duration: "7 days",
    rating: 4.5,
    featured: false,
    discount: 10,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Sightseeing", "Boating", "Yoga", "Wellness"],
    difficulty: "Easy",
    groupSize: "2-8 people",
    season: "Nov-Feb"
  },
  {
    id: 3,
    title: "Annapurna Circuit Winter Adventure",
    description: "Challenge yourself with this legendary trek through diverse landscapes and authentic local cultures.",
    price: 1450,
    duration: "15 days",
    rating: 4.9,
    featured: true,
    discount: 20,
    image: "https://images.unsplash.com/photo-1580504205188-9a5ae6f59a74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Trekking", "Hot Springs", "Wildlife", "Photography"],
    difficulty: "Difficult",
    groupSize: "6-15 people",
    season: "Dec-Jan"
  },
  {
    id: 4,
    title: "Kathmandu Cultural Winter Tour",
    description: "Explore ancient temples, palaces, and vibrant markets in Nepal's capital city with expert guides.",
    price: 650,
    duration: "5 days",
    rating: 4.3,
    featured: false,
    discount: 0,
    image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Cultural", "Historical", "Shopping", "Food Tour"],
    difficulty: "Easy",
    groupSize: "1-10 people",
    season: "All Winter"
  },
  {
    id: 5,
    title: "Langtang Valley Winter Trek",
    description: "A scenic winter trek through beautiful valleys with close-up views of the Langtang mountain range.",
    price: 950,
    duration: "10 days",
    rating: 4.6,
    featured: true,
    discount: 12,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Trekking", "Valley Views", "Local Culture"],
    difficulty: "Moderate",
    groupSize: "4-10 people",
    season: "Dec-Feb"
  },
  {
    id: 6,
    title: "Chitwan Winter Safari",
    description: "Experience Nepal's wildlife in winter with jungle safaris and authentic Tharu cultural experiences.",
    price: 750,
    duration: "6 days",
    rating: 4.4,
    featured: false,
    discount: 8,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Wildlife", "Safari", "Cultural", "Bird Watching"],
    difficulty: "Easy",
    groupSize: "2-8 people",
    season: "Nov-Feb"
  },
];

const difficultyColors: Record<string, string> = {
  "Easy": "bg-green-100 text-green-800",
  "Moderate": "bg-yellow-100 text-yellow-800",
  "Challenging": "bg-orange-100 text-orange-800",
  "Difficult": "bg-red-100 text-red-800"
};

const WinterPackage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPackage, setSelectedPackage] = useState<typeof winterPackages[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Packages', count: winterPackages.length },
    { id: 'Trekking', label: 'Trekking', count: winterPackages.filter(p => p.highlights.includes('Trekking')).length },
    { id: 'Cultural', label: 'Cultural', count: winterPackages.filter(p => p.highlights.includes('Cultural')).length },
    { id: 'Sightseeing', label: 'Sightseeing', count: winterPackages.filter(p => p.highlights.includes('Sightseeing')).length },
    { id: 'Wildlife', label: 'Wildlife', count: winterPackages.filter(p => p.highlights.includes('Wildlife')).length },
    { id: 'Wellness', label: 'Wellness', count: winterPackages.filter(p => p.highlights.includes('Yoga') || p.highlights.includes('Wellness')).length }
  ];

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...winterPackages];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query) ||
        pkg.highlights.some(h => h.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(pkg => pkg.highlights.includes(filter));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'featured':
        result.sort((a, b) => (Number(b.featured) - Number(a.featured)) || (b.rating - a.rating));
        break;
      default:
        break;
    }
    
    return result;
  }, [filter, sortBy, searchQuery]);



  const calculateDiscountedPrice = (price: number, discount: number): number => {
    return price - (price * discount / 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Winter Wonders of Nepal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8 drop-shadow-lg">
            Discover the magic of Himalayas in winter with exclusive packages, fewer crowds, and breathtaking views
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Book Your Adventure
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300">
              Explore Packages
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "95%", label: "Success Rate" },
              { number: "5000+", label: "Happy Travelers" },
              { number: "15", label: "Years Experience" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Winter in Nepal?</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Winter transforms Nepal into a magical wonderland with unique experiences you won't find any other season
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏔️",
                title: "Crystal Clear Views",
                description: "Enjoy unobstructed panoramic views of Himalayan peaks against deep blue winter skies"
              },
              {
                icon: "🚶",
                title: "Serene Trails",
                description: "Experience popular trekking routes without the crowds, offering peaceful solitude"
              },
              {
                icon: "☀️",
                title: "Perfect Temperatures",
                description: "Crisp, cool days perfect for hiking, with sunny skies and comfortable walking conditions"
              },
              {
                icon: "💰",
                title: "Best Value",
                description: "Lower prices, special winter discounts, and better availability at premium lodges"
              },
              {
                icon: "🎯",
                title: "Authentic Encounters",
                description: "Experience genuine local culture with more opportunities to interact with communities"
              },
              {
                icon: "📸",
                title: "Photographer's Dream",
                description: "Perfect lighting conditions and snow-dusted landscapes for stunning photography"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Find Your Perfect Winter Adventure</h2>
            <p className="text-gray-600">Filter and sort through our handpicked winter packages</p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search packages, destinations, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Categories */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFilter(category.id)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all ${
                        filter === category.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{category.label}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        filter === category.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Sorting Options */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">Sort By</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'featured', label: 'Featured First' },
                      { id: 'rating', label: 'Highest Rated' },
                      { id: 'price-low', label: 'Price: Low to High' },
                      { id: 'price-high', label: 'Price: High to Low' },
                      { id: 'duration', label: 'Duration' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                          sortBy === option.id
                            ? 'bg-blue-100 text-blue-700 font-medium border-2 border-blue-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Cards */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">
                    {filter === 'all' ? 'All Packages' : `${filter} Packages`}
                    <span className="text-gray-500 text-lg font-normal ml-2">
                      ({filteredAndSortedPackages.length} found)
                    </span>
                  </h3>
                  <button 
                    onClick={() => {
                      setFilter('all');
                      setSearchQuery('');
                      setSortBy('featured');
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>

              {filteredAndSortedPackages.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4">🏔️</div>
                  <h3 className="text-2xl font-bold mb-2">No packages found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAndSortedPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                        pkg.featured ? 'border-2 border-amber-400' : ''
                      }`}
                    >
                      <div className="relative">
                        <img 
                          src={pkg.image} 
                          alt={pkg.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {pkg.featured && (
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              🔥 FEATURED
                            </span>
                          )}
                          {pkg.discount > 0 && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              -{pkg.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                            <span className="text-amber-300">⭐</span>
                            {pkg.rating}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-900/90 to-purple-900/90 text-white px-4 py-2 rounded-xl backdrop-blur-sm">
                          <div className="font-bold text-lg">
                            ${pkg.discount > 0 ? calculateDiscountedPrice(pkg.price, pkg.discount).toFixed(0) : pkg.price}
                            {pkg.discount > 0 && (
                              <span className="ml-2 text-sm line-through opacity-75">${pkg.price}</span>
                            )}
                          </div>
                          <div className="text-sm opacity-90">{pkg.duration}</div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[pkg.difficulty]}`}>
                            {pkg.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pkg.highlights.map((highlight, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">👥</span>
                            <span>{pkg.groupSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📅</span>
                            <span>{pkg.season}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                            Book Now
                          </button>
                          <button 
                            onClick={() => setSelectedPackage(pkg)}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Winter Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Book your winter package today and receive exclusive bonuses including winter gear rental, airport transfers, and a local SIM card!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg">
              📞 Contact Our Experts
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg">
              📝 Download Winter Guide
            </button>
          </div>
          <p className="mt-8 text-blue-200">
            Limited spots available for December bookings
          </p>
        </div>
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedPackage.image} 
                alt={selectedPackage.title} 
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedPackage.title}</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-700">
                    ${selectedPackage.discount > 0 ? calculateDiscountedPrice(selectedPackage.price, selectedPackage.discount).toFixed(0) : selectedPackage.price}
                    {selectedPackage.discount > 0 && (
                      <span className="ml-2 text-lg text-gray-500 line-through">${selectedPackage.price}</span>
                    )}
                  </div>
                  <div className="text-gray-600">{selectedPackage.duration}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="font-bold text-lg">⭐ {selectedPackage.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="font-bold text-lg">{selectedPackage.difficulty}</div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="font-bold text-lg">{selectedPackage.groupSize}</div>
                  <div className="text-sm text-gray-600">Group Size</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-xl">
                  <div className="font-bold text-lg">{selectedPackage.season}</div>
                  <div className="text-sm text-gray-600">Best Season</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedPackage.description}</p>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3">Package Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPackage.highlights.map((highlight, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg">
                Book Now - Limited Winter Availability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinterPackage;