import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const wardrobeDesigns = [
  {
    id: 1,
    title: 'Modern Walk-in Wardrobe',
    description: 'Spacious walk-in design with premium finishes and smart organization systems.',
    imageUrl: '/assets/images/furniture/f1.png',
    category: 'walk-in',
    style: 'Modern',
    features: ['LED Strip Lighting', 'Soft-close Drawers', 'Mirror Panels', 'Shoe Racks'],
    dimensions: '8x10 ft',
    material: 'Engineered Wood',
    capacity: '150+ Garments'
  },
  {
    id: 2,
    title: 'Classic Hinged Door Wardrobe',
    description: 'Traditional 4-door wardrobe with elegant design and ample storage space.',
    imageUrl: '/assets/images/furniture/f2.png',
    category: 'hinged',
    style: 'Classic',
    features: ['Wooden Finish', 'Multiple Compartments', 'Hanging Rods', 'Top Storage'],
    dimensions: '7x8 ft',
    material: 'Solid Wood',
    capacity: '100+ Garments'
  },
  {
    id: 3,
    title: 'Minimalist Sliding Wardrobe',
    description: 'Space-saving sliding door design with clean lines and modern aesthetics.',
    imageUrl: '/assets/images/furniture/f3.png',
    category: 'sliding',
    style: 'Minimalist',
    features: ['Sliding Doors', 'Handle-less Design', 'Internal Organizers', 'Full-length Mirror'],
    dimensions: '6x8 ft',
    material: 'Laminated MDF',
    capacity: '80+ Garments'
  },
  {
    id: 4,
    title: 'Luxury Master Bedroom Wardrobe',
    description: 'Premium wardrobe with integrated vanity, premium hardware and luxury finishes.',
    imageUrl: '/assets/images/furniture/f4.png',
    category: 'luxury',
    style: 'Contemporary',
    features: ['Integrated Vanity', 'Premium Hardware', 'Jewelry Drawers', 'Automated Lighting'],
    dimensions: '10x12 ft',
    material: 'Imported Veneer',
    capacity: '200+ Garments'
  },
  {
    id: 5,
    title: 'Corner Wardrobe Solution',
    description: 'Smart corner utilization with rotating mechanisms and optimal space usage.',
    imageUrl: '/assets/images/furniture/f5.png',
    category: 'corner',
    style: 'Modern',
    features: ['Corner Optimization', 'Rotating Hangers', 'Pull-out Baskets', 'Space Maximization'],
    dimensions: '5x5 ft Corner',
    material: 'Engineered Wood',
    capacity: '90+ Garments'
  },
  {
    id: 6,
    title: 'Kids Wardrobe with Study',
    description: 'Colorful and functional wardrobe combined with study desk for children.',
    imageUrl: '/assets/images/furniture/f6.png',
    category: 'kids',
    style: 'Playful',
    features: ['Integrated Study Desk', 'Colorful Design', 'Safety Features', 'Growth Adaptable'],
    dimensions: '6x7 ft',
    material: 'Child-safe MDF',
    capacity: '60+ Garments'
  },
  {
    id: 7,
    title: 'Smart Wardrobe System',
    description: 'Technology-integrated wardrobe with app control and smart features.',
    imageUrl: '/assets/images/furniture/f7.png',
    category: 'smart',
    style: 'Futuristic',
    features: ['App Control', 'Smart Lighting', 'Climate Control', 'Inventory Tracking'],
    dimensions: '8x9 ft',
    material: 'High-tech Composite',
    capacity: '120+ Garments'
  },
  {
    id: 8,
    title: 'Compact Studio Wardrobe',
    description: 'Space-efficient design perfect for studio apartments and small bedrooms.',
    imageUrl: '/assets/images/furniture/f8.png',
    category: 'compact',
    style: 'Minimalist',
    features: ['Foldable Elements', 'Multi-functional', 'Vertical Storage', 'Mirror Integration'],
    dimensions: '4x6 ft',
    material: 'Compact Laminate',
    capacity: '50+ Garments'
  },
  {
    id: 9,
    title: 'Vintage Armoire Style',
    description: 'Classic armoire design with vintage charm and handcrafted details.',
    imageUrl: '/assets/images/furniture/f9.png',
    category: 'vintage',
    style: 'Vintage',
    features: ['Handcrafted Details', 'Antique Hardware', 'Rich Wood Finish', 'Traditional Design'],
    dimensions: '5x7 ft',
    material: 'Solid Hardwood',
    capacity: '70+ Garments'
  },
  {
    id: 10,
    title: 'Modular Wardrobe System',
    description: 'Flexible modular design that can be customized and expanded as needed.',
    imageUrl: '/assets/images/furniture/f10.png',
    category: 'modular',
    style: 'Contemporary',
    features: ['Modular Components', 'Expandable Design', 'Mix & Match', 'Easy Assembly'],
    dimensions: 'Customizable',
    material: 'Modular Panels',
    capacity: 'Variable'
  }
];

const categories = ['all', 'walk-in', 'hinged', 'sliding', 'luxury', 'corner', 'kids', 'smart', 'compact', 'vintage', 'modular'];

const Wardrobe = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'capacity'
  
  const filteredDesigns = selectedCategory === 'all' 
    ? wardrobeDesigns 
    : wardrobeDesigns.filter(design => design.category === selectedCategory);

  // Sort functionality
  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    // switch (sortBy) {
    //   case 'price-low':
    //     const aPriceMatch = a.price.match(/₹([\d,]+)/);
    //     const bPriceMatch = b.price.match(/₹([\d,]+)/);
    //     const aPrice = aPriceMatch ? parseInt(aPriceMatch[1].replace(/,/g, '')) : 0;
    //     const bPrice = bPriceMatch ? parseInt(bPriceMatch[1].replace(/,/g, '')) : 0;
    //     return aPrice - bPrice;
    //   case 'price-high':
    //     const aPriceMatchHigh = a.price.match(/₹([\d,]+)/);
    //     const bPriceMatchHigh = b.price.match(/₹([\d,]+)/);
    //     const aPriceHigh = aPriceMatchHigh ? parseInt(aPriceMatchHigh[1].replace(/,/g, '')) : 0;
    //     const bPriceHigh = bPriceMatchHigh ? parseInt(bPriceMatchHigh[1].replace(/,/g, '')) : 0;
    //     return bPriceHigh - aPriceHigh;
    //   case 'capacity':
    //     const aCapacityMatch = a.capacity.match(/(\d+)/);
    //     const bCapacityMatch = b.capacity.match(/(\d+)/);
    //     const aCapacity = aCapacityMatch ? parseInt(aCapacityMatch[1]) : 0;
    //     const bCapacity = bCapacityMatch ? parseInt(bCapacityMatch[1]) : 0;
    //     return bCapacity - aCapacity;
    //   default:
    //     return 0;
    // }
      if(sortBy == 'price-low'){
        const aPriceMatch = a.price.match(/₹([\d,]+)/);
        const bPriceMatch = b.price.match(/₹([\d,]+)/);
        const aPrice = aPriceMatch ? parseInt(aPriceMatch[1].replace(/,/g, '')) : 0;
        const bPrice = bPriceMatch ? parseInt(bPriceMatch[1].replace(/,/g, '')) : 0;
        return aPrice - bPrice;
      }
      else if(sortBy == 'price-high'){
        const aPriceMatchHigh = a.price.match(/₹([\d,]+)/);
        const bPriceMatchHigh = b.price.match(/₹([\d,]+)/);
        const aPriceHigh = aPriceMatchHigh ? parseInt(aPriceMatchHigh[1].replace(/,/g, '')) : 0;
        const bPriceHigh = bPriceMatchHigh ? parseInt(bPriceMatchHigh[1].replace(/,/g, '')) : 0;
        return bPriceHigh - aPriceHigh;
      }
      else if(sortBy == 'capacity'){
        const aCapacityMatch = a.capacity.match(/(\d+)/);
        const bCapacityMatch = b.capacity.match(/(\d+)/);
        const aCapacity = aCapacityMatch ? parseInt(aCapacityMatch[1]) : 0;
        const bCapacity = bCapacityMatch ? parseInt(bCapacityMatch[1]) : 0;
        return bCapacity - aCapacity;
      }
      else{
        return 0;
      }

  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
  };

  const closeDesignDetails = () => {
    setSelectedDesign(null);
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mt-16 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="relative inline-block mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-wider relative">
              CUSTOM
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-800 tracking-widest mt-2 relative">
              WARDROBES
            </span>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-4 border-purple-500 rounded-full opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 -right-8 w-2 h-2 bg-indigo-500 rounded-full opacity-50"></div>
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-lg md:text-xl mt-6 font-light tracking-wide max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Organize your wardrobe in style with our premium custom wardrobe solutions. 
            From walk-in closets to space-saving designs, discover the perfect storage solution for your lifestyle.
          </motion.p>
        </motion.div>

        {/* Enhanced Controls Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`mb-3 mx-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50 shadow-sm'
                }`}
                onClick={() => handleCategoryClick(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </motion.div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sort Dropdown */}
            <motion.select
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <option value="default">Sort by Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="capacity">Storage Capacity</option>
            </motion.select>

            {/* View Mode Toggle */}
            <motion.div 
              className="flex bg-white rounded-full p-1 shadow-md border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-purple-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-purple-500'
                }`}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-purple-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-purple-500'
                }`}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
            </motion.div>
          </div>
        </div>

        {/* Results Count */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-600 text-center lg:text-left">
            Showing <span className="font-semibold text-purple-600">{sortedDesigns.length}</span> wardrobe designs
            {selectedCategory !== 'all' && (
              <span> in <span className="font-semibold text-purple-600">{selectedCategory.replace('-', ' ')}</span> category</span>
            )}
          </p>
        </motion.div>
        
        {/* Wardrobe Gallery */}
        <motion.div 
          className={`w-full ${viewMode === 'grid' ? 'space-y-6' : 'space-y-4'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              // Grid View
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {sortedDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-gray-100"
                    onClick={() => handleDesignClick(design)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={design.imageUrl}
                        alt={design.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-purple-200">
                        {design.style}
                      </div>
                      <div className="absolute top-4 left-4 bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                        {design.capacity}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {design.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {design.description}
                      </p>
                      
                      <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                        <span>📏 {design.dimensions}</span>
                        <span>🏗️ {design.material}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {design.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600 font-bold text-lg">
                          {design.price}
                        </span>
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // List View
              <motion.div
                key="list"
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {sortedDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer group border border-gray-100"
                    onClick={() => handleDesignClick(design)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      x: 8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <motion.img
                          src={design.imageUrl}
                          alt={design.title}
                          className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-purple-200">
                          {design.style}
                        </div>
                        <div className="absolute bottom-4 left-4 bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                          {design.capacity}
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                            {design.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {design.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="font-medium">📏 Dimensions:</span>
                              <span className="ml-2">{design.dimensions}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">🏗️ Material:</span>
                              <span className="ml-2">{design.material}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {design.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-purple-600 font-bold text-xl">
                            {design.price}
                          </span>
                          <div className="flex items-center text-purple-500 font-medium group-hover:text-purple-600 transition-colors duration-300">
                            <span className="mr-2">View Details</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Design Details Modal */}
        <AnimatePresence>
          {selectedDesign && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDesignDetails}
            >
              <motion.div
                className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedDesign.imageUrl}
                    alt={selectedDesign.title}
                    className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                  />
                  <button
                    onClick={closeDesignDetails}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-purple-600">{selectedDesign.style}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedDesign.title}
                      </h2>
                      <p className="text-purple-600 font-semibold text-lg mb-4">
                        {selectedDesign.category.charAt(0).toUpperCase() + selectedDesign.category.slice(1).replace('-', ' ')} Design
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">
                        {selectedDesign.price}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedDesign.capacity}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {selectedDesign.description}
                  </p>
                  
                  {/* Specifications Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-4">Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dimensions:</span>
                          <span className="font-medium">{selectedDesign.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Material:</span>
                          <span className="font-medium">{selectedDesign.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{selectedDesign.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Style:</span>
                          <span className="font-medium">{selectedDesign.style}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedDesign.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Get Custom Quote
                    </button>
                    <button className="flex-1 border-2 border-purple-500 text-purple-500 py-3 px-6 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300">
                      Schedule Home Visit
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300">
                      Download Catalog
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

export default Wardrobe;