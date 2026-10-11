import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, Loader2, ArrowLeft, Key, CheckCircle2, Smile } from 'lucide-react';
import { forgotPassword, resetPassword } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  
  const [step, setStep] = useState(1); // 1 = Email Input, 2 = OTP & New Password Input, 3 = Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Send OTP to Email
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await forgotPassword({ email });
      setStep(2); // Move to next step
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await resetPassword({ email, otp, newPassword });
      setStep(3); // Success Screen
      setTimeout(() => navigate('/admin/login'), 3000); // Auto redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP or failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 relative z-10"
      >
        {/* Left Side - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-[#172033] p-12 flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              {settings?.logoUrl ? (
                <div className="flex items-center gap-3">
                  <img src={settings.logoUrl} alt="Logo" className="h-12 object-contain bg-white rounded-xl p-1.5" />
                  <div className="border-l border-white/20 pl-3"><p className="text-sm text-gray-300 font-medium tracking-wide">Security</p></div>
                </div>
              ) : (
                <><div className="bg-[#155EEF] p-2.5 rounded-xl"><Smile className="w-8 h-8 text-white" /></div><div><h2 className="font-extrabold text-2xl tracking-wide">{settings?.name ? settings.name.split(' ')[0] : 'Save Tooth'}</h2></div></>
              )}
            </div>
            <h3 className="text-3xl font-extrabold mb-4 leading-tight">Account <br/> Recovery</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Follow the secure verification process to safely reset your administrative password and regain access to the portal.</p>
          </div>

          <div className="relative z-10 flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
            <div className="text-sm"><p className="font-bold text-white">Bank-Grade Security</p><p className="text-gray-400 text-xs">2-Step Email OTP Verification enabled.</p></div>
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-white">
          <Link to="/admin/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#155EEF] mb-8 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" /> {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: ENTER EMAIL */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-3xl font-extrabold text-[#172033] mb-2">Forgot Password?</h2>
                <p className="text-gray-500 text-sm mb-8">Enter your registered admin email address. We'll send you a 6-digit OTP to reset your password.</p>

                <form onSubmit={handleRequestOTP} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#172033]">Admin Email Address</label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="admin@savetooth.com" />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-[#172033] hover:bg-black text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 mt-4">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />} 
                    {isLoading ? 'Sending...' : 'Send OTP securely'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: VERIFY OTP & RESET PASSWORD */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-3xl font-extrabold text-[#172033] mb-2">Verify & Reset</h2>
                <p className="text-gray-500 text-sm mb-6">Enter the OTP sent to <span className="font-bold text-[#155EEF]">{email}</span> along with your new password.</p>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#172033]">6-Digit OTP</label>
                    <input type="text" maxLength="6" required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} className="w-full tracking-[0.5em] text-center font-black text-xl px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#155EEF] outline-none bg-gray-50 focus:bg-white" placeholder="••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#172033]">New Password</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="Enter new strong password" />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading || otp.length !== 6 || !newPassword} className="w-full bg-[#155EEF] hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 mt-2">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Key className="w-5 h-5" />} 
                    {isLoading ? 'Verifying...' : 'Reset Password & Login'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"><CheckCircle2 className="w-10 h-10 text-green-600" /></div>
                <h2 className="text-3xl font-extrabold text-[#172033] mb-2">Password Reset!</h2>
                <p className="text-gray-500 text-sm">Your password has been changed successfully. Redirecting you to the login page...</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;