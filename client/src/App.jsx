import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import API from './services/api'; // <--- Import API for tracking

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Services from './pages/Services';

function App() {
  const location = useLocation();
  // Improved check: hides navbar for /admin and /admin/anything
  const isAdmin = location.pathname.startsWith('/admin'); 

  // --- 1. NEW: ANALYTICS TRACKING ---
  useEffect(() => {
    const trackPage = async () => {
      // Don't track if user is accessing Admin Dashboard
      if (location.pathname.startsWith('/admin')) return;

      try {
        // Send a signal to backend: "User viewed this page"
        await API.post('/visit', { path: location.pathname });
      } catch (error) {
        // Silently fail (common if user has aggressive AdBlockers)
        console.error("Tracking skipped");
      }
    };

    trackPage();
  }, [location.pathname]); // Runs every time URL changes

  // --- 2. SCROLL HANDLING (Existing) ---
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white transition-colors duration-300"> 
      
      {/* 1. Navbar (Hidden on Admin) */}
      {!isAdmin && <Navbar />}

      {/* 2. Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>

      {/* 3. Footer */}
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App;