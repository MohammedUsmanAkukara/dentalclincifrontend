import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { ContentProvider } from './context/ContentContext';

// Website Pages
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Process from './pages/Process';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login'; // <-- IMPORT LOGIN
import Dashboard from './admin/pages/Dashboard';
import AppointmentsList from './admin/pages/AppointmentsList';
import ServicesManager from './admin/pages/ServicesManager';
import ContentManager from './admin/pages/ContentManager';
import Settings from './admin/pages/Settings';
import ForgotPassword from './admin/pages/ForgotPassword';



const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <SettingsProvider>
      <ContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>

            {/* PUBLIC WEBSITE ROUTES */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="process" element={<Process />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* ========================================= */}
            {/* STANDALONE ADMIN LOGIN ROUTE (NO SIDEBAR) */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            {/* ========================================= */}

            {/* ADMIN PANEL SECURE ROUTES (WITH SIDEBAR) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="appointments" element={<AppointmentsList />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </SettingsProvider>
  );
}