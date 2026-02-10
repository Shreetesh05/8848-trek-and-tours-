"use client";

import React, { useState,useRef } from 'react';
import { 
  Mountain, 
  Castle, 
  Trees, 
  Church, 
  MapPin, 
  Compass,
  Users,
  Calendar,
  Star,
  Navigation,
  Clock,
  Globe,
  Camera,
  Building2,
  Map,
  Layers,
  ZoomIn,
  ZoomOut,
  Search,
  ChevronRight,
  Route,
  Cloud,
  Wind,
  Thermometer,
  Droplets,
  Eye
} from 'lucide-react';

// ==================== TYPES ====================
interface TourismDestination {
  id: string;
  name: string;
  description: string;
  category: 'Adventure' | 'Cultural' | 'Religious' | 'Nature' | 'Heritage' | 'Trekking';
  highlights: string[];
  bestTimeToVisit: string[];
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  altitude?: string;
  duration?: string;
  imageUrl?: string;
}

interface Province {
  id: number;
  name: string;
  capital: string;
  area: number;
  population: number;
  color: string;
  highlights: string;
  coordinates: { x: number; y: number };
  destinations: TourismDestination[];
  trekkingRoutes: string[];
  majorCities: string[];
  weather: string;
}

// ==================== NEPAL PROVINCES DATA ====================
const provincesData: Province[] = [
  {
    id: 1,
    name: "Koshi Province",
    capital: "Biratnagar",
    area: 25905,
    population: 4534943,
    color: "#FF6B6B",
    highlights: "Eastern Himalayas, Tea Gardens, Kanchenjunga",
    coordinates: { x: 85, y: 35 },
    trekkingRoutes: ["Kanchenjunga Base Camp", "Makalu Base Camp", "Milke Danda"],
    majorCities: ["Biratnagar", "Dharan", "Ilam", "Damak"],
    weather: "Subtropical in lowlands, Alpine in high mountains",
    destinations: [
      {
        id: "kanchenjunga",
        name: "Kanchenjunga Base Camp",
        description: "Third highest mountain in the world with breathtaking trekking routes through remote villages and pristine landscapes.",
        category: "Trekking",
        highlights: ["Third highest peak", "Remote wilderness", "Glacier views", "Rhododendron forests"],
        bestTimeToVisit: ["March-May", "September-November"],
        difficulty: "Challenging",
        altitude: "5,143m",
        duration: "20-25 days"
      },
      {
        id: "pathivara",
        name: "Pathivara Temple",
        description: "Sacred Hindu temple dedicated to Goddess Pathivara with panoramic views of Mt. Kanchenjunga.",
        category: "Religious",
        highlights: ["Religious significance", "Mountain panorama", "Cultural experience"],
        bestTimeToVisit: ["March-June", "September-December"],
        duration: "2-3 days"
      }
    ]
  },
  {
    id: 2,
    name: "Madhesh Province",
    capital: "Janakpur",
    area: 9661,
    population: 5404937,
    color: "#4ECDC4",
    highlights: "Plains, Ancient Cities, Cultural Heritage",
    coordinates: { x: 65, y: 75 },
    trekkingRoutes: ["Chitwan Jungle Safari", "Bardia Wildlife Tour"],
    majorCities: ["Janakpur", "Biratnagar", "Rajbiraj", "Siraha"],
    weather: "Tropical with hot summers, mild winters",
    destinations: [
      {
        id: "janakpur",
        name: "Janakpur Dham",
        description: "Ancient city and birthplace of Goddess Sita, featuring stunning Mithila art and architecture.",
        category: "Cultural",
        highlights: ["Ramayana sites", "Mithila art", "Temples", "Cultural festivals"],
        bestTimeToVisit: ["October-March"],
        duration: "2-3 days"
      }
    ]
  },
  {
    id: 3,
    name: "Bagmati Province",
    capital: "Kathmandu",
    area: 20300,
    population: 5525967,
    color: "#95E06C",
    highlights: "Kathmandu Valley, UNESCO Sites, Ancient Temples",
    coordinates: { x: 58, y: 50 },
    trekkingRoutes: ["Everest Base Camp", "Langtang Valley", "Helambu Trek"],
    majorCities: ["Kathmandu", "Lalitpur", "Bhaktapur", "Dhulikhel"],
    weather: "Temperate climate, pleasant throughout the year",
    destinations: [
      {
        id: "kathmandu",
        name: "Kathmandu Valley",
        description: "Cultural heart of Nepal with 7 UNESCO World Heritage Sites in close proximity.",
        category: "Heritage",
        highlights: ["7 UNESCO sites", "Ancient temples", "Newari culture", "Traditional architecture"],
        bestTimeToVisit: ["September-November", "February-April"],
        duration: "5-7 days"
      },
      {
        id: "nagarkot",
        name: "Nagarkot",
        description: "Hill station famous for sunrise and sunset views over the Himalayas including Everest.",
        category: "Nature",
        highlights: ["Sunrise views", "Himalayan panorama", "Hiking trails", "Peaceful environment"],
        bestTimeToVisit: ["October-May"],
        duration: "1-2 days"
      }
    ]
  },
  {
    id: 4,
    name: "Gandaki Province",
    capital: "Pokhara",
    area: 21504,
    population: 2403979,
    color: "#FFD166",
    highlights: "Annapurna Range, Pokhara, Lakes",
    coordinates: { x: 40, y: 50 },
    trekkingRoutes: ["Annapurna Circuit", "Manaslu Circuit", "Mardi Himal"],
    majorCities: ["Pokhara", "Gorkha", "Syangja", "Tanahu"],
    weather: "Varied from subtropical to alpine",
    destinations: [
      {
        id: "annapurna",
        name: "Annapurna Circuit",
        description: "World famous trekking route around the Annapurna massif with diverse landscapes.",
        category: "Trekking",
        highlights: ["Thorong La Pass", "Muktinath Temple", "Diverse landscapes", "Gurung culture"],
        bestTimeToVisit: ["March-May", "September-November"],
        difficulty: "Moderate",
        altitude: "5,416m",
        duration: "15-20 days"
      },
      {
        id: "pokhara",
        name: "Pokhara City",
        description: "Tourist hub with stunning lakes, mountain views, and adventure activities.",
        category: "Adventure",
        highlights: ["Phewa Lake", "Paragliding", "World Peace Stupa", "Davis Falls"],
        bestTimeToVisit: ["September-November", "March-May"],
        duration: "3-4 days"
      }
    ]
  },
  {
    id: 5,
    name: "Lumbini Province",
    capital: "Deukhuri",
    area: 22288,
    population: 4990272,
    color: "#EE6C4D",
    highlights: "Buddha's Birthplace, Ancient History",
    coordinates: { x: 35, y: 65 },
    trekkingRoutes: ["Lumbini Pilgrimage", "Bardia Jungle Safari"],
    majorCities: ["Butwal", "Nepalgunj", "Tulsipur", "Ghorahi"],
    weather: "Tropical with distinct wet and dry seasons",
    destinations: [
      {
        id: "lumbini",
        name: "Lumbini - Buddha's Birthplace",
        description: "UNESCO World Heritage Site and the birthplace of Lord Buddha, featuring monasteries from around the world.",
        category: "Religious",
        highlights: ["Maya Devi Temple", "International monasteries", "Peaceful garden", "Sacred pond"],
        bestTimeToVisit: ["October-March"],
        duration: "2-3 days"
      }
    ]
  },
  {
    id: 6,
    name: "Karnali Province",
    capital: "Birendranagar",
    area: 27984,
    population: 1570248,
    color: "#118AB2",
    highlights: "Remote Wilderness, Rara Lake, Shey Phoksundo",
    coordinates: { x: 25, y: 40 },
    trekkingRoutes: ["Rara Lake Trek", "Shey Phoksundo", "Dolpo Circuit"],
    majorCities: ["Birendranagar", "Manma", "Jumla", "Dunai"],
    weather: "Cold winters, mild summers in highlands",
    destinations: [
      {
        id: "rara",
        name: "Rara Lake",
        description: "Largest lake in Nepal located in remote wilderness with crystal clear waters.",
        category: "Nature",
        highlights: ["Crystal clear water", "Remote location", "Bird watching", "Peaceful environment"],
        bestTimeToVisit: ["March-May", "September-November"],
        difficulty: "Moderate",
        altitude: "2,990m",
        duration: "10-12 days"
      }
    ]
  },
  {
    id: 7,
    name: "Sudurpashchim Province",
    capital: "Godawari",
    area: 19539,
    population: 2552517,
    color: "#9D4EDD",
    highlights: "Far West, Khaptad, Api Himal",
    coordinates: { x: 15, y: 50 },
    trekkingRoutes: ["Khaptad National Park", "Api Himal Base Camp"],
    majorCities: ["Dhangadhi", "Dadeldhura", "Dipayal", "Mahendranagar"],
    weather: "Hot in lowlands, moderate in hills",
    destinations: [
      {
        id: "khaptad",
        name: "Khaptad National Park",
        description: "Beautiful plateau with grasslands, forests, and religious sites in far western Nepal.",
        category: "Nature",
        highlights: ["Grassland plateau", "Khaptad Baba Ashram", "Wildflowers", "Bird watching"],
        bestTimeToVisit: ["March-May", "September-November"],
        duration: "7-9 days"
      }
    ]
  }
];

// ==================== MAIN COMPONENT ====================
const NepalTourismMap = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province>(provincesData[2]);
  const [activeDestination, setActiveDestination] = useState<TourismDestination>(provincesData[2].destinations[0]);
  const [hoveredProvince, setHoveredProvince] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showTerrain, setShowTerrain] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Filter destinations
  const filteredDestinations = selectedProvince.destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // All categories
  const allCategories = ['All', ...Array.from(new Set(provincesData.flatMap(p => p.destinations.map(d => d.category))))];

  // Handle province click
  const handleProvinceClick = (province: Province) => {
    setIsLoading(true);
    setSelectedProvince(province);
    setActiveDestination(province.destinations[0]);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Zoom functions
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.6));

  // Reset zoom
  const resetZoom = () => setZoomLevel(1);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const foundProvince = provincesData.find(province => 
        province.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        province.destinations.some(dest => 
          dest.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      if (foundProvince) {
        handleProvinceClick(foundProvince);
      }
    }
  };

  // Popular trekking routes
  const popularTreks = [
    { name: "Everest Base Camp", province: "Bagmati", days: 14, difficulty: "Challenging" },
    { name: "Annapurna Circuit", province: "Gandaki", days: 21, difficulty: "Moderate" },
    { name: "Langtang Valley", province: "Bagmati", days: 10, difficulty: "Moderate" },
    { name: "Manaslu Circuit", province: "Gandaki", days: 18, difficulty: "Challenging" },
    { name: "Upper Mustang", province: "Gandaki", days: 16, difficulty: "Moderate" },
    { name: "Kanchenjunga", province: "Koshi", days: 25, difficulty: "Challenging" },
  ];

  // Province statistics
  const provinceStats = [
    { label: "Total Area", value: "147,181 km²", icon: <Globe className="w-4 h-4" /> },
    { label: "Population", value: "30.3 Million", icon: <Users className="w-4 h-4" /> },
    { label: "Highest Point", value: "8,848m (Everest)", icon: <Mountain className="w-4 h-4" /> },
    { label: "Time Zone", value: "NPT (UTC+5:45)", icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Map className="w-10 h-10 text-blue-600" />
              Nepal Tourism Explorer
            </h1>
            <p className="text-gray-600 mt-2">
              Interactive map of Nepal's 7 provinces with detailed tourism information
            </p>
          </div>
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations or provinces..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Nepal Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {provinceStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Interactive Nepal Province Map</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowTerrain(!showTerrain)}
                      className={`p-2 rounded-lg ${showTerrain ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                      title="Toggle Terrain"
                    >
                      <Layers className="w-5 h-5" />
                    </button>
                    <button
                      onClick={resetZoom}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      title="Reset Zoom"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={zoomOut}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium px-2">{Math.round(zoomLevel * 100)}%</span>
                    <button
                      onClick={zoomIn}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Map */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border-2 border-gray-200">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading {selectedProvince.name}...</p>
                    </div>
                  </div>
                )}

                <div className="overflow-auto">
                  <svg 
                    ref={svgRef}
                    viewBox="0 0 1000 1000"
                    className="w-full h-auto min-h-[500px]"
                    style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                  >
                    {/* Terrain Background */}
                    {showTerrain && (
                      <>
                        {/* Himalayan Range */}
                        <g opacity="0.1">
                          <path d="M100,100 C150,80 200,90 250,70 C300,85 350,75 400,95 C450,65 500,100 550,90 C600,75 650,85 700,70 C750,95 800,85 850,90" 
                                fill="none" stroke="#93C5FD" strokeWidth="15" />
                        </g>
                        
                        {/* Hills and Valleys */}
                        <g opacity="0.08">
                          <circle cx="200" cy="400" r="40" fill="#10B981" />
                          <circle cx="300" cy="450" r="35" fill="#10B981" />
                          <circle cx="500" cy="500" r="45" fill="#10B981" />
                          <circle cx="600" cy="550" r="38" fill="#10B981" />
                          <circle cx="400" cy="700" r="30" fill="#10B981" />
                        </g>
                      </>
                    )}

                    {/* ==================== CLICKABLE PROVINCES ==================== */}
                    
                    {/* Province 1 - Koshi (Eastern Nepal) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(1)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[0])}
                    >
                      <path
                        d="M750,150 L780,200 L800,250 L820,300 L800,350 L780,400 L750,450 
                            L720,480 L700,500 L680,450 L660,400 L640,350 L620,300 L630,250 
                            L650,200 L680,180 L700,150 L720,120 L740,140"
                        fill={selectedProvince.id === 1 ? "#FF6B6B" : hoveredProvince === 1 ? "#FF8E8E" : "#FF6B6B"}
                        fillOpacity={selectedProvince.id === 1 ? 0.9 : hoveredProvince === 1 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="730" y="300" className="text-2xl font-bold fill-white" textAnchor="middle">
                        1
                      </text>
                      <text x="730" y="340" className="text-sm font-medium fill-white" textAnchor="middle">
                        Koshi
                      </text>
                    </g>

                    {/* Province 2 - Madhesh (Southern Terai) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(2)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[1])}
                    >
                      <path
                        d="M200,800 L300,850 L400,820 L500,830 L600,810 L700,780 L750,750 
                            L780,720 L750,700 L700,680 L600,700 L500,720 L400,730 L300,750 
                            L250,780 L200,800"
                        fill={selectedProvince.id === 2 ? "#4ECDC4" : hoveredProvince === 2 ? "#70D7D0" : "#4ECDC4"}
                        fillOpacity={selectedProvince.id === 2 ? 0.9 : hoveredProvince === 2 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="500" y="780" className="text-2xl font-bold fill-white" textAnchor="middle">
                        2
                      </text>
                      <text x="500" y="820" className="text-sm font-medium fill-white" textAnchor="middle">
                        Madhesh
                      </text>
                    </g>

                    {/* Province 3 - Bagmati (Central Region) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(3)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[2])}
                    >
                      <path
                        d="M450,400 L500,350 L550,320 L600,340 L620,380 L630,420 L620,480 
                            L600,520 L550,500 L500,480 L450,460 L420,420 L430,380 L440,350"
                        fill={selectedProvince.id === 3 ? "#95E06C" : hoveredProvince === 3 ? "#AAE68A" : "#95E06C"}
                        fillOpacity={selectedProvince.id === 3 ? 0.9 : hoveredProvince === 3 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="520" y="420" className="text-2xl font-bold fill-white" textAnchor="middle">
                        3
                      </text>
                      <text x="520" y="460" className="text-sm font-medium fill-white" textAnchor="middle">
                        Bagmati
                      </text>
                    </g>

                    {/* Province 4 - Gandaki (Western Region) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(4)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[3])}
                    >
                      <path
                        d="M350,400 L380,350 L400,300 L430,280 L450,320 L470,360 L450,400 
                            L430,450 L400,480 L370,460 L350,420 L340,380"
                        fill={selectedProvince.id === 4 ? "#FFD166" : hoveredProvince === 4 ? "#FFDA8A" : "#FFD166"}
                        fillOpacity={selectedProvince.id === 4 ? 0.9 : hoveredProvince === 4 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="400" y="380" className="text-2xl font-bold fill-white" textAnchor="middle">
                        4
                      </text>
                      <text x="400" y="420" className="text-sm font-medium fill-white" textAnchor="middle">
                        Gandaki
                      </text>
                    </g>

                    {/* Province 5 - Lumbini (Mid-Western) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(5)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[4])}
                    >
                      <path
                        d="M250,550 L300,530 L350,550 L370,600 L350,650 L330,700 L300,670 
                            L270,630 L250,590 L240,540"
                        fill={selectedProvince.id === 5 ? "#EE6C4D" : hoveredProvince === 5 ? "#F28A70" : "#EE6C4D"}
                        fillOpacity={selectedProvince.id === 5 ? 0.9 : hoveredProvince === 5 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="300" y="600" className="text-2xl font-bold fill-white" textAnchor="middle">
                        5
                      </text>
                      <text x="300" y="640" className="text-sm font-medium fill-white" textAnchor="middle">
                        Lumbini
                      </text>
                    </g>

                    {/* Province 6 - Karnali (Far Western) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(6)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[5])}
                    >
                      <path
                        d="M150,350 L200,330 L250,350 L270,400 L250,450 L230,500 L200,470 
                            L170,430 L150,390 L140,350"
                        fill={selectedProvince.id === 6 ? "#118AB2" : hoveredProvince === 6 ? "#3AA0C8" : "#118AB2"}
                        fillOpacity={selectedProvince.id === 6 ? 0.9 : hoveredProvince === 6 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="200" y="400" className="text-2xl font-bold fill-white" textAnchor="middle">
                        6
                      </text>
                      <text x="200" y="440" className="text-sm font-medium fill-white" textAnchor="middle">
                        Karnali
                      </text>
                    </g>

                    {/* Province 7 - Sudurpashchim (Far Far Western) */}
                    <g 
                      className="cursor-pointer group transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(7)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(provincesData[6])}
                    >
                      <path
                        d="M80,450 L120,430 L160,450 L180,500 L160,550 L140,600 L110,570 
                            L80,530 L60,480 L70,420"
                        fill={selectedProvince.id === 7 ? "#9D4EDD" : hoveredProvince === 7 ? "#B16EE6" : "#9D4EDD"}
                        fillOpacity={selectedProvince.id === 7 ? 0.9 : hoveredProvince === 7 ? 0.8 : 0.6}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:drop-shadow-lg transition-all"
                      />
                      <text x="120" y="500" className="text-2xl font-bold fill-white" textAnchor="middle">
                        7
                      </text>
                      <text x="120" y="540" className="text-sm font-medium fill-white" textAnchor="middle">
                        Sudurpashchim
                      </text>
                    </g>

                    {/* ==================== MAP MARKERS ==================== */}
                    
                    {/* Major Cities */}
                    <g>
                      {/* Kathmandu */}
                      <g className="cursor-pointer" onClick={() => handleProvinceClick(provincesData[2])}>
                        <circle cx="520" cy="420" r="8" fill="#3B82F6" stroke="white" strokeWidth="3" />
                        <circle cx="520" cy="420" r="12" fill="#3B82F6" fillOpacity="0.3" />
                        <text x="540" y="415" className="text-sm font-bold fill-gray-800 pointer-events-none">
                          Kathmandu
                        </text>
                      </g>
                      
                      {/* Pokhara */}
                      <g className="cursor-pointer" onClick={() => handleProvinceClick(provincesData[3])}>
                        <circle cx="400" cy="380" r="7" fill="#3B82F6" stroke="white" strokeWidth="3" />
                        <circle cx="400" cy="380" r="11" fill="#3B82F6" fillOpacity="0.3" />
                        <text x="420" y="375" className="text-sm font-bold fill-gray-800 pointer-events-none">
                          Pokhara
                        </text>
                      </g>
                      
                      {/* Biratnagar */}
                      <g className="cursor-pointer" onClick={() => handleProvinceClick(provincesData[0])}>
                        <circle cx="730" cy="300" r="7" fill="#3B82F6" stroke="white" strokeWidth="3" />
                        <circle cx="730" cy="300" r="11" fill="#3B82F6" fillOpacity="0.3" />
                        <text x="750" y="295" className="text-sm font-bold fill-gray-800 pointer-events-none">
                          Biratnagar
                        </text>
                      </g>
                      
                      {/* Janakpur */}
                      <g className="cursor-pointer" onClick={() => handleProvinceClick(provincesData[1])}>
                        <circle cx="500" cy="780" r="7" fill="#3B82F6" stroke="white" strokeWidth="3" />
                        <circle cx="500" cy="780" r="11" fill="#3B82F6" fillOpacity="0.3" />
                        <text x="520" y="775" className="text-sm font-bold fill-gray-800 pointer-events-none">
                          Janakpur
                        </text>
                      </g>
                      
                      {/* Nepalgunj */}
                      <g className="cursor-pointer" onClick={() => handleProvinceClick(provincesData[4])}>
                        <circle cx="300" cy="600" r="7" fill="#3B82F6" stroke="white" strokeWidth="3" />
                        <circle cx="300" cy="600" r="11" fill="#3B82F6" fillOpacity="0.3" />
                        <text x="320" y="595" className="text-sm font-bold fill-gray-800 pointer-events-none">
                          Nepalgunj
                        </text>
                      </g>
                      
                      {/* Dhangadhi */}
                      <g className="cursor-pointer" onClick={() => handleProvinceClick(provincesData[6])}>
                        <circle cx="120" cy="500" r="7" fill="#3B82F6" stroke="white" strokeWidth="3" />
                        <circle cx="120" cy="500" r="11" fill="#3B82F6" fillOpacity="0.3" />
                        <text x="140" y="495" className="text-sm font-bold fill-gray-800 pointer-events-none">
                          Dhangadhi
                        </text>
                      </g>
                    </g>

                    {/* Mountain Peaks */}
                    <g>
                      {/* Mount Everest */}
                      <g>
                        <polygon points="600,200 605,170 610,200" fill="#F59E0B" stroke="white" strokeWidth="2" />
                        <text x="605" y="160" className="text-xs font-bold fill-gray-800 pointer-events-none">
                          Everest
                        </text>
                        <text x="605" y="175" className="text-[10px] fill-gray-600 pointer-events-none">
                          8,848m
                        </text>
                      </g>
                      
                      {/* Kanchenjunga */}
                      <g>
                        <polygon points="680,250 685,230 690,250" fill="#F59E0B" stroke="white" strokeWidth="2" />
                        <text x="685" y="225" className="text-xs font-bold fill-gray-800 pointer-events-none">
                          Kanchenjunga
                        </text>
                        <text x="685" y="240" className="text-[10px] fill-gray-600 pointer-events-none">
                          8,586m
                        </text>
                      </g>
                      
                      {/* Annapurna */}
                      <g>
                        <polygon points="380,320 385,300 390,320" fill="#F59E0B" stroke="white" strokeWidth="2" />
                        <text x="385" y="295" className="text-xs font-bold fill-gray-800 pointer-events-none">
                          Annapurna
                        </text>
                        <text x="385" y="310" className="text-[10px] fill-gray-600 pointer-events-none">
                          8,091m
                        </text>
                      </g>
                    </g>

                    {/* Famous Lakes */}
                    <g>
                      {/* Phewa Lake */}
                      <ellipse cx="390" cy="390" rx="15" ry="8" fill="#60A5FA" opacity="0.7" stroke="#1D4ED8" strokeWidth="1" />
                      <text x="390" y="405" className="text-xs font-medium fill-blue-900 pointer-events-none">
                        Phewa Lake
                      </text>
                      
                      {/* Rara Lake */}
                      <ellipse cx="200" cy="400" rx="12" ry="6" fill="#60A5FA" opacity="0.7" stroke="#1D4ED8" strokeWidth="1" />
                      <text x="200" y="415" className="text-xs font-medium fill-blue-900 pointer-events-none">
                        Rara Lake
                      </text>
                    </g>

                    {/* National Parks */}
                    <g>
                      {/* Chitwan National Park */}
                      <rect x="450" y="720" width="70" height="45" fill="#10B981" opacity="0.3" stroke="#065F46" strokeWidth="1" />
                      <text x="485" y="750" className="text-xs font-medium fill-green-900 pointer-events-none">
                        Chitwan NP
                      </text>
                      
                      {/* Bardia National Park */}
                      <rect x="250" y="620" width="50" height="35" fill="#10B981" opacity="0.3" stroke="#065F46" strokeWidth="1" />
                      <text x="275" y="640" className="text-xs font-medium fill-green-900 pointer-events-none">
                        Bardia NP
                      </text>
                    </g>

                    {/* Nepal Border Outline */}
                    <path
                      d="M80,450 L120,430 L160,450 L180,500 L160,550 L140,600 L110,570 
                          L80,530 L60,480 L70,420 L150,390 L200,470 L230,500 L250,450 
                          L270,400 L250,350 L200,330 L150,350 L170,430 L200,470 L230,500 
                          L250,450 L270,400 L300,530 L350,550 L370,600 L350,650 L330,700 
                          L300,670 L270,630 L250,590 L240,540 L250,550 L300,530 L350,550 
                          L370,600 L350,650 L330,700 L300,670 L270,630 L250,590 L200,800 
                          L250,780 L300,750 L400,730 L500,720 L600,700 L700,680 L750,700 
                          L780,720 L750,750 L700,780 L600,810 L500,830 L400,820 L300,850 
                          L200,800 L240,540 L250,550 L300,530 L350,550 L370,600 L350,650 
                          L330,700 L300,670 L270,630 L250,590 L240,540 L250,550 L300,530 
                          L350,400 L370,360 L450,400 L470,360 L450,320 L430,280 L400,300 
                          L380,350 L350,400 L340,380 L350,420 L370,460 L400,480 L430,450 
                          L450,400 L470,360 L450,320 L500,350 L550,320 L600,340 L620,380 
                          L630,420 L620,480 L600,520 L550,500 L500,480 L450,460 L420,420 
                          L430,380 L440,350 L450,400 L500,350 L550,320 L600,340 L620,380 
                          L630,420 L620,480 L600,520 L550,500 L500,480 L450,460 L420,420 
                          L430,380 L440,350 L450,400 L470,360 L450,320 L430,280 L400,300 
                          L380,350 L350,400 L340,380 L350,420 L370,460 L400,480 L430,450 
                          L450,400 L470,360 L450,320 L430,280 L400,300 L380,350 L350,400 
                          L300,350 L270,400 L250,450 L270,400 L300,350 L270,400 L250,450 
                          L270,400 L300,350 L270,400 L250,450 L230,500 L200,470 L170,430 
                          L150,390 L140,350 L150,350 L170,430 L200,470 L230,500 L250,450 
                          L270,400 L250,350 L200,330 L150,350 L140,350 L150,390 L80,450"
                      fill="none"
                      stroke="#1F2937"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Map Legend */}
                <div className="mt-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Map Legend
                    </h4>
                    <div className="text-sm text-gray-600">
                      Click on any province to explore
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {provincesData.map(province => (
                      <div key={province.id} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: province.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{province.name}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-700">Major Cities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#F59E0B]"></div>
                      <span className="text-sm text-gray-700">Mountain Peaks</span>
                    </div>
                  </div>
                </div>

                {/* Province Quick Select Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {provincesData.map(province => (
                    <button
                      key={province.id}
                      onClick={() => handleProvinceClick(province)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                        selectedProvince.id === province.id 
                          ? 'ring-3 ring-offset-2 transform scale-105 shadow-lg' 
                          : 'hover:transform hover:scale-105 hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: province.color,
                        color: 'white'
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="font-semibold">{province.name}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Province Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedProvince.name} Province</h2>
                  <p className="text-gray-600 mt-1">Capital: {selectedProvince.capital}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {selectedProvince.area.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">km² Area</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {selectedProvince.population.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Population</div>
                  </div>
                </div>
              </div>

              {/* Province Highlights */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Route className="w-4 h-4 text-blue-600" />
                    Major Trekking Routes
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProvince.trekkingRoutes.map((route, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-green-600" />
                    Major Cities
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProvince.majorCities.map((city, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Destinations Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Tourism Destinations</h3>
                  <div className="flex items-center gap-2">
                    <select 
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {allCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredDestinations.map(destination => (
                    <div
                      key={destination.id}
                      className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        activeDestination?.id === destination.id 
                          ? 'border-blue-500 bg-blue-50 transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setActiveDestination(destination)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                                                  {destination.category === 'Adventure' && <Navigation className="w-5 h-5 text-red-500" />}
                                                  {destination.category === 'Cultural' && <Castle className="w-5 h-5 text-yellow-500" />}
                                                  {destination.category === 'Religious' && <Church className="w-5 h-5 text-blue-500" />}
                                                  {destination.category === 'Nature' && <Trees className="w-5 h-5 text-green-500" />}
                                                  {destination.category === 'Heritage' && <Building2 className="w-5 h-5 text-purple-500" />}
                                                  {destination.category === 'Trekking' && <Navigation className="w-5 h-5 text-orange-500" />}
                                                  <h4 className="font-bold text-gray-800 text-lg">{destination.name}</h4>
                                                </div>
                        {destination.difficulty && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            destination.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            destination.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {destination.difficulty}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.slice(0, 3).map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
                          <div className="flex items-center gap-4">
                            {destination.altitude && (
                              <span className="flex items-center gap-1">
                                <Mountain className="w-4 h-4" />
                                {destination.altitude}
                              </span>
                            )}
                            {destination.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {destination.duration}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{destination.bestTimeToVisit.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details Panel */}
          <div className="space-y-8">
            {/* Active Destination Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-800">Selected Destination</h3>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {activeDestination.category}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{activeDestination.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedProvince.name}
                    </span>
                    {activeDestination.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activeDestination.duration}
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 leading-relaxed">{activeDestination.description}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Key Highlights
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {activeDestination.highlights.map((highlight, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-sm">{highlight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trip Details */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Trip Details</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {activeDestination.altitude && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mountain className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Max Altitude</div>
                            <div>{activeDestination.altitude}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeDestination.duration && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div>{activeDestination.duration}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeDestination.difficulty && (
                                          <div className="bg-yellow-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                              <Navigation className="w-4 h-4" />
                                              <div>
                                                <div className="font-medium">Difficulty</div>
                                                <div>{activeDestination.difficulty}</div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Best Season</div>
                          <div>{activeDestination.bestTimeToVisit.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Plan This Trip
                  </button>
                  <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Treks */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Route className="w-5 h-5 text-green-600" />
                Popular Trekking Routes
              </h3>
              
              <div className="space-y-4">
                {popularTreks.map((trek, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{trek.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trek.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        trek.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {trek.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {trek.province}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trek.days} days
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => {
                          const province = provincesData.find(p => p.name.includes(trek.province));
                          if (province) handleProvinceClick(province);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View on Map →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Info */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Weather in {selectedProvince.name}
                </h3>
                <div className="text-4xl font-bold">24°C</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-medium">18°C - 28°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4" />
                    <span>Wind Speed</span>
                  </div>
                  <span className="font-medium">12 km/h</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90">{selectedProvince.weather}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NepalTourismMap;