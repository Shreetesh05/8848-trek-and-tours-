// // src/components/Trekking.tsx
// import { Phone, Mail } from 'lucide-react';
// import React, { useState } from 'react';

// type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';

// type ItineraryItem = {
//   day: number;
//   title: string;
//   description: string;
//   altitude: string;
//   trekkingTime: string;
// };

// type TrekPackage = {
//   id: number;
//   name: string;
//   duration: string;
//   difficulty: Difficulty;
//   price: string;
//   highlight: string;
//   description: string;
//   bestSeason: string;
//   maxAltitude: string;
//   image: string;
//   itinerary: ItineraryItem[];
//   colorClass: string;
// };

// const Trekking: React.FC = () => {
//   const [activeTrek, setActiveTrek] = useState<number>(1);
//   const [expandedDay, setExpandedDay] = useState<number | null>(null);

//   const trekPackages: TrekPackage[] = [
//     {
//       id: 1,
//       name: "Everest Base Camp Trek",
//       duration: "14 Days",
//       difficulty: "Challenging",
//       price: "",
//       highlight: "Walk in the footsteps of legends",
//       description: "Experience the world's most iconic trek through the heart of the Khumbu region, culminating at the base of the world's highest peak.",
//       bestSeason: "Mar-May, Sep-Nov",
//       maxAltitude: "5,545m (Kala Patthar)",
//       // FIXED: Corrected image URL
//       image: "/images/everesttrek.jpeg",
//       colorClass: "from-blue-600 to-cyan-500",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic mountain flight to Lukla (2,840m), trek to Phakding through Sherpa villages", altitude: "2,652m", trekkingTime: "3-4 hours" },
//         { day: 3, title: "Namche Bazaar", description: "Trek to Namche Bazaar, the gateway to Everest, with first views of Everest", altitude: "3,440m", trekkingTime: "5-6 hours" },
//         { day: 4, title: "Acclimatization Day", description: "Hike to Everest View Hotel for panoramic views, explore Namche market", altitude: "3,440m", trekkingTime: "3-4 hours" },
//         { day: 5, title: "Tengboche Monastery", description: "Trek to Tengboche, visit the famous monastery with views of Ama Dablam", altitude: "3,860m", trekkingTime: "5-6 hours" },
//         { day: 6, title: "Dingboche", description: "Continue through rhododendron forests to Dingboche village", altitude: "4,410m", trekkingTime: "5-6 hours" },
//         { day: 7, title: "Acclimatization Hike", description: "Hike to Nagarjun Hill for panoramic mountain views", altitude: "5,100m", trekkingTime: "4-5 hours" },
//         { day: 8, title: "Lobuche", description: "Trek to Lobuche with views of Khumbu Glacier", altitude: "4,940m", trekkingTime: "5-6 hours" },
//         { day: 9, title: "Gorak Shep to Everest Base Camp", description: "Trek to Gorak Shep, then to Everest Base Camp", altitude: "5,364m", trekkingTime: "7-8 hours" },
//         { day: 10, title: "Kala Patthar and descent", description: "Sunrise hike to Kala Patthar (5,545m), then descend to Pheriche", altitude: "5,545m", trekkingTime: "7-8 hours" },
//       ]
//     },
//     {
//       id: 2,
//       name: "Annapurna Circuit Trek",
//       duration: "17 Days",
//       difficulty: "Challenging",
//       price: "",
//       highlight: "Thorong La Pass (5,416m)",
//       description: "Classic Himalayan trek circling the Annapurna Massif, crossing high mountain passes, and experiencing diverse cultures from Hindu villages to Tibetan-influenced highlands.",
//       bestSeason: "Mar-May, Sep-Nov",
//       maxAltitude: "5,416m (Thorong La Pass)",
//       image: "images/annapurna.jpg",
//       colorClass: "from-blue-500 to-indigo-600",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Drive to Besisahar & Bhulbhule", description: "Scenic drive through foothills to trek starting point", altitude: "840m", trekkingTime: "7-8 hours drive" },
//         { day: 3, title: "Trek to Jagat", description: "Follow Marsyangdi River through subtropical forests and rice terraces", altitude: "1,300m", trekkingTime: "5-6 hours" },
//         { day: 4, title: "Trek to Dharapani", description: "Enter Manang district, passing waterfalls and suspension bridges", altitude: "1,960m", trekkingTime: "6-7 hours" },
//         { day: 5, title: "Trek to Chame", description: "First views of Annapurna II and Lamjung Himal", altitude: "2,710m", trekkingTime: "5-6 hours" },
//         { day: 6, title: "Trek to Pisang", description: "Enter alpine zone with dramatic valley views", altitude: "3,300m", trekkingTime: "5-6 hours" },
//         { day: 7, title: "Trek to Manang", description: "High route via Ghyaru village with panoramic Himalayan views", altitude: "3,540m", trekkingTime: "6-7 hours" },
//         { day: 8, title: "Acclimatization in Manang", description: "Explore Gangapurna Lake, ice cave, and practice altitude adjustment", altitude: "3,540m", trekkingTime: "3-4 hours" },
//         { day: 9, title: "Trek to Yak Kharka", description: "Gradual ascent through juniper forests", altitude: "4,110m", trekkingTime: "4-5 hours" },
//         { day: 10, title: "Trek to Thorong Phedi", description: "Base camp preparation for pass crossing", altitude: "4,450m", trekkingTime: "3-4 hours" },
//         { day: 11, title: "Cross Thorong La Pass", description: "Early start to summit pass (5,416m), descend to Muktinath", altitude: "5,416m / 3,800m", trekkingTime: "8-10 hours" },
//         { day: 12, title: "Trek to Marpha", description: "Descend through Kali Gandaki Valley to apple capital", altitude: "2,670m", trekkingTime: "5-6 hours" },
//         { day: 13, title: "Trek to Ghasa", description: "Enter subtropical zone with waterfalls and cliffside trails", altitude: "2,010m", trekkingTime: "5-6 hours" },
//         { day: 14, title: "Trek to Tatopani", description: "Relax in natural hot springs", altitude: "1,190m", trekkingTime: "5-6 hours" },
//         { day: 15, title: "Trek to Ghorepani", description: "Steep climb through rhododendron forests", altitude: "2,860m", trekkingTime: "7-8 hours" },
//         { day: 16, title: "Poon Hill Sunrise & Drive to Pokhara", description: "Morning hike to Poon Hill (3,210m), descend to Nayapul, drive to Pokhara", altitude: "1,400m", trekkingTime: "3-4 hours trek + 2hr drive" },
//         { day: 17, title: "Fly to Kathmandu", description: "Scenic flight return to Kathmandu", altitude: "1,400m", trekkingTime: "N/A" }
//       ]
//     },
//     {
//       id: 3,
//       name: "Langtang Valley Trek",
//       duration: "10 Days",
//       difficulty: "Moderate",
//       price: "",
//       highlight: "Himalayan hidden gem",
//       description: "Explore the beautiful Langtang valley just north of Kathmandu, known as the 'valley of glaciers' with rich Tamang culture.",
//       bestSeason: "Mar-May, Sep-Nov",
//       maxAltitude: "5,000m (Tserko Ri)",
//       // FIXED: Corrected image URL
//       image: "/images/langtang.jpg",
//       colorClass: "from-amber-500 to-orange-600",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Drive to Syabrubesi", description: "Scenic drive through hills and terraced fields to Syabrubesi", altitude: "1,550m", trekkingTime: "7-8 hours drive" },
//         { day: 3, title: "Trek to Lama Hotel", description: "Trek along Langtang Khola through forests to Lama Hotel", altitude: "2,470m", trekkingTime: "5-6 hours" },
//         { day: 4, title: "Langtang Village", description: "Continue trek to Langtang village with improving mountain views", altitude: "3,430m", trekkingTime: "5-6 hours" },
//         { day: 5, title: "Kyanjin Gompa", description: "Short trek to Kyanjin Gompa with visit to ancient monastery", altitude: "3,870m", trekkingTime: "3-4 hours" },
//         { day: 6, title: "Acclimatization Day", description: "Explore the area with optional hikes to Kyanjin Ri or Langshisha Kharka", altitude: "3,870m", trekkingTime: "4-5 hours" },
//         { day: 7, title: "Tserko Ri Summit", description: "Early morning hike to Tserko Ri (5,000m) for panoramic mountain views", altitude: "5,000m", trekkingTime: "7-8 hours" },
//         { day: 8, title: "Return to Lama Hotel", description: "Descend through rhododendron forests back to Lama Hotel", altitude: "2,470m", trekkingTime: "6-7 hours" },
//         { day: 9, title: "Trek to Syabrubesi", description: "Final descent to Syabrubesi along the Langtang River", altitude: "1,550m", trekkingTime: "5-6 hours" },
//         { day: 10, title: "Drive to Kathmandu", description: "Scenic drive back to Kathmandu with farewell dinner", altitude: "1,400m", trekkingTime: "7-8 hours drive" },
//       ]
//     },
//     {
//       id: 4,
//       name: "Manaslu Circuit Trek",
//       duration: "16 Days",
//       difficulty: "Strenuous",
//       price: "",
//       highlight: "Forbidden kingdom adventure",
//       description: "Traverse around the world's eighth highest mountain through remote trails, Tibetan-influenced villages, and over the challenging Larkya La pass.",
//       bestSeason: "Mar-May, Sep-Nov",
//       maxAltitude: "5,106m (Larkya La)",
//       image: "images/manaslu.webp",
//       colorClass: "from-violet-600 to-purple-700",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Drive to Soti Khola", description: "Scenic drive through the Nepalese countryside to Soti Khola", altitude: "710m", trekkingTime: "8-9 hours drive" },
//         { day: 3, title: "Trek to Machha Khola", description: "Trek along the Budhi Gandaki river through subtropical forests", altitude: "930m", trekkingTime: "6-7 hours" },
//         { day: 4, title: "Jagat", description: "Trek through terraced fields and Gurung villages to Jagat", altitude: "1,410m", trekkingTime: "6-7 hours" },
//         { day: 5, title: "Deng", description: "Enter the Manaslu Conservation Area, trek to Deng village", altitude: "1,860m", trekkingTime: "6-7 hours" },
//         { day: 6, title: "Namrung", description: "Trek through pine forests with improving mountain views to Namrung", altitude: "2,630m", trekkingTime: "6-7 hours" },
//         { day: 7, title: "Lho Gaon", description: "Trek to Lho village with spectacular views of Manaslu", altitude: "3,180m", trekkingTime: "4-5 hours" },
//         { day: 8, title: "Samagaon", description: "Trek to Samagaon, the main village in the region", altitude: "3,530m", trekkingTime: "3-4 hours" },
//         { day: 9, title: "Acclimatization Day", description: "Hike to Manaslu Base Camp or Birendra Tal (glacial lake)", altitude: "4,400m", trekkingTime: "5-6 hours" },
//         { day: 10, title: "Samdo", description: "Trek to Tibetan border village of Samdo", altitude: "3,860m", trekkingTime: "4-5 hours" },
//         { day: 11, title: "Dharamsala", description: "Trek to Dharamsala, the last stop before Larkya La pass", altitude: "4,460m", trekkingTime: "4-5 hours" },
//         { day: 12, title: "Larkya La Pass to Bimthang", description: "Cross Larkya La pass (5,106m), descend to Bimthang", altitude: "5,106m / 3,720m", trekkingTime: "8-9 hours" },
//         { day: 13, title: "Trek to Tilije", description: "Descend through rhododendron forests to Tilije village", altitude: "2,300m", trekkingTime: "5-6 hours" },
//         { day: 14, title: "Dharapani to Besishahar", description: "Trek to Dharapani, drive to Besishahar", altitude: "760m", trekkingTime: "3-4 hours trek + 3hr drive" },
//         { day: 15, title: "Drive to Kathmandu", description: "Scenic drive back to Kathmandu through the Himalayan foothills", altitude: "1,400m", trekkingTime: "6-7 hours drive" },
//         { day: 16, title: "Departure", description: "Transfer to airport for departure", altitude: "N/A", trekkingTime: "N/A" },
//       ]
//     },
//     {
//       id: 5,
//       name: "Upper Mustang Trek",
//       duration: "14 Days",
//       difficulty: "Moderate",
//       price: "$1,799",
//       highlight: "The Last Forbidden Kingdom",
//       description: "Explore the ancient kingdom of Mustang with its unique Tibetan culture, dramatic desert landscapes, and ancient cave monasteries.",
//       bestSeason: "Mar-Nov",
//       maxAltitude: "3,840m",
//       image: "https://images.unsplash.com/photo-1595131838590-cc80efc028fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       colorClass: "from-red-600 to-orange-500",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Fly to Pokhara", description: "Scenic flight to Pokhara with mountain views", altitude: "827m", trekkingTime: "25 minutes" },
//         { day: 3, title: "Fly to Jomsom, trek to Kagbeni", description: "Spectacular flight to Jomsom, then trek to Kagbeni", altitude: "2,810m", trekkingTime: "20 minutes flight, 3-4 hours trek" },
//         { day: 4, title: "Trek to Chele", description: "Enter the restricted area of Upper Mustang, trek to Chele", altitude: "3,050m", trekkingTime: "5-6 hours" },
//         { day: 5, title: "Trek to Syangboche", description: "Cross Taklam La Pass (3,624m) and Dajori La Pass (3,735m)", altitude: "3,475m", trekkingTime: "6-7 hours" },
//       ]
//     },
//     {
//       id: 6,
//       name: "Ghorepani Poon Hill Trek",
//       duration: "7 Days",
//       difficulty: "Moderate",
//       price: "$699",
//       highlight: "Best sunrise views in the Annapurnas",
//       description: "A shorter trek offering spectacular mountain views, charming Gurung villages, and the famous sunrise from Poon Hill.",
//       bestSeason: "Year-round (except monsoon)",
//       maxAltitude: "3,210m (Poon Hill)",
//       image: "https://images.unsplash.com/photo-1580548254596-1efd3777f5da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
//       colorClass: "from-green-500 to-emerald-600",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Fly to Pokhara", description: "Scenic flight to Pokhara with mountain views", altitude: "827m", trekkingTime: "25 minutes" },
//         { day: 3, title: "Drive to Nayapul, trek to Tikhedhunga", description: "Drive to trek start point, begin trek to Tikhedhunga", altitude: "1,570m", trekkingTime: "1hr drive, 4-5 hours trek" },
//         { day: 4, title: "Trek to Ghorepani", description: "Steep climb through rhododendron forests to Ghorepani", altitude: "2,860m", trekkingTime: "6-7 hours" },
//         { day: 5, title: "Poon Hill Sunrise, trek to Tadapani", description: "Early hike to Poon Hill for sunrise, then trek to Tadapani", altitude: "3,210m", trekkingTime: "5-6 hours" },
//       ]
//     },
//     {
//       id: 7,
//       name: "Everest Three Passes Trek",
//       duration: "19 Days",
//       difficulty: "Strenuous",
//       price: "$1,899",
//       highlight: "Ultimate Everest adventure",
//       description: "The most comprehensive Everest region trek, crossing three high passes and visiting all the major valleys and viewpoints.",
//       bestSeason: "Mar-May, Sep-Nov",
//       maxAltitude: "5,545m (Kongma La)",
//       image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//       colorClass: "from-gray-600 to-blue-800",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic mountain flight to Lukla, trek to Phakding", altitude: "2,652m", trekkingTime: "3-4 hours" },
//         { day: 3, title: "Trek to Namche Bazaar", description: "Trek to Namche Bazaar, the gateway to Everest", altitude: "3,440m", trekkingTime: "5-6 hours" },
//         { day: 4, title: "Acclimatization Day", description: "Hike to Everest View Hotel for panoramic views", altitude: "3,440m", trekkingTime: "3-4 hours" },
//         { day: 5, title: "Trek to Thame", description: "Less-traveled route to Thame village", altitude: "3,800m", trekkingTime: "4-5 hours" },
//       ]
//     },
//     {
//       id: 8,
//       name: "Kanchenjunga Base Camp Trek",
//       duration: "22 Days",
//       difficulty: "Strenuous",
//       price: "$2,199",
//       highlight: "Third highest mountain in the world",
//       description: "Remote trek to the base of the world's third highest mountain, through pristine forests and traditional villages.",
//       bestSeason: "Mar-May, Sep-Nov",
//       maxAltitude: "5,143m",
//       image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//       colorClass: "from-teal-600 to-blue-700",
//       itinerary: [
//         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
//         { day: 2, title: "Fly to Bhadrapur, drive to Taplejung", description: "Fly to Bhadrapur, then long drive to Taplejung", altitude: "1,800m", trekkingTime: "1hr flight, 8-9hr drive" },
//         { day: 3, title: "Trek to Chiruwa", description: "Begin trek through terraced fields and forests", altitude: "1,270m", trekkingTime: "6-7 hours" },
//         { day: 4, title: "Trek to Sekathum", description: "Continue along Tamor and Ghunsa rivers", altitude: "1,660m", trekkingTime: "6-7 hours" },
//         { day: 5, title: "Trek to Amjilosa", description: "Steep climb through rhododendron forests", altitude: "2,510m", trekkingTime: "6-7 hours" },
//       ]
//     }
//   ];

//   const toggleDay = (day: number) => {
//     setExpandedDay(expandedDay === day ? null : day);
//   };

//   const activePackage = trekPackages.find(trek => trek.id === activeTrek) || trekPackages[0];

//   // FIXED: Added type for active border classes
//   type ActiveBorderClasses = {
//     [key: number]: string;
//   };

//   const activeBorderClasses: ActiveBorderClasses = {
//     1: 'border-blue-600 ring-blue-200',
//     2: 'border-blue-500 ring-blue-200',
//     3: 'border-amber-500 ring-amber-200',
//     4: 'border-violet-600 ring-violet-200'
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-12">
//       <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-12">
//   <div className="relative h-screen flex items-center justify-center overflow-hidden">

//     <video
//       autoPlay
//       loop
//       muted
//       playsInline
//       className="absolute inset-0 w-full h-full object-cover"
//     >
//       <source src="/videos/Trekking.mp4" type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>

//     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

//     <div className="relative z-10 text-center px-4">
//       <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-lg">
//         Himalayan Trekking Adventures
//       </h1>

//       <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 text-white drop-shadow-md">
//         Experience the world's most spectacular trails with our expertly crafted trekking packages
//       </p>

//       <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
//         Explore Tours
//       </button>
//     </div>
//   </div>
// </div>

//       {/* <div className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-1"></div>
//         <div className="relative z-10 text-center px-4">
//           <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white text-shadow-md">Himalayan Trekking Adventures</h1>
//           <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white">
//             Experience the world's most spectacular trails with our expertly crafted trekking packages
//           </p>
//           <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
//             Explore Tours
//           </button>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 z-10">
//           <div className="animate-bounce">
//             <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//             </svg>
//           </div>
//         </div>
//       </div> */}
//       <div className="max-w-7xl mx-auto pt-4 ">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {trekPackages.map((trek) => (
//             <div 
//               key={trek.id}
//               onClick={() => setActiveTrek(trek.id)}
//               className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 border-2 ${
//                 activeTrek === trek.id 
//                   ? `${activeBorderClasses[trek.id]} shadow-xl ring-4` 
//                   : 'border-gray-100'
//               }`}
//             >
//               <div className={`h-2 ${trek.colorClass.replace('from', 'bg-gradient-to-r from')}`}></div>
//               <div className="p-5">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-xl font-bold text-gray-900">{trek.name}</h3>
//                   <span className={`text-lg font-bold ${trek.colorClass.replace('from', 'bg-gradient-to-r from')} bg-clip-text text-transparent`}>
//                     {trek.price}
//                   </span>
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <span className="text-sm text-gray-600 mr-3">{trek.duration}</span>
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     trek.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
//                     trek.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
//                     trek.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {trek.difficulty}
//                   </span>
//                 </div>
//                 <p className="mt-3 text-gray-600 text-sm italic">{trek.highlight}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Detailed Trek Display */}
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
//           {/* Fixed Header Section - Now using actual image */}
//           <div className="relative w-full">
//   <div className="relative w-full h-[500px] md:h-[600px]">
//     <img 
//       src={activePackage.image} 
//       alt={activePackage.name} 
//       className="w-full h-full "
//     />
//     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
//     <div className="absolute inset-0 z-10 flex items-end p-6 md:p-8">
//       <div className="text-white">
//         <h2 className="text-3xl md:text-4xl font-bold">{activePackage.name}</h2>
//         <p className="text-xl mt-2 max-w-2xl">{activePackage.highlight}</p>
//       </div>
//     </div>
//   </div>
// </div>

          
//           <div className="p-6 md:p-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="md:col-span-2">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Trek Overview</h3>
//                 <p className="text-gray-700 leading-relaxed mb-6">
//                   {activePackage.description}
//                 </p>
                
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="text-gray-500 text-sm">Duration</div>
//                     <div className="font-bold text-lg">{activePackage.duration}</div>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="text-gray-500 text-sm">Difficulty</div>
//                     <div className="font-bold text-lg">{activePackage.difficulty}</div>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="text-gray-500 text-sm">Max Altitude</div>
//                     <div className="font-bold text-lg">{activePackage.maxAltitude}</div>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="text-gray-500 text-sm">Best Season</div>
//                     <div className="font-bold text-lg">{activePackage.bestSeason}</div>
//                   </div>
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Detailed Itinerary</h3>
//                 <div className="space-y-3">
//                   {activePackage.itinerary.map((day) => (
//                     <div 
//                       key={day.day} 
//                       className="border border-gray-200 rounded-xl overflow-hidden"
//                     >
//                       <div 
//                         className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
//                         onClick={() => toggleDay(day.day)}
//                       >
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                             <span className="font-bold text-blue-700">D{day.day}</span>
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900">{day.title}</div>
//                             <div className="text-sm text-gray-600">{day.altitude} • {day.trekkingTime}</div>
//                           </div>
//                         </div>
//                         <svg 
//                           className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${expandedDay === day.day ? 'rotate-180' : ''}`}
//                           fill="none" 
//                           viewBox="0 0 24 24" 
//                           stroke="currentColor"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
                      
//                       {expandedDay === day.day && (
//                         <div className="p-4 bg-white animate-fadeIn">
//                           <p className="text-gray-700">{day.description}</p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <div className="sticky top-6 space-y-6">
//                   <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h3>

//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
//                         <input
//                           type="tel"
//                           placeholder="+977-9841234567"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
//                         <input
//                           type="email"
//                           placeholder="you@example.com"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
//                         <input
//                           type="text"
//                           placeholder="Kathmandu, Nepal"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <button className="w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 transform transition hover:scale-[1.02] mt-4">
//                         Submit Details
//                       </button>

//                       <div className="text-center text-sm text-gray-500 mt-4">
//                         <p>We’ll contact you shortly after submission.</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
//                     <ul className="space-y-3">
//                       <li className="flex items-center">
//                         <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-gray-700">Professional trekking guide</span>
//                       </li>
//                       <li className="flex items-center">
//                         <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-gray-700">All necessary permits</span>
//                       </li>
//                       <li className="flex items-center">
//                         <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-gray-700">Teahouse accommodations</span>
//                       </li>
//                       <li className="flex items-center">
//                         <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-gray-700">Three meals per day</span>
//                       </li>
//                       <li className="flex items-center">
//                         <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-gray-700">First aid kit and oxygen</span>
//                       </li>
//                       <li className="flex items-center">
//                         <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-gray-700">Airport transfers</span>
//                       </li>
//                     </ul>
//                   </div>
//                    <div className="border-t border-b border-dashed border-gray-300 py-6 px-4 text-center space-y-4">
//       <div className="bg-gray-100 py-2 rounded">
//         <h3 className="text-lg font-semibold text-gray-900">Got a Question?</h3>
//       </div>

//       <p className="text-gray-700 text-sm">
//         Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.
//       </p>
//       <ul className="space-y-3">
//         <li className='font-bold text-blue-900'>
//           <span>Nepal Office</span>
//           <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
//             <Phone size={18} />
//             <span>+977-01-5912660</span>
//           </div>
//         </li>
//         <li className='font-bold text-blue-900'>
//           <span>Korea Office </span>
//           <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
//             <Phone size={18} />
//             <span>+82-010-5877-5512</span>
//           </div>
//         </li>
//       </ul>
//       <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
//         <Mail size={18} />
//         <span>infolinkasiatours@gmail.com</span>
//       </div>
//     </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-sm border border-blue-100">
//             <div className="text-blue-600 text-3xl mb-3">⛰️</div>
//             <h3 className="font-bold text-xl mb-3">Why Trek with Us?</h3>
//             <p className="text-gray-700">
//               With over 15 years of experience, we provide the safest and most memorable trekking experiences in Nepal. 
//               Our guides are certified by the Nepal Mountaineering Association and trained in wilderness first aid.
//             </p>
//           </div>
          
//           <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-100">
//             <div className="text-green-600 text-3xl mb-3">🌱</div>
//             <h3 className="font-bold text-xl mb-3">Sustainable Trekking</h3>
//             <p className="text-gray-700">
//               We're committed to eco-friendly practices: carrying out all waste, using solar power where possible, 
//               and supporting local communities. A portion of every trek fee goes to trail maintenance and local schools.
//             </p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 shadow-sm border border-purple-100">
//             <div className="text-purple-600 text-3xl mb-3">🛡️</div>
//             <h3 className="font-bold text-xl mb-3">Safety First</h3>
//             <p className="text-gray-700">
//               Your safety is our priority. All treks include comprehensive insurance, satellite communication devices, 
//               portable oxygen, and guides trained in altitude sickness recognition and emergency evacuation procedures.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Trekking;


// src/components/Trekking.tsx
import { Phone, Mail, MapPin, Calendar, TrendingUp, Users, Shield, Mountain, ChevronDown, ChevronRight, Star, Clock, Thermometer, Globe, Heart, CheckCircle } from 'lucide-react';
import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easeInOut } from 'framer-motion';

type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';

type ItineraryItem = {
  day: number;
  title: string;
  description: string;
  altitude: string;
  trekkingTime: string;
};

type TrekPackage = {
  id: number;
  name: string;
  duration: string;
  difficulty: Difficulty;
  price: string;
  highlight: string;
  description: string;
  bestSeason: string;
  maxAltitude: string;
  image: string;
  itinerary: ItineraryItem[];
  colorClass: string;
  rating: number;
  groupSize: string;
  completionRate: string;
};

const Trekking: React.FC = () => {
  const [activeTrek, setActiveTrek] = useState<number>(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isItineraryExpanded, setIsItineraryExpanded] = useState(false);

  const trekPackages: TrekPackage[] = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      duration: "14 Days",
      difficulty: "Challenging",
      price: "$1,899",
      highlight: "Walk in the footsteps of legends",
      description: "Experience the world's most iconic trek through the heart of the Khumbu region, culminating at the base of the world's highest peak. Follow the footsteps of legendary mountaineers and immerse yourself in Sherpa culture.",
      bestSeason: "Mar-May, Sep-Nov",
      maxAltitude: "5,545m (Kala Patthar)",
      image: "/images/everesttrek.jpeg",
      colorClass: "from-blue-600 via-cyan-500 to-blue-700",
      rating: 4.9,
      groupSize: "2-12 People",
      completionRate: "98%",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing with our expert guides. Evening cultural dinner.", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic mountain flight to Lukla (2,840m) with breathtaking views, then gentle trek to Phakding through Sherpa villages.", altitude: "2,652m", trekkingTime: "3-4 hours" },
        { day: 3, title: "Namche Bazaar", description: "Trek to Namche Bazaar, the gateway to Everest, crossing suspension bridges with first views of Everest and surrounding peaks.", altitude: "3,440m", trekkingTime: "5-6 hours" },
        { day: 4, title: "Acclimatization Day", description: "Hike to Everest View Hotel for panoramic views, explore Namche market, museum, and Sherpa culture. Acclimatization is key for success.", altitude: "3,440m", trekkingTime: "3-4 hours" },
        { day: 5, title: "Tengboche Monastery", description: "Trek to Tengboche, visit the famous monastery with spectacular views of Ama Dablam and Everest. Attend evening prayers.", altitude: "3,860m", trekkingTime: "5-6 hours" },
        { day: 6, title: "Dingboche", description: "Continue through rhododendron forests and Imja Valley to Dingboche village. Stunning views of Island Peak.", altitude: "4,410m", trekkingTime: "5-6 hours" },
        { day: 7, title: "Acclimatization Hike", description: "Hike to Nagarjun Hill (5,100m) for panoramic mountain views. Practice altitude adjustment and photography.", altitude: "5,100m", trekkingTime: "4-5 hours" },
        { day: 8, title: "Lobuche", description: "Trek to Lobuche with views of Khumbu Glacier and memorials of fallen climbers. Prepare for base camp tomorrow.", altitude: "4,940m", trekkingTime: "5-6 hours" },
        { day: 9, title: "Gorak Shep to Everest Base Camp", description: "Trek to Gorak Shep, then to Everest Base Camp. Stand at the foot of the world's highest mountain. Unforgettable experience.", altitude: "5,364m", trekkingTime: "7-8 hours" },
        { day: 10, title: "Kala Patthar and descent", description: "Sunrise hike to Kala Patthar (5,545m) for the best Everest views, then descend to Pheriche. Celebration dinner.", altitude: "5,545m", trekkingTime: "7-8 hours" },
      ]
    },
    {
      id: 2,
      name: "Annapurna Circuit Trek",
      duration: "17 Days",
      difficulty: "Challenging",
      price: "$1,499",
      highlight: "Thorong La Pass (5,416m)",
      description: "Classic Himalayan trek circling the Annapurna Massif, crossing high mountain passes, and experiencing diverse cultures from Hindu villages to Tibetan-influenced highlands.",
      bestSeason: "Mar-May, Sep-Nov",
      maxAltitude: "5,416m (Thorong La Pass)",
      image: "/images/annapurna.jpg",
      colorClass: "from-purple-600 via-violet-500 to-indigo-600",
      rating: 4.8,
      groupSize: "2-10 People",
      completionRate: "96%",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Drive to Besisahar & Bhulbhule", description: "Scenic drive through foothills to trek starting point", altitude: "840m", trekkingTime: "7-8 hours drive" },
        { day: 3, title: "Trek to Jagat", description: "Follow Marsyangdi River through subtropical forests and rice terraces", altitude: "1,300m", trekkingTime: "5-6 hours" },
        { day: 4, title: "Trek to Dharapani", description: "Enter Manang district, passing waterfalls and suspension bridges", altitude: "1,960m", trekkingTime: "6-7 hours" },
        { day: 5, title: "Trek to Chame", description: "First views of Annapurna II and Lamjung Himal", altitude: "2,710m", trekkingTime: "5-6 hours" },
        { day: 6, title: "Trek to Pisang", description: "Enter alpine zone with dramatic valley views", altitude: "3,300m", trekkingTime: "5-6 hours" },
        { day: 7, title: "Trek to Manang", description: "High route via Ghyaru village with panoramic Himalayan views", altitude: "3,540m", trekkingTime: "6-7 hours" },
        { day: 8, title: "Acclimatization in Manang", description: "Explore Gangapurna Lake, ice cave, and practice altitude adjustment", altitude: "3,540m", trekkingTime: "3-4 hours" },
        { day: 9, title: "Trek to Yak Kharka", description: "Gradual ascent through juniper forests", altitude: "4,110m", trekkingTime: "4-5 hours" },
        { day: 10, title: "Trek to Thorong Phedi", description: "Base camp preparation for pass crossing", altitude: "4,450m", trekkingTime: "3-4 hours" },
        { day: 11, title: "Cross Thorong La Pass", description: "Early start to summit pass (5,416m), descend to Muktinath", altitude: "5,416m / 3,800m", trekkingTime: "8-10 hours" },
        { day: 12, title: "Trek to Marpha", description: "Descend through Kali Gandaki Valley to apple capital", altitude: "2,670m", trekkingTime: "5-6 hours" },
        { day: 13, title: "Trek to Ghasa", description: "Enter subtropical zone with waterfalls and cliffside trails", altitude: "2,010m", trekkingTime: "5-6 hours" },
        { day: 14, title: "Trek to Tatopani", description: "Relax in natural hot springs", altitude: "1,190m", trekkingTime: "5-6 hours" },
        { day: 15, title: "Trek to Ghorepani", description: "Steep climb through rhododendron forests", altitude: "2,860m", trekkingTime: "7-8 hours" },
        { day: 16, title: "Poon Hill Sunrise & Drive to Pokhara", description: "Morning hike to Poon Hill (3,210m), descend to Nayapul, drive to Pokhara", altitude: "1,400m", trekkingTime: "3-4 hours trek + 2hr drive" },
        { day: 17, title: "Fly to Kathmandu", description: "Scenic flight return to Kathmandu", altitude: "1,400m", trekkingTime: "N/A" }
      ]
    },
    {
      id: 3,
      name: "Langtang Valley Trek",
      duration: "10 Days",
      difficulty: "Moderate",
      price: "$899",
      highlight: "Himalayan hidden gem",
      description: "Explore the beautiful Langtang valley just north of Kathmandu, known as the 'valley of glaciers' with rich Tamang culture and stunning mountain scenery.",
      bestSeason: "Mar-May, Sep-Nov",
      maxAltitude: "5,000m (Tserko Ri)",
      image: "/images/langtang.jpg",
      colorClass: "from-amber-500 via-orange-500 to-red-500",
      rating: 4.7,
      groupSize: "2-8 People",
      completionRate: "99%",
      itinerary: [
         { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Drive to Syabrubesi", description: "Scenic drive through hills and terraced fields to Syabrubesi", altitude: "1,550m", trekkingTime: "7-8 hours drive" },
        { day: 3, title: "Trek to Lama Hotel", description: "Trek along Langtang Khola through forests to Lama Hotel", altitude: "2,470m", trekkingTime: "5-6 hours" },
        { day: 4, title: "Langtang Village", description: "Continue trek to Langtang village with improving mountain views", altitude: "3,430m", trekkingTime: "5-6 hours" },
        { day: 5, title: "Kyanjin Gompa", description: "Short trek to Kyanjin Gompa with visit to ancient monastery", altitude: "3,870m", trekkingTime: "3-4 hours" },
        { day: 6, title: "Acclimatization Day", description: "Explore the area with optional hikes to Kyanjin Ri or Langshisha Kharka", altitude: "3,870m", trekkingTime: "4-5 hours" },
        { day: 7, title: "Tserko Ri Summit", description: "Early morning hike to Tserko Ri (5,000m) for panoramic mountain views", altitude: "5,000m", trekkingTime: "7-8 hours" },
        { day: 8, title: "Return to Lama Hotel", description: "Descend through rhododendron forests back to Lama Hotel", altitude: "2,470m", trekkingTime: "6-7 hours" },
        { day: 9, title: "Trek to Syabrubesi", description: "Final descent to Syabrubesi along the Langtang River", altitude: "1,550m", trekkingTime: "5-6 hours" },
        { day: 10, title: "Drive to Kathmandu", description: "Scenic drive back to Kathmandu with farewell dinner", altitude: "1,400m", trekkingTime: "7-8 hours drive" },
      ]
    },
    {
      id: 4,
      name: "Manaslu Circuit Trek",
      duration: "16 Days",
      difficulty: "Strenuous",
      price: "$1,699",
      highlight: "Forbidden kingdom adventure",
      description: "Traverse around the world's eighth highest mountain through remote trails, Tibetan-influenced villages, and over the challenging Larkya La pass.",
      bestSeason: "Mar-May, Sep-Nov",
      maxAltitude: "5,106m (Larkya La)",
      image: "/images/manaslu.webp",
      colorClass: "from-emerald-600 via-teal-500 to-green-600",
      rating: 4.9,
      groupSize: "2-6 People",
      completionRate: "95%",
      itinerary: [
 { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Drive to Soti Khola", description: "Scenic drive through the Nepalese countryside to Soti Khola", altitude: "710m", trekkingTime: "8-9 hours drive" },
        { day: 3, title: "Trek to Machha Khola", description: "Trek along the Budhi Gandaki river through subtropical forests", altitude: "930m", trekkingTime: "6-7 hours" },
        { day: 4, title: "Jagat", description: "Trek through terraced fields and Gurung villages to Jagat", altitude: "1,410m", trekkingTime: "6-7 hours" },
        { day: 5, title: "Deng", description: "Enter the Manaslu Conservation Area, trek to Deng village", altitude: "1,860m", trekkingTime: "6-7 hours" },
        { day: 6, title: "Namrung", description: "Trek through pine forests with improving mountain views to Namrung", altitude: "2,630m", trekkingTime: "6-7 hours" },
        { day: 7, title: "Lho Gaon", description: "Trek to Lho village with spectacular views of Manaslu", altitude: "3,180m", trekkingTime: "4-5 hours" },
        { day: 8, title: "Samagaon", description: "Trek to Samagaon, the main village in the region", altitude: "3,530m", trekkingTime: "3-4 hours" },
        { day: 9, title: "Acclimatization Day", description: "Hike to Manaslu Base Camp or Birendra Tal (glacial lake)", altitude: "4,400m", trekkingTime: "5-6 hours" },
        { day: 10, title: "Samdo", description: "Trek to Tibetan border village of Samdo", altitude: "3,860m", trekkingTime: "4-5 hours" },
        { day: 11, title: "Dharamsala", description: "Trek to Dharamsala, the last stop before Larkya La pass", altitude: "4,460m", trekkingTime: "4-5 hours" },
        { day: 12, title: "Larkya La Pass to Bimthang", description: "Cross Larkya La pass (5,106m), descend to Bimthang", altitude: "5,106m / 3,720m", trekkingTime: "8-9 hours" },
        { day: 13, title: "Trek to Tilije", description: "Descend through rhododendron forests to Tilije village", altitude: "2,300m", trekkingTime: "5-6 hours" },
        { day: 14, title: "Dharapani to Besishahar", description: "Trek to Dharapani, drive to Besishahar", altitude: "760m", trekkingTime: "3-4 hours trek + 3hr drive" },
        { day: 15, title: "Drive to Kathmandu", description: "Scenic drive back to Kathmandu through the Himalayan foothills", altitude: "1,400m", trekkingTime: "6-7 hours drive" },
        { day: 16, title: "Departure", description: "Transfer to airport for departure", altitude: "N/A", trekkingTime: "N/A" },
      ]
    },
    {
      id: 5,
      name: "Upper Mustang Trek",
      duration: "14 Days",
      difficulty: "Moderate",
      price: "$1,799",
      highlight: "The Last Forbidden Kingdom",
      description: "Explore the ancient kingdom of Mustang with its unique Tibetan culture, dramatic desert landscapes, and ancient cave monasteries in the Himalayan rain shadow.",
      bestSeason: "Mar-Nov",
      maxAltitude: "3,840m",
      image: "/images/mustang.jpg",
      colorClass: "from-red-600 via-orange-500 to-amber-600",
      rating: 4.8,
      groupSize: "2-8 People",
      completionRate: "97%",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Fly to Pokhara", description: "Scenic flight to Pokhara with mountain views", altitude: "827m", trekkingTime: "25 minutes" },
        { day: 3, title: "Fly to Jomsom, trek to Kagbeni", description: "Spectacular flight to Jomsom, then trek to Kagbeni", altitude: "2,810m", trekkingTime: "20 minutes flight, 3-4 hours trek" },
        { day: 4, title: "Trek to Chele", description: "Enter the restricted area of Upper Mustang, trek to Chele", altitude: "3,050m", trekkingTime: "5-6 hours" },
        { day: 5, title: "Trek to Syangboche", description: "Cross Taklam La Pass (3,624m) and Dajori La Pass (3,735m)", altitude: "3,475m", trekkingTime: "6-7 hours" },
      ]
    },
    {
      id: 6,
      name: "Ghorepani Poon Hill Trek",
      duration: "7 Days",
      difficulty: "Moderate",
      price: "$699",
      highlight: "Best sunrise views in the Annapurnas",
      description: "A shorter trek offering spectacular mountain views, charming Gurung villages, and the famous sunrise from Poon Hill over the Annapurna and Dhaulagiri ranges.",
      bestSeason: "Year-round (except monsoon)",
      maxAltitude: "3,210m (Poon Hill)",
      image: "/images/poonhill.jpg",
      colorClass: "from-pink-600 via-rose-500 to-red-500",
      rating: 4.6,
      groupSize: "2-12 People",
      completionRate: "99%",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Fly to Pokhara", description: "Scenic flight to Pokhara with mountain views", altitude: "827m", trekkingTime: "25 minutes" },
        { day: 3, title: "Drive to Nayapul, trek to Tikhedhunga", description: "Drive to trek start point, begin trek to Tikhedhunga", altitude: "1,570m", trekkingTime: "1hr drive, 4-5 hours trek" },
        { day: 4, title: "Trek to Ghorepani", description: "Steep climb through rhododendron forests to Ghorepani", altitude: "2,860m", trekkingTime: "6-7 hours" },
        { day: 5, title: "Poon Hill Sunrise, trek to Tadapani", description: "Early hike to Poon Hill for sunrise, then trek to Tadapani", altitude: "3,210m", trekkingTime: "5-6 hours" },
      ]
    },
    {
      id: 7,
      name: "Everest Three Passes Trek",
      duration: "19 Days",
      difficulty: "Strenuous",
      price: "$1,899",
      highlight: "Ultimate Everest adventure",
      description: "The most comprehensive Everest region trek, crossing three high passes and visiting all the major valleys and viewpoints for the ultimate Himalayan challenge.",
      bestSeason: "Mar-May, Sep-Nov",
      maxAltitude: "5,545m (Kongma La)",
      image: "/images/everest-three-passes.jpg",
      colorClass: "from-gray-700 via-gray-600 to-blue-800",
      rating: 4.9,
      groupSize: "2-8 People",
      completionRate: "94%",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic mountain flight to Lukla, trek to Phakding", altitude: "2,652m", trekkingTime: "3-4 hours" },
        { day: 3, title: "Trek to Namche Bazaar", description: "Trek to Namche Bazaar, the gateway to Everest", altitude: "3,440m", trekkingTime: "5-6 hours" },
        { day: 4, title: "Acclimatization Day", description: "Hike to Everest View Hotel for panoramic views", altitude: "3,440m", trekkingTime: "3-4 hours" },
        { day: 5, title: "Trek to Thame", description: "Less-traveled route to Thame village", altitude: "3,800m", trekkingTime: "4-5 hours" },
      ]
    },
    {
      id: 8,
      name: "Kanchenjunga Base Camp Trek",
      duration: "22 Days",
      difficulty: "Strenuous",
      price: "$2,199",
      highlight: "Third highest mountain in the world",
      description: "Remote trek to the base of the world's third highest mountain, through pristine forests, traditional villages, and untouched wilderness in eastern Nepal.",
      bestSeason: "Mar-May, Sep-Nov",
      maxAltitude: "5,143m",
      image: "/images/kanchenjunga.jpg",
      colorClass: "from-indigo-600 via-purple-500 to-violet-600",
      rating: 4.8,
      groupSize: "2-6 People",
      completionRate: "93%",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport, transfer to hotel, and trek briefing", altitude: "1,400m", trekkingTime: "N/A" },
        { day: 2, title: "Fly to Bhadrapur, drive to Taplejung", description: "Fly to Bhadrapur, then long drive to Taplejung", altitude: "1,800m", trekkingTime: "1hr flight, 8-9hr drive" },
        { day: 3, title: "Trek to Chiruwa", description: "Begin trek through terraced fields and forests", altitude: "1,270m", trekkingTime: "6-7 hours" },
        { day: 4, title: "Trek to Sekathum", description: "Continue along Tamor and Ghunsa rivers", altitude: "1,660m", trekkingTime: "6-7 hours" },
        { day: 5, title: "Trek to Amjilosa", description: "Steep climb through rhododendron forests", altitude: "2,510m", trekkingTime: "6-7 hours" },
      ]
    }
  ];

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const activePackage = trekPackages.find(trek => trek.id === activeTrek) || trekPackages[0];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easeInOut }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Enhanced Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background with Enhanced Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Trekking.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          
          {/* Animated Mountain Silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Mountain className="w-5 h-5 text-cyan-300" />
              <span className="text-cyan-100 text-sm font-medium">Expert Himalayan Guides</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Himalayan <span className="text-amber-400">Trekking</span> Adventures
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Conquer legendary trails with expert guides, premium service, and unforgettable mountain experiences in the heart of the Himalayas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2">
              Start Your Trek
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Experience
            </button>
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

      {/* Trek Selection Cards */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">Himalayan</span> Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our curated collection of premium trekking experiences, each designed for different skill levels and adventure preferences.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {trekPackages.map((trek) => (
              <motion.div
                key={trek.id}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveTrek(trek.id)}
                className={`relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
                  activeTrek === trek.id 
                    ? 'border-cyan-500 ring-4 ring-cyan-500/20' 
                    : 'border-gray-100'
                }`}
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${trek.colorClass}`}></div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{trek.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{trek.duration}</span>
                      </div>
                    </div>
                    <span className={`text-lg font-bold bg-gradient-to-r ${trek.colorClass} bg-clip-text text-transparent`}>
                      {trek.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      trek.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      trek.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      trek.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trek.difficulty}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(trek.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{trek.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm italic mb-4 line-clamp-2">
                    {trek.highlight}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{trek.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-4 h-4" />
                      <span>{trek.maxAltitude}</span>
                    </div>
                  </div>
                </div>
                
                {/* Active Indicator */}
                {activeTrek === trek.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Trek Display */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12"
          >
            {/* Hero Image with Gradient Overlay */}
            <div className="relative h-[400px] md:h-[500px]">
              <img 
                src={activePackage.image} 
                alt={activePackage.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${activePackage.colorClass} text-white font-semibold`}>
                      {activePackage.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(activePackage.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2">{activePackage.rating}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{activePackage.name}</h2>
                  <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{activePackage.highlight}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Trek Stats */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                  >
                    {[
                      { icon: <Calendar className="w-6 h-6" />, label: "Duration", value: activePackage.duration },
                      { icon: <Thermometer className="w-6 h-6" />, label: "Max Altitude", value: activePackage.maxAltitude },
                      { icon: <Globe className="w-6 h-6" />, label: "Best Season", value: activePackage.bestSeason },
                      { icon: <Users className="w-6 h-6" />, label: "Group Size", value: activePackage.groupSize },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={scaleIn}
                        className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${activePackage.colorClass} text-white`}>
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
                  
                  {/* Trek Description */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Trek Overview</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {activePackage.description}
                    </p>
                  </div>
                  
                  {/* Detailed Itinerary */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Detailed Itinerary</h3>
                      <button
                        onClick={() => setIsItineraryExpanded(!isItineraryExpanded)}
                        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
                      >
                        {isItineraryExpanded ? 'Collapse All' : 'Expand All'}
                        <ChevronDown className={`w-5 h-5 transition-transform ${isItineraryExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <AnimatePresence>
                        {(isItineraryExpanded ? activePackage.itinerary : activePackage.itinerary.slice(0, 5)).map((day) => (
                          <motion.div
                            key={day.day}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                              expandedDay === day.day ? 'ring-2 ring-cyan-500/20' : ''
                            }`}
                          >
                            <div 
                              className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:from-gray-100"
                              onClick={() => toggleDay(day.day)}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activePackage.colorClass} flex flex-col items-center justify-center text-white font-bold`}>
                                  <span className="text-sm">DAY</span>
                                  <span className="text-lg">{day.day}</span>
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900">{day.title}</div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    <span className="flex items-center gap-2">
                                      <Thermometer className="w-4 h-4" />
                                      {day.altitude}
                                      <Clock className="w-4 h-4 ml-3" />
                                      {day.trekkingTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <ChevronDown 
                                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedDay === day.day ? 'rotate-180' : ''}`}
                              />
                            </div>
                            
                            {expandedDay === day.day && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 bg-white"
                              >
                                <p className="text-gray-700 leading-relaxed">{day.description}</p>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Form */}
                  <motion.div
                    variants={scaleIn}
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
                        We'll contact you within 24 hours to confirm availability and provide full details.
                      </p>
                    </form>
                  </motion.div>
                  
                  {/* What's Included */}
                  <motion.div
                    variants={scaleIn}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {[
                        "Professional trekking guide & porter",
                        "All necessary trekking permits",
                        "Teahouse accommodations",
                        "Three meals per day (breakfast, lunch, dinner)",
                        "Airport transfers in Nepal",
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
                    variants={scaleIn}
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
                          <div className="text-sm text-gray-600">International Office</div>
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
          </motion.div>
          
          {/* Why Choose Us Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Safety First",
                description: "All guides are wilderness first responder certified with comprehensive emergency protocols and satellite communication.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Sustainable Tourism",
                description: "We follow Leave No Trace principles and support local communities through fair wages and community projects.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Expert Guides",
                description: "Our guides have 10+ years of experience and extensive knowledge of Himalayan terrain, culture, and wildlife.",
                gradient: "from-amber-500 to-orange-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Conquer the Himalayas?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied trekkers who have experienced Nepal with 8848 Trek & Tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Book Your Trek Now
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
                Download Trek Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Add missing Play icon component
const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Trekking;