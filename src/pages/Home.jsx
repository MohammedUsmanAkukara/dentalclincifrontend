import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react'; // Dynamic icons ke liye
import { MapPin, ChevronRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/Animations';
import { useContent } from '../context/ContentContext';

// Helper component to render icon dynamically from string name
const DynamicIcon = ({ name, className }) => {
  const IconComponent = LucideIcons[name] || LucideIcons.Stethoscope;
  return <IconComponent className={className} />;
};

const Home = () => {
  const { cmsData, activeServices } = useContent();
  const data = cmsData?.home; // Extract Home page data

  if (!data) return null; // Safety check

  // Generate random colors for services cards if needed
  const serviceColors = [
    'text-[#155EEF] bg-blue-100',
    'text-[#0D9488] bg-teal-100',
    'text-purple-600 bg-purple-100'
  ];

  return (
    <main className="w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 bg-[#F7FAFC] relative min-h-[90vh] flex items-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-100/50 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-[#155EEF] text-xs font-bold uppercase tracking-widest mb-6 border border-blue-50">
                  <MapPin className="w-4 h-4" />
                  {data.heroTagline}
                </div>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#172033] leading-tight mb-6 tracking-tight">
                  {data.heroTitle}
                </h1>
              </FadeUp>
              
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
                  {data.heroDesc}
                </p>
              </FadeUp>
              
              <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/contact" className="w-full sm:w-auto bg-[#155EEF] hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group">
                  Book Consultation
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#172033] border border-gray-200 px-8 py-4 rounded-full text-base font-bold transition-all flex items-center justify-center">
                  View All Services
                </Link>
              </FadeUp>

              {/* Dynamic Stats */}
              <FadeUp delay={0.4} className="mt-12 pt-8 border-t border-gray-200/60 flex flex-wrap justify-center lg:justify-start gap-8">
                {data.stats?.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0D9488]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[#172033] text-sm">{stat.label}</p>
                      <p className="text-xs text-gray-500 font-medium">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </FadeUp>
            </div>

            {/* Hero Image */}
            <FadeUp delay={0.2} className="flex-1 w-full relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 border-[8px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt={data.heroTitle} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#155EEF]/20 to-transparent mix-blend-multiply"></div>
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 hidden sm:flex"
              >
                <div className="bg-teal-50 text-[#0D9488] p-3 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Clinic Hours</p>
                  <p className="font-extrabold text-[#172033]">9:00 AM – 9:00 PM</p>
                </div>
              </motion.div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172033] mb-4">{data.servicesHeading}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto whitespace-pre-line">
                {data.servicesDesc}
              </p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Database se aayi hui top 3 services dikhayenge */}
            {activeServices?.slice(0, 3).map((service, idx) => (
              <StaggerItem key={service._id} className="bg-[#F7FAFC] p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${serviceColors[idx % 3]}`}>
                  <DynamicIcon name={service.iconName} className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#172033] mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                  {service.desc}
                </p>
                <Link to="/services" className="text-[#155EEF] font-bold text-sm inline-flex items-center group-hover:gap-2 transition-all mt-auto">
                  Learn More <ChevronRight className="w-4 h-4" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.4} className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 bg-[#172033] hover:bg-gray-800 text-white px-8 py-3.5 rounded-full font-bold transition-colors shadow-lg">
              View All Dental Treatments
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* 3. TRUST SECTION */}
      <section className="py-20 bg-[#155EEF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">{data.trustHeading}</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed whitespace-pre-line">
                {data.trustDesc}
              </p>
              <ul className="space-y-4">
                {data.trustPoints?.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-teal-300 shrink-0" />
                    <span className="font-bold text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.2} className="relative">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <h3 className="text-2xl font-bold mb-4">Ready to perfect your smile?</h3>
                <p className="text-blue-100 mb-8">Book your first consultation today and take the first step towards optimal oral health.</p>
                <Link to="/contact" className="block text-center w-full bg-white text-[#155EEF] hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-extrabold transition-all shadow-lg">
                  Schedule an Appointment Now
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;