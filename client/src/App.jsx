import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // <--- Import New Component
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    // ADDED: bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white
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
        </Routes>
      </main>

      {/* 3. Footer */}
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App;