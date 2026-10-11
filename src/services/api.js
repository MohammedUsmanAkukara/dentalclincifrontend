import axios from 'axios';

// Backend ka base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// JWT Token Interceptor: Har request me automatically token bhejne ke liye
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ==========================================
// 1. AUTH APIs
// ==========================================
export const loginAdmin = (formData) => API.post('/auth/login', formData);
export const setupAdmin = () => API.post('/auth/setup'); 

export const getAdminProfile = () => API.get('/auth/profile');
export const requestProfileOtp = () => API.post('/auth/request-otp');
export const updateAdminProfile = (data) => API.put('/auth/profile', data);

export const forgotPassword = (data) => API.post('/auth/forgot-password', data);
export const resetPassword = (data) => API.post('/auth/reset-password', data);

// ==========================================
// 2. APPOINTMENTS APIs
// ==========================================
export const submitContactForm = (formData) => API.post('/appointments', formData);
export const fetchAppointments = () => API.get('/appointments');
export const updateAppointmentStatus = (id, data) => API.patch(`/appointments/${id}`, data);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);

// ==========================================
// 3. WEBSITE CONTENT (CMS) APIs
// ==========================================
export const fetchWebsiteContent = () => API.get('/content');
export const updateWebsiteContent = (contentData) => API.put('/content', contentData); // YAHI MISSING THA!

// ==========================================
// 4. SERVICES APIs
// ==========================================
export const fetchActiveServices = () => API.get('/services'); // Public website ke liye
export const fetchAdminServices = () => API.get('/services/admin'); // Admin Panel ke liye
export const createService = (serviceData) => API.post('/services', serviceData);
export const updateService = (id, serviceData) => API.put(`/services/${id}`, serviceData);
export const deleteService = (id) => API.delete(`/services/${id}`);

// ==========================================
// 5. GLOBAL SETTINGS APIs
// ==========================================
export const fetchSettings = () => API.get('/settings');
export const updateSettings = (settingsData) => API.put('/settings', settingsData);