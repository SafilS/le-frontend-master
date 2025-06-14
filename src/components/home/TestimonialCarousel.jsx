import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Memoized star rating component to prevent unnecessary re-renders
const StarRating = memo(({ rating = 5 }) => (
  <div className="flex justify-center mb-4">
    {useMemo(() => 
      [...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300'
          }`}
        />
      )), [rating])}
  </div>
));

// Memoized testimonial card component
const TestimonialCard = memo(({ testimonial, direction }) => {
  // Memoize animation variants to prevent recreation on each render
  const cardVariants = useMemo(() => ({
    enter: (direction) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15
    })
  }), []);

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 200, damping: 25, mass: 1 },
        opacity: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.6, ease: "easeInOut" },
        rotateY: { duration: 0.8, ease: "easeInOut" }
      }}
      className="w-full"
    >
      <div className="bg-gradient-to-br from-white via-gray-50 to-yellow-50 rounded-3xl shadow-2xl p-8 lg:p-12 border border-yellow-100 relative overflow-hidden">
        {/* Quote icon */}
        <div className="absolute top-6 left-6 opacity-10">
          <Quote className="w-16 h-16 text-yellow-600" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          {/* Client Image and Info */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src={testimonial.imagePath} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative ring - simplified for better performance */}
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-30"></div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl lg:text-2xl font-bold text-gray-800">
                {testimonial.name}
              </h4>
              <p className="text-gray-600 font-medium">
                {testimonial.role}
              </p>
              {testimonial.location && (
                <p className="text-sm text-gray-500">
                  📍 {testimonial.location}
                </p>
              )}
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="lg:col-span-2 space-y-6">
            <StarRating rating={testimonial.rating} />
            
            <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic relative">
              <span className="text-4xl text-yellow-400 absolute -top-2 -left-2">"</span>
              <span className="relative z-10 pl-6">
                {testimonial.quote}
              </span>
              <span className="text-4xl text-yellow-400 absolute -bottom-4 -right-2">"</span>
            </blockquote>

            {/* Project details */}
            {testimonial.project && (
              <div className="bg-white rounded-xl p-4 shadow-md border border-yellow-100">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 mr-2">Project:</span>
                    <span className="text-gray-600">{testimonial.project}</span>
                  </div>
                  {testimonial.duration && (
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Duration:</span>
                      <span className="text-gray-600">{testimonial.duration}</span>
                    </div>
                  )}
                  {testimonial.budget && (
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Investment:</span>
                      <span className="text-gray-600">{testimonial.budget}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Main carousel component
const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // Track slide direction

  // Auto-play functionality with useCallback to prevent unnecessary re-renders
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1); // Always move forward in auto-play
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying, isPaused]);

  // Navigation functions with useCallback to prevent unnecessary re-renders
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Memoize the current testimonial to prevent unnecessary re-renders
  const currentTestimonial = useMemo(() => 
    testimonials[currentIndex], 
    [testimonials, currentIndex]
  );

  // Memoize the dot indicators to prevent unnecessary re-renders
  const dotIndicators = useMemo(() => (
    <div className="flex gap-2">
      {testimonials.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? 'bg-yellow-500 scale-125'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  ), [testimonials, currentIndex, goToSlide]);

  return (
    <motion.div 
      className="relative max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background decorative elements - simplified for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Main testimonial display */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <TestimonialCard 
            key={currentIndex} 
            testimonial={currentTestimonial} 
            direction={direction} 
          />
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Previous/Next Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={prevTestimonial}
            className="group bg-white hover:bg-yellow-50 border-2 border-yellow-200 hover:border-yellow-400 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-yellow-600 transition-colors" />
          </motion.button>
          
          <motion.button
            onClick={nextTestimonial}
            className="group bg-white hover:bg-yellow-50 border-2 border-yellow-200 hover:border-yellow-400 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-yellow-600 transition-colors" />
          </motion.button>
        </div>

        {/* Dot Indicators */}
        {dotIndicators}

        {/* Auto-play Toggle */}
        <motion.button
          onClick={toggleAutoPlay}
          className={`group border-2 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl ${
            isAutoPlaying
              ? 'bg-yellow-500 border-yellow-500 hover:bg-yellow-600'
              : 'bg-white border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50'
          }`}
          aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-gray-600 group-hover:text-yellow-600 transition-colors" />
          )}
        </motion.button>
      </div>

      {/* Progress bar - only render when needed */}
      {isAutoPlaying && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "0%" : "100%" }}
            transition={{ 
              duration: isPaused ? 0.3 : 8, 
              ease: isPaused ? "easeOut" : "linear" 
            }}
            key={`${currentIndex}-${isPaused}`}
          />
        </div>
      )}
    </motion.div>
  );
};

export default memo(TestimonialCarousel);
