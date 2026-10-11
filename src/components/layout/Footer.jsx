import { Link } from 'react-router-dom';
import { Smile, ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useContent } from '../../context/ContentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  const { activeServices } = useContent();

  return (
    <footer className="bg-[#0B1120] border-t border-white/10 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-10 object-contain bg-white rounded p-1" />
              ) : (
                <>
                  <div className="bg-[#155EEF] text-white p-2.5 rounded-xl group-hover:bg-[#0D9488] transition-colors">
                    <Smile className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-2xl text-white leading-none tracking-tight">
                      {settings?.name ? settings.name.split(' ')[0] : 'Save Tooth'}
                    </h2>
                    <p className="text-sm text-gray-400 font-medium tracking-wide">Dental Clinic</p>
                  </div>
                </>
              )}
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              {settings?.footerText || "Providing modern, compassionate dental care in Raipur."}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Clinic', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Treatment Process', path: '/process' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-sm font-medium hover:text-[#0D9488] hover:translate-x-1 transition-all inline-flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Featured Services</h4>
            <ul className="space-y-4">
              {/* Only show up to 5 services in footer */}
              {activeServices?.slice(0, 5).map((s) => (
                <li key={s._id}>
                  <Link to="/services" className="text-sm font-medium hover:text-[#155EEF] hover:translate-x-1 transition-all inline-flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Reach Us</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings?.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#155EEF] shrink-0" />
                <a href={`tel:${settings?.phone?.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{settings?.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#155EEF] shrink-0" />
                <a href={`mailto:${settings?.email}`} className="hover:text-white transition-colors">{settings?.email}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
          <p>&copy; {currentYear} {settings?.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;