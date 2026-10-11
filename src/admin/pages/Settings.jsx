import { useState, useEffect } from 'react';
import { Save, Phone, Search, Image as ImageIcon, Type, Loader2, UploadCloud, Bell, Clock, MapPin } from 'lucide-react';
import { fetchSettings, updateSettings } from '../../services/api';

const Settings = () => {
  const [clinicData, setClinicData] = useState({
    name: '', phone: '', email: '', address: '',
    hoursWeekday: '', hoursWeekend: '',
    topbarText: '', topbarActive: false,
    siteTitle: '', metaKeywords: '', metaDescription: '', footerText: ''
  });

  const [existingLogo, setExistingLogo] = useState('');
  const [existingFavicon, setExistingFavicon] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data } = await fetchSettings();
      if (data) {
        setClinicData({
          name: data.name || '', phone: data.phone || '', email: data.email || '', address: data.address || '',
          hoursWeekday: data.hoursWeekday || '', hoursWeekend: data.hoursWeekend || '',
          topbarText: data.topbarText || '', topbarActive: data.topbarActive || false,
          siteTitle: data.siteTitle || '', metaKeywords: data.metaKeywords || '', metaDescription: data.metaDescription || '', footerText: data.footerText || '', mapEmbedUrl: data.mapEmbedUrl || ''
        });
        setExistingLogo(data.logoUrl || '');
        setExistingFavicon(data.faviconUrl || '');
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load settings:", error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClinicData({ ...clinicData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === 'logo') setLogoFile(files[0]);
      if (name === 'favicon') setFaviconFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      Object.keys(clinicData).forEach(key => formData.append(key, clinicData[key]));
      if (logoFile) formData.append('logo', logoFile);
      if (faviconFile) formData.append('favicon', faviconFile);

      await updateSettings(formData);
      alert('✅ Global Settings Saved Successfully!');
      setLogoFile(null); setFaviconFile(null);
      loadSettings();
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert('❌ Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-[#155EEF]"><Loader2 className="w-10 h-10 animate-spin mb-4" /><p className="font-bold">Loading Settings...</p></div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-extrabold text-[#172033]">Global Settings</h1>
        <p className="text-gray-500 text-sm">Manage contact info, announcements, SEO, and brand visuals.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">

          {/* SECTION 1: Announcement & Topbar */}
          <div className="space-y-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between border-b border-blue-200 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#155EEF]" />
                <h2 className="text-lg font-bold text-[#172033]">Announcement Topbar</h2>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="topbarActive" className="text-sm font-bold text-gray-700 cursor-pointer">Show on Website</label>
                <input type="checkbox" id="topbarActive" name="topbarActive" checked={clinicData.topbarActive} onChange={handleChange} className="w-5 h-5 text-[#155EEF] rounded cursor-pointer" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Notice Text (Offers, Alerts, etc.)</label>
              <input type="text" name="topbarText" value={clinicData.topbarText} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:border-[#155EEF] outline-none text-sm bg-white" placeholder="e.g. 🎉 Flat 20% Off on Teeth Whitening this week!" />
            </div>
          </div>

          {/* SECTION 2: Contact Details & Hours */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <Phone className="w-5 h-5 text-[#155EEF]" />
              <h2 className="text-lg font-bold text-[#172033]">Contact & Business Hours</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Clinic Name</label><input required type="text" name="name" value={clinicData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Phone Number</label><input required type="text" name="phone" value={clinicData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Email Address</label><input required type="email" name="email" value={clinicData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Full Address</label><input required type="text" name="address" value={clinicData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm" /></div>

              {/* Business Hours */}
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700 flex items-center gap-1"><Clock className="w-4 h-4 text-gray-400" /> Weekday Hours (Mon-Sat)</label><input type="text" name="hoursWeekday" value={clinicData.hoursWeekday} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm" placeholder="e.g. 9:00 AM – 9:00 PM" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700 flex items-center gap-1"><Clock className="w-4 h-4 text-gray-400" /> Weekend Hours (Sunday)</label><input type="text" name="hoursWeekend" value={clinicData.hoursWeekend} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm" placeholder="e.g. 9:00 AM – 2:00 PM (or Closed)" /></div>
            </div>

            <div className="space-y-2 mt-4 sm:col-span-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" /> Google Maps Embed URL
              </label>
              <input
                type="text" name="mapEmbedUrl" value={clinicData.mapEmbedUrl} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#155EEF] outline-none text-sm"
                placeholder="Paste Google Maps 'src' link here..."
              />
            </div>
          </div>

          {/* SECTION 3: SEO */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <Search className="w-5 h-5 text-[#0D9488]" />
              <h2 className="text-lg font-bold text-[#172033]">SEO & Search Engine Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Website Title (Browser Tab)</label><input type="text" name="siteTitle" value={clinicData.siteTitle} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D9488] outline-none text-sm" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Meta Keywords</label><input type="text" name="metaKeywords" value={clinicData.metaKeywords} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D9488] outline-none text-sm" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Meta Description</label><textarea name="metaDescription" value={clinicData.metaDescription} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D9488] outline-none text-sm resize-none"></textarea></div>
            </div>
          </div>

          {/* SECTION 4: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-[#172033]">Branding & File Uploads</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <label className="text-sm font-bold text-gray-700 block">Main Logo (PNG/JPG)</label>
                <div className="h-24 w-full bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center p-2">
                  {logoFile ? <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" className="h-full object-contain" /> : existingLogo ? <img src={existingLogo} alt="Current Logo" className="h-full object-contain" /> : <span className="text-xs text-gray-400">No Logo Found</span>}
                </div>
                <div className="relative"><input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /><div className="w-full bg-purple-100 text-purple-700 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-sm pointer-events-none"><UploadCloud className="w-4 h-4" /> Upload New Logo</div></div>
              </div>
              <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <label className="text-sm font-bold text-gray-700 block">Favicon (Browser Tab Icon)</label>
                <div className="h-24 w-24 mx-auto bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center p-2">
                  {faviconFile ? <img src={URL.createObjectURL(faviconFile)} alt="Favicon Preview" className="h-full object-contain" /> : existingFavicon ? <img src={existingFavicon} alt="Current Favicon" className="h-full object-contain" /> : <span className="text-xs text-gray-400">No Favicon</span>}
                </div>
                <div className="relative"><input type="file" name="favicon" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /><div className="w-full bg-purple-100 text-purple-700 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-sm pointer-events-none"><UploadCloud className="w-4 h-4" /> Upload Favicon</div></div>
              </div>
            </div>
            <div className="space-y-2 pt-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Type className="w-4 h-4" /> Footer About Text</label>
              <textarea name="footerText" value={clinicData.footerText} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-sm resize-none"></textarea>
            </div>
          </div>

          <div className="fixed bottom-0 right-0 lg:left-64 md:left-64 bg-white/80 backdrop-blur-md p-4 border-t border-gray-200 flex justify-end z-10">
            <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 bg-[#172033] hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl disabled:opacity-70">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? 'Saving...' : 'Save Global Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;