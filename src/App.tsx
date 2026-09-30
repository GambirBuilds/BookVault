import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ToastContainer from './components/ToastContainer.jsx';

// Pages
import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Categories from './pages/Categories.jsx';
import Authors from './pages/Authors.jsx';
import MyLibrary from './pages/MyLibrary.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F14] text-slate-900 dark:text-[#F8FAFC] transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/my-library" element={<MyLibrary />} />
              
              {/* Convenient alias redirects */}
              <Route path="/favorites" element={<Navigate to="/my-library" replace />} />
              <Route path="/reading-list" element={<Navigate to="/my-library" replace />} />
              <Route path="/recently-viewed" element={<Navigate to="/my-library" replace />} />

              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </LibraryProvider>
  );
}
