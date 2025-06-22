import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Award, 
  Users, 
  CheckCircle, 
  Sparkles,
  Crown,
  Phone,
  Calendar,
  MessageCircle
} from 'lucide-react';
import Form from '../common/Form';
import { useHeroImages } from '../../context/HeroImageContext';

// Memoized image component with improved transition
const HeroImage = memo(({ isActive, desktopSrc, tabSrc, mobileSrc, index, isFirstLoad }) => {
  return (
    <motion.div
      key={`hero-image-${index}`}
      className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0'}`}
      initial={{ opacity: isFirstLoad && index === 0 ? 1 : 0, scale: 1 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: 1
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: isFirstLoad && index === 0 ? 0 : 3, 
        ease: "easeInOut",
        opacity: { duration: isFirstLoad && index === 0 ? 0 : 2 }
      }}
    >
      <picture className="w-full h-full">
        <source media="(max-width: 640px)" srcSet={mobileSrc} />
        <source media="(max-width: 1024px)" srcSet={tabSrc} />
        <img
          src={desktopSrc}
          alt={`Luxury Interior Design ${index + 1}`}
          className="w-full h-full object-cover object-center"
          loading={index === 0 ? "eager" : "lazy"}
          fetchpriority={index === 0 ? "high" : "low"}
        />
      </picture>
    </motion.div>
  );
});

// Memoized particle component
const Particle = memo(({ index }) => {
  const left = useMemo(() => `${Math.random() * 100}%`, []);
  const top = useMemo(() => `${Math.random() * 100}%`, []);
  const duration = useMemo(() => 4 + Math.random() * 4, []);
  const delay = useMemo(() => Math.random() * 2, []);

  return (
    <motion.div
      key={`particle-${index}`}
      className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400/20 rounded-full"
      style={{ left, top }}
      animate={{
        y: [-20, 20, -20],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
      }}
    />
  );
});

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  const { 
    desktop: desktopImages, 
    mobile: mobileImages, 
    tab: tabImages, 
    isLoaded,
    fallbackImages
  } = useHeroImages();

  // Handle first load
  useEffect(() => {
    if (isLoaded && isFirstLoad) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isFirstLoad]);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  // Image slideshow timer - only start after first load
  useEffect(() => {
    if (!isLoaded || isFirstLoad) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(desktopImages.length, 4));
    }, 20000);

    return () => clearInterval(interval);
  }, [isLoaded, desktopImages.length, isFirstLoad]);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  // Reduced particles for mobile performance
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => <Particle key={i} index={i} />);
  }, []);

  // Memoize the hero images with improved transitions
  const heroImages = useMemo(() => {
    if (!isLoaded) return null;
    
    return [0, 1, 2, 3].map((i) => (
      <HeroImage
        key={`${currentIndex}-${i}`}
        isActive={i === currentIndex}
        desktopSrc={desktopImages[i % desktopImages.length] || fallbackImages.desktop[i % fallbackImages.desktop.length]}
        tabSrc={tabImages[i % tabImages.length] || fallbackImages.tab[i % fallbackImages.tab.length]}
        mobileSrc={mobileImages[i % mobileImages.length] || fallbackImages.mobile[i % fallbackImages.mobile.length]}
        index={i}
        isFirstLoad={isFirstLoad}
      />
    ));
  }, [isLoaded, currentIndex, desktopImages, tabImages, mobileImages, fallbackImages, isFirstLoad]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background with improved transitions */}
      <div className="absolute inset-0 z-0">
        {/* Fallback background to prevent blank screen */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        <AnimatePresence mode="wait">
          {heroImages}
        </AnimatePresence>
        
        {/* Enhanced mobile-optimized gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 sm:from-black/70 sm:via-black/40 sm:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 sm:from-black/50 sm:to-black/30"></div>
      </div>

      {/* Floating Particles - Hidden on small mobile for performance */}
      <div className="absolute inset-0 z-5 hidden sm:block">
        {particles}
      </div>

      {/* Main Content - Improved mobile layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24">
        <div className="flex items-center justify-center min-h-screen">
          
          <motion.div 
            className="flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Luxury Badge - Smaller on mobile */}
            <motion.div 
              className="flex items-center justify-center mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                <Crown size={16} className="text-yellow-400 mr-1.5 sm:mr-2 sm:w-5 sm:h-5" />
                <span className="text-yellow-400 font-semibold text-xs sm:text-sm tracking-wide">LUXURY INTERIORS</span>
                <Sparkles size={14} className="text-yellow-400 ml-1.5 sm:ml-2 sm:w-4 sm:h-4" />
              </div>
            </motion.div>

            {/* Main Headline - Optimized for mobile */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6 w-full">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-white drop-shadow-2xl mb-1 sm:mb-2">
                    Transform Your
                  </span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-2xl mb-1 sm:mb-2">
                    Living Space
                  </span>
                  <span className="block text-white drop-shadow-2xl">
                    Into <span className="italic bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Luxury</span>
                  </span>
                </h1>
                
                {/* Subtitle - Smaller on mobile */}
                <p className="text-sm sm:text-lg md:text-xl text-gray-100 leading-relaxed mt-3 sm:mt-6 max-w-2xl mx-auto px-2 sm:px-0">
                  Where <span className="text-yellow-400 font-semibold">elegance meets functionality</span>.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons - Improved mobile layout */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-3 mb-6 sm:mb-8 w-full max-w-md sm:max-w-none sm:flex-row sm:gap-4 sm:justify-center"
            >
              <motion.button
                onClick={() => setShowForm(true)}
                className="group bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 relative overflow-hidden order-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Calendar size={18} className="mr-2 relative z-10" />
                <span className="relative z-10">Book Free Consultation</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>

              <motion.a
                href="tel:+918883958877"
                className="group bg-black/50 backdrop-blur-sm border border-white/20 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white/30 order-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={18} className="mr-2" />
                <span>Call Now</span>
                <span className="ml-2 text-yellow-400 text-sm sm:text-base font-normal">+91 88839 58877</span>
              </motion.a>
            </motion.div>

            {/* Trust Indicators - Responsive grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-2xl sm:max-w-none"
            >
              {useMemo(() => [
                { icon: Users, number: '6000+', label: 'Happy Families', color: 'from-blue-500 to-blue-600' },
                { icon: Award, number: '50+', label: 'Design Awards', color: 'from-purple-500 to-purple-600' },
                { icon: Star, number: '4.9', label: 'Client Rating', color: 'from-yellow-500 to-yellow-600' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center sm:justify-start group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={16} className="text-white sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              )), [])}
            </motion.div>

            {/* Features List - Improved mobile layout */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-xl sm:max-w-2xl mx-auto w-full"
            >
              {useMemo(() => [
                '45-Day Installation Guarantee',
                '10-Year Comprehensive Warranty',
                'Free 3D Design Visualization',
                '24/7 Customer Support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center sm:justify-start">
                  <CheckCircle size={14} className="text-green-400 mr-2 sm:mr-3 flex-shrink-0 sm:w-4 sm:h-4" />
                  <span className="text-gray-200 text-xs sm:text-sm lg:text-base text-center sm:text-left">{feature}</span>
                </div>
              )), [])}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Form Modal - Improved mobile experience */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowForm(false);
              }
            }}
          >
            <motion.div 
              className="bg-white rounded-t-3xl sm:rounded-2xl relative w-full sm:max-w-md lg:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl border-b border-gray-100 p-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                  <Crown size={20} className="text-yellow-500 mr-2" />
                  <h3 className="font-semibold text-gray-800">Free Consultation</h3>
                </div>
                <button
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  onClick={() => setShowForm(false)}
                  aria-label="Close form"
                >
                  <span className="text-gray-600 text-xl">×</span>
                </button>
              </div>

              {/* Drag indicator for mobile */}
              <div className="sm:hidden flex justify-center pt-2 pb-1">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="p-4 sm:p-6">
                <Form />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons - Mobile optimized */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3">
        <motion.a
          href="https://wa.me/+918883958877?text=Hey%20I%20am%20from%20your%20Website" 
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl flex items-center transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          <span className="ml-2 hidden lg:inline font-medium">Chat with us</span>
        </motion.a>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;