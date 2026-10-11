import { Link } from 'react-router-dom';
import { ChevronRight, CalendarCheck, ClipboardList, Stethoscope, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/Animations';
import { useContent } from '../context/ContentContext';

const Process = () => {
  const { cmsData } = useContent();
  const data = cmsData?.process;

  if (!data) return null;

  const stepIcons = [CalendarCheck, ClipboardList, Stethoscope, Sparkles];

  return (
    <main className="w-full overflow-hidden bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-[#172033] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-12 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              {data.heroTagline}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight whitespace-pre-line">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {data.heroDesc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. TIMELINE SECTION */}
      <section className="py-24 bg-[#F7FAFC] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172033] mb-4">{data.timelineHeading}</h2>
              <p className="text-gray-600">{data.timelineDesc}</p>
            </FadeUp>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-[#155EEF] to-teal-200 rounded-full opacity-30 z-0"></div>

            <div className="space-y-12 lg:space-y-24 relative z-10">
              {data.steps?.map((step, idx) => {
                const Icon = stepIcons[idx % stepIcons.length];
                const isEven = idx % 2 === 0;

                return (
                  <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`md:w-1/2 flex ${isEven ? 'md:justify-start md:pl-16' : 'md:justify-end md:pr-16'} pl-20 md:pl-0 w-full`}>
                      <FadeUp delay={0.1} className="w-full">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                          <div className="absolute -right-4 -bottom-8 text-9xl font-black text-gray-50 opacity-50 select-none pointer-events-none group-hover:text-blue-50 transition-colors">
                            {idx + 1}
                          </div>
                          
                          <div className="relative z-10">
                            <span className="text-[#155EEF] font-black text-lg mb-2 block">Step 0{idx + 1}</span>
                            <h3 className="text-2xl font-extrabold text-[#172033] mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{step.desc}</p>
                          </div>
                        </div>
                      </FadeUp>
                    </div>

                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-white border-4 border-[#155EEF] shadow-lg flex items-center justify-center z-20 top-4 md:top-auto">
                      <Icon className="w-7 h-7 text-[#155EEF]" />
                    </div>

                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. FAQS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <FadeUp>
              <MessageCircleQuestion className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold text-[#172033] mb-4">{data.faqHeading}</h2>
              <p className="text-gray-600">{data.faqDesc}</p>
            </FadeUp>
          </div>

          <StaggerContainer className="space-y-6">
            {data.faqs?.map((faq, idx) => (
              <StaggerItem key={idx} className="bg-[#F7FAFC] rounded-2xl p-6 md:p-8 border border-gray-100">
                <h4 className="text-lg font-bold text-[#172033] mb-3 flex items-start gap-3">
                  <span className="text-[#155EEF]">Q.</span> {faq.q}
                </h4>
                <p className="text-gray-600 leading-relaxed pl-7 whitespace-pre-line">{faq.a}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-[#155EEF] text-center px-4">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to Experience Pain-Free Dentistry?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step towards a healthier, brighter smile today. Our team is ready to welcome you.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#155EEF] hover:bg-gray-50 px-10 py-4 rounded-full text-lg font-extrabold transition-all shadow-xl hover:shadow-2xl group">
            Book Your Appointment <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeUp>
      </section>

    </main>
  );
};

export default Process;