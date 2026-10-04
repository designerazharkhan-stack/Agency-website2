import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteSettings, HomepageSettings, SeoSettings } from '../types';
import { getSiteSettings, getHomepageSettings, getSeoSettings } from '../services/db';
import { initialSiteSettings, initialHomepageSettings, initialSeoSettings } from '../services/mockData';

interface SiteContextType {
  siteSettings: SiteSettings;
  homepageSettings: HomepageSettings;
  seoSettings: SeoSettings;
  loading: boolean;
  refreshSiteData: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(initialHomepageSettings);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(initialSeoSettings);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [site, home, seo] = await Promise.all([
        getSiteSettings(),
        getHomepageSettings(),
        getSeoSettings()
      ]);
      setSiteSettings(site);
      setHomepageSettings(home);
      setSeoSettings(seo);
    } catch (e) {
      console.warn('Error loading site settings:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <SiteContext.Provider
      value={{
        siteSettings,
        homepageSettings,
        seoSettings,
        loading,
        refreshSiteData: loadData
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
