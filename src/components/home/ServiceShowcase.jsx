import React, { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Award, Users } from 'lucide-react';

// Memoized service card component to prevent unnecessary re-renders
const ServiceCard = memo(({ service, index }) => {
  // Animation variants - memoized to prevent recreation on each render
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  const imageVariants = useMemo(() => ({
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }), []);

  const overlayVariants = useMemo(() => ({
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }), []);

  return (
    <motion.div
      key={service.id}
      variants={cardVariants}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      whileHover={{ y: -8 }}
    >
      {/* Service Image with Overlay */}
      <div className="relative h-64 overflow-hidden">
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
        
        {/* Hover Overlay with Icon */}
        <motion.div
          className="absolute inset-0 bg-yellow-600/90 flex items-center justify-center"
          variants={overlayVariants}
          initial="rest"
          whileHover="hover"
        >
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <ArrowRight className="w-8 h-8" />
            </div>
            <p className="text-lg font-semibold">Explore Service</p>
          </div>
        </motion.div>

        {/* Service Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
            {service.category || 'Premium'}
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center text-sm font-medium">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {service.rating || '4.9'}
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6">
        {/* Service Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Service Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Service Features */}
        {service.features && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Service Stats */}
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

        {/* Price Range */}
        {service.priceRange && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Starting from</span>
            <span className="text-lg font-bold text-yellow-600">{service.priceRange}</span>
          </div>
        )}

        {/* CTA Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Get Quote</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* Decorative Elements - Simplified for better performance */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-yellow-200 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500" />
    </motion.div>
  );
});

const ServiceShowcase = ({ services }) => {
  // Memoize animation variants to prevent recreation on each render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }), []);

  // Render service cards with virtualization for better performance
  const serviceCards = useMemo(() => {
    return services.map((service, index) => (
      <ServiceCard 
        key={service.id} 
        service={service} 
        index={index} 
      />
    ));
  }, [services]);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Reduced threshold for better performance
    >
      {serviceCards}
    </motion.div>
  );
};

export default memo(ServiceShowcase);
