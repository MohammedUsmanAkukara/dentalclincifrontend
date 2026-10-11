import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, X } from 'lucide-react';
import { fetchAdminServices, createService, updateService, deleteService } from '../../services/api';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    iconName: 'Stethoscope',
    isActive: true
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data } = await fetchAdminServices();
      setServices(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const openForm = (service = null) => {
    if (service) {
      setFormData({ title: service.title, desc: service.desc, iconName: service.iconName, isActive: service.isActive });
      setEditingId(service._id);
    } else {
      setFormData({ title: '', desc: '', iconName: 'Stethoscope', isActive: true });
      setEditingId(null);
    }
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await createService(formData);
      }
      setShowForm(false);
      loadServices();
    } catch (error) {
      console.error("Failed to save service:", error);
      alert("Failed to save service.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        loadServices();
      } catch (error) {
        console.error("Failed to delete:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-[#155EEF]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-bold">Loading Services...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172033]">Services CMS</h1>
          <p className="text-gray-500 text-sm">Manage the dental services displayed on your website.</p>
        </div>
        
        {!showForm && (
          <button onClick={() => openForm()} className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" /> Add New Service
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-[#155EEF] p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <h2 className="text-lg font-bold text-[#172033]">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500"><X className="w-6 h-6"/></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Service Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#155EEF]" placeholder="e.g. Laser Dentistry" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Icon Name (Lucide-React)</label>
                <input required type="text" name="iconName" value={formData.iconName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#155EEF]" placeholder="e.g. Sparkles, Stethoscope, Activity" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Short Description</label>
              <textarea required name="desc" value={formData.desc} onChange={handleInputChange} rows="2" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#155EEF]" placeholder="Description displayed on the card"></textarea>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-[#155EEF]" />
              <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">Visible on Website</label>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
              <button type="submit" className="inline-flex items-center gap-2 bg-[#172033] hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg">
                <Save className="w-4 h-4" /> Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#172033]">Active Services List</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {services.length > 0 ? services.map((service) => (
            <div key={service._id} className="p-5 flex items-center justify-between group hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-bold text-[#172033] text-lg">{service.title}</h3>
                <p className="text-gray-500 text-sm max-w-2xl mt-1">{service.desc}</p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="text-gray-400 font-medium">Icon: <strong className="text-gray-700">{service.iconName}</strong></span>
                  <span className={`px-2 py-0.5 rounded-md font-bold ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {service.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button onClick={() => openForm(service)} className="p-2 text-gray-500 hover:text-[#155EEF] hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(service._id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-10 text-center text-gray-500">No services found. Click 'Add New Service' to create one.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesManager;