import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bedRoomDesigns = [
  {
    id: 1,
    title: 'Modern Master Bedroom',
    description: 'Sleek and sophisticated design with clean lines and premium finishes for the ultimate relaxation experience.',
    imageUrl: '/assets/images/bedroom/b1.png',
    category: 'modern',
    style: 'Contemporary',
    features: ['King Size Bed', 'Built-in Wardrobes', 'Bedside Tables', 'Reading Lights', 'Accent Wall'],
    dimensions: '14x12 ft',
    // price: '₹4,50,000 - ₹6,50,000',
    material: 'Engineered Wood',
    capacity: '2 Person Bed'
  },
  {
    id: 2,
    title: 'Classic Traditional Bedroom',
    description: 'Timeless elegance with rich wood tones and luxurious fabrics creating a warm and inviting atmosphere.',
    imageUrl: '/assets/images/bedroom/b2.png',
    category: 'traditional',
    style: 'Classic',
    features: ['Wooden Bed Frame', 'Antique Dresser', 'Upholstered Headboard', 'Traditional Lighting', 'Area Rug'],
    dimensions: '16x14 ft',
    // price: '₹5,00,000 - ₹7,50,000',
    material: 'Solid Wood',
    capacity: 'Queen Size Bed'
  },
  {
    id: 3,
    title: 'Minimalist Zen Bedroom',
    description: 'Serene and clutter-free space designed for peaceful sleep and meditation with natural elements.',
    imageUrl: '/assets/images/bedroom/b3.png',
    category: 'minimalist',
    style: 'Zen',
    features: ['Platform Bed', 'Minimal Storage', 'Natural Lighting', 'Plants', 'Neutral Colors'],
    dimensions: '12x10 ft',
    // price: '₹2,80,000 - ₹4,20,000',
    material: 'Bamboo Wood',
    capacity: 'Double Bed'
  },
  {
    id: 4,
    title: 'Luxury Hotel-Style Bedroom',
    description: 'Opulent design with premium materials and five-star hotel amenities for the ultimate comfort.',
    imageUrl: '/assets/images/bedroom/b4.png',
    category: 'luxury',
    style: 'Hotel-Style',
    features: ['Premium Mattress', 'Silk Bedding', 'Mini Bar', 'Smart Controls', 'Marble Accents'],
    dimensions: '18x16 ft',
    // price: '₹8,50,000 - ₹12,50,000',
    material: 'Italian Marble',
    capacity: 'King Size Bed'
  },
  {
    id: 5,
    title: 'Industrial Loft Bedroom',
    description: 'Urban and edgy design with exposed elements and metal accents for a contemporary city vibe.',
    imageUrl: '/assets/images/bedroom/b5.png',
    category: 'industrial',
    style: 'Loft',
    features: ['Metal Bed Frame', 'Exposed Brick', 'Industrial Lighting', 'Concrete Elements', 'Vintage Decor'],
    dimensions: '13x11 ft',
    // price: '₹3,50,000 - ₹5,20,000',
    material: 'Metal & Wood',
    capacity: 'Queen Size Bed'
  },
  {
    id: 6,
    title: 'Bohemian Retreat Bedroom',
    description: 'Free-spirited and artistic space with vibrant textiles and eclectic decor for creative souls.',
    imageUrl: '/assets/images/bedroom/b6.png',
    category: 'bohemian',
    style: 'Boho',
    features: ['Low Platform Bed', 'Colorful Textiles', 'Hanging Plants', 'Tapestries', 'Floor Cushions'],
    dimensions: '12x11 ft',
    // price: '₹2,50,000 - ₹3,80,000',
    material: 'Reclaimed Wood',
    capacity: 'Double Bed'
  },
  {
    id: 7,
    title: 'Scandinavian Cozy Bedroom',
    description: 'Hygge-inspired design with light woods and cozy textiles creating a warm and inviting sanctuary.',
    imageUrl: '/assets/images/bedroom/b7.png',
    category: 'scandinavian',
    style: 'Nordic',
    features: ['Light Wood Bed', 'Cozy Blankets', 'Natural Light', 'Simple Storage', 'Neutral Palette'],
    dimensions: '13x10 ft',
    // price: '₹3,20,000 - ₹4,80,000',
    material: 'Pine Wood',
    capacity: 'Queen Size Bed'
  },
  {
    id: 8,
    title: 'Compact Studio Bedroom',
    description: 'Smart space-saving solutions that maximize functionality in small apartments without compromising comfort.',
    imageUrl: '/assets/images/bedroom/b8.png',
    category: 'compact',
    style: 'Space-Saving',
    features: ['Murphy Bed', 'Under-bed Storage', 'Wall-mounted Desk', 'Mirrors', 'Multi-functional Furniture'],
    dimensions: '10x8 ft',
    // price: '₹1,80,000 - ₹2,80,000',
    material: 'Compact Laminate',
    capacity: 'Single Bed'
  },
  {
    id: 9,
    title: 'Rustic Cabin Bedroom',
    description: 'Countryside charm with natural materials and vintage elements creating a cozy retreat atmosphere.',
    imageUrl: '/assets/images/bedroom/b9.png',
    category: 'rustic',
    style: 'Cabin',
    features: ['Log Bed Frame', 'Plaid Bedding', 'Vintage Furniture', 'Natural Stone', 'Fireplace'],
    dimensions: '15x12 ft',
    // price: '₹3,80,000 - ₹5,60,000',
    material: 'Reclaimed Wood',
    capacity: 'King Size Bed'
  },
  {
    id: 10,
    title: 'Smart Tech Bedroom',
    description: 'Future-ready bedroom with integrated technology and automated systems for the digital lifestyle.',
    imageUrl: '/assets/images/bedroom/b10.png',
    category: 'smart',
    style: 'Tech-Enabled',
    features: ['Smart Bed', 'Automated Curtains', 'Climate Control', 'Voice Assistant', 'Wireless Charging'],
    dimensions: '16x13 ft',
    // price: '₹6,50,000 - ₹9,50,000',
    material: 'Smart Materials',
    capacity: 'King Size Bed'
  }
];

const categories = ['all', 'modern', 'traditional', 'minimalist', 'luxury', 'industrial', 'bohemian', 'scandinavian', 'compact', 'rustic', 'smart'];

const BedRoom = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'capacity'
  
  const filteredDesigns = selectedCategory === 'all' 
    ? bedRoomDesigns 
    : bedRoomDesigns.filter(design => design.category === selectedCategory);

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
      // For bedrooms, we'll sort by bed size (Single < Double < Queen < King)
      // const sizeOrder = { 'Single': 1, 'Double': 2, 'Queen': 3, 'King': 4 };
      const aSize = a.capacity.includes('King') ? 4 : a.capacity.includes('Queen') ? 3 : a.capacity.includes('Double') ? 2 : 1;
      const bSize = b.capacity.includes('King') ? 4 : b.capacity.includes('Queen') ? 3 : b.capacity.includes('Double') ? 2 : 1;
      return bSize - aSize;
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
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 py-20">
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
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-blue-600 via-indigo-500 to-slate-500 bg-clip-text text-transparent tracking-wider relative">
              BED
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-800 tracking-widest mt-2 relative">
              ROOMS
            </span>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-4 border-blue-500 rounded-full opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-400 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 -right-8 w-2 h-2 bg-slate-500 rounded-full opacity-50"></div>
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-lg md:text-xl mt-6 font-light tracking-wide max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Design your perfect sanctuary for rest and relaxation. From modern minimalism to luxurious retreats, 
            create a bedroom that reflects your personal style and promotes peaceful sleep.
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
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50 shadow-sm'
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
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <option value="default">Sort by Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="capacity">Bed Size</option>
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
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-blue-500'
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
            Showing <span className="font-semibold text-blue-600">{sortedDesigns.length}</span> bedroom designs
            {selectedCategory !== 'all' && (
              <span> in <span className="font-semibold text-blue-600">{selectedCategory}</span> category</span>
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
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 border border-blue-200">
                      {design.style}
                    </div>
                    <div className="absolute top-4 left-4 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                      {design.capacity}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {design.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {design.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                      <span>📏 {design.dimensions}</span>
                      <span>🛏️ {design.material}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {design.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{design.price}</span>
                      <motion.button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
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
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 border border-blue-200">
                        {design.style}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                        {design.capacity}
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
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
                            <span className="font-medium">🛏️ Material:</span>
                            <span className="ml-2">{design.material}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {design.features.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">{design.price}</span>
                        <motion.button 
                          className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300"
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
                    <span className="text-sm font-semibold text-blue-600">{selectedDesign.style}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedDesign.title}
                      </h2>
                      <p className="text-blue-600 font-semibold text-lg mb-4">
                        {selectedDesign.category.charAt(0).toUpperCase() + selectedDesign.category.slice(1)} Design
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
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
                          <span className="text-gray-600">Bed Size:</span>
                          <span className="font-medium">{selectedDesign.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Style:</span>
                          <span className="font-medium">{selectedDesign.style}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedDesign.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Get Custom Quote
                    </button>
                    <button className="flex-1 border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
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

export default BedRoom;