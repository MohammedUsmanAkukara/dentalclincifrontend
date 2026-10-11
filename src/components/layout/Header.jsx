import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smile, Info } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useSettings(); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-sm ${isScrolled ? 'bg-white' : 'bg-white/90 backdrop-blur-sm'}`}>
      
      {/* 🚀 DYNAMIC TOPBAR NOTICE */}
      {settings?.topbarActive && settings?.topbarText && (
        <div className="bg-[#172033] text-white text-xs sm:text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#155EEF]" /> {settings.topbarText}
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        
        {/* Dynamic Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          {settings?.logoUrl ? (
            <img src={settings.logoUrl} alt={settings?.name || "Clinic Logo"} className="h-10 object-contain" />
          ) : (
            <>
              <div className="bg-[#155EEF] text-white p-2 rounded-lg group-hover:bg-[#0D9488] transition-colors">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-[#172033] leading-tight tracking-tight">
                  {settings?.name ? settings.name.split(' ')[0] : 'Save Tooth'}
                </h1>
                <p className="text-xs text-gray-500 font-medium">Dental Clinic</p>
              </div>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-sm font-bold text-gray-600 hover:text-[#155EEF] transition-colors">
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="bg-[#155EEF] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5">
            Book Appointment
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-gray-800 hover:text-[#155EEF] px-2 py-1">
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#155EEF] text-white px-6 py-3 rounded-xl text-center font-bold mt-2 shadow-lg shadow-blue-500/30">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;