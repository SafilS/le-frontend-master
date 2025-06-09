import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const homeOfficeDesigns = [
  {
    id: 1,
    title: 'Modern Executive Office',
    description: 'Professional and sophisticated workspace with premium finishes and ergonomic design for maximum productivity.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'modern',
    style: 'Executive',
    features: ['Executive Desk', 'Ergonomic Chair', 'Built-in Storage', 'LED Lighting', 'Cable Management'],
    dimensions: '12x10 ft',
    price: '₹4,50,000 - ₹6,50,000',
    material: 'Premium Wood',
    capacity: '1-2 Workstations'
  },
  {
    id: 2,
    title: 'Classic Traditional Study',
    description: 'Timeless elegance with rich wood tones and traditional furniture creating an inspiring work environment.',
    imageUrl: '/assets/images/lap3.png',
    category: 'traditional',
    style: 'Classic',
    features: ['Wooden Desk', 'Leather Chair', 'Bookshelf', 'Traditional Lighting', 'Filing Cabinet'],
    dimensions: '14x12 ft',
    price: '₹5,00,000 - ₹7,50,000',
    material: 'Solid Wood',
    capacity: '1 Workstation'
  },
  {
    id: 3,
    title: 'Minimalist Work Studio',
    description: 'Clean and clutter-free workspace designed for focus and creativity with essential elements only.',
    imageUrl: '/assets/images/lap2.png',
    category: 'minimalist',
    style: 'Studio',
    features: ['Simple Desk', 'Minimal Storage', 'Natural Light', 'Clean Lines', 'Neutral Colors'],
    dimensions: '10x8 ft',
    price: '₹2,80,000 - ₹4,20,000',
    material: 'Light Wood',
    capacity: '1 Workstation'
  },
  {
    id: 4,
    title: 'Luxury CEO Office',
    description: 'Opulent workspace with premium materials and executive amenities for high-level professionals.',
    imageUrl: '/assets/images/lap1.jpg',
    category: 'luxury',
    style: 'CEO-Style',
    features: ['Executive Suite', 'Premium Furniture', 'Meeting Area', 'Bar Cabinet', 'Smart Technology'],
    dimensions: '18x16 ft',
    price: '₹10,50,000 - ₹15,50,000',
    material: 'Italian Leather',
    capacity: '1 Executive Suite'
  },
  {
    id: 5,
    title: 'Industrial Loft Office',
    description: 'Urban and creative workspace with exposed elements and industrial design for innovative thinking.',
    imageUrl: '/assets/images/livespace5.png',
    category: 'industrial',
    style: 'Loft',
    features: ['Metal Desk', 'Industrial Lighting', 'Exposed Brick', 'Vintage Decor', 'Open Shelving'],
    dimensions: '13x11 ft',
    price: '₹3,50,000 - ₹5,20,000',
    material: 'Metal & Wood',
    capacity: '1-2 Workstations'
  },
  {
    id: 6,
    title: 'Creative Bohemian Studio',
    description: 'Artistic and inspiring workspace with vibrant colors and eclectic elements for creative professionals.',
    imageUrl: '/assets/images/livespace6.jpg',
    category: 'bohemian',
    style: 'Creative',
    features: ['Artistic Desk', 'Colorful Decor', 'Plants', 'Inspiration Board', 'Flexible Seating'],
    dimensions: '11x9 ft',
    price: '₹2,50,000 - ₹3,80,000',
    material: 'Reclaimed Wood',
    capacity: '1 Creative Space'
  },
  {
    id: 7,
    title: 'Scandinavian Home Office',
    description: 'Light and airy workspace with functional design and natural materials promoting work-life balance.',
    imageUrl: '/assets/images/lap1.jpg',
    category: 'scandinavian',
    style: 'Nordic',
    features: ['Light Wood Desk', 'Ergonomic Seating', 'Natural Light', 'Simple Storage', 'Plants'],
    dimensions: '12x9 ft',
    price: '₹3,20,000 - ₹4,80,000',
    material: 'Pine Wood',
    capacity: '1 Workstation'
  },
  {
    id: 8,
    title: 'Compact Studio Office',
    description: 'Space-efficient design maximizing productivity in small apartments with smart storage solutions.',
    imageUrl: '/assets/images/lap4.jpg',
    category: 'compact',
    style: 'Space-Saving',
    features: ['Fold-out Desk', 'Wall Storage', 'Compact Chair', 'Multi-functional Furniture', 'Vertical Organization'],
    dimensions: '8x6 ft',
    price: '₹1,80,000 - ₹2,80,000',
    material: 'Compact Laminate',
    capacity: '1 Compact Station'
  },
  {
    id: 9,
    title: 'Rustic Cabin Office',
    description: 'Countryside charm with natural materials creating a peaceful and inspiring work environment.',
    imageUrl: '/assets/images/lap3.png',
    category: 'rustic',
    style: 'Cabin',
    features: ['Rustic Desk', 'Natural Wood', 'Vintage Accessories', 'Cozy Lighting', 'Nature Views'],
    dimensions: '13x10 ft',
    price: '₹3,80,000 - ₹5,60,000',
    material: 'Reclaimed Wood',
    capacity: '1 Workstation'
  },
  {
    id: 10,
    title: 'Smart Tech Office',
    description: 'Future-ready workspace with integrated technology and automated systems for the digital professional.',
    imageUrl: '/assets/images/lap2.png',
    category: 'smart',
    style: 'Tech-Enabled',
    features: ['Smart Desk', 'Automated Lighting', 'Voice Controls', 'Wireless Charging', 'Climate Control'],
    dimensions: '14x11 ft',
    price: '₹6,50,000 - ₹9,50,000',
    material: 'Smart Materials',
    capacity: '1 Tech Station'
  }
];

const categories = ['all', 'modern', 'traditional', 'minimalist', 'luxury', 'industrial', 'bohemian', 'scandinavian', 'compact', 'rustic', 'smart'];

const HomeOffice = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'capacity'
  
  const filteredDesigns = selectedCategory === 'all'
    ? homeOfficeDesigns
    : homeOfficeDesigns.filter(design => design.category === selectedCategory);

  // Sort functionality
  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
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
      // For offices, sort by workstation capacity
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
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-20">
      <div className="mt-10 container mx-auto px-6">
        
        {/* Enhanced Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="relative inline-block mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent tracking-wider relative">
              HOME
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 tracking-widest mt-2 relative">
              OFFICES
            </span>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-4 border-amber-500 rounded-full opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 -right-8 w-2 h-2 bg-orange-500 rounded-full opacity-50"></div>
          </motion.h1>
          
          <motion.p
            className="text-gray-600 text-lg md:text-xl mt-6 font-light tracking-wide max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Create the perfect workspace that inspires productivity and creativity. From executive suites to compact studios,
            design a home office that reflects your professional style and enhances your work-from-home experience.
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-amber-300 hover:bg-amber-50 shadow-sm'
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

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sort Dropdown */}
            <motion.select
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <option value="default">Sort by Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="capacity">Workstation Capacity</option>
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
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-amber-500'
                }`}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-amber-500'
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
            Showing <span className="font-semibold text-amber-600">{sortedDesigns.length}</span> home office designs
            {selectedCategory !== 'all' && (
              <span> in <span className="font-semibold text-amber-600">{selectedCategory}</span> category</span>
            )}
          </p>
        </motion.div>

        {/* Design Gallery */}
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
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-amber-600 border border-amber-200">
                      {design.style}
                    </div>
                    <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                      {design.capacity}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {design.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {design.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                      <span>📏 {design.dimensions}</span>
                      <span>💼 {design.material}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {design.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-600">{design.price}</span>
                      <motion.button
                        className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-600 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
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
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-amber-600 border border-amber-200">
                        {design.style}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                        {design.capacity}
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
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
                            <span className="font-medium">💼 Material:</span>
                            <span className="ml-2">{design.material}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {design.features.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-600">{design.price}</span>
                        <motion.button
                          className="bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedDesign && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDesignDetails}
            >
              <motion.div
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                    <span className="text-sm font-semibold text-amber-600">{selectedDesign.style}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedDesign.title}
                      </h2>
                      <p className="text-amber-600 font-semibold text-lg mb-4">
                        {selectedDesign.category.charAt(0).toUpperCase() + selectedDesign.category.slice(1)} Design
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">
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
                    
                    <div className="bg-amber-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedDesign.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Get Custom Quote
                    </button>
                    <button className="flex-1 border-2 border-amber-500 text-amber-500 py-3 px-6 rounded-full font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300">
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

export default HomeOffice;