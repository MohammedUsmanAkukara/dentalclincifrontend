import { Stethoscope, Activity, Sparkles, Smile } from 'lucide-react';

export const CLINIC_DATA = {
  name: "Save Tooth Dental Clinic",
  tagline: "Your Smile, Our Priority.",
  address: "Moti Nagar, Old Dhamtari Road, beside Maa Sharda Petrol Pump, Raipur, Chhattisgarh 492015, India",
  phone: "+91 98765 43210", 
  email: "contact@savetoothclinic.com", 
  hours: [
    { day: "Monday", time: "9:00 AM – 9:00 PM" },
    { day: "Tuesday", time: "9:00 AM – 9:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 9:00 PM" },
    { day: "Thursday", time: "9:00 AM – 9:00 PM" },
    { day: "Friday", time: "9:00 AM – 9:00 PM" },
    { day: "Saturday", time: "9:00 AM – 9:00 PM" },
    { day: "Sunday", time: "9:00 AM – 2:00 PM" },
  ]
};

export const SERVICES = [
  {
    id: 'rct',
    title: 'Root Canal Treatment (RCT)',
    desc: 'Expert care to treat infection or damage inside a tooth, preserving your natural smile.',
    icon: Stethoscope,
    color: 'bg-blue-50 text-[#155EEF]'
  },
  {
    id: 'gums',
    title: 'Bleeding Gums Treatment',
    desc: 'Comprehensive evaluation and treatment options for bleeding gums and periodontal health.',
    icon: Activity,
    color: 'bg-teal-50 text-[#0D9488]'
  },
  {
    id: 'laser',
    title: 'Laser Dentistry',
    desc: 'Advanced, minimally invasive laser-assisted dental techniques for comfortable care.',
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'prosthodontics',
    title: 'Fixed Prosthodontics',
    desc: 'High-quality dental restorations, including crowns and bridges, tailored to your needs.',
    icon: Smile,
    color: 'bg-orange-50 text-orange-600'
  }
];

export const PROCESS_STEPS = [
  { title: "Get in Touch", desc: "Contact us to ask questions or request an appointment." },
  { title: "Discuss Your Concerns", desc: "Share your dental concerns with our experienced team." },
  { title: "Receive an Evaluation", desc: "A thorough assessment to understand your specific needs." },
  { title: "Plan Your Care", desc: "Review your personalized treatment plan and next steps." }
];