import React, { useState, useEffect } from 'react';
import Form from '../common/Form';

const Hero = () => {

  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [tabImages, setTabImages] = useState([]);

  // const mobileImages = [
  //   '/assets/images/mobile1.jpg',
  //   '/assets/images/mobile2.jpg',
  //   '/assets/images/mobile3.jpg',
  // ];

  // const tabletImages = [
  //   '/assets/images/tab1.jpg',
  //   '/assets/images/tab2.jpg',
  //   '/assets/images/tab3.jpg',
    
  // ];

  // const desktopImages = [
  //   '/assets/images/lap4.jpg',
  //   '/assets/images/lap1.jpg',
  //   '/assets/images/lap2.png',
  //   '/assets/images/lap3.png',
  // ];

  useEffect(() => {
  const localKeys = {
    desktop: 'desktopHeroImages',
    mobile: 'mobileHeroImages',
    tab: 'tabHeroImages',
  };

  const loadImages = async () => {
    try {
      // Check localStorage for cached images
      const cachedDesktop = JSON.parse(localStorage.getItem(localKeys.desktop) || '[]');
      const cachedMobile = JSON.parse(localStorage.getItem(localKeys.mobile) || '[]');
      const cachedTab = JSON.parse(localStorage.getItem(localKeys.tab) || '[]');

      if (cachedDesktop.length && cachedMobile.length && cachedTab.length) {
        setDesktopImages(cachedDesktop);
        setMobileImages(cachedMobile);
        setTabImages(cachedTab);
        return;
      }

      // Fetch from API if not cached
      const res = await fetch('https://le-crown-interiors-backend.onrender.com/image/all');
      const data = await res.json();

      // Extract URLs directly (no specific order)
      const desktop = data.hero.map(img => img.img.url);
      const mobile = data.mobile.map(img => img.img.url);
      const tab = data.tab.map(img => img.img.url);

      // Save to state
      setDesktopImages(desktop);
      setMobileImages(mobile);
      setTabImages(tab);

      // Cache in localStorage
      localStorage.setItem(localKeys.desktop, JSON.stringify(desktop));
      localStorage.setItem(localKeys.mobile, JSON.stringify(mobile));
      localStorage.setItem(localKeys.tab, JSON.stringify(tab));
    } catch (err) {
      console.error('Error loading images:', err);
    }
  };
    loadImages();
  }, []);




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 8000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image with better responsive handling */}
      <div className="absolute inset-0 z-0">
        {[0, 1, 2, 3].map((i) => (
          <picture
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[4000ms] ease-in-out ${
              i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <source media="(max-width: 640px)" srcSet={mobileImages[i % mobileImages.length]} />
            <source media="(max-width: 1024px)" srcSet={tabImages[i % tabImages.length]} />
            <img
              src={desktopImages[i % desktopImages.length] || ''}
              alt={`Background ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </picture>
        ))}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-5xl mx-auto py-10 relative z-10">
      {/* Diagonal gradient overlay for better contrast */}
      <div className="absolute inset-0 z-0 rounded-lg" 
           style={{
             background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)'
           }}>
      </div>
      
      {/* Main content with improved visibility */}
      <div className="relative z-10 px-6 py-8">
        <h1 className="relative">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight drop-shadow-lg">
            We <span className="text-red-500 text-shadow">Design</span>.
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mt-1 drop-shadow-lg">
            We <span className="text-red-500 text-shadow">Build</span>.
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mt-1 drop-shadow-lg">
            You <span className="italic text-shadow">Relax</span>.
          </span>
          <div className="absolute -left-4 top-0 w-1 h-full bg-red-500 hidden lg:block"></div>
        </h1>
        
        <div className="mt-10 relative">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-white tracking-wider relative inline-block drop-shadow-lg">
            <span className="text-red-400 font-semibold text-shadow-sm">INTERIORS</span> MADE EFFORTLESS
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-400"></div>
          </p>
        </div>
        
        
      </div>
      
      {/* Custom CSS for text shadow */}
      <style jsx>{`
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>





          {/* Indicator */}
          {/* <div className="block lg:hidden mt-6">
            <button
              
              className="bg-red-600 text-white px-4 py-2 rounded shadow-md"
            >
              Get Started
            </button>
          </div> */}
          <div className="mt-8">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300 flex items-center block lg:hidden mt-6">
              Transform Your Space
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>

            
            {/* Trust Indicators - Desktop */}
            <div className="hidden lg:block mt-8">
              <div className="flex flex-wrap items-center gap-4 xl:gap-8 mt-8">
                <div className="flex items-center">
                  <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm lg:text-base">45-Day Installation</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm lg:text-base">10-Year Warranty</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm lg:text-base">6000+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Floating Form - Responsive positioning */}
          <div className="mt-5 hidden lg:block lg:col-span-5 xl:col-span-4 lg:static xl:absolute xl:right-16 xl:top-1/2 xl:transform xl:-translate-y-1/2 w-full max-w-md mx-auto lg:mx-0 lg:max-w-none xl:max-w-sm">
            <Form />
          </div>

          {showForm && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center lg:hidden">
              <div className="bg-white p-4 rounded-lg relative w-[90%] max-w-md">
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-red-600 text-xl font-bold"
                  onClick={() => setShowForm(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <Form />
              </div>
            </div>
          )}


          
          {/* Mobile Trust Indicators - Responsive layout */}
          <div className="lg:hidden col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center">
                <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-medium text-sm">45-Day Installation</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-medium text-sm">10-Year Warranty</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-medium text-sm">6000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Chat Button - Made more responsive and accessible */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <a 
          href="https://wa.me/1234567890" 
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center transition-all"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.419-.101.824z" />
          </svg>
          <span className="ml-2 hidden sm:inline">Chat now</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;