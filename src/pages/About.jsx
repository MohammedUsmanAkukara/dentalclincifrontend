import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Target, Heart, Shield, Award, X } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/Animations';
import { useContent } from '../context/ContentContext';

const About = () => {
  const { cmsData } = useContent();
  const data = cmsData?.about;
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  if (!data) return null;

  const valueIcons = [Target, Heart, Shield, Award];

  return (
    <main className="w-full overflow-hidden">
      
      {/* 1. INTRODUCTION SECTION */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 order-2 lg:order-1 relative w-full">
               <FadeUp>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0 border-8 border-[#F7FAFC]">
                    {/* 🚀 NAYI HIGH-QUALITY IMAGE YAHAN UPDATE KI HAI */}
                    <img 
                      src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt={data.heroTitle} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(#155EEF_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10"></div>
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[radial-gradient(#0D9488_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10"></div>
               </FadeUp>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-widest mb-6">
                  {data.heroTagline}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#172033] mb-6 leading-tight whitespace-pre-line">
                  {data.heroTitle}
                </h1>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                  {data.heroDesc1}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                  {data.heroDesc2}
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white bg-[#172033] hover:bg-[#155EEF] px-8 py-4 rounded-full font-bold transition-colors shadow-lg">
                  Book Your Visit <ChevronRight className="w-4 h-4" />
                </Link>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION SECTION */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <h2 className="text-3xl font-extrabold text-[#172033] mb-4">{data.coreValuesHeading}</h2>
              <p className="text-gray-600">{data.coreValuesDesc}</p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.values?.map((val, idx) => {
              const Icon = valueIcons[idx % valueIcons.length];
              return (
                <StaggerItem key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="bg-blue-100 text-[#155EEF] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#172033] mb-3">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{val.desc}</p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. MEET THE EXPERTS (Dynamic Grid) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172033] mb-4">{data.doctorsHeading || 'Meet Our Experts'}</h2>
              <p className="text-gray-600">Dedicated professionals committed to your oral health and beautiful smile.</p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.doctors?.map((doc, idx) => (
              <StaggerItem key={idx}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedDoctor(doc)}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all border border-gray-100 cursor-pointer group"
                >
                  <div className="h-64 w-full bg-gray-200 overflow-hidden relative">
                    <img 
                      src={doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                      alt={doc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold flex items-center gap-2">View Profile <ChevronRight className="w-4 h-4"/></span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[#172033] mb-1">{doc.name}</h3>
                    <p className="text-[#155EEF] text-sm font-semibold uppercase tracking-wider">{doc.subtitle}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* DOCTOR DETAILS MODAL */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="absolute inset-0 bg-[#172033]/60 backdrop-blur-sm cursor-pointer"
            ></motion.div>
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full transition-colors backdrop-blur-md shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-200 shrink-0">
                <img 
                  src={selectedDoctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={selectedDoctor.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-3/5 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-extrabold text-[#172033] mb-1">{selectedDoctor.name}</h2>
                <p className="text-[#0D9488] font-bold tracking-wide uppercase text-sm mb-6">{selectedDoctor.subtitle}</p>
                
                <h4 className="font-bold text-[#172033] border-b border-gray-100 pb-2 mb-4">About the Doctor</h4>
                <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line text-sm md:text-base">
                  {selectedDoctor.desc}
                </p>
                
                {selectedDoctor.features && selectedDoctor.features.length > 0 && (
                  <>
                    <h4 className="font-bold text-[#172033] border-b border-gray-100 pb-2 mb-4">Specialties & Credentials</h4>
                    <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                      {selectedDoctor.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" /> 
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default About;