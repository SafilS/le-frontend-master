import React, { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Memoized service card component to prevent unnecessary re-renders
const ServiceCard = memo(({ service, index, isMobile }) => {
  const navigate = useNavigate();

  // ✅ Mapping category to route (adjust based on your actual routes)
  const categoryRouteMap = {
    office: '/office',
    commercial: '/gallery',
    creative: '/gallery',
    residential: '/bedroom',
    kitchen: '/kitchen',
    'interior design': '/gallery',
  };

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }), []);

  const imageVariants = useMemo(() => ({
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }), []);

  const overlayVariants = useMemo(() => ({
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }), []);

  const handleMoreClick = () => {
    console.log(categoryRouteMap[service.category.split(' ')[-1]?.toLowerCase()])
    const route = categoryRouteMap[service.category?.toLowerCase().split(' ')[-1]] || '/kitchen'; // fallback
    navigate(route);
  };

  return (
    <motion.div
      key={service.id}
      variants={cardVariants}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 ${isMobile ? 'flex-shrink-0 w-80' : ''}`}
      whileHover={{ y: -8 }}
    >
      {/* Service Image */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${service.imagePath})` }}
          variants={imageVariants}
          initial="rest"
          whileHover="hover"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-yellow-600/90 flex items-center justify-center"
          variants={overlayVariants}
          initial="rest"
          whileHover="hover"
        >
          <div className="text-center text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 backdrop-blur-sm">
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <p className="text-base sm:text-lg font-semibold">Explore Service</p>
          </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium text-gray-800">
          {service.category || 'Premium'}
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center text-xs sm:text-sm font-medium">
          <Star className="w-3 h-3 mr-1 fill-current" />
          {service.rating || '4.9'}
        </div>
      </div>

      {/* Service Content */}
      <div className="p-4 sm:p-6">
        <h3 className="fluid-text-lg sm:fluid-text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="fluid-text-sm sm:fluid-text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {service.features && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{service.duration || '4-6 weeks'}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{service.projects || '200+'} projects</span>
          </div>
        </div>

        {service.priceRange && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Starting from</span>
            <span className="text-lg font-bold text-yellow-600">{service.priceRange}</span>
          </div>
        )}

        {/* ✅ More Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMoreClick}
        >
          <span>More</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>

      <div className="absolute -top-2 -right-2 w-20 h-20 bg-yellow-200 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
    </motion.div>
  );
});

const ServiceShowcase = ({ services }) => {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }), []);

  return (
    <div className="mt-8 sm:mt-12">
      {/* ✅ Mobile - Horizontal Scroll */}
      <motion.div
        className="flex gap-6 overflow-x-auto pb-4 sm:hidden scrollbar-hide snap-x snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex-shrink-0 w-4" />
        {services.map((service, index) => (
          <div key={service.id} className="snap-start">
            <ServiceCard service={service} index={index} isMobile={true} />
          </div>
        ))}
        <div className="flex-shrink-0 w-4" />
      </motion.div>

      {/* ✅ Desktop Grid */}
      <motion.div
        className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service, index) => (
          <ServiceCard service={service} index={index} isMobile={false} key={service.id} />
        ))}
      </motion.div>
    </div>
  );
};

export default memo(ServiceShowcase);
