import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, CalendarDays, Stethoscope, Settings, LogOut, 
  Menu, X, Smile, Bell, LayoutTemplate, User, Mail, ShieldAlert, Key, Loader2, CheckCircle2 
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getAdminProfile, requestProfileOtp, updateAdminProfile } from '../../services/api';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings(); 

  // Profile States
  const [adminUser, setAdminUser] = useState({ name: 'Loading...', role: 'Admin', email: '' });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', role: '', newPassword: '' });
  
  // OTP Workflow States
  const [otpStep, setOtpStep] = useState(false); // false = Edit Mode, true = OTP Mode
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Security Check & Fetch Profile on Mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchProfile();
    }
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const { data } = await getAdminProfile();
      setAdminUser(data);
      setProfileForm({ name: data.name, email: data.email, role: data.role, newPassword: '' });
    } catch (error) {
      console.error("Failed to fetch admin profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // 2. Profile Edit - Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      await requestProfileOtp();
      setOtpStep(true); // Switch to OTP UI
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Profile Edit - Verify OTP & Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      await updateAdminProfile({ ...profileForm, otp: otpValue });
      
      alert('✅ Profile Updated Successfully! Please login again for security purposes.');
      handleLogout(); // Force relogin so new details/password take effect
      
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Invalid OTP or failed to update.');
      setIsLoading(false);
    }
  };

  // Function to open modal & reset states
  const openProfileModal = () => {
    setProfileForm({ name: adminUser.name, email: adminUser.email, role: adminUser.role, newPassword: '' });
    setOtpStep(false);
    setOtpValue('');
    setErrorMsg('');
    setIsProfileModalOpen(true);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Appointments', path: '/admin/appointments', icon: CalendarDays },
    { name: 'Services CMS', path: '/admin/services', icon: Stethoscope },
    { name: 'Page Content', path: '/admin/content', icon: LayoutTemplate },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-[#172033]">
      
      {/* Sidebar (unchanged) */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#172033] text-white transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2">
            {settings?.logoUrl ? <img src={settings.logoUrl} alt="Logo" className="h-8 object-contain bg-white rounded p-1" /> : <><div className="bg-[#155EEF] p-2 rounded-lg"><Smile className="w-6 h-6 text-white" /></div><span className="font-bold text-xl tracking-wide">Save Tooth</span></>}
          </Link>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} onClick={() => { if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#155EEF] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Icon className="w-5 h-5" /><span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl w-full transition-colors font-medium"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <button className="p-2 md:hidden text-gray-600" onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          
          <div className="ml-auto flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-[#155EEF] transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* DYNAMIC PROFILE BUTTON */}
            <div 
              onClick={openProfileModal}
              className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer group hover:opacity-80 transition-opacity"
              title="Click to Edit Profile"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#155EEF] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                {adminUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-sm text-left">
                <p className="font-bold text-[#172033] group-hover:text-[#155EEF] transition-colors">{adminUser.name}</p>
                <p className="text-gray-500 text-xs">{adminUser.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Pages Render Here */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </div>
      </main>

      {/* ============================================== */}
      {/* SECURE PROFILE EDIT MODAL WITH OTP VERIFICATION */}
      {/* ============================================== */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#172033]/60 backdrop-blur-sm" onClick={() => !isLoading && setIsProfileModalOpen(false)}></motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
              
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-[#172033]">{otpStep ? 'Security Verification' : 'Edit Admin Profile'}</h2>
                  <p className="text-sm text-gray-500">{otpStep ? 'Enter the OTP sent to your email.' : 'Update your personal details & credentials.'}</p>
                </div>
                {!isLoading && <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-red-500"><X className="w-6 h-6"/></button>}
              </div>

              <div className="p-6 md:p-8">
                {errorMsg && (
                  <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 shrink-0" /> {errorMsg}
                  </div>
                )}

                {!otpStep ? (
                  // STEP 1: EDIT DETAILS FORM
                  <form id="profileForm" onSubmit={handleRequestOtp} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><User className="w-4 h-4 text-[#155EEF]"/> Full Name</label>
                      <input required type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none bg-gray-50 focus:bg-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Stethoscope className="w-4 h-4 text-[#155EEF]"/> Designation / Role</label>
                      <input required type="text" value={profileForm.role} onChange={(e) => setProfileForm({...profileForm, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none bg-gray-50 focus:bg-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4 text-[#155EEF]"/> Email Address</label>
                      <input required type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none bg-gray-50 focus:bg-white" />
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Key className="w-4 h-4 text-purple-500"/> Change Password (Optional)</label>
                      <input type="password" value={profileForm.newPassword} onChange={(e) => setProfileForm({...profileForm, newPassword: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-gray-50 focus:bg-white" placeholder="Leave blank to keep current password" />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-5 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200">Cancel</button>
                      <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 bg-[#172033] hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-70">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-4 h-4 text-yellow-400" />} 
                        {isLoading ? 'Requesting...' : 'Send OTP to Save'}
                      </button>
                    </div>
                  </form>

                ) : (
                  
                  // STEP 2: OTP VERIFICATION FORM
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center space-y-2">
                      <Mail className="w-8 h-8 text-[#155EEF] mx-auto mb-2" />
                      <p className="font-bold text-[#172033]">OTP Sent to {adminUser.email}</p>
                      <p className="text-xs text-gray-600">Please check your inbox (and spam folder) to verify these changes. Valid for 10 minutes.</p>
                    </div>

                    <div className="space-y-2 text-center">
                      <label className="text-sm font-bold text-gray-700">Enter 6-Digit OTP</label>
                      <input 
                        required type="text" maxLength="6"
                        value={otpValue} 
                        onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))} 
                        className="w-full text-center tracking-[0.5em] font-black text-2xl px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#155EEF] outline-none" 
                        placeholder="••••••" 
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                      <button type="submit" disabled={isLoading || otpValue.length !== 6} className="w-full inline-flex justify-center items-center gap-2 bg-[#155EEF] hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />} 
                        {isLoading ? 'Verifying...' : 'Verify OTP & Apply Changes'}
                      </button>
                      <button type="button" onClick={() => setOtpStep(false)} disabled={isLoading} className="text-sm font-bold text-gray-500 hover:text-[#172033]">
                        Back to Edit Details
                      </button>
                    </div>
                  </form>

                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminLayout;