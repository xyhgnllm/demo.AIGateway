import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomerService from './components/common/CustomerService';
import AuthModal from './components/common/AuthModal';
import { AuthProvider } from './lib/auth';
import Home from './pages/Home';
import Models from './pages/Models';
import Services from './pages/Services';
import ApiService from './pages/ApiService';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/models" element={<Models />} />
              <Route path="/services" element={<Services />} />
              <Route path="/api-service" element={<ApiService />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <CustomerService />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

