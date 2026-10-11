import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, User, Activity, Calendar, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/Animations';
import { submitContactForm } from '../services/api';
import { useContent } from '../context/ContentContext';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { cmsData, activeServices } = useContent();
  const { settings } = useSettings();

  const data = cmsData?.contact;

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  const [status, setStatus] = useState('idle');

  if (!data || !settings) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await submitContactForm(formData);
      setStatus('success');
      setTimeout(() => {
        setFormData({ name: '', phone: '', service: '', date: '', message: '' });
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main className="w-full overflow-hidden bg-[#F7FAFC]">

      {/* 1. EMERGENCY BANNER */}
      <div className="bg-red-50 border-b border-red-100 mt-20 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <AlertCircle className="w-5 h-5" /> Dental Emergency?
          </span>
          <span className="text-gray-700 text-sm">{data.emergencyText}</span>
          <a href={`tel:${settings.phone?.replace(/\s/g, '')}`} className="font-extrabold text-[#172033] hover:text-[#155EEF] transition-colors text-sm">
            {settings.phone}
          </a>
        </div>
      </div>

      {/* 2. HEADER SECTION */}
      <section className="pt-12 pb-10 text-center px-4">
        <FadeUp>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#172033] mb-4 whitespace-pre-line">{data.heroTitle}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg whitespace-pre-line">
            {data.heroDesc}
          </p>
        </FadeUp>
      </section>

      {/* 3. CONTACT INFO & FORM SPLIT SECTION */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">

            {/* Left Side: Contact Information */}
            <div className="lg:w-2/5 bg-[#172033] text-white p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

              <div className="relative z-10">
                <FadeUp>
                  <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                </FadeUp>

                <StaggerContainer className="space-y-8">
                  <StaggerItem className="flex items-start gap-5">
                    <div className="bg-white/10 p-3.5 rounded-2xl text-teal-300 shrink-0 border border-white/5">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Clinic Address</h4>
                      <p className="text-gray-300 leading-relaxed text-sm pr-4">{settings.address}</p>
                    </div>
                  </StaggerItem>

                  <StaggerItem className="flex items-start gap-5">
                    <div className="bg-white/10 p-3.5 rounded-2xl text-blue-300 shrink-0 border border-white/5">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Contact Details</h4>
                      <a href={`tel:${settings.phone?.replace(/\s/g, '')}`} className="block text-gray-300 hover:text-white transition-colors text-sm mb-1">{settings.phone}</a>
                      <a href={`mailto:${settings.email}`} className="block text-gray-300 hover:text-white transition-colors text-sm">{settings.email}</a>
                    </div>
                  </StaggerItem>

                  <StaggerItem className="flex items-start gap-5">
                    <div className="bg-white/10 p-3.5 rounded-2xl text-purple-300 shrink-0 border border-white/5">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="w-full">
                      <h4 className="font-bold text-lg mb-3">Business Hours</h4>
                      <div className="space-y-2 text-sm pr-4">
                        <div className="flex justify-between border-b border-white/10 pb-1.5">
                          <span className="text-gray-400">Mon - Sat</span>
                          <span className="font-medium text-gray-200">{settings.hoursWeekday || '9:00 AM – 9:00 PM'}</span>
                        </div>
                        <div className="flex justify-between pb-1.5">
                          <span className="text-gray-400">Sunday</span>
                          <span className="font-medium text-gray-200">{settings.hoursWeekend || 'Closed'}</span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>

            {/* Right Side: Appointment Form */}
            <div className="lg:w-3/5 p-10 lg:p-14 relative">
              <FadeUp delay={0.2}>
                <h3 className="text-2xl font-extrabold text-[#172033] mb-2">Request an Appointment</h3>
                <p className="text-gray-500 text-sm mb-8">Fill out the form below and our team will get back to you to confirm your slot.</p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 text-[#16A34A] bg-green-50 rounded-3xl border border-green-100"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-extrabold mb-2 text-[#172033]">Request Sent Successfully!</h4>
                    <p className="text-gray-600 max-w-sm mx-auto">Thank you for reaching out. Our front desk will contact you shortly to confirm your appointment time.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative">
                    {status === 'loading' && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#155EEF] mb-3"></div>
                          <p className="text-[#155EEF] font-bold">Submitting...</p>
                        </div>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100">
                        Something went wrong. Please try again or call us directly.
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#172033] flex items-center gap-2"><User className="w-4 h-4 text-[#155EEF]" /> Full Name *</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#172033] flex items-center gap-2"><Phone className="w-4 h-4 text-[#155EEF]" /> Phone Number *</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="e.g. 98765 43210" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-bold text-[#172033] flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#155EEF]" /> Email Address *
                        </label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="youremail@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#172033] flex items-center gap-2"><Activity className="w-4 h-4 text-[#155EEF]" /> Service Required</label>
                        <select name="service" value={formData.service} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                          <option value="">Select a treatment (Optional)</option>
                          <option value="General Checkup">Routine Checkup</option>
                          {/* Map dynamic services from database */}
                          {activeServices?.map(s => <option key={s._id} value={s.title}>{s.title}</option>)}
                          <option value="Other">Other / Not sure</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#172033] flex items-center gap-2"><Calendar className="w-4 h-4 text-[#155EEF]" /> Preferred Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white cursor-pointer" min={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#172033] flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#155EEF]" /> Message / Concern</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Briefly describe your dental concern or any specific symptoms..."></textarea>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input required type="checkbox" id="consent" className="mt-1 w-4 h-4 text-[#155EEF] border-gray-300 rounded focus:ring-[#155EEF] cursor-pointer" />
                      <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                        I consent to {settings.name || 'Save Tooth Clinic'} processing my details to contact me regarding my appointment request and treatment options.
                      </label>
                    </div>

                    <button type="submit" className="w-full bg-[#155EEF] hover:bg-blue-700 text-white font-extrabold text-lg py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group">
                      Submit Request <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                )}
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DYNAMIC MAP EMBED */}
      <section className="bg-gray-200 h-96 w-full relative">
        <iframe
          // 🚀 YAHAN DYNAMIC MAP URL LAGAYA HAI (Agar settings me nahi hai toh default Raipur ka map dikhega)
          src={settings.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118981.65080088824!2d81.54570499092895!3d21.261899127521798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee120469e2366!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location"
          className="grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg font-bold text-[#172033] flex items-center gap-2 pointer-events-none">
          <MapPin className="w-5 h-5 text-red-500" />
          Locate Us
        </div>
      </section>

    </main>
  );
};

export default Contact;