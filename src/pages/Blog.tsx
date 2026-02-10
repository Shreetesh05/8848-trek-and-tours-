import { useMemo, useState, type JSX, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  Filter, 
  ChevronRight,
  BookOpen,
  TrendingUp,
  Mail,
  Share2,
  Heart,
  Bookmark,
  ArrowRight,
  ChevronLeft,
  X,
  Star,
  Mountain,
  Users,
  
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  authorAvatar: string;
  views: number;
  likes: number;
  featured?: boolean;
  content?: string;
};

const SAMPLE_POSTS: Post[] = [
  {
    id: "p1",
    title: "Everest Base Camp Trek: The Ultimate Guide 2024",
    excerpt: "Everything you need to know about preparing for the world's most iconic trek — from permits and packing to altitude tips and Sherpa culture.",
    date: "2024-03-10",
    readTime: "12 min",
    category: "Trekking",
    tags: ["Everest", "Packing Guide", "High Altitude", "Sherpa Culture", "Himalayas"],
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Sherpa Dorje",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherpa",
    views: 12543,
    likes: 892,
    featured: true,
    content: "Complete guide to Everest Base Camp trek with day-by-day itinerary, packing list, and altitude tips."
  },
  {
    id: "p2",
    title: "Top 10 Day Hikes Around the World You Can't Miss",
    excerpt: "Discover breathtaking day hikes from Nepal to New Zealand that deliver epic views without requiring weeks of preparation.",
    date: "2025-02-01",
    readTime: "8 min",
    category: "Hiking",
    tags: ["Day Hike", "Trails", "Scenic Routes", "Beginners"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Emma Carter",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    views: 8432,
    likes: 567,
    featured: true
  },
  {
    id: "p3",
    title: "How to Choose an Ethical Trekking Operator in Nepal",
    excerpt: "Learn what questions to ask and what red flags to watch for when selecting a responsible trekking company.",
    date: "2025-06-18",
    readTime: "10 min",
    category: "Sustainability",
    tags: ["Responsible Travel", "Ethical Tourism", "Local Guides", "Community Support"],
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Raj Thapa",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
    views: 9567,
    likes: 721
  },
  {
    id: "p4",
    title: "Ultimate Packing Guide: Lightweight but Safe for Multi-day Treks",
    excerpt: "Master the art of packing smart with our comprehensive checklist that balances weight and safety essentials.",
    date: "2025-01-05",
    readTime: "6 min",
    category: "Packing",
    tags: ["Gear", "Safety", "Lightweight", "Checklist", "Essentials"],
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Sarah Miller",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    views: 11234,
    likes: 834
  },
  {
    id: "p5",
    title: "A Foodie's Guide to Himalayan Cuisine on the Trail",
    excerpt: "Explore local Nepali dishes, high-energy trekking snacks, and how to eat well while maintaining energy levels.",
    date: "2024-11-20",
    readTime: "7 min",
    category: "Culture",
    tags: ["Food", "Local Cuisine", "Nutrition", "Dal Bhat", "Trail Food"],
    image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Anita Gurung",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    views: 7654,
    likes: 598
  },
  {
    id: "p6",
    title: "Altitude Sickness Prevention: Expert Tips & Remedies",
    excerpt: "Learn how to recognize, prevent, and treat altitude sickness with expert advice from mountain guides.",
    date: "2024-09-15",
    readTime: "9 min",
    category: "Health & Safety",
    tags: ["Altitude", "Health", "Safety", "Prevention", "Medicine"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Dr. Michael Chen",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    views: 13456,
    likes: 1023
  },
  {
    id: "p7",
    title: "Photography Guide: Capturing the Perfect Mountain Shot",
    excerpt: "Professional tips for photographing mountains, from golden hour timing to equipment recommendations.",
    date: "2024-08-22",
    readTime: "11 min",
    category: "Photography",
    tags: ["Photography", "Mountains", "Gear", "Tips", "Landscape"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "David Park",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    views: 9876,
    likes: 756
  },
  {
    id: "p8",
    title: "Sustainable Trekking: Leave No Trace Principles in the Himalayas",
    excerpt: "How to minimize your environmental impact while trekking through fragile mountain ecosystems.",
    date: "2024-07-30",
    readTime: "8 min",
    category: "Sustainability",
    tags: ["Sustainability", "Eco-friendly", "Leave No Trace", "Environment"],
    image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    author: "Lisa Green",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    views: 8543,
    likes: 689
  }
];

const featuredAuthors = [
  { name: "Sherpa Dorje", role: "Senior Guide", posts: 24, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherpa", featured: true },
  { name: "Emma Carter", role: "Adventure Writer", posts: 18, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
  { name: "Raj Thapa", role: "Sustainability Expert", posts: 15, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" }
];

const popularTags = [
  "Everest", "Annapurna", "Trekking Tips", "Gear Guide", "Altitude", 
  "Photography", "Local Culture", "Sustainable Travel", "Packing", "Trail Food"
];

const categories = ["All", "Trekking", "Hiking", "Sustainability", "Packing", "Culture", "Health & Safety", "Photography"];

export default function BlogPage(): JSX.Element {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SAMPLE_POSTS.slice();
    
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    
    // Sort by featured first, then by date
    list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.date < b.date ? 1 : -1;
    });
    
    return list;
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const featuredPosts = useMemo(() => {
    return SAMPLE_POSTS.filter(post => post.featured).slice(0, 2);
  }, []);

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId: string) => {
    const newBookmarked = new Set(bookmarkedPosts);
    if (newBookmarked.has(postId)) {
      newBookmarked.delete(postId);
    } else {
      newBookmarked.add(postId);
    }
    setBookmarkedPosts(newBookmarked);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Mountain landscape"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">8848 Trek & Tours Blog</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trek & Trail <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Insights</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Expert guides, trail stories, and essential tips for your next Himalayan adventure.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Search articles, tips, or destinations..."
                  aria-label="Search blog posts"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="md:hidden px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setPage(1);
                          setShowMobileFilters(false);
                        }}
                        className={`px-4 py-2 rounded-full text-sm ${category === cat ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setQuery(tag);
                          setShowMobileFilters(false);
                        }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Left Column - Posts */}
          <section className="lg:w-2/3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && page === 1 && query === "" && category === "All" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-500" />
                    Featured Stories
                  </h2>
                  <div className="flex items-center gap-2 text-blue-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">Trending</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {featuredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedPost(post)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            FEATURED
                          </div>
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(post.id);
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'text-amber-500 fill-amber-500' : 'text-white'}`} />
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-medium rounded-full">
                              {post.category}
                            </span>
                            <span className="text-gray-500 text-sm">•</span>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.date)}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.authorAvatar}
                                alt={post.author}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <div className="text-sm font-medium">{post.author}</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {post.readTime}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {formatNumber(post.views)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                              Read more
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Posts Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {query || category !== "All" ? "Search Results" : "Latest Articles"}
                  <span className="text-gray-500 text-lg font-normal ml-2">
                    ({filtered.length} posts)
                  </span>
                </h2>
                <div className="hidden lg:flex items-center gap-4">
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setPage(1);
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                  <div className="text-6xl mb-4">🏔️</div>
                  <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pageItems.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedPost(post)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(post.id);
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(post.id);
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'text-amber-500 fill-amber-500' : 'text-white'}`} />
                            </button>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.authorAvatar}
                                alt={post.author}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <div className="text-sm font-medium">{post.author}</div>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(post.date)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {post.readTime}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {formatNumber(post.views)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {formatNumber(post.likes)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                        page === pageNum
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && page < totalPages - 2 && (
                  <>
                    <span className="px-2">...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                        page === totalPages
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="space-y-6 sticky top-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setPage(1);
                      }}
                      className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${
                        category === cat
                          ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">{cat}</span>
                      <span className="text-sm text-gray-500">
                        {SAMPLE_POSTS.filter(p => cat === "All" || p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-blue-100 mb-6">
                  Get weekly adventure tips, trail updates, and exclusive content.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-blue-200 mt-4">
                  No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Featured Authors */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Featured Authors
                </h3>
                <div className="space-y-4">
                  {featuredAuthors.map((author) => (
                    <div key={author.name} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-grow">
                        <div className="font-medium">{author.name}</div>
                        <div className="text-sm text-gray-500">{author.role}</div>
                      </div>
                      {author.featured && (
                        <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-full">
                          Top Writer
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQuery(tag);
                        setPage(1);
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Blog Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{SAMPLE_POSTS.length}</div>
                    <div className="text-sm text-emerald-100">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {SAMPLE_POSTS.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-emerald-100">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{categories.length}</div>
                    <div className="text-sm text-emerald-100">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{new Set(SAMPLE_POSTS.flatMap(p => p.tags)).size}</div>
                    <div className="text-sm text-emerald-100">Tags</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors shadow-lg"
                >
                  &times;
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-sm font-bold mb-3">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{selectedPost.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedPost.authorAvatar}
                      alt={selectedPost.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-bold">{selectedPost.author}</div>
                      <div className="text-sm text-gray-600">
                        Published on {formatDate(selectedPost.date)} • {selectedPost.readTime} read
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(selectedPost.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.has(selectedPost.id) ? 'fill-red-600 text-red-600' : ''}`} />
                      <span>{formatNumber(selectedPost.likes)}</span>
                    </button>
                    <button 
                      onClick={() => toggleBookmark(selectedPost.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-amber-600"
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(selectedPost.id) ? 'fill-amber-600 text-amber-600' : ''}`} />
                      <span>Save</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-gray-700 mb-6">{selectedPost.excerpt}</p>
                  {selectedPost.content && (
                    <p className="text-gray-600">{selectedPost.content}</p>
                  )}
                </div>
                
                {/* Tags */}
                <div className="mb-8">
                  <h3 className="font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(selectedPost.views)}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(selectedPost.likes)}</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{selectedPost.readTime}</div>
                    <div className="text-sm text-gray-600">Read Time</div>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="border-t pt-6">
                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all text-lg">
                    Read Full Article
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold">8848 Blog</span>
              </div>
              <p className="text-gray-400">
                Expert insights and stories from the world's highest trails.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(1).map((cat) => (
                  <li key={cat}>
                    <button onClick={() => setCategory(cat)} className="hover:text-cyan-400 transition-colors">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Trekking Guides</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Packing Lists</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Trail Maps</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Gear Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Subscribe for weekly adventure tips and trail updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-r-lg hover:opacity-90 transition-opacity">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} 8848 Trek & Tours Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom Eye icon component
const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);