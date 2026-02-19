
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import BookNowForm from './components/BookNowForm';
import HomePage from './pages/HomePage';

import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import TrekkingPackagesPage from './pages/PackagesPage';
import NepalCulturalToursPage from './pages/Cultural';
import SpiritualToursPage from './pages/Spiritual';
import WinterPackage from './pages/WinterPackage';
import MonsoonPackagesPage from './pages/MansoonPAckage';
import NationalParksPage from './pages/NationalParksPage';
import Adventure from './pages/Adventure';  
import Blog from './pages/Blog';
import NepalTourismMap from './pages/NepalTourismMap';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trekking-packages" element={<TrekkingPackagesPage />} />
          <Route path="/cultural-tours" element={<NepalCulturalToursPage/>}/>
          <Route path="/spiritual-tours" element={<SpiritualToursPage />} />
          <Route path='/winter-packages' element={<WinterPackage/>}/>
          <Route path="/monsoon-packages" element={<MonsoonPackagesPage />} />
        <Route path="/national-parks" element={<NationalParksPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/adventure" element={<Adventure />} /> 
          <Route path="/nepal-tourism-map" element={<NepalTourismMap />} />
          <Route path="/book-now" element={<BookNowForm />} />
        </Routes>
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}

export default App;