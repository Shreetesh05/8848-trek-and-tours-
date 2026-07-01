import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Search, Star, Clock, Users, ChevronRight, Mountain, Globe,
  Heart, Calendar, TrendingUp, Shield, Phone, Mail, Navigation,
  Eye, BookOpen, MapPin, Car, Bus, Plane, Train, ArrowRight,
  ChevronDown, Compass, Landmark, Sun, Waves, Camera, Zap,
  CheckCircle, Info, ExternalLink, Filter
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TransportOption {
  mode: string;
  icon: React.ReactNode;
  duration: string;
  cost: string;
  notes: string;
}

interface TourPackage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  groupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  locations: string[];
  district: string;
  culturalHighlights: string[];
  religion: string;
  keySignificance: string;
  accessFromIndia: string;
  indianVisitors: string;
  category: 'Hindu' | 'Buddhist' | 'Mixed' | 'Historical';
  bestTimeToVisit: string;
  distanceFromKTM: string;
  transportFromKTM: TransportOption[];
  mustSee: string[];
  tag?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const tourPackages: TourPackage[] = [
  {
    id: 1,
    title: "Pashupatinath Temple",
    subtitle: "Nepal's Holiest Shiva Shrine",
    description: "The oldest and holiest Shiva temple in Nepal; a UNESCO World Heritage Site perched on the Bagmati River. Sacred sadhus, ancient cremation ghats, and the eternal flame of devotion await.",
    price: 299,
    duration: "1 Day",
    groupSize: 15,
    difficulty: "Easy",
    rating: 4.9,
    reviews: 2340,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tag: "UNESCO Site",
    locations: ["Kathmandu"],
    district: "Kathmandu District",
    culturalHighlights: ["Shiva Lingam", "Sacred Bagmati River", "Cremation Ghats", "Sadhus", "Mahashivaratri"],
    religion: "Hindu (Shaiva)",
    keySignificance: "Oldest and holiest Shiva temple in Nepal. One of the most sacred Shiva temples in the world. Considered Shiva's sacred liṅga with origins in the Skanda Purana legend.",
    accessFromIndia: "Via Kathmandu (Tribhuvan Airport) or by bus/car from India via Gorakhpur–Sunauli border to Kathmandu.",
    indianVisitors: "Hundreds of thousands annually, especially on Maha Shivaratri.",
    category: "Hindu",
    bestTimeToVisit: "Feb–Mar (Maha Shivaratri), Oct–Nov",
    distanceFromKTM: "4 km from TIA",
    mustSee: ["Shiva Lingam sanctum", "Aryaghat cremation platform", "Sadhu enclave", "Deupatan village"],
    transportFromKTM: [
      { mode: "Taxi", icon: null, duration: "15–20 min", cost: "NPR 300–500", notes: "Most convenient, available 24/7 at airport" },
      { mode: "Bus/Microbus", icon: null, duration: "30–40 min", cost: "NPR 20–30", notes: "Bus no. 23; alight at Gaushala" },
      { mode: "Auto-rickshaw", icon: null, duration: "20–25 min", cost: "NPR 150–250", notes: "Negotiate fare before boarding" },
    ],
  },
  {
    id: 2,
    title: "Muktinath Temple",
    subtitle: "Liberation in the Himalayas",
    description: "Sacred Mukti Kṣetra (liberation site) at 3,710m. Revered by both Hindus (as a Vishnu shrine) and Tibetan Buddhists. The eternal flame of natural gas burns alongside 108 sacred water spouts.",
    price: 899,
    duration: "3 Days",
    groupSize: 8,
    difficulty: "Moderate",
    rating: 4.8,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tag: "Nepal Char Dham",
    locations: ["Muktinath", "Mustang"],
    district: "Mustang District",
    culturalHighlights: ["108 Water Spouts", "Eternal Flame", "Hindu-Buddhist Syncretism", "High Himalayan Views"],
    religion: "Hindu (Vaishnavite) & Buddhist",
    keySignificance: "Sacred Mukti Kṣetra. One of Nepal's Char Dhams. Revered by Hindus (Vishnu shrine) and Tibetan Buddhists (Chumig Gyatsa – 'Hundred Waters').",
    accessFromIndia: "Via Pokhara by road (Beni–Jomsom) or by small aircraft to Jomsom. Many Indians travel by personal vehicle via Nepal land borders.",
    indianVisitors: "≈96,000 Indian visitors in FY 2023/24.",
    category: "Mixed",
    bestTimeToVisit: "Mar–Jun, Sep–Nov",
    distanceFromKTM: "~200 km by air; 420 km by road",
    mustSee: ["Mukti Dhara (108 spouts)", "Jwala Mai eternal flame", "Buddhist gompa", "Kali Gandaki Valley"],
    transportFromKTM: [
      { mode: "Flight KTM→Pokhara→Jomsom", icon: null, duration: "35 min + 20 min", cost: "USD 180–250", notes: "Tara Air/Summit Air; mountain weather dependent" },
      { mode: "Bus KTM→Pokhara + Drive", icon: null, duration: "6 hrs + 7 hrs", cost: "NPR 3,000–5,000", notes: "Bus to Pokhara, jeep from Beni via Jomsom" },
      { mode: "Helicopter Charter", icon: null, duration: "1.5 hrs", cost: "USD 500–800", notes: "Best for elderly pilgrims or large groups" },
    ],
  },
  {
    id: 3,
    title: "Lumbini – Buddha's Birthplace",
    subtitle: "Origin of the Dharma",
    description: "Birthplace of Siddhārtha Gautama (c. 563 BCE). UNESCO World Heritage Site featuring the Mayadevi Temple, Ashoka Pillar, and an international monastic zone with temples from 20+ nations.",
    price: 599,
    duration: "2 Days",
    groupSize: 20,
    difficulty: "Easy",
    rating: 4.9,
    reviews: 3120,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tag: "UNESCO Site",
    locations: ["Lumbini", "Rupandehi"],
    district: "Rupandehi District",
    culturalHighlights: ["Mayadevi Temple", "Ashoka Pillar", "World Peace Pagoda", "Monasteries", "Sacred Pond"],
    religion: "Buddhist",
    keySignificance: "Birthplace of Lord Buddha. UNESCO World Heritage Site. Mayadevi Temple marks the precise nativity spot.",
    accessFromIndia: "Road: Sunauli (UP) border, buses from Gorakhpur. Air: Gautam Buddha Int'l Airport (Bhairahawa).",
    indianVisitors: "~300,889 Indian visitors in 2024 (out of 1.17M total).",
    category: "Buddhist",
    bestTimeToVisit: "Oct–Apr (Buddha Jayanti in May)",
    distanceFromKTM: "280 km by road",
    mustSee: ["Mayadevi Temple & nativity stone", "Ashoka Pillar inscription", "World Peace Pagoda", "Royal Thai & Myanmar Monasteries"],
    transportFromKTM: [
      { mode: "Flight KTM→Bhairahawa", icon: null, duration: "30 min", cost: "USD 80–130", notes: "Gautam Buddha Int'l Airport, then 20 min drive to Lumbini" },
      { mode: "Tourist Bus", icon: null, duration: "7–8 hrs", cost: "NPR 1,200–2,000", notes: "Greenline/Swaraj departures from Kantipath, KTM" },
      { mode: "Private Car", icon: null, duration: "5–6 hrs", cost: "NPR 8,000–12,000", notes: "Fastest & most comfortable; via Prithvi & Siddhartha Highways" },
    ],
  },
  {
    id: 4,
    title: "Janaki Mandir, Janakpur",
    subtitle: "Where Ram Met Sita",
    description: "The Mughal-style white marble temple of Goddess Sita (Janaki) in Janakpur — her mythical birthplace and the site of the divine Ram-Sita marriage in the Ramayana.",
    price: 399,
    duration: "1 Day",
    groupSize: 12,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "Ramayana Circuit",
    locations: ["Janakpur", "Dhanusha"],
    district: "Dhanusha District",
    culturalHighlights: ["Sita's Birthplace", "Ram-Sita Marriage Site", "Mithila Paintings", "Vivah Panchami", "60-Room Palace"],
    religion: "Hindu (Ram–Sita/Vaishnavite)",
    keySignificance: "Birthplace of Goddess Sita. Central to Mithilā culture and the Ramāyaṇa legend. Built 1910 in ornate Mughal architecture with 60 rooms.",
    accessFromIndia: "Connected to Jaynagar (Bihar) by rail/road. Easy road access from Patna/Gaya via Sitamarhi.",
    indianVisitors: "Thousands of pilgrims, especially on Vivah Panchami (Dec). Surge since PM Modi's 2018 visit.",
    category: "Hindu",
    bestTimeToVisit: "Nov–Feb (Vivah Panchami in Dec)",
    distanceFromKTM: "225 km by road",
    mustSee: ["Janaki Mandir main shrine", "Ram Mandir", "Vivah Mandap", "Dhanush Sagar pond", "Mithila art galleries"],
    transportFromKTM: [
      { mode: "Flight KTM→Janakpur", icon: null, duration: "25 min", cost: "USD 60–100", notes: "Janakpur Airport; taxis available at airport" },
      { mode: "Bus (Kathmandu–Janakpur)", icon: null, duration: "6–7 hrs", cost: "NPR 700–1,200", notes: "Night buses available from Ratna Park" },
      { mode: "Private Car", icon: null, duration: "5 hrs", cost: "NPR 7,000–10,000", notes: "Via BP Highway / Tribhuvan Highway" },
    ],
  },
  {
    id: 5,
    title: "Swayambhunath Stupa",
    subtitle: "The Monkey Temple",
    description: "An ancient hilltop stupa (5th century CE), one of Nepal's most iconic landmarks with the all-seeing eyes of Buddha and 365 steps climbed by devotees and mischievous monkeys alike.",
    price: 199,
    duration: "Half Day",
    groupSize: 10,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 4560,
    image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tag: "UNESCO Site",
    locations: ["Kathmandu"],
    district: "Kathmandu District",
    culturalHighlights: ["Buddha's All-Seeing Eyes", "365 Stone Steps", "Resident Monkey Colony", "Panoramic Valley View", "Prayer Wheels"],
    religion: "Buddhist (Newar/Vajrayana)",
    keySignificance: "Ancient sacred stupa (5th c. CE), UNESCO World Heritage Site. Symbol of Kathmandu Valley.",
    accessFromIndia: "2 km west of Kathmandu downtown. Easy taxi/rickshaw from anywhere in KTM.",
    indianVisitors: "One of Nepal's most visited monuments — hundreds daily.",
    category: "Buddhist",
    bestTimeToVisit: "Year-round, best Oct–Mar",
    distanceFromKTM: "6 km from TIA",
    mustSee: ["Swayambhu stupa dome", "Buddha's eyes (4 directions)", "Agni shrine", "Museum of Natural History", "Western stupa viewpoint"],
    transportFromKTM: [
      { mode: "Taxi from Airport", icon: null, duration: "20–25 min", cost: "NPR 400–600", notes: "Direct route via Ring Road" },
      { mode: "Bus from Ratna Park", icon: null, duration: "25 min", cost: "NPR 15–20", notes: "Alight at Swayambhu base; then 365-step climb" },
      { mode: "E-rickshaw", icon: null, duration: "30 min", cost: "NPR 50–100", notes: "Eco-friendly option through Thamel" },
    ],
  },
  {
    id: 6,
    title: "Boudhanath Stupa",
    subtitle: "Heart of Tibetan Buddhism",
    description: "One of the world's largest Buddhist stupas (UNESCO listed), ringed by monasteries and spinning prayer wheels. The spiritual nerve center of Tibetan exile culture in Nepal.",
    price: 199,
    duration: "Half Day",
    groupSize: 10,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 3890,
    image: "https://images.unsplash.com/photo-1580548254596-1ef61221cef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "UNESCO Site",
    locations: ["Kathmandu"],
    district: "Kathmandu District",
    culturalHighlights: ["World's Largest Stupa", "36 Monasteries", "Spinning Prayer Wheels", "Butter Lamps", "Tibetan New Year (Lhosar)"],
    religion: "Buddhist (Tibetan Vajrayana)",
    keySignificance: "UNESCO World Heritage. Believed to house relics of Kashyapa Buddha. Focal point of Tibetan Buddhism outside Tibet.",
    accessFromIndia: "6 km from Kathmandu city center, 9 km from TIA.",
    indianVisitors: "Major pilgrimage hub; thousands daily during Lhosar and Buddha Jayanti.",
    category: "Buddhist",
    bestTimeToVisit: "Oct–Mar; Tibetan New Year (Feb–Mar)",
    distanceFromKTM: "9 km from TIA",
    mustSee: ["The great mandala stupa", "Butter lamp courtyard at dusk", "Surrounding gompa cluster", "Lhosar festival (Feb)", "Rooftop café panorama"],
    transportFromKTM: [
      { mode: "Taxi from Airport", icon: null, duration: "15–20 min", cost: "NPR 300–450", notes: "Closest major UNESCO site to TIA" },
      { mode: "Microbus from Ratna Park", icon: null, duration: "30–35 min", cost: "NPR 20–25", notes: "Route via Jorpati" },
      { mode: "Auto-rickshaw", icon: null, duration: "20–30 min", cost: "NPR 150–200", notes: "Via Gaushala road" },
    ],
  },
  {
    id: 7,
    title: "Manakamana Temple",
    subtitle: "The Wish-Fulfilling Goddess",
    description: "Perched atop a forested ridge in Gorkha, the 19th-century Shakti Peeth of Goddess Bhagawati. The thrilling cable car ride through misty Himalayan valleys adds to the pilgrimage magic.",
    price: 499,
    duration: "1 Day",
    groupSize: 8,
    difficulty: "Easy",
    rating: 4.6,
    reviews: 2210,
    image: "https://images.unsplash.com/photo-1559311640-4a855acf439d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "Shakti Peeth",
    locations: ["Gorkha"],
    district: "Gorkha District",
    culturalHighlights: ["Scenic Cable Car", "Wish Fulfillment Tradition", "Mountain Panoramas", "Navratri Festival", "Shakti Worship"],
    religion: "Hindu (Shakta/Durga)",
    keySignificance: "One of Nepal's most powerful Shakti temples. Devotees believe prayers are fulfilled by Goddess Bhagawati.",
    accessFromIndia: "Road from Kathmandu via Prithvi Highway to Kurintar, then cable car.",
    indianVisitors: "Significant especially during Navratri (Oct). Popular with Indian pilgrims from neighboring states.",
    category: "Hindu",
    bestTimeToVisit: "Navratri (Mar–Apr & Sep–Oct)",
    distanceFromKTM: "105 km by road",
    mustSee: ["9-minute cable car ride", "Manakamana Devi temple", "Valley panorama", "Sunrise view", "Kurintar bazaar"],
    transportFromKTM: [
      { mode: "Tourist Bus + Cable Car", icon: null, duration: "2.5 hrs drive + 9 min cable", cost: "NPR 800–1,200 + cable fare", notes: "Buses from Kalanki; cable runs 9am–5pm" },
      { mode: "Private Car", icon: null, duration: "2 hrs", cost: "NPR 5,000–7,000", notes: "Via Prithvi Highway to Kurintar" },
      { mode: "Taxi (shared)", icon: null, duration: "2.5 hrs", cost: "NPR 300–500/seat", notes: "Shared jeep from Gongabu Bus Park" },
    ],
  },
  {
    id: 8,
    title: "Changu Narayan Temple",
    subtitle: "Nepal's Oldest Vishnu Temple",
    description: "Nepal's oldest surviving temple (4th century CE) dedicated to Lord Vishnu, atop a forested hilltop east of Bhaktapur. Its intricate Newari woodcarvings are among the finest in Asia.",
    price: 349,
    duration: "Half Day",
    groupSize: 10,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1503516459261-40c66117780a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "UNESCO Site",
    locations: ["Bhaktapur"],
    district: "Bhaktapur District",
    culturalHighlights: ["Newari Wood Carvings", "Licchavi Stone Inscriptions", "Garuda Statue", "Temple Courtyard Art", "4th Century Origins"],
    religion: "Hindu (Vaishnavite)",
    keySignificance: "Nepal's oldest surviving temple. UNESCO World Heritage Site. Contains Licchavi-era sculptures unmatched in quality.",
    accessFromIndia: "Via Bhaktapur (22 km from KTM); then 2 km hike or jeep to hilltop.",
    indianVisitors: "Popular among art and history enthusiasts from India.",
    category: "Hindu",
    bestTimeToVisit: "Oct–Apr",
    distanceFromKTM: "22 km from TIA",
    mustSee: ["Vishnu Vikrantha sculpture", "Garuda statue (Licchavi era)", "Kinnarakrishna woodcarving", "Inscribed pillar 464 CE", "Chilandeo hillside view"],
    transportFromKTM: [
      { mode: "Taxi from Airport", icon: null, duration: "35–45 min", cost: "NPR 600–900", notes: "Direct to Changu; includes Bhaktapur Durbar Square stop" },
      { mode: "Bus (via Bhaktapur)", icon: null, duration: "1 hr + hike", cost: "NPR 30 + NPR 100", notes: "Trolleybus to Bhaktapur, then tempo to Changu base" },
      { mode: "Cycling Tour", icon: null, duration: "2–3 hrs", cost: "NPR 400–600 bike rental", notes: "Scenic route via Suryabinayak; guided cycling tours available" },
    ],
  },
  {
    id: 9,
    title: "Dakshinkali Temple",
    subtitle: "Nepal's Greatest Kali Shrine",
    description: "The most powerful Kali temple in Nepal, nestled in a forested gorge at the confluence of two rivers. The site of the largest sacrificial ritual in the Hindu world, especially on Saturdays.",
    price: 299,
    duration: "Half Day",
    groupSize: 12,
    difficulty: "Easy",
    rating: 4.5,
    reviews: 1340,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "Shakti Peeth",
    locations: ["Pharping", "Kathmandu"],
    district: "Kathmandu District",
    culturalHighlights: ["Saturday Sacrifice Ritual", "Gorge Setting", "Kali Puja", "Pharping Monasteries Nearby", "Forested Trail"],
    religion: "Hindu (Shakta/Kali)",
    keySignificance: "Most powerful Kali shrine in Nepal. Every Saturday, thousands perform offerings; some of Nepal's most intense ritual devotion happens here.",
    accessFromIndia: "22 km southwest of Kathmandu; accessible by bus or taxi from KTM.",
    indianVisitors: "Major Shakta pilgrimage destination; especially popular among Bengali and south Indian visitors.",
    category: "Hindu",
    bestTimeToVisit: "Saturdays (biggest puja), Navratri",
    distanceFromKTM: "22 km from TIA",
    mustSee: ["Kali shrine at gorge confluence", "Saturday morning puja", "Pharping Buddhist monasteries", "Asura Cave (Guru Rinpoche)", "Shekh Narayan temple"],
    transportFromKTM: [
      { mode: "Taxi", icon: null, duration: "40–50 min", cost: "NPR 700–1,000", notes: "Most convenient; via Farping road" },
      { mode: "Bus from Ratna Park", icon: null, duration: "1–1.5 hrs", cost: "NPR 40–60", notes: "Direct microbuses; check timings" },
      { mode: "Motorbike Rental", icon: null, duration: "40 min", cost: "NPR 500–800/day", notes: "Scenic forested route; available in Thamel" },
    ],
  },
  {
    id: 10,
    title: "Gosaikunda Lake",
    subtitle: "Sacred Alpine Lake of Shiva",
    description: "A stunning high-altitude glacial lake (4,380m) mentioned in Hindu scriptures. Thousands of pilgrims trek here during Janai Purnima, believing Shiva created it by piercing the Himalayas with his trident.",
    price: 749,
    duration: "4 Days",
    groupSize: 8,
    difficulty: "Challenging",
    rating: 4.7,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "High Altitude Pilgrimage",
    locations: ["Rasuwa"],
    district: "Rasuwa District",
    culturalHighlights: ["Janai Purnima Festival", "Glacial Sacred Lake", "Himalayan Trek", "Shiva Legend", "High-Altitude Camping"],
    religion: "Hindu (Shaiva)",
    keySignificance: "Sacred lake in Hindu scriptures. During Janai Purnima (Aug), tens of thousands of pilgrims converge — one of Nepal's largest pilgrimage gatherings.",
    accessFromIndia: "Via Kathmandu → Dhunche (Langtang). Drive 7 hrs to trailhead, then 2-day trek.",
    indianVisitors: "Significant during Janai Purnima; Shaiva pilgrims from across South Asia.",
    category: "Hindu",
    bestTimeToVisit: "Jul–Aug (Janai Purnima), Jun–Oct",
    distanceFromKTM: "130 km to trailhead (Dhunche)",
    mustSee: ["Gosaikunda sacred lake", "Surya Kunda & Bhairab Kunda", "Lauribina Pass views", "Alpine meadows", "Stars at altitude camp"],
    transportFromKTM: [
      { mode: "Bus KTM→Dhunche + Trek", icon: null, duration: "7 hrs drive + 2 days trek", cost: "NPR 600–900 (bus)", notes: "Buses from Machha Pokhari; then 2-day trail to lake" },
      { mode: "Jeep KTM→Dhunche", icon: null, duration: "5–6 hrs", cost: "NPR 3,500–5,000/seat", notes: "Shared jeep from Gongabu; fastest road option" },
      { mode: "Helicopter to Gosaikunda", icon: null, duration: "30 min", cost: "USD 300–450", notes: "For elderly pilgrims; weather dependent" },
    ],
  },
  {
    id: 11,
    title: "Kopan Monastery",
    subtitle: "Tibetan Buddhism in Kathmandu",
    description: "A world-renowned Tibetan Buddhist monastery on the outskirts of Kathmandu, famous for its monthly meditation courses and peaceful hilltop gardens overlooking the valley.",
    price: 149,
    duration: "Half Day",
    groupSize: 20,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 1120,
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "Meditation Retreat",
    locations: ["Kathmandu"],
    district: "Kathmandu District",
    culturalHighlights: ["Tibetan Buddhism Teachings", "Meditation Courses", "Valley Panorama", "Butter Lamp Offerings", "Monastic Life"],
    religion: "Buddhist (Gelug/Tibetan)",
    keySignificance: "One of the world's most respected Tibetan Buddhist centers. Famous for Lama Yeshe & Lama Zopa teachings.",
    accessFromIndia: "8 km northeast of Kathmandu near Boudhanath. Accessible by taxi.",
    indianVisitors: "Popular with Indian Buddhist seekers and meditation practitioners.",
    category: "Buddhist",
    bestTimeToVisit: "Year-round; November retreat courses",
    distanceFromKTM: "10 km from TIA",
    mustSee: ["Main gompa", "Garden stupa", "Valley panorama", "Daily puja at dawn", "Meditation hall"],
    transportFromKTM: [
      { mode: "Taxi", icon: null, duration: "25–30 min", cost: "NPR 400–600", notes: "Via Boudhanath road" },
      { mode: "Bus to Boudhanath + walk", icon: null, duration: "40 min + 15 min walk", cost: "NPR 25 + walk", notes: "Uphill path from Boudhanath Stupa" },
      { mode: "Electric Scooter Rental", icon: null, duration: "30 min", cost: "NPR 600–900/day", notes: "Eco-friendly; available in Thamel" },
    ],
  },
  {
    id: 12,
    title: "Gorkha Durbar & Manakamana",
    subtitle: "Birthplace of the Shah Dynasty",
    description: "A dramatically sited hilltop palace-fortress of the Shah dynasty and home of the Gorakhnath shrine — the spiritual heart of Nepal's unification. Offers sweeping views of the Annapurna range.",
    price: 449,
    duration: "1 Day",
    groupSize: 10,
    difficulty: "Moderate",
    rating: 4.6,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1600298882283-0b60f8d534d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tag: "Historical",
    locations: ["Gorkha"],
    district: "Gorkha District",
    culturalHighlights: ["Shah Dynasty Palace", "Gorakhnath Temple", "Annapurna Panorama", "Tallo Durbar Museum", "Ancient Fortifications"],
    religion: "Hindu (Shaiva/Gorakhnath)",
    keySignificance: "Ancestral home of Nepal's unifier Prithvi Narayan Shah. Gorakhnath temple is the spiritual patron of the Shah dynasty.",
    accessFromIndia: "145 km from Kathmandu via Prithvi Highway.",
    indianVisitors: "Popular with Indian history enthusiasts and Gorakhnath sect devotees.",
    category: "Historical",
    bestTimeToVisit: "Oct–Apr",
    distanceFromKTM: "145 km from TIA",
    mustSee: ["Gorkha Durbar palace", "Gorakhnath cave temple", "Talbarahi temple", "Prithvi Narayan Shah statue", "Himalayan panorama"],
    transportFromKTM: [
      { mode: "Tourist Bus", icon: null, duration: "4–5 hrs", cost: "NPR 500–800", notes: "Buses from Gongabu Bus Park to Gorkha Bazaar" },
      { mode: "Private Car", icon: null, duration: "3.5 hrs", cost: "NPR 7,000–10,000", notes: "Via Prithvi Highway; most comfortable" },
      { mode: "Bus + Local Jeep", icon: null, duration: "5 hrs total", cost: "NPR 400–600", notes: "Bus to Abu Khaireni, local jeep to Gorkha" },
    ],
  },
];

// ─── Helper: Transport Icon ───────────────────────────────────────────────────
function TransportIcon({ mode }: { mode: string }) {
  const lower = mode.toLowerCase();
  if (lower.includes("flight") || lower.includes("helicopter")) return <Plane size={14} />;
  if (lower.includes("bus")) return <Bus size={14} />;
  if (lower.includes("car") || lower.includes("taxi") || lower.includes("jeep")) return <Car size={14} />;
  if (lower.includes("train")) return <Train size={14} />;
  if (lower.includes("cycling") || lower.includes("scooter") || lower.includes("rick")) return <Navigation size={14} />;
  return <Navigation size={14} />;
}

// ─── Floating Mandala Decoration ─────────────────────────────────────────────
function MandalaRing({ size, delay, opacity }: { size: number; delay: number; opacity: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30 + delay * 10, repeat: Infinity, ease: "linear" }}
      style={{
        width: size, height: size, opacity,
        borderRadius: "50%",
        border: "1px solid rgba(251,191,36,0.4)",
        position: "absolute",
        top: "50%", left: "50%",
        marginTop: -size / 2, marginLeft: -size / 2,
        boxShadow: "inset 0 0 20px rgba(251,191,36,0.1)",
      }}
    >
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <div
          key={deg}
          style={{
            position: "absolute",
            width: 6, height: 6,
            borderRadius: "50%",
            background: "rgba(251,191,36,0.6)",
            top: "50%", left: "50%",
            transformOrigin: "0 0",
            transform: `rotate(${deg}deg) translateX(${size / 2 - 3}px) translateY(-3px)`,
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── Animated Om Symbol ───────────────────────────────────────────────────────
function FloatingSymbol({ symbol, x, y, delay }: { symbol: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.15, 0], y: -60 }}
      transition={{ duration: 5, delay, repeat: Infinity, repeatDelay: 3 }}
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        fontSize: 32, color: "#fbbf24", pointerEvents: "none", zIndex: 5,
        fontFamily: "serif",
      }}
    >
      {symbol}
    </motion.div>
  );
}

// ─── Category + Difficulty colors ─────────────────────────────────────────────
const catColors: Record<string, { bg: string; text: string; border: string }> = {
  Hindu:      { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  Buddhist:   { bg: "#eff6ff", text: "#1e40af", border: "#93c5fd" },
  Mixed:      { bg: "#f5f3ff", text: "#5b21b6", border: "#c4b5fd" },
  Historical: { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
};
const diffColors: Record<string, { bg: string; text: string }> = {
  Easy:        { bg: "#dcfce7", text: "#166534" },
  Moderate:    { bg: "#fef9c3", text: "#854d0e" },
  Challenging: { bg: "#fee2e2", text: "#991b1b" },
};

// ─── Star Row ─────────────────────────────────────────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} style={{ fill: i <= Math.floor(rating) ? "#f59e0b" : "transparent", color: i <= Math.floor(rating) ? "#f59e0b" : "#d1d5db" }} />
      ))}
      <span className="text-xs font-bold text-amber-600 ml-1">{rating}</span>
    </span>
  );
}

// ─── Transport Card ───────────────────────────────────────────────────────────
function TransportRow({ opt, idx }: { opt: TransportOption; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.07 }}
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)" }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-700"
        style={{ background: "rgba(251,191,36,0.2)" }}>
        <TransportIcon mode={opt.mode} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-gray-800 mb-0.5">{opt.mode}</div>
        <div className="flex items-center gap-3 text-[11px] text-gray-600 flex-wrap">
          <span className="flex items-center gap-1"><Clock size={10} />{opt.duration}</span>
          <span className="flex items-center gap-1 font-semibold text-amber-700">{opt.cost}</span>
        </div>
        <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{opt.notes}</div>
      </div>
    </motion.div>
  );
}

// ─── Tour Card ─────────────────────────────────────────────────────────────────
function TourCard({ tour, expanded, onToggle }: { tour: TourPackage; expanded: boolean; onToggle: () => void }) {
  const cat = catColors[tour.category];
  const diff = diffColors[tour.difficulty];
  const [activeTab, setActiveTab] = useState<'info' | 'transport'>('info');

  return (
    <motion.div
      layout
      whileHover={expanded ? {} : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#fff",
        border: expanded ? "1.5px solid #f59e0b" : "1.5px solid #e5e7eb",
        boxShadow: expanded ? "0 8px 40px rgba(245,158,11,0.18)" : "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <motion.img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
        {tour.featured && (
          <div className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}>
            Featured
          </div>
        )}
        {tour.tag && (
          <div className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.6)", color: "#fbbf24", backdropFilter: "blur(6px)" }}>
            {tour.tag}
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <StarRow rating={tour.rating} />
          <span className="text-lg font-black text-white">${tour.price}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="text-base font-bold text-gray-900 leading-tight">{tour.title}</h3>
            <p className="text-xs text-amber-600 font-medium">{tour.subtitle}</p>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: diff.bg, color: diff.text }}>{tour.difficulty}</span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{tour.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
          <span className="flex items-center gap-1"><Clock size={11} />{tour.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} />{tour.groupSize} ppl</span>
          <span className="flex items-center gap-1"><MapPin size={11} />{tour.distanceFromKTM}</span>
        </div>

        {/* Category + religion */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}>
            {tour.religion}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            🗓 {tour.bestTimeToVisit}
          </span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tour.culturalHighlights.slice(0, 3).map((h, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{h}</span>
          ))}
          {tour.culturalHighlights.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">+{tour.culturalHighlights.length - 3}</span>
          )}
        </div>

        {/* Expandable */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {/* Tabs */}
              <div className="flex rounded-xl overflow-hidden mb-4" style={{ border: "1px solid #e5e7eb" }}>
                {(['info', 'transport'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 py-2 text-xs font-bold capitalize transition-colors"
                    style={{
                      background: activeTab === tab ? "#f59e0b" : "transparent",
                      color: activeTab === tab ? "#fff" : "#6b7280",
                    }}
                  >
                    {tab === 'info' ? '📖 Site Info' : '🚌 Getting There'}
                  </button>
                ))}
              </div>

              {activeTab === 'info' && (
                <div className="space-y-3">
                  <div className="rounded-xl p-3" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                    <div className="text-[11px] font-bold text-amber-800 mb-1 flex items-center gap-1">
                      <Eye size={11} /> Key Significance
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{tour.keySignificance}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <div className="text-[11px] font-bold text-green-800 mb-1 flex items-center gap-1">
                      <Landmark size={11} /> Must See
                    </div>
                    <ul className="space-y-0.5">
                      {tour.mustSee.map((m, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-green-500 mt-0.5 flex-shrink-0" />{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                    <div className="text-[11px] font-bold text-blue-800 mb-1 flex items-center gap-1">
                      <Users size={11} /> Indian Visitors
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{tour.indianVisitors}</p>
                  </div>
                </div>
              )}

              {activeTab === 'transport' && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <Plane size={11} />
                    <span>From Kathmandu (Tribhuvan Int'l Airport)</span>
                    <span className="ml-auto font-semibold text-amber-600">{tour.distanceFromKTM}</span>
                  </div>
                  <div className="space-y-2">
                    {tour.transportFromKTM.map((opt, i) => (
                      <TransportRow key={i} opt={opt} idx={i} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto pt-4">
          <button
            onClick={onToggle}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            style={{
              background: expanded ? "#111827" : "transparent",
              color: expanded ? "#fff" : "#374151",
              border: "1.5px solid #e5e7eb",
            }}
          >
            {expanded ? "Show Less" : (
              <><Eye size={12} /> View Details</>
            )}
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 4px 14px rgba(245,158,11,0.3)" }}
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
const NepalCulturalToursPage: React.FC = () => {
  const [filtered, setFiltered] = useState(tourPackages);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Stats section inView
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    let result = tourPackages;
    if (selectedCategory !== 'All') result = result.filter(t => t.category === selectedCategory);
    if (selectedDifficulty !== 'All') result = result.filter(t => t.difficulty === selectedDifficulty);
    result = result.filter(t => t.price <= maxPrice);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.religion.toLowerCase().includes(q) ||
        t.locations.some(l => l.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
    setExpandedId(null);
  }, [selectedCategory, selectedDifficulty, maxPrice, searchQuery]);

  const stats = [
    { label: "Sacred Sites", value: "12+", icon: <Landmark size={20} /> },
    { label: "Indian Visitors/yr", value: "500K+", icon: <Users size={20} /> },
    { label: "UNESCO Sites", value: "4", icon: <Shield size={20} /> },
    { label: "Years Experience", value: "20+", icon: <TrendingUp size={20} /> },
  ];

  const floatingSymbols = ["ॐ", "卐", "☸", "✡", "ॐ", "☯"];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fafaf8", fontFamily: "'Lora', Georgia, serif", color: "#1c1917" }}
    >
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Nepal Temple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,5,0,0.88) 15%, rgba(10,5,0,0.55) 55%, rgba(10,5,0,0.25) 100%)" }} />
        </motion.div>

        {/* Floating sacred symbols */}
        {floatingSymbols.map((sym, i) => (
          <FloatingSymbol key={i} symbol={sym} x={10 + i * 15} y={20 + (i % 3) * 25} delay={i * 1.5} />
        ))}

        {/* Mandala rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
          <MandalaRing size={800} delay={0} opacity={0.06} />
          <MandalaRing size={580} delay={2} opacity={0.08} />
          <MandalaRing size={360} delay={4} opacity={0.1} />
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, zIndex: 10 }}
          className="relative text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.35)", backdropFilter: "blur(8px)" }}
            >
              <Heart size={13} />
              Sacred Journey Through Nepal
            </motion.div>

            <h1
              className="font-black mb-6 leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", letterSpacing: "-0.02em", fontFamily: "'Playfair Display', 'Lora', Georgia, serif" }}
            >
              <span className="text-white">Nepal's </span>
              <span style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Sacred
              </span>
              <br />
              <span className="text-white">Heritage</span>
            </h1>

            <p className="mb-10 max-w-2xl mx-auto leading-relaxed text-amber-100"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
              Discover ancient temples, sacred stupas, and pilgrimage sites that have drawn seekers for millennia — with all transport routes from Kathmandu Airport.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 0 40px rgba(245,158,11,0.4)", fontFamily: "sans-serif" }}
              >
                Begin Pilgrimage <ChevronRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm"
                style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "white", backdropFilter: "blur(8px)", fontFamily: "sans-serif" }}
              >
                <Camera size={15} />
                Virtual Tour
              </motion.button>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(251,191,36,0.25)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex justify-center mb-2 text-amber-400">{s.icon}</div>
                <div className="text-2xl font-black text-white" style={{ fontFamily: "sans-serif" }}>{s.value}</div>
                <div className="text-xs text-amber-200" style={{ fontFamily: "sans-serif" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          <div className="w-5 h-8 rounded-full border border-amber-400/40 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-amber-400/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── FILTERS ── */}
      <section className="py-10 px-4 md:px-8" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6"
            style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
          >
            {/* Mobile toggle */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <span className="font-bold text-amber-800 text-sm flex items-center gap-2">
                <Filter size={15} /> Filter Sites
              </span>
              <button onClick={() => setShowFilters(!showFilters)} className="text-amber-700 text-xs font-semibold">
                {showFilters ? "Hide" : "Show"} Filters
              </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? '' : 'hidden md:grid'}`}>
              {/* Search */}
              <div>
                <label className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1 ">
                  <Search size={11} /> Search
                </label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Temple, city, religion…"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#fff", border: "1.5px solid #fcd34d", fontFamily: "sans-serif" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#f59e0b"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#fcd34d"; }}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1 ">
                  <BookOpen size={11} /> Religion
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl text-sm outline-none appearance-none"
                  style={{ background: "#fff", border: "1.5px solid #fcd34d", fontFamily: "sans-serif" }}
                >
                  <option value="All">All Religions</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Historical">Historical</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1 ">
                  <Mountain size={11} /> Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl text-sm outline-none appearance-none"
                  style={{ background: "#fff", border: "1.5px solid #fcd34d", fontFamily: "sans-serif" }}
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 block">
                  Max Price: <span className="text-amber-600">${maxPrice}</span>
                </label>
                <input
                  type="range" min="100" max="1000" step="50"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full mt-1"
                  style={{ accentColor: "#f59e0b" }}
                />
                <div className="flex justify-between text-[10px] text-amber-700 mt-1" style={{ fontFamily: "sans-serif" }}>
                  <span>$100</span><span>$1,000</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #fde68a" }}>
              <p className="text-xs text-amber-700" style={{ fontFamily: "sans-serif" }}>
                Showing <strong>{filtered.length}</strong> of {tourPackages.length} sacred sites
              </p>
              {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || maxPrice < 1000 || searchQuery) && (
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedDifficulty('All'); setMaxPrice(1000); setSearchQuery(''); }}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Clear Filters ×
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOUR CARDS GRID ── */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-black mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Explore{" "}
              <span style={{ background: "linear-gradient(90deg,#f59e0b,#ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Sacred Sites
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto" style={{ fontFamily: "sans-serif" }}>
              Each card includes full transport details from Kathmandu Airport — click "View Details" to see how to get there.
            </p>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((tour, idx) => (
                  <motion.div
                    key={tour.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TourCard
                      tour={tour}
                      expanded={expandedId === tour.id}
                      onToggle={() => setExpandedId(expandedId === tour.id ? null : tour.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="text-5xl mb-4">🙏</div>
                <div className="text-xl font-bold text-gray-700 mb-2">No sites found</div>
                <div className="text-gray-400 text-sm" style={{ fontFamily: "sans-serif" }}>Try adjusting your filters</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── TRANSPORT FROM KTM GUIDE ── */}
      <section
        className="py-20 px-4 md:px-8"
        style={{ background: "linear-gradient(135deg,#1c1008 0%,#291505 50%,#1c1008 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", fontFamily: "sans-serif" }}>
              <Plane size={12} /> From Kathmandu Airport
            </div>
            <h2
              className="font-black text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Getting to Sacred Sites
            </h2>
            <p className="text-amber-200 max-w-2xl mx-auto" style={{ fontFamily: "sans-serif", fontSize: 15 }}>
              All distances measured from Tribhuvan International Airport (TIA), Kathmandu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Pashupatinath", dist: "4 km", time: "15–20 min", mode: "Taxi", cost: "NPR 300–500", color: "#ef4444" },
              { name: "Boudhanath Stupa", dist: "9 km", time: "15–20 min", mode: "Taxi", cost: "NPR 300–450", color: "#3b82f6" },
              { name: "Swayambhunath", dist: "6 km", time: "20–25 min", mode: "Taxi", cost: "NPR 400–600", color: "#f59e0b" },
              { name: "Dakshinkali", dist: "22 km", time: "40–50 min", mode: "Taxi / Bus", cost: "NPR 40–1,000", color: "#dc2626" },
              { name: "Changu Narayan", dist: "22 km", time: "35–45 min", mode: "Taxi", cost: "NPR 600–900", color: "#f97316" },
              { name: "Kopan Monastery", dist: "10 km", time: "25–30 min", mode: "Taxi", cost: "NPR 400–600", color: "#8b5cf6" },
              { name: "Manakamana", dist: "105 km", time: "2–2.5 hrs", mode: "Bus + Cable Car", cost: "NPR 1,000+", color: "#ec4899" },
              { name: "Janakpur", dist: "225 km", time: "25 min flight / 6 hr bus", mode: "Flight / Bus", cost: "USD 60–100", color: "#10b981" },
              { name: "Lumbini", dist: "280 km", time: "30 min flight / 7 hr bus", mode: "Flight / Bus", cost: "USD 80–130", color: "#6366f1" },
              { name: "Muktinath", dist: "200+ km", time: "35+20 min flight", mode: "Flight to Jomsom", cost: "USD 180–250", color: "#0ea5e9" },
              { name: "Gorkha Durbar", dist: "145 km", time: "3.5–5 hrs", mode: "Bus / Car", cost: "NPR 500–10,000", color: "#84cc16" },
              { name: "Gosaikunda", dist: "130 km", time: "7 hrs drive + 2-day trek", mode: "Bus + Trek", cost: "NPR 600+", color: "#a855f7" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-xs"
                  style={{ background: s.color }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="font-bold text-white text-sm mb-1" style={{ fontFamily: "sans-serif" }}>{s.name}</div>
                  <div className="flex flex-wrap gap-2 text-[11px]" style={{ fontFamily: "sans-serif" }}>
                    <span className="flex items-center gap-1 text-amber-400"><MapPin size={10} />{s.dist}</span>
                    <span className="flex items-center gap-1 text-amber-200"><Clock size={10} />{s.time}</span>
                  </div>
                  <div className="mt-1.5 text-[11px] text-amber-100" style={{ fontFamily: "sans-serif" }}>
                    <span className="font-semibold">{s.mode}</span> · {s.cost}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl p-6"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" }}
          >
            <div className="flex items-start gap-3">
              <Info size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div style={{ fontFamily: "sans-serif" }}>
                <div className="font-bold text-amber-300 text-sm mb-1">Travel Tips from TIA</div>
                <ul className="text-xs text-amber-200 space-y-1.5 leading-relaxed">
                  <li>• Pre-paid taxis from TIA airport counter are safest; rates are fixed and displayed at the booth.</li>
                  <li>• Boudhanath & Pashupatinath are closest — combine both in a half-day from the airport.</li>
                  <li>• For Lumbini/Janakpur, book flights in advance; morning flights recommended (afternoon fog common).</li>
                  <li>• Tourist buses for Muktinath/Lumbini depart from Kantipath or Gongabu — book a day ahead.</li>
                  <li>• Indian citizens do not require a visa for Nepal and can use Aadhaar/passport at all borders.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-4 md:px-8" style={{ background: "#fffbeb" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2
              className="font-black mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Why Choose{" "}
              <span style={{ background: "linear-gradient(90deg,#f59e0b,#ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                8848 Tours
              </span>
              {" "}for Pilgrimage?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield size={28} />,
                emoji: "🙏",
                title: "Authentic Experience",
                description: "Deep cultural immersion with local guides who understand religious significance, rituals, and traditions passed down through generations.",
                gradient: "from-amber-500 to-orange-600",
              },
              {
                icon: <Globe size={28} />,
                emoji: "🛂",
                title: "Easy India Access",
                description: "Specialized packages for Indian pilgrims — border crossing assistance, Hindi-speaking guides, and familiar vegetarian meal options.",
                gradient: "from-orange-500 to-red-600",
              },
              {
                icon: <Heart size={28} />,
                emoji: "✨",
                title: "Spiritual Guidance",
                description: "Arrange meetings with temple priests, Vedic scholars, and meditation sessions for a transformative spiritual journey.",
                gradient: "from-yellow-500 to-amber-600",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-8"
                style={{ background: "#fff", border: "1px solid #fde68a", boxShadow: "0 4px 24px rgba(245,158,11,0.1)" }}
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${f.gradient} text-white mb-4`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 md:px-8" style={{ background: "#fafaf8" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl text-center px-8 py-16"
            style={{ background: "linear-gradient(135deg,#1c1008,#2d1a04)", border: "1px solid rgba(251,191,36,0.2)" }}
          >
            {/* decorative mandala bg */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <MandalaRing size={500} delay={0} opacity={1} />
            </div>

            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", fontFamily: "sans-serif" }}
            >
              ✨ Start Your Sacred Journey
            </div>

            <h2
              className="font-black text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Begin Your Spiritual Journey
            </h2>
            <p className="text-amber-200 mb-10 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "sans-serif" }}>
              Let us guide you through Nepal's sacred sites with reverence, expertise, and authentic cultural experiences you'll carry forever.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white"
                style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 0 40px rgba(245,158,11,0.4)", fontFamily: "sans-serif" }}
              >
                <Phone size={16} /> Book Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold"
                style={{ border: "1.5px solid rgba(251,191,36,0.35)", color: "#fbbf24", fontFamily: "sans-serif" }}
              >
                <Mail size={16} /> Get Pilgrimage Guide
              </motion.button>
            </div>

            <div className="text-amber-400 text-sm space-y-1" style={{ fontFamily: "sans-serif" }}>
              <p>📞 +977-01-5912660 (Nepal) &nbsp;|&nbsp; +82-010-5877-5512 (International)</p>
              <p>✉ infolinkasiatours@gmail.com</p>
              <p className="text-amber-600 text-xs mt-2">📍 Kathmandu, Nepal</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NepalCulturalToursPage;