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

// Memoized image component to prevent unnecessary re-renders
const HeroImage = memo(({ isActive, desktopSrc, tabSrc, mobileSrc, index }) => {
  return (
    <motion.div
      key={`hero-image-${index}`}
      className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0'}`}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.1
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <picture className="w-full h-full">
        <source media="(max-width: 640px)" srcSet={mobileSrc} />
        <source media="(max-width: 1024px)" srcSet={tabSrc} />
        <img
          src={desktopSrc}
          alt={`Luxury Interior Design ${index + 1}`}
          className="w-full h-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          fetchpriority={index === 0 ? "high" : "low"}
        />
      </picture>
    </motion.div>
  );
});

// Memoized particle component
const Particle = memo(({ index }) => {
  // Pre-calculate random positions for better performance
  const left = useMemo(() => `${Math.random() * 100}%`, []);
  const top = useMemo(() => `${Math.random() * 100}%`, []);
  const duration = useMemo(() => 4 + Math.random() * 4, []);
  const delay = useMemo(() => Math.random() * 2, []);

  return (
    <motion.div
      key={`particle-${index}`}
      className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
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
  
  // Use the context instead of local state and API calls
  const { 
    desktop: desktopImages, 
    mobile: mobileImages, 
    tab: tabImages, 
    isLoaded,
    fallbackImages
  } = useHeroImages();

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  // Image slideshow timer with useCallback to prevent unnecessary re-renders
  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(desktopImages.length, 4));
    }, 20000);

    return () => clearInterval(interval);
  }, [isLoaded, desktopImages.length]);

  // Memoize animation variants to prevent re-creation on each render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }), []);

  const floatingVariants = useMemo(() => ({
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  // Memoize the particles array to prevent re-creation on each render
  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => <Particle key={i} index={i} />);
  }, []);

  // Memoize the hero images to prevent re-creation on each render
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
      />
    ));
  }, [isLoaded, currentIndex, desktopImages, tabImages, mobileImages, fallbackImages]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {heroImages}
        </AnimatePresence>
        
        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>

      {/* Floating Particles - Reduced number for better performance */}
      <div className="absolute inset-0 z-5">
        {particles}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-24">
        <div className="flex items-center justify-center min-h-screen">
          
          {/* Hero Content - Centered */}
          <motion.div 
            className="flex flex-col justify-center items-center text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            <motion.div 
              className="flex items-center justify-center mb-6"
              variants={itemVariants}
            >
              <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2">
                <Crown size={20} className="text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-semibold text-sm tracking-wide">LUXURY INTERIORS</span>
                <Sparkles size={16} className="text-yellow-400 ml-2" />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-white drop-shadow-2xl">
                    Transform Your
                  </span>
                  <span className="pb-3 block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-2xl">
                    Living Space
                  </span>
                  <span className="block text-white drop-shadow-2xl">
                    Into <span className="italic bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Luxury</span>
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mt-6 max-w-2xl mx-auto">
                  Where <span className="text-yellow-400 font-semibold">elegance meets functionality</span>.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons - Memoized to prevent unnecessary re-renders */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
            >
              {/* Form Button - Works for both mobile and desktop */}
              <motion.button
                onClick={() => setShowForm(true)}
                className="group bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Calendar size={20} className="mr-2 relative z-10" />
                <span className="relative z-10">Book Free Consultation</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>

              <motion.a
                href="tel:+911234567890"
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} className="mr-2" />
                <span className="hidden sm:inline">Call Now</span>
                <span className="sm:hidden">Call</span>
                <span className="ml-2 text-yellow-400">+91 12345 67890</span>
              </motion.a>
            </motion.div>

            {/* Trust Indicators - Memoized to prevent unnecessary re-renders */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 justify-items-center"
            >
              {useMemo(() => [
                { icon: Users, number: '6000+', label: 'Happy Families', color: 'from-blue-500 to-blue-600' },
                { icon: Award, number: '50+', label: 'Design Awards', color: 'from-purple-500 to-purple-600' },
                { icon: Star, number: '4.9', label: 'Client Rating', color: 'from-yellow-500 to-yellow-600' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              )), [])}
            </motion.div>

            {/* Features List - Memoized to prevent unnecessary re-renders */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
            >
              {useMemo(() => [
                '45-Day Installation Guarantee',
                '10-Year Comprehensive Warranty',
                'Free 3D Design Visualization',
                '24/7 Customer Support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle size={18} className="text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-200 text-sm lg:text-base">{feature}</span>
                </div>
              )), [])}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Form Modal - Lazy loaded to improve initial page load */}
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
              className="bg-white rounded-t-3xl sm:rounded-2xl relative w-full sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ y: "100%", opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.9 }}
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
              
              <div className="p-6 pt-4">
                <Form />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Form Button - Always visible */}
        {/* <motion.button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white p-4 rounded-full shadow-2xl flex items-center transition-all duration-300 group relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(234, 179, 8, 0.4)",
              "0 0 0 10px rgba(234, 179, 8, 0)",
              "0 0 0 0 rgba(234, 179, 8, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          aria-label="Open consultation form"
        >
          <Calendar size={24} className="group-hover:scale-110 transition-transform" />
          <span className="ml-2 hidden lg:inline font-medium whitespace-nowrap">Get Consultation</span>
        </motion.button> */}

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/911234567890" 
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          <span className="ml-2 hidden lg:inline font-medium">Chat with us</span>
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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