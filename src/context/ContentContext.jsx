import { createContext, useState, useEffect, useContext } from 'react';
import { fetchWebsiteContent, fetchActiveServices } from '../services/api';
import { Loader2 } from 'lucide-react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [cmsData, setCmsData] = useState(null);
  const [activeServices, setActiveServices] = useState([]);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [contentRes, servicesRes] = await Promise.all([
          fetchWebsiteContent(),
          fetchActiveServices()
        ]);
        setCmsData(contentRes.data);
        setActiveServices(servicesRes.data);
      } catch (error) {
        console.error("Error loading app data:", error);
      } finally {
        setIsAppLoading(false);
      }
    };
    loadAllData();
  }, []);

  if (isAppLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F7FAFC] text-[#155EEF]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <h2 className="font-extrabold text-xl text-[#172033]">Loading Save Tooth Clinic...</h2>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={{ cmsData, activeServices }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);