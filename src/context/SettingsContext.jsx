import { createContext, useState, useEffect, useContext } from 'react';
import { fetchSettings } from '../services/api';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data } = await fetchSettings();
        setSettings(data);
        
        // 🚀 Bouns: Ye code automatically SEO meta tags aur Favicon bhi change kar dega!
        if (data.siteTitle) document.title = data.siteTitle;
        
        if (data.metaDescription) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
          }
          metaDesc.content = data.metaDescription;
        }

        if (data.faviconUrl) {
          let favicon = document.querySelector("link[rel~='icon']");
          if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
          }
          favicon.href = data.faviconUrl;
        }
      } catch (error) {
        console.error("Failed to load global settings:", error);
      }
    };
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);