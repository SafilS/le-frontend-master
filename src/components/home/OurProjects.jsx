import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Modern Workspace',
    description: 'A sleek and modern office design.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'office',
    width: 35,
  },
  {
    id: 2,
    title: 'Collaborative Space',
    description: 'An open area fostering collaboration.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'commercial',
    width: 65,
  },
  {
    id: 3,
    title: 'Creative Hub',
    description: 'A vibrant space for creative minds.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'creative',
    width: 65,
  },
  {
    id: 4,
    title: 'Elegant Dining',
    description: 'Sophisticated dining area design.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'residential',
    width: 35,
  },
  {
    id: 5,
    title: 'Luxury Living',
    description: 'High-end residential interior design.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'residential',
    width: 35,
  },
  {
    id: 6,
    title: 'Retail Experience',
    description: 'Innovative retail space design.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'commercial',
    width: 65,
  },
];

const categories = ['all', 'office', 'commercial', 'creative', 'residential'];

const PortfolioGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    console.log(`Redirecting to project: ${project.title} in ${project.category} category`);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Unique Title with Custom Typography */}
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
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent tracking-wider relative">
              OUR
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 tracking-widest mt-2 relative">
              PROJECTS
            </span>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-4 border-red-500 rounded-full opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 -right-8 w-2 h-2 bg-orange-500 rounded-full opacity-50"></div>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            className="text-gray-600 text-lg md:text-xl mt-6 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Crafting Spaces, Creating Stories
          </motion.p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`mb-3 mx-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                selectedCategory === category
                  ? 'bg-red-500 text-white border-red-500 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50 shadow-sm'
              }`}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Portfolio Layout */}
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
                  // Determine width based on row and position
                  let width;
                  if (rowIndex % 2 === 0) {
                    // Even rows: 35% then 65%
                    width = projectIndex === 0 ? 35 : 65;
                  } else {
                    // Odd rows: 65% then 35%
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
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 rounded-xl"></div>
                      
                      {/* Content Overlay */}
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
                      
                      {/* Decorative Border Elements */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-white/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-white/40 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
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
                className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border-4 border-white"
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
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors border-2 border-white/30"
                    onClick={closeProjectDetails}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{selectedProject.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedProject.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold px-4 py-2 bg-red-100 text-red-700 rounded-full border-2 border-red-200">
                      {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                    </span>
                    <button 
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white/20"
                      onClick={() => {
                        console.log(`View full project: ${selectedProject.id}`);
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