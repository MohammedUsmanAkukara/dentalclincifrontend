import { useState, useEffect } from 'react';
import { Calendar, Users, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAppointments } from '../../services/api';

const Dashboard = () => {
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [statsData, setStatsData] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data } = await fetchAppointments();

      // Calculate Stats dynamically
      const pending = data.filter(apt => apt.status === 'Pending').length;
      const confirmed = data.filter(apt => apt.status === 'Confirmed').length;
      const completed = data.filter(apt => apt.status === 'Completed').length;

      setStatsData({
        total: data.length,
        pending,
        confirmed,
        completed
      });

      // Show only top 5 recent appointments on dashboard
      setRecentAppointments(data.slice(0, 5));
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      setIsLoading(false);
    }
  };

  const stats = [
    { title: "Total Requests", value: statsData.total, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending Approvals", value: statsData.pending, icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Confirmed Bookings", value: statsData.confirmed, icon: Calendar, color: "text-teal-600", bg: "bg-teal-100" },
    { title: "Completed", value: statsData.completed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Confirmed': return 'bg-teal-100 text-teal-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-[#155EEF]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-bold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-extrabold text-[#172033]">Overview Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here is what's happening at your clinic today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-extrabold text-[#172033]">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#172033]">Recent Appointment Requests</h2>
          <Link to="/admin/appointments" className="text-[#155EEF] font-semibold text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-5 font-semibold">Patient Name</th>
                <th className="p-5 font-semibold">Contact</th>
                <th className="p-5 font-semibold">Service Requested</th>
                <th className="p-5 font-semibold">Pref. Date</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {recentAppointments.length > 0 ? recentAppointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-bold text-[#172033] flex items-center gap-2">
                    {apt.name}
                    {apt.status === 'Pending' && (
                      <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse uppercase tracking-widest">New</span>
                    )}
                  </td>
                  <td className="p-5 text-gray-600">{apt.phone}</td>
                  <td className="p-5 text-gray-600 font-medium">{apt.service || 'General'}</td>
                  <td className="p-5 text-gray-600">{apt.preferredDate ? new Date(apt.preferredDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500">No recent appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;