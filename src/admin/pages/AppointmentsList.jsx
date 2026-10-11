import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, CheckCircle, XCircle, Clock, Loader2, X, Send } from 'lucide-react';
import { fetchAppointments, updateAppointmentStatus, deleteAppointment } from '../../services/api';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [selectedApt, setSelectedApt] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const { data } = await fetchAppointments();
      setAppointments(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setIsLoading(false);
    }
  };

  // Fast dropdown change (without date/time update)
  const handleQuickStatusChange = async (id, newStatus) => {
    setAppointments(appointments.map(apt => apt._id === id ? { ...apt, status: newStatus } : apt));
    try { await updateAppointmentStatus(id, { status: newStatus }); } 
    catch (error) { loadAppointments(); }
  };

  // Modal Form Update (with Date, Time and Email shooting)
  const handleFullUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const payload = {
        status: selectedApt.status,
        confirmedDate: selectedApt.confirmedDate,
        confirmedTime: selectedApt.confirmedTime
      };
      
      const { data } = await updateAppointmentStatus(selectedApt._id, payload);
      
      // Update local state
      setAppointments(appointments.map(apt => apt._id === data._id ? data : apt));
      
      alert('✅ Appointment updated and Email sent to patient!');
      setSelectedApt(null);
    } catch (error) {
      alert('❌ Failed to update appointment.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to permanently delete this appointment?')) {
      try {
        await deleteAppointment(id);
        setAppointments(appointments.filter(apt => apt._id !== id));
      } catch (error) {
        alert('❌ Failed to delete.');
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = { Pending: 'bg-orange-100 text-orange-700', Confirmed: 'bg-blue-100 text-blue-700', Completed: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' };
    const Icons = { Pending: Clock, Confirmed: CheckCircle, Completed: CheckCircle, Cancelled: XCircle };
    const Icon = Icons[status] || Clock;
    return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}><Icon className="w-3.5 h-3.5" /> {status}</span>;
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.name?.toLowerCase().includes(searchTerm.toLowerCase()) || apt.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172033]">Appointments</h1>
          <p className="text-gray-500 text-sm">Manage patient requests, set dates, and send emails.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search patient..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#155EEF] focus:ring-2 focus:ring-blue-50 w-full sm:w-64 outline-none" />
          </div>
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#155EEF] focus:ring-2 focus:ring-blue-50 outline-none appearance-none cursor-pointer">
              <option value="All">All Status</option><option value="Pending">Pending</option><option value="Confirmed">Confirmed</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-100">
                <th className="p-5 font-semibold">Patient Info</th>
                <th className="p-5 font-semibold">Service Request</th>
                <th className="p-5 font-semibold">Scheduled Details</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoading ? (
                <tr><td colSpan="5" className="p-10 text-center text-[#155EEF]"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" /><p className="font-bold">Loading...</p></td></tr>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr key={apt._id} className={`hover:bg-gray-50 transition-colors group ${apt.status === 'Pending' ? 'bg-orange-50/30' : ''}`}>
                    <td className="p-5">
                      <p className="font-bold text-[#172033] flex items-center gap-2">
                        {apt.name}
                        {apt.status === 'Pending' && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full animate-pulse uppercase">New</span>}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{apt.phone}</p>
                    </td>
                    <td className="p-5"><p className="text-gray-700 font-medium">{apt.service || 'General'}</p></td>
                    <td className="p-5 text-gray-600 font-medium">
                      {apt.confirmedDate ? (
                         <div><span className="text-teal-600 font-bold">{new Date(apt.confirmedDate).toLocaleDateString()}</span> <br/> <span className="text-xs">{apt.confirmedTime}</span></div>
                      ) : (
                         <span className="text-orange-500 text-xs font-bold">Needs Confirmation</span>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col items-start gap-2">
                        <select value={apt.status} onChange={(e) => handleQuickStatusChange(apt._id, e.target.value)} className="bg-white border border-gray-200 text-sm font-bold cursor-pointer focus:outline-none rounded-lg px-2 py-1">
                          <option value="Pending">Pending</option><option value="Confirmed">Confirmed</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option>
                        </select>
                        {getStatusBadge(apt.status)}
                      </div>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button onClick={() => setSelectedApt(apt)} className="p-2 text-gray-400 hover:text-[#155EEF] hover:bg-blue-50 rounded-lg transition-colors" title="View & Schedule">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(apt._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="p-10 text-center text-gray-500">No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW & SCHEDULE MODAL */}
      {selectedApt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#172033]/60 backdrop-blur-sm" onClick={() => setSelectedApt(null)}></div>
          
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-[#172033]">Manage Appointment</h2>
                <p className="text-sm text-gray-500">View details and send confirmation email.</p>
              </div>
              <button onClick={() => setSelectedApt(null)} className="text-gray-400 hover:text-red-500"><X className="w-6 h-6"/></button>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Patient Info Display */}
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl mb-6 grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 font-bold uppercase">Patient Name</p><p className="font-bold text-[#172033]">{selectedApt.name}</p></div>
                <div><p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p><p className="font-bold text-[#172033]">{selectedApt.phone}</p></div>
                <div><p className="text-xs text-gray-500 font-bold uppercase">Email</p><p className="font-bold text-[#172033]">{selectedApt.email}</p></div>
                <div><p className="text-xs text-gray-500 font-bold uppercase">Requested Service</p><p className="font-bold text-[#155EEF]">{selectedApt.service || 'General'}</p></div>
                <div className="col-span-2"><p className="text-xs text-gray-500 font-bold uppercase">Patient Message</p><p className="text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-200 mt-1">{selectedApt.message || 'No message provided.'}</p></div>
              </div>

              {/* Admin Scheduling Form */}
              <form id="scheduleForm" onSubmit={handleFullUpdate} className="space-y-5">
                <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl space-y-4">
                  <h3 className="font-bold text-teal-800 border-b border-teal-200 pb-2">Schedule & Confirm (Sends Email)</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700">Confirm Date</label>
                      <input type="date" required value={selectedApt.confirmedDate || ''} onChange={(e) => setSelectedApt({...selectedApt, confirmedDate: e.target.value})} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 outline-none focus:border-[#0D9488]" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Confirm Time</label>
                      <input type="time" required value={selectedApt.confirmedTime || ''} onChange={(e) => setSelectedApt({...selectedApt, confirmedTime: e.target.value})} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 outline-none focus:border-[#0D9488]" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-bold text-gray-700">Change Status</label>
                    <select value={selectedApt.status} onChange={(e) => setSelectedApt({...selectedApt, status: e.target.value})} className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 outline-none focus:border-[#0D9488]">
                      <option value="Pending">Pending (No email sent)</option>
                      <option value="Confirmed">Confirmed (Sends Email to Patient)</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled (Sends Email to Patient)</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button type="button" onClick={() => setSelectedApt(null)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200">Cancel</button>
              <button type="submit" form="scheduleForm" disabled={isUpdating} className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg disabled:opacity-70">
                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />} 
                {isUpdating ? 'Sending Email...' : 'Save & Send Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;