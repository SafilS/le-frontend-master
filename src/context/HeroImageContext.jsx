import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const HeroImageContext = createContext();

export const HeroImageProvider = ({ children }) => {
  const [heroImages, setHeroImages] = useState({
    desktop: [],
    mobile: [],
    tab: [],
    isLoaded: false,
    lastFetched: null
  });

  // Memoize fallback images to prevent unnecessary re-renders
  const fallbackImages = useMemo(() => ({
    desktop: [
      '/assets/images/lap4.jpg',
      '/assets/images/lap1.jpg',
      '/assets/images/lap2.png',
      '/assets/images/lap3.png',
    ],
    mobile: [
      '/assets/images/mobile1.jpg',
      '/assets/images/mobile2.jpg',
      '/assets/images/mobile3.jpg',
    ],
    tab: [
      '/assets/images/tab1.jpg',
      '/assets/images/tab2.jpg',
    ]
  }), []);

  // Load images from localStorage on mount
  useEffect(() => {
    const loadImages = async () => {
      // Try to load from cache first
      const cachedImages = localStorage.getItem('heroImages');
      if (cachedImages) {
        try {
          const parsedImages = JSON.parse(cachedImages);
          // Check if the cache is still valid (less than 24 hours old)
          const now = new Date();
          const lastFetched = new Date(parsedImages.lastFetched);
          const cacheAge = now - lastFetched;
          const cacheValidityPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          
          if (cacheAge < cacheValidityPeriod && 
              parsedImages.desktop.length && 
              parsedImages.mobile.length && 
              parsedImages.tab.length) {
            setHeroImages({
              ...parsedImages,
              isLoaded: true
            });
            return;
          }
        } catch (error) {
          console.error('Error loading cached hero images:', error);
        }
      }
      
      // If no valid cache, fetch images
      await fetchHeroImages();
    };

    loadImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      // Use AbortController to cancel fetch if component unmounts
      const controller = new AbortController();
      const signal = controller.signal;
      
      const res = await fetch('https://le-crown-interiors-backend.onrender.com/image/all', { signal });
      const data = await res.json();

      // Extract URLs
      const desktop = data.hero.map(img => img.img.url);
      const mobile = data.mobile.map(img => img.img.url);
      const tab = data.tab.map(img => img.img.url);

      const newHeroImages = {
        desktop,
        mobile,
        tab,
        isLoaded: true,
        lastFetched: new Date().toISOString()
      };

      // Update state
      setHeroImages(newHeroImages);

      // Cache in localStorage
      localStorage.setItem('heroImages', JSON.stringify(newHeroImages));
      
      // Preload images for better performance
      preloadImages([...desktop, ...mobile, ...tab]);
      
      return () => controller.abort();
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error loading hero images:', err);
        // Use fallback images
        const fallbackData = {
          ...fallbackImages,
          isLoaded: true,
          lastFetched: new Date().toISOString()
        };
        setHeroImages(fallbackData);
        localStorage.setItem('heroImages', JSON.stringify(fallbackData));
        
        // Preload fallback images
        preloadImages([
          ...fallbackImages.desktop,
          ...fallbackImages.mobile,
          ...fallbackImages.tab
        ]);
      }
    }
  };

  // Preload images function
  const preloadImages = (urls) => {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };

  // Force refresh images (can be called manually if needed)
  const refreshHeroImages = () => {
    setHeroImages(prev => ({
      ...prev,
      isLoaded: false
    }));
    fetchHeroImages();
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...heroImages,
    refreshHeroImages,
    fallbackImages
  }), [heroImages, fallbackImages]);

  return (
    <HeroImageContext.Provider value={contextValue}>
      {children}
    </HeroImageContext.Provider>
  );
};

export const useHeroImages = () => {
  const context = useContext(HeroImageContext);
  if (!context) {
    throw new Error('useHeroImages must be used within a HeroImageProvider');
  }
  return context;
};

export default HeroImageContext;