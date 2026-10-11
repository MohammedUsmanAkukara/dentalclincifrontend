import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Smile, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/api';
import { useSettings } from '../../context/SettingsContext'; // 🚀 IMPORTED CONTEXT

const Login = () => {
  const navigate = useNavigate();
  const { settings } = useSettings(); // 🚀 FETCHING SETTINGS
  
  // Pre-filled Demo Details
  const [formData, setFormData] = useState({
    email: 'admin@savetooth.com',
    password: 'admin123'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await loginAdmin(formData);
      localStorage.setItem('adminToken', data.token);
      setIsLoading(false);
      navigate('/admin');
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.message || 'Something went wrong. Please check if backend is running.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 relative z-10"
      >
        
        {/* Left Side - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-[#172033] p-12 flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            {/* 🚀 DYNAMIC LOGO SECTION */}
            <div className="flex items-center gap-3 mb-10">
              {settings?.logoUrl ? (
                <div className="flex items-center gap-3">
                  <img src={settings.logoUrl} alt={settings?.name || "Logo"} className="h-12 object-contain bg-white rounded-xl p-1.5" />
                  <div className="border-l border-white/20 pl-3">
                    <p className="text-sm text-gray-300 font-medium tracking-wide">Admin Portal</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-[#155EEF] p-2.5 rounded-xl">
                    <Smile className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-2xl tracking-wide">
                      {settings?.name ? settings.name.split(' ')[0] : 'Save Tooth'}
                    </h2>
                    <p className="text-sm text-gray-400 font-medium tracking-wide">Admin Portal</p>
                  </div>
                </>
              )}
            </div>
            
            <h3 className="text-3xl font-extrabold mb-4 leading-tight">
              Manage your clinic <br/> seamlessly.
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Securely access patient appointments, update website content, and manage dental services all in one place.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
            <div className="text-sm">
              <p className="font-bold text-white">Secure Connection</p>
              <p className="text-gray-400 text-xs">End-to-end encrypted via JWT.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#172033] mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Please sign in to your admin account.</p>
          </div>

          <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-[#172033] mb-1">Demo Access Enabled</p>
              <p className="text-gray-600 mb-0.5"><strong>Email:</strong> admin@savetooth.com</p>
              <p className="text-gray-600"><strong>Password:</strong> admin123</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#172033]">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#172033]">Password</label>
                <Link to="/admin/forgot-password" className="text-xs font-bold text-[#155EEF] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" name="password" value={formData.password} onChange={handleChange} required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" disabled={isLoading}
                className="w-full bg-[#155EEF] hover:bg-blue-700 text-white font-extrabold text-base py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </div>
                ) : (
                  <>Sign In to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;