import { useState, useMemo } from 'react';

// Mock data for monsoon packages in Nepal
const monsoonPackages: Array<{
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  featured: boolean;
  discount: number;
  image: string;
  highlights: string[];
  difficulty: DifficultyLevel;
  groupSize: string;
  season: string;
  bestFor: string[];
  includes: string[];
}> = [
  {
    id: 1,
    title: "Lush Green Valley Monsoon Trek",
    description: "Experience Nepal's breathtaking greenery during monsoon with fewer tourists and vibrant landscapes. Perfect for nature lovers and photographers.",
    price: 980,
    duration: "10 days",
    rating: 4.7,
    featured: true,
    discount: 20,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Trekking", "Waterfalls", "Green Valleys", "Photography"],
    difficulty: "Moderate",
    groupSize: "4-10 people",
    season: "Jun-Sep",
    bestFor: ["Nature Lovers", "Photographers", "Adventure Seekers"],
    includes: ["Rain Gear", "Local Guide", "Permits", "Accommodation"]
  },
  {
    id: 2,
    title: "Kathmandu Valley Monsoon Cultural Tour",
    description: "Explore ancient temples and cultural heritage sites in the rain-washed Kathmandu Valley. Includes traditional monsoon festival experiences.",
    price: 550,
    duration: "5 days",
    rating: 4.4,
    featured: false,
    discount: 15,
    image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Cultural", "Historical", "UNESCO Sites", "Monsoon Festivals"],
    difficulty: "Easy",
    groupSize: "2-8 people",
    season: "Jun-Sep",
    bestFor: ["Culture Enthusiasts", "History Buffs", "Families"],
    includes: ["Entrance Fees", "Expert Guide", "Transport", "Traditional Meals"]
  },
  {
    id: 3,
    title: "Monsoon Wildlife Safari Adventure",
    description: "Discover Nepal's diverse wildlife in Chitwan National Park during the lush monsoon season. See animals in their natural habitat.",
    price: 720,
    duration: "6 days",
    rating: 4.6,
    featured: true,
    discount: 18,
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Wildlife", "Jungle Safari", "Bird Watching", "Elephant Ride"],
    difficulty: "Easy",
    groupSize: "3-12 people",
    season: "Jun-Sep",
    bestFor: ["Wildlife Enthusiasts", "Bird Watchers", "Nature Photographers"],
    includes: ["Jungle Activities", "Accommodation", "Meals", "Guide"]
  },
  {
    id: 4,
    title: "Pokhara Monsoon Wellness Retreat",
    description: "Relax in the serene lakeside city of Pokhara with misty mountain views and refreshing rains. Includes yoga and spa treatments.",
    price: 680,
    duration: "7 days",
    rating: 4.5,
    featured: false,
    discount: 12,
    image: "https://images.unsplash.com/photo-1582504339945-b9e5c4d5b3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Relaxation", "Boating", "Yoga", "Spa", "Meditation"],
    difficulty: "Easy",
    groupSize: "2-6 people",
    season: "Jun-Sep",
    bestFor: ["Wellness Seekers", "Couples", "Solo Travelers"],
    includes: ["Yoga Sessions", "Spa Treatments", "Lakeside Stay", "All Meals"]
  },
  {
    id: 5,
    title: "Upper Mustang Monsoon Escape",
    description: "Visit the rain-shadow region of Upper Mustang during monsoon for dry trekking conditions and unique Tibetan culture.",
    price: 1250,
    duration: "12 days",
    rating: 4.8,
    featured: true,
    discount: 10,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Trekking", "Cultural", "Desert Landscape", "Ancient Monasteries"],
    difficulty: "Moderate",
    groupSize: "4-8 people",
    season: "Jun-Sep",
    bestFor: ["Adventure Travelers", "Cultural Explorers", "Photographers"],
    includes: ["Special Permit", "Accommodation", "Guide", "All Meals"]
  },
  {
    id: 6,
    title: "Monsoon Rafting & Adventure",
    description: "Experience thrilling white-water rafting in raging monsoon rivers combined with jungle activities.",
    price: 450,
    duration: "4 days",
    rating: 4.3,
    featured: false,
    discount: 25,
    image: "https://images.unsplash.com/photo-1501700593782-49592624c4b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["Rafting", "Adventure", "Camping", "River Beach"],
    difficulty: "Challenging",
    groupSize: "6-15 people",
    season: "Jun-Sep",
    bestFor: ["Adventure Junkies", "Thrill Seekers", "Group Travel"],
    includes: ["Rafting Equipment", "Safety Gear", "Camping", "Meals"]
  },
];

const difficultyColors = {
  "Easy": "bg-green-100 text-green-800 border border-green-200",
  "Moderate": "bg-yellow-100 text-yellow-800 border border-yellow-200",
  "Challenging": "bg-orange-100 text-orange-800 border border-orange-200"
} as const;

type DifficultyLevel = keyof typeof difficultyColors;

const MonsoonPackage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPackage, setSelectedPackage] = useState<typeof monsoonPackages[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'All Packages', count: monsoonPackages.length, icon: '🌧️' },
    { id: 'Trekking', label: 'Trekking', count: monsoonPackages.filter(p => p.highlights.includes('Trekking')).length, icon: '🥾' },
    { id: 'Cultural', label: 'Cultural', count: monsoonPackages.filter(p => p.highlights.includes('Cultural')).length, icon: '🏛️' },
    { id: 'Wildlife', label: 'Wildlife', count: monsoonPackages.filter(p => p.highlights.includes('Wildlife')).length, icon: '🐘' },
    { id: 'Relaxation', label: 'Relaxation', count: monsoonPackages.filter(p => p.highlights.includes('Relaxation')).length, icon: '🧘' },
    { id: 'Adventure', label: 'Adventure', count: monsoonPackages.filter(p => p.highlights.includes('Adventure') || p.highlights.includes('Rafting')).length, icon: '🚣' },
    { id: 'Yoga', label: 'Yoga & Wellness', count: monsoonPackages.filter(p => p.highlights.includes('Yoga') || p.highlights.includes('Meditation')).length, icon: '☯️' },
  ];

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...monsoonPackages];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query) ||
        pkg.highlights.some(h => h.toLowerCase().includes(query)) ||
        pkg.bestFor.some(b => b.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      if (filter === 'Yoga') {
        result = result.filter(pkg => pkg.highlights.includes('Yoga') || pkg.highlights.includes('Meditation'));
      } else if (filter === 'Adventure') {
        result = result.filter(pkg => pkg.highlights.includes('Adventure') || pkg.highlights.includes('Rafting'));
      } else {
        result = result.filter(pkg => pkg.highlights.includes(filter));
      }
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
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    
    return result;
  }, [filter, sortBy, searchQuery]);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  const travelTips = [
    {
      icon: "🧳",
      title: "What to Pack",
      items: [
        "Waterproof backpack and rain cover",
        "Quick-dry clothing and layers",
        "Waterproof hiking shoes and extra socks",
        "Compact umbrella or rain poncho",
        "Waterproof bags for electronics",
        "Mosquito repellent and sunscreen"
      ]
    },
    {
      icon: "📍",
      title: "Best Destinations",
      items: [
        "Kathmandu Valley (protected from heavy rains)",
        "Pokhara and its surrounding lakes",
        "Chitwan National Park for wildlife",
        "Upper Mustang (rainshadow area)",
        "Annapurna Conservation Area (lower regions)",
        "Cultural heritage sites across Nepal"
      ]
    },
    {
      icon: "⚠️",
      title: "Important Tips",
      items: [
        "Check weather forecasts regularly",
        "Be flexible with your itinerary",
        "Carry waterproof document bags",
        "Book accommodations in advance",
        "Consider travel insurance",
        "Stay updated on road conditions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1540202403-a2c2908e9c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
            animation: 'slowZoom 20s infinite alternate'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-green-900/60 to-purple-900/70" />
        <div className="absolute inset-0" style={{backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E')`}} />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-4">
              🌧️ Monsoon Season: June - September
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Monsoon Magic in Nepal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8 drop-shadow-lg">
            Discover the lush green beauty, vibrant landscapes, and cultural wonders of Nepal during the enchanting monsoon season
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2">
              <span>🌿</span>
              Explore Monsoon Packages
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              <span>📅</span>
              Check Availability
            </button>
          </div>
        </div>
        
        {/* Animated raindrops */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-8 bg-gradient-to-b from-transparent via-blue-300/30 to-transparent animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gradient-to-r from-blue-900 via-green-800 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "60%", label: "Fewer Crowds", icon: "👥", sub: "Compared to peak season" },
              { number: "40%", label: "Lower Prices", icon: "💰", sub: "Average discount" },
              { number: "95%", label: "Success Rate", icon: "✅", sub: "Monsoon tours completed" },
              { number: "100%", label: "Rain Gear", icon: "🌂", sub: "Provided on all tours" }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="font-medium">{stat.label}</div>
                <div className="text-sm text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Visit Nepal During Monsoon?</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience Nepal's natural beauty at its peak - lush landscapes, dramatic waterfalls, and authentic cultural experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Vibrant Greenery",
                description: "Witness landscapes transform into lush, vibrant shades of green with thriving vegetation and blooming flowers",
                gradient: "from-green-100 to-emerald-100"
              },
              {
                icon: "👥",
                title: "Authentic Experience",
                description: "Enjoy popular destinations without crowds, allowing for more meaningful interactions with local communities",
                gradient: "from-blue-100 to-cyan-100"
              },
              {
                icon: "💧",
                title: "Spectacular Waterfalls",
                description: "See waterfalls at their most powerful and breathtaking, fed by monsoon rains and mountain streams",
                gradient: "from-teal-100 to-blue-100"
              },
              {
                icon: "📸",
                title: "Photographer's Paradise",
                description: "Perfect lighting conditions, dramatic skies, and misty landscapes create stunning photography opportunities",
                gradient: "from-purple-100 to-pink-100"
              },
              {
                icon: "💰",
                title: "Great Value",
                description: "Lower prices on accommodations, tours, and flights with special monsoon discounts and offers",
                gradient: "from-amber-100 to-orange-100"
              },
              {
                icon: "🎭",
                title: "Cultural Festivals",
                description: "Experience traditional monsoon festivals and rituals unique to the rainy season in Nepal",
                gradient: "from-red-100 to-rose-100"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Find Your Perfect Monsoon Adventure</h2>
            <p className="text-gray-600">Filter and sort through our specially curated monsoon packages</p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search monsoon packages, activities, or destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-2xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm bg-white/80 backdrop-blur-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-lg">
                🔍
              </div>
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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold"
            >
              <span>🎯</span>
              {showFilters ? 'Hide Filters' : 'Show Filters & Sort Options'}
            </button>

            {/* Filter Categories */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-2xl p-6 shadow-lg lg:sticky lg:top-4">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                  <span>🎯</span>
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setFilter(category.id);
                        if (window.innerWidth < 1024) setShowFilters(false);
                      }}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all ${
                        filter === category.id
                          ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                          : 'hover:bg-blue-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        filter === category.id ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Sorting Options */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>📊</span>
                    Sort By
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'featured', label: 'Featured First', icon: '⭐' },
                      { id: 'rating', label: 'Highest Rated', icon: '🌟' },
                      { id: 'discount', label: 'Best Discount', icon: '💸' },
                      { id: 'price-low', label: 'Price: Low to High', icon: '💰⬆️' },
                      { id: 'price-high', label: 'Price: High to Low', icon: '💰⬇️' },
                      { id: 'duration', label: 'Duration', icon: '⏱️' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          if (window.innerWidth < 1024) setShowFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                          sortBy === option.id
                            ? 'bg-blue-100 text-blue-700 font-medium border-2 border-blue-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(filter !== 'all' || searchQuery || sortBy !== 'featured') && (
                  <button 
                    onClick={() => {
                      setFilter('all');
                      setSearchQuery('');
                      setSortBy('featured');
                      if (window.innerWidth < 1024) setShowFilters(false);
                    }}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🔄</span>
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Tour Cards */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {filter === 'all' ? 'All Monsoon Packages' : `${filter} Packages`}
                      <span className="text-gray-500 text-lg font-normal ml-2">
                        ({filteredAndSortedPackages.length} found)
                      </span>
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Monsoon season offers unique experiences with lush landscapes and fewer crowds
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-blue-500">💡</span>
                    <span>Best time: June - September</span>
                  </div>
                </div>
              </div>

              {filteredAndSortedPackages.length === 0 ? (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4">🌧️</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">No monsoon packages found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Try adjusting your search or filter criteria. You might also want to check our other seasonal packages.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setFilter('all');
                        setSearchQuery('');
                        setSortBy('featured');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:from-blue-600 hover:to-teal-600 transition-colors"
                    >
                      Reset All Filters
                    </button>
                    <button className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                      View All Seasons
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAndSortedPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                        pkg.featured ? 'ring-2 ring-amber-400 ring-offset-2' : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {pkg.featured && (
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                              <span>🌧️</span>
                              MONSOON SPECIAL
                            </span>
                          )}
                          {pkg.discount > 0 && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              SAVE {pkg.discount}%
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <span className="bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                            <span className="text-amber-300">⭐</span>
                            {pkg.rating}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[pkg.difficulty]}`}>
                            {pkg.difficulty}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-900/90 to-teal-900/90 text-white px-4 py-3 rounded-xl backdrop-blur-sm">
                          <div className="flex items-end gap-2">
                            <div className="font-bold text-2xl">
                              ${pkg.discount > 0 ? calculateDiscountedPrice(pkg.price, pkg.discount).toFixed(0) : pkg.price}
                            </div>
                            {pkg.discount > 0 && (
                              <div className="text-sm line-through opacity-75">${pkg.price}</div>
                            )}
                          </div>
                          <div className="text-sm opacity-90">{pkg.duration}</div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {pkg.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pkg.highlights.slice(0, 4).map((highlight, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                            >
                              {highlight}
                            </span>
                          ))}
                          {pkg.highlights.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                              +{pkg.highlights.length - 4} more
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-500">👥</span>
                            <span>{pkg.groupSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-500">📅</span>
                            <span>{pkg.season}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <span className="text-blue-500">🎯</span>
                            <span>Best for: {pkg.bestFor.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            <span>🌿</span>
                            Book Monsoon Adventure
                          </button>
                          <button 
                            onClick={() => setSelectedPackage(pkg)}
                            className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
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

      {/* Travel Tips Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Monsoon Travel Tips & Guides</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Everything you need to know for a safe, comfortable, and memorable monsoon adventure in Nepal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelTips.map((tip, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{tip.title}</h3>
                <ul className="space-y-2">
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-gray-600">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg">
              <span className="text-2xl">⚠️</span>
              <div className="text-left">
                <div className="font-bold">Important Note:</div>
                <div className="text-sm">Some high mountain treks may be challenging during monsoon due to rainfall and leeches. Consider lower-altitude treks or cultural tours.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-green-800 to-teal-800" />
        <div className="absolute inset-0 bg-" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
            🌧️ Limited Time Monsoon Offer
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Monsoon Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Book your monsoon package today and receive exclusive bonuses including complimentary rain gear, 
            flexible cancellation policy, and a free traditional monsoon festival experience!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg flex items-center justify-center gap-3">
              <span>📞</span>
              Contact Our Monsoon Experts
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg flex items-center justify-center gap-3">
              <span>📝</span>
              Download Monsoon Travel Guide
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-200 text-sm">
            <div className="flex items-center justify-center gap-2">
              <span>✅</span>
              Free Rain Gear Included
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>✅</span>
              Flexible Cancellation
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>✅</span>
              Monsoon Festival Experience
            </div>
          </div>
        </div>
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="h-64 overflow-hidden">
                <img 
                  src={selectedPackage.image} 
                  alt={selectedPackage.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors shadow-lg"
              >
                &times;
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{selectedPackage.title}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <div className="text-3xl font-bold text-blue-700">
                    ${selectedPackage.discount > 0 ? calculateDiscountedPrice(selectedPackage.price, selectedPackage.discount).toFixed(0) : selectedPackage.price}
                    {selectedPackage.discount > 0 && (
                      <span className="ml-2 text-lg text-gray-500 line-through">${selectedPackage.price}</span>
                    )}
                  </div>
                  <div className="text-gray-600">{selectedPackage.duration}</div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full">
                    ⭐ {selectedPackage.rating}
                  </span>
                  <span className={`px-4 py-2 rounded-full ${difficultyColors[selectedPackage.difficulty]}`}>
                    {selectedPackage.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-lg">👥</div>
                  <div className="font-bold">{selectedPackage.groupSize}</div>
                  <div className="text-sm text-gray-600">Group Size</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-lg">📅</div>
                  <div className="font-bold">{selectedPackage.season}</div>
                  <div className="text-sm text-gray-600">Best Season</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-lg">🎯</div>
                  <div className="font-bold text-sm">{selectedPackage.bestFor[0]}</div>
                  <div className="text-sm text-gray-600">Best For</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-xl">
                  <div className="text-lg">🌧️</div>
                  <div className="font-bold">Monsoon</div>
                  <div className="text-sm text-gray-600">Season</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedPackage.description}</p>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span>✨</span>
                  Package Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPackage.highlights.map((highlight, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 rounded-full font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span>✅</span>
                  What's Included
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedPackage.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl">
                🌿 Book Now - Monsoon Special Offer
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                * Free rain gear included • Flexible monsoon cancellation policy
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes rain {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-rain {
          animation: rain linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MonsoonPackage;