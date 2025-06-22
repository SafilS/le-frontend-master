import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, Diamond, Sparkles, Award, Gem } from 'lucide-react';

const crownLuxeDesigns = [
  {
    id: 1,
    title: 'Royal Palace Suite',
    description: 'Experience the grandeur of royalty with hand-crafted Italian marble, gold leaf accents, and bespoke furniture fit for a king.',
    imageUrl: '/assets/images/living/lux.png',
    category: 'royal',
    style: 'Palace',
    features: ['Italian Carrara Marble', 'Gold Leaf Detailing', 'Crystal Chandeliers', 'Silk Upholstery', 'Hand-carved Furniture', 'Smart Home Integration'],
    dimensions: '25x20 ft',
    price: '₹25,00,000 - ₹45,00,000',
    material: 'Italian Marble & Gold',
    capacity: 'Master Suite',
    exclusivity: 'Ultra Luxury',
    designer: 'Master Artisan Collection'
  },
  {
    id: 2,
    title: 'Diamond Executive Office',
    description: 'A CEO\'s sanctuary featuring rare woods, platinum accents, and cutting-edge technology for the ultimate power workspace.',
    imageUrl: '/assets/images/office/diamond.png',
    category: 'executive',
    style: 'Diamond Class',
    features: ['Rare Ebony Wood', 'Platinum Hardware', 'Leather from Hermès', 'Smart Glass Walls', 'Climate Control', 'Private Bar'],
    dimensions: '30x25 ft',
    price: '₹35,00,000 - ₹60,00,000',
    material: 'Rare Woods & Platinum',
    capacity: 'Executive Suite',
    exclusivity: 'Bespoke',
    designer: 'Crown Master Series'
  },
  {
    id: 3,
    title: 'Sapphire Living Sanctuary',
    description: 'An opulent living space adorned with precious stones, custom artwork, and the finest materials from around the world.',
    imageUrl: '/assets/images/living/sanctuary.png',
    category: 'living',
    style: 'Sapphire Collection',
    features: ['Sapphire Inlays', 'Custom Oil Paintings', 'Venetian Plaster', 'Cashmere Fabrics', 'Heated Floors', 'Wine Cellar'],
    dimensions: '28x22 ft',
    price: '₹30,00,000 - ₹50,00,000',
    material: 'Precious Stones & Silk',
    capacity: 'Grand Living',
    exclusivity: 'Limited Edition',
    designer: 'Crown Artisan Guild'
  },
  {
    id: 4,
    title: 'Emerald Spa Retreat',
    description: 'Transform your bathroom into a luxury spa with emerald accents, onyx surfaces, and therapeutic amenities.',
    imageUrl: '/assets/images/living/spa.png',
    category: 'spa',
    style: 'Emerald Wellness',
    features: ['Onyx Surfaces', 'Emerald Accents', 'Steam Room', 'Chromotherapy', 'Heated Towel Rails', 'Sound System'],
    dimensions: '20x15 ft',
    price: '₹20,00,000 - ₹35,00,000',
    material: 'Onyx & Emerald',
    capacity: 'Spa Suite',
    exclusivity: 'Wellness Luxury',
    designer: 'Crown Wellness Collection'
  },
  {
    id: 5,
    title: 'Platinum Culinary Theater',
    description: 'A chef\'s dream kitchen with professional-grade appliances, marble countertops, and platinum fixtures.',
    imageUrl: '/assets/images/office/theator.png',
    category: 'culinary',
    style: 'Platinum Chef',
    features: ['Professional Appliances', 'Calacatta Marble', 'Platinum Fixtures', 'Wine Storage', 'Chef\'s Island', 'Teppanyaki Grill'],
    dimensions: '24x18 ft',
    price: '₹28,00,000 - ₹48,00,000',
    material: 'Calacatta Marble & Platinum',
    capacity: 'Chef\'s Kitchen',
    exclusivity: 'Culinary Luxury',
    designer: 'Crown Culinary Masters'
  },
  {
    id: 6,
    title: 'Ruby Entertainment Lounge',
    description: 'An exclusive entertainment space with ruby accents, premium leather, and state-of-the-art audio-visual systems.',
    imageUrl: '/assets/images/kitchen/modern.png',
    category: 'entertainment',
    style: 'Ruby Lounge',
    features: ['Ruby Accent Lighting', 'Premium Leather', '8K Theater System', 'Whiskey Bar', 'Cigar Humidor', 'Gaming Zone'],
    dimensions: '26x20 ft',
    price: '₹22,00,000 - ₹38,00,000',
    material: 'Leather & Ruby Accents',
    capacity: 'Entertainment Suite',
    exclusivity: 'VIP Collection',
    designer: 'Crown Entertainment Series'
  },
  {
    id: 7,
    title: 'Crystal Meditation Chamber',
    description: 'A serene sanctuary featuring healing crystals, natural elements, and acoustic perfection for ultimate tranquility.',
    imageUrl: '/assets/images/livespace4.png',
    category: 'wellness',
    style: 'Crystal Zen',
    features: ['Healing Crystals', 'Acoustic Panels', 'Natural Stone', 'Aromatherapy System', 'Meditation Altar', 'Sound Bath Setup'],
    dimensions: '18x16 ft',
    price: '₹15,00,000 - ₹28,00,000',
    material: 'Natural Crystals & Stone',
    capacity: 'Meditation Space',
    exclusivity: 'Spiritual Luxury',
    designer: 'Crown Wellness Sanctuary'
  },
  {
    id: 8,
    title: 'Golden Walk-in Wardrobe',
    description: 'A fashion lover\'s paradise with gold accents, velvet interiors, and custom storage for the most discerning tastes.',
    imageUrl: '/assets/images/furniture/ward.png',
    category: 'wardrobe',
    style: 'Golden Couture',
    features: ['Gold Leaf Accents', 'Velvet Interiors', 'LED Lighting', 'Jewelry Display', 'Shoe Gallery', 'Dressing Island'],
    dimensions: '22x14 ft',
    price: '₹18,00,000 - ₹32,00,000',
    material: 'Gold Leaf & Velvet',
    capacity: 'Couture Wardrobe',
    exclusivity: 'Fashion Luxury',
    designer: 'Crown Couture Collection'
  }
];

const categories = ['all', 'royal', 'executive', 'living', 'spa', 'culinary', 'entertainment', 'wellness', 'wardrobe'];

const CrownLuxe = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  
  const filteredDesigns = selectedCategory === 'all'
    ? crownLuxeDesigns
    : crownLuxeDesigns.filter(design => design.category === selectedCategory);

  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    if(sortBy === 'price-low'){
      const aPriceMatch = a.price.match(/₹([\d,]+)/);
      const bPriceMatch = b.price.match(/₹([\d,]+)/);
      const aPrice = aPriceMatch ? parseInt(aPriceMatch[1].replace(/,/g, '')) : 0;
      const bPrice = bPriceMatch ? parseInt(bPriceMatch[1].replace(/,/g, '')) : 0;
      return aPrice - bPrice;
    }
    else if(sortBy === 'price-high'){
      const aPriceMatchHigh = a.price.match(/₹([\d,]+)/);
      const bPriceMatchHigh = b.price.match(/₹([\d,]+)/);
      const aPriceHigh = aPriceMatchHigh ? parseInt(aPriceMatchHigh[1].replace(/,/g, '')) : 0;
      const bPriceHigh = bPriceMatchHigh ? parseInt(bPriceMatchHigh[1].replace(/,/g, '')) : 0;
      return bPriceHigh - aPriceHigh;
    }
    else if(sortBy === 'exclusivity'){
      const exclusivityOrder = { 'Bespoke': 4, 'Ultra Luxury': 3, 'Limited Edition': 2, 'VIP Collection': 1 };
      return (exclusivityOrder[b.exclusivity] || 0) - (exclusivityOrder[a.exclusivity] || 0);
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
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 py-20 relative overflow-hidden">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="mt-10 container mx-auto px-6 relative z-10">
        
        {/* Ultra Luxurious Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex justify-center items-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            <Crown className="text-yellow-400 w-16 h-16 mr-4" />
            <Diamond className="text-blue-300 w-12 h-12 mr-2" />
            <Gem className="text-purple-400 w-14 h-14" />
          </motion.div>
          
          <motion.h1
            className="relative inline-block mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 bg-clip-text text-transparent tracking-wider relative">
              CROWN
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light bg-gradient-to-r from-purple-300 via-pink-200 to-purple-400 bg-clip-text text-transparent tracking-[0.3em] mt-2 relative">
              LUXE
            </span>
            
            {/* Luxury Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-12 h-12 border-4 border-yellow-400 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-8 h-8 bg-purple-400 rounded-full opacity-50 animate-bounce"></div>
            <div className="absolute top-1/2 -right-12 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute top-1/4 -left-12 w-6 h-6 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
            
            {/* Sparkle Effects */}
            <Sparkles className="absolute -top-4 right-1/4 text-yellow-300 w-6 h-6 opacity-70 animate-pulse" />
            <Star className="absolute -bottom-4 left-1/4 text-purple-300 w-5 h-5 opacity-60 animate-bounce" />
          </motion.h1>
          
          <motion.div
            className="flex justify-center items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Award className="text-yellow-400 w-8 h-8 mr-3" />
            <span className="text-yellow-300 text-xl font-semibold tracking-wider">ULTRA PREMIUM COLLECTION</span>
            <Award className="text-yellow-400 w-8 h-8 ml-3" />
          </motion.div>
          
          <motion.p
            className="text-gray-300 text-xl md:text-2xl mt-8 font-light tracking-wide max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Indulge in the pinnacle of luxury interior design. Each Crown Luxe creation is a masterpiece, 
            crafted with the world's finest materials, precious stones, and unparalleled artisanship. 
            <span className="block mt-4 text-yellow-300 font-medium">
              Where Dreams Meet Opulence. Where Luxury Becomes Reality.
            </span>
          </motion.p>
        </motion.div>

        {/* Premium Controls Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`mb-4 mx-3 px-8 py-4 rounded-full text-sm font-bold transition-all duration-500 border-2 backdrop-blur-sm ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-300 shadow-2xl shadow-yellow-400/50'
                    : 'bg-black/40 text-gray-300 border-gray-600 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300 shadow-lg'
                }`}
                onClick={() => handleCategoryClick(category)}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                {category === 'all' ? 'ALL COLLECTIONS' : category.toUpperCase().replace('_', ' ')}
              </motion.button>
            ))}
          </motion.div>

          {/* Premium Controls */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Sort Dropdown */}
            <motion.select
              className="px-6 py-3 rounded-full border-2 border-gray-600 bg-black/40 text-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <option value="default">Sort by Collection</option>
              <option value="price-low">Price: Accessible to Premium</option>
              <option value="price-high">Price: Ultra Luxury First</option>
              <option value="exclusivity">Exclusivity Level</option>
            </motion.select>

            {/* View Mode Toggle */}
            <motion.div
              className="flex bg-black/40 rounded-full p-2 shadow-xl border-2 border-gray-600 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-black shadow-lg'
                    : 'text-gray-400 hover:text-yellow-300'
                }`}
                onClick={() => setViewMode('grid')}
              >
                Gallery View
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-yellow-400 text-black shadow-lg'
                    : 'text-gray-400 hover:text-yellow-300'
                }`}
                onClick={() => setViewMode('list')}
              >
                Detailed View
              </button>
            </motion.div>
          </div>
        </div>

        {/* Results Count */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-gray-400 text-center lg:text-left text-lg">
            Showcasing <span className="font-bold text-yellow-400 text-xl">{sortedDesigns.length}</span> exclusive luxury designs
            {selectedCategory !== 'all' && (
              <span> in <span className="font-bold text-yellow-400 capitalize">{selectedCategory}</span> collection</span>
            )}
          </p>
        </motion.div>

        {/* Luxury Design Gallery */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            // Premium Grid View
            <motion.div
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {sortedDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  className="group relative bg-gradient-to-br from-black/60 to-gray-900/80 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleDesignClick(design)}
                >
                  {/* Luxury Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      {design.exclusivity}
                    </div>
                  </div>

                  {/* Premium Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Floating Icons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Crown className="text-yellow-400 w-6 h-6 opacity-80" />
                      <Diamond className="text-blue-300 w-5 h-5 opacity-70" />
                    </div>
                  </div>

                  {/* Luxury Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                        {design.title}
                      </h3>
                      <Sparkles className="text-yellow-400 w-6 h-6 opacity-70" />
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                      {design.description}
                    </p>

                    {/* Premium Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Collection:</span>
                        <span className="text-yellow-300 font-semibold">{design.style}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Designer:</span>
                        <span className="text-purple-300 font-medium text-sm">{design.designer}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Dimensions:</span>
                        <span className="text-gray-200 font-medium">{design.dimensions}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        {design.price}
                      </span>
                      <Star className="text-yellow-400 w-5 h-5" />
                    </div>

                    {/* Premium Features Preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {design.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 text-xs rounded-full border border-purple-400/30"
                        >
                          {feature}
                        </span>
                      ))}
                      {design.features.length > 3 && (
                        <span className="px-3 py-1 bg-yellow-400/20 text-yellow-300 text-xs rounded-full border border-yellow-400/30">
                          +{design.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Luxury CTA */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 rounded-2xl hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore Luxury Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Premium List View
            <motion.div
              key="list"
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {sortedDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  className="group bg-gradient-to-r from-black/60 to-gray-900/80 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleDesignClick(design)}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Premium Image */}
                    <div className="lg:w-1/3 relative h-80 lg:h-auto">
                      <img
                        src={design.imageUrl}
                        alt={design.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>
                      
                      {/* Luxury Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {design.exclusivity}
                        </div>
                      </div>
                    </div>

                    {/* Luxury Content */}
                    <div className="lg:w-2/3 p-10">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                            {design.title}
                          </h3>
                          <p className="text-yellow-300 font-semibold text-lg">{design.style} Collection</p>
                          <p className="text-purple-300 text-sm mt-1">{design.designer}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Crown className="text-yellow-400 w-8 h-8" />
                          <Diamond className="text-blue-300 w-7 h-7" />
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                        {design.description}
                      </p>

                      {/* Premium Specifications */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Dimensions:</span>
                            <span className="text-white font-semibold">{design.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Materials:</span>
                            <span className="text-purple-300 font-semibold">{design.material}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Capacity:</span>
                            <span className="text-blue-300 font-semibold">{design.capacity}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-yellow-300 font-semibold mb-3">Premium Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {design.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 text-sm rounded-full border border-purple-400/30"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                          {design.price}
                        </div>
                        <motion.button
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-2xl hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Schedule Private Viewing
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Design Details Modal */}
        <AnimatePresence>
          {selectedDesign && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDesignDetails}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400/30 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative p-8 border-b border-gray-700">
                  <button
                    onClick={closeDesignDetails}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl font-bold"
                  >
                    ×
                  </button>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <Crown className="text-yellow-400 w-10 h-10" />
                    <div>
                      <h2 className="text-4xl font-bold text-white">{selectedDesign.title}</h2>
                      <p className="text-yellow-300 text-xl">{selectedDesign.style} Collection</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full text-sm font-bold inline-block">
                    {selectedDesign.exclusivity}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={selectedDesign.imageUrl}
                        alt={selectedDesign.title}
                        className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                    </div>

                    {/* Details */}
                    <div className="space-y-8">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {selectedDesign.description}
                      </p>

                      {/* Specifications */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-yellow-300">Luxury Specifications</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-400">Designer Collection:</span>
                            <span className="text-purple-300 font-semibold">{selectedDesign.designer}</span>
                          </div>
                          <div className="flex justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-400">Dimensions:</span>
                            <span className="text-white font-semibold">{selectedDesign.dimensions}</span>
                          </div>
                          <div className="flex justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-400">Premium Materials:</span>
                            <span className="text-blue-300 font-semibold">{selectedDesign.material}</span>
                          </div>
                          <div className="flex justify-between p-4 bg-gray-800/50 rounded-xl">
                            <span className="text-gray-400">Capacity:</span>
                            <span className="text-green-300 font-semibold">{selectedDesign.capacity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="text-2xl font-bold text-yellow-300 mb-4">Exclusive Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedDesign.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-400/30"
                            >
                              <Star className="text-yellow-400 w-5 h-5 mr-3 flex-shrink-0" />
                              <span className="text-purple-200">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="border-t border-gray-700 pt-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
                            {selectedDesign.price}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-8 rounded-2xl hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Schedule Private Consultation
                            </motion.button>
                            <motion.button
                              className="flex-1 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Request Custom Quote
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default CrownLuxe;
