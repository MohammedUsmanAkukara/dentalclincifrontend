import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/Animations';
import { useContent } from '../context/ContentContext';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = LucideIcons[name] || LucideIcons.Stethoscope;
  return <IconComponent className={className} />;
};

const Services = () => {
  const { cmsData, activeServices } = useContent();
  const data = cmsData?.services;

  if (!data) return null;

  // Colors mapping for General Services cards so they look vibrant
  const generalColors = [
    "text-teal-400 bg-teal-400/10",
    "text-blue-400 bg-blue-400/10",
    "text-purple-400 bg-purple-400/10",
    "text-orange-400 bg-orange-400/10",
    "text-pink-400 bg-pink-400/10"
  ];

  return (
    <main className="w-full overflow-hidden bg-white">
      
      {/* 1. SERVICES HERO SECTION */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-[#F7FAFC] relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-6 border border-teal-50">
              {data.heroTagline}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#172033] mb-6 tracking-tight whitespace-pre-line">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {data.heroDesc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. ADVANCED / SPECIALIZED TREATMENTS (Managed from Services CMS tab) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <h2 className="text-3xl font-extrabold text-[#172033]">{data.advancedHeading}</h2>
            <p className="text-gray-500 mt-2">{data.advancedDesc}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeServices?.map((service) => (
              <StaggerItem key={service._id}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-[#F7FAFC] rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all h-full flex flex-col group relative overflow-hidden"
                >
                  <div className="w-16 h-16 bg-white text-[#155EEF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100">
                    <DynamicIcon name={service.iconName} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#172033] mb-4 leading-tight">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed whitespace-pre-line">
                    {service.desc}
                  </p>
                  <div className="mt-auto pt-5 border-t border-gray-200/60">
                    <Link to="/contact" className="inline-flex items-center text-sm font-bold text-[#155EEF] group-hover:gap-2 transition-all">
                      Consult Specialist <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. GENERAL & PREVENTATIVE CARE (Dynamic from JSON Content) */}
      <section className="py-20 bg-[#172033] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="lg:w-1/3">
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{data.generalHeading}</h2>
                <p className="text-gray-400 leading-relaxed mb-8 whitespace-pre-line">
                  {data.generalDesc}
                </p>
                <Link to="/contact" className="bg-[#155EEF] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg inline-block">
                  Schedule Checkup
                </Link>
              </FadeUp>
            </div>

            <div className="lg:w-2/3">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Dynamically mapping the generalServices array */}
                {data.generalServices?.map((item, idx) => {
                  const colorClass = generalColors[idx % generalColors.length]; // Auto assign colors
                  return (
                    <StaggerItem key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass}`}>
                        <DynamicIcon name={item.iconName} className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{item.desc}</p>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PATIENT ASSURANCE / CTA */}
      <section className="py-24 bg-[#F7FAFC]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-[#155EEF]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#172033] mb-6">{data.ctaHeading}</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed whitespace-pre-line">
              {data.ctaDesc}
            </p>
            <Link to="/contact" className="bg-[#172033] hover:bg-black text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
              Get Your Personalized Plan
            </Link>
          </FadeUp>
        </div>
      </section>

    </main>
  );
};

export default Services;