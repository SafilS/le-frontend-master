import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'Modern Workspace',
    description: 'A sleek and modern office design that promotes productivity and collaboration.',
    imageUrl: '/assets/images/modernworkingspace.png',
    category: 'office',
    width: 35,
  },
  {
    id: 2,
    title: 'Collaborative Space',
    description: 'An open area fostering collaboration and creative thinking.',
    imageUrl: '/assets/images/collabrativespace.png',
    category: 'commercial',
    width: 65,
  },
  {
    id: 3,
    title: 'Creative Hub',
    description: 'A vibrant space designed for creative minds and innovation.',
    imageUrl: '/assets/images/creativehub.png',
    category: 'creative',
    width: 65,
  },
  {
    id: 4,
    title: 'Elegant Dining',
    description: 'Sophisticated dining area with luxurious finishes.',
    imageUrl: '/assets/images/dining.png',
    category: 'residential',
    width: 35,
  },
  {
    id: 5,
    title: 'Luxury Living',
    description: 'High-end residential interior with premium materials.',
    imageUrl: '/assets/images/luxliving.png',
    category: 'residential',
    width: 35,
  },
  {
    id: 6,
    title: 'Retail Experience',
    description: 'Innovative retail space that enhances customer experience.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'commercial',
    width: 65,
  },
];

const categories = ['all', 'office', 'commercial', 'creative', 'residential'];

const PortfolioGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);
  const containerRef = useRef(null);
  
  // Framer Motion values for smooth dragging
  const x = useMotionValue(0);
  const dragConstraints = useRef({ left: 0, right: 0 });
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Update drag constraints when projects change
  useEffect(() => {
    if (containerRef.current && filteredProjects.length > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = containerWidth * filteredProjects.length;
      dragConstraints.current = {
        left: -(totalWidth - containerWidth),
        right: 0
      };
    }
  }, [filteredProjects]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (!isMobile || filteredProjects.length === 0 || isDragging) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % filteredProjects.length;
          animateToSlide(nextSlide);
          return nextSlide;
        });
      }, 4500); // Slightly longer interval for better UX
    };

    startAutoScroll();
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isMobile, filteredProjects.length, isDragging]);

  // Smooth animation to specific slide
  const animateToSlide = useCallback((slideIndex) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const targetX = -slideIndex * containerWidth;
    
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8
    });
  }, [x]);

  // Handle scroll to specific slide
  const scrollToSlide = useCallback((index) => {
    setCurrentSlide(index);
    animateToSlide(index);
    
    // Pause auto-scroll temporarily when user manually navigates
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      setTimeout(() => {
        if (!isDragging && isMobile) {
          autoScrollRef.current = setInterval(() => {
            setCurrentSlide((prev) => {
              const nextSlide = (prev + 1) % filteredProjects.length;
              animateToSlide(nextSlide);
              return nextSlide;
            });
          }, 4500);
        }
      }, 3000); // Resume after 3 seconds
    }
  }, [animateToSlide, isDragging, isMobile, filteredProjects.length]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentSlide(0);
    // Reset position immediately
    x.set(0);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    console.log(`Redirecting to project: ${project.title} in ${project.category} category`);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  // Handle drag end to snap to nearest slide
  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const dragOffset = info.offset.x;
    const dragVelocity = info.velocity.x;
    
    // Calculate which slide to snap to based on drag distance and velocity
    let targetSlide = currentSlide;
    
    if (Math.abs(dragOffset) > containerWidth * 0.2 || Math.abs(dragVelocity) > 500) {
      if (dragOffset > 0 && dragVelocity >= 0) {
        targetSlide = Math.max(0, currentSlide - 1);
      } else if (dragOffset < 0 && dragVelocity <= 0) {
        targetSlide = Math.min(filteredProjects.length - 1, currentSlide + 1);
      }
    }
    
    setCurrentSlide(targetSlide);
    animateToSlide(targetSlide);
  }, [currentSlide, filteredProjects.length, animateToSlide]);

  const navigate = useNavigate();

  // Mapping category to path
  const categoryRouteMap = {
    office: '/office',
    commercial: '/gallery',
    creative: '/gallery',
    residential: '/bedroom',
  };

  // Enhanced Mobile Carousel Component
  const MobileCarousel = () => (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <motion.div
        ref={carouselRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={dragConstraints.current}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => {
          setIsDragging(true);
          if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
          }
        }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="w-full flex-shrink-0 px-4"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          >
            <motion.div
              className="relative overflow-hidden cursor-pointer group h-64 sm:h-80 rounded-2xl shadow-lg"
              onClick={() => !isDragging && handleProjectClick(project)}
              whileTap={{ scale: isDragging ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <motion.img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.h3 
                  className="text-white text-xl font-bold mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-white/90 text-sm mb-3 line-clamp-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                >
                  <span className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <motion.div 
                    className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Carousel Indicators */}
      <motion.div 
        className="flex justify-center mt-6 space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {filteredProjects.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-red-500 w-8 shadow-lg' 
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
            onClick={() => scrollToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      {/* Enhanced Navigation Arrows */}
      <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110"
        onClick={() => scrollToSlide(currentSlide === 0 ? filteredProjects.length - 1 : currentSlide - 1)}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110"
        onClick={() => scrollToSlide((currentSlide + 1) % filteredProjects.length)}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Swipe Indicator for Mobile */}
      {!isDragging && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="text-white text-xs">Swipe</span>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      )}
    </div>
  );

  // Desktop Grid Component (unchanged)
  const DesktopGrid = () => (
    <motion.div 
      className="w-full space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <AnimatePresence>
        {filteredProjects.reduce((rows, project, index) => {
          const rowIndex = Math.floor(index / 2);
          if (!rows[rowIndex]) rows[rowIndex] = [];
          rows[rowIndex].push(project);
          return rows;
        }, []).map((row, rowIndex) => (
          <motion.div 
            key={rowIndex}
            className="flex w-full gap-6 items-stretch"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rowIndex * 0.2, duration: 0.6 }}
          >
            {row.map((project, projectIndex) => {
              let width;
              if (rowIndex % 2 === 0) {
                width = projectIndex === 0 ? 35 : 65;
              } else {
                width = projectIndex === 0 ? 65 : 35;
              }
              
              return (
                <motion.div
                  key={project.id}
                  className="relative overflow-hidden cursor-pointer group h-64 md:h-80 lg:h-96 rounded-2xl border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{ width: `${width}%` }}
                  onClick={() => handleProjectClick(project)}
                  layoutId={`project-${project.id}`}
                  whileHover={{ 
                    scale: 1.02,
                    zIndex: 10,
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-xl"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <motion.h3 
                      className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-white/90 text-sm md:text-base lg:text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200"
                    >
                      <span className="text-sm px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-white/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-white/40 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="relative inline-block"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent tracking-wider relative">
              OUR
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-800 tracking-widest mt-2 relative">
              PROJECTS
            </span>
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 border-2 sm:border-4 border-red-500 rounded-full opacity-30"></div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-3 h-3 sm:w-6 sm:h-6 bg-yellow-400 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 -right-4 sm:-right-8 w-1 h-1 sm:w-2 sm:h-2 bg-orange-500 rounded-full opacity-50"></div>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-base sm:text-lg md:text-xl mt-6 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1.5 }}
          >
            Crafting Spaces, Creating Stories
          </motion.p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`mb-3 mx-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border-2 ${
                selectedCategory === category
                  ? 'bg-red-500 text-white border-red-500 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50 shadow-sm'
              }`}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 1.3 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Conditional Rendering: Mobile Carousel or Desktop Grid */}
        {isMobile ? <MobileCarousel /> : <DesktopGrid />}
        
        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectDetails}
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border-4 border-white max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                layoutId={`project-${selectedProject.id}`}
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="relative">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-black/70 transition-colors border-2 border-white/30"
                    onClick={closeProjectDetails}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">{selectedProject.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg leading-relaxed">{selectedProject.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 bg-red-100 text-red-700 rounded-full border-2 border-red-200">
                      {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                    </span>
                    <button
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white/20 w-full sm:w-auto"
                      onClick={() => {
                        const route = categoryRouteMap[selectedProject.category] || '/gallery';
                        navigate(route);
                        closeProjectDetails();
                      }}
                    >
                      Explore Project
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioGrid;