import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ChefHat, 
  Bed, 
  Bath, 
  Sofa, 
  Monitor, 
  Shirt,
  Crown,
  Palette,
  Eye,
  Heart,
  Star,
  ArrowRight,
  Filter,
  Search,
  Grid3X3,
  List,
  Lightbulb,
  Maximize,
  Play
} from 'lucide-react';
import DesignCustomizer from '../components/design-tool/DesignCustomizer';
import DesignInspiration from '../components/design-tool/DesignInspiration';
import RoomPlanner from '../components/design-tool/RoomPlanner';

const DesignGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [showRoomPlanner, setShowRoomPlanner] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const categories = [
    { id: 'all', name: 'All Designs', icon: Home, count: 150 },
    { id: 'luxe', name: 'Crown Luxe', icon: Crown, count: 25 },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat, count: 30 },
    { id: 'bedroom', name: 'Bedroom', icon: Bed, count: 25 },
    { id: 'bathroom', name: 'Bathroom', icon: Bath, count: 20 },
    { id: 'living', name: 'Living Room', icon: Sofa, count: 28 },
    { id: 'office', name: 'Home Office', icon: Monitor, count: 15 },
    { id: 'wardrobe', name: 'Wardrobe', icon: Shirt, count: 22 }
  ];

  const designStyles = [
    'Modern', 'Contemporary', 'Traditional', 'Minimalist', 
    'Industrial', 'Scandinavian', 'Bohemian', 'Luxury'
  ];

  const featuredDesigns = [
    {
      id: 1,
      title: 'Luxury Master Bedroom Suite',
      category: 'bedroom',
      style: 'Luxury',
      imageUrl: '/assets/images/bedroom/b1.png',
      designer: 'Crown Interiors',
      rating: 4.9,
      likes: 234,
      description: 'Opulent bedroom design with premium materials and sophisticated lighting.',
      features: ['King Size Bed', 'Walk-in Closet', 'Ambient Lighting', 'Premium Fabrics'],
      colors: ['#8B4513', '#F5F5DC', '#FFD700', '#2F4F4F']
    },
    {
      id: 2,
      title: 'Modern Modular Kitchen',
      category: 'kitchen',
      style: 'Modern',
      imageUrl: '/assets/images/kitchen/k1.png',
      designer: 'Crown Interiors',
      rating: 4.8,
      likes: 189,
      description: 'Sleek and functional kitchen with smart storage solutions.',
      features: ['Island Counter', 'Smart Appliances', 'Soft-close Drawers', 'LED Lighting'],
      colors: ['#FFFFFF', '#2C3E50', '#E74C3C', '#F39C12']
    },
    {
      id: 3,
      title: 'Contemporary Living Space',
      category: 'living',
      style: 'Contemporary',
      imageUrl: '/assets/images/living/l1.png',
      designer: 'Crown Interiors',
      rating: 4.7,
      likes: 156,
      description: 'Open-concept living room with modern furniture and artistic elements.',
      features: ['Sectional Sofa', 'Entertainment Unit', 'Accent Wall', 'Floor Lighting'],
      colors: ['#F8F9FA', '#495057', '#007BFF', '#28A745']
    },
    {
      id: 4,
      title: 'Spa-Inspired Bathroom',
      category: 'bathroom',
      style: 'Contemporary',
      imageUrl: '/assets/images/bathroom/b1.png',
      designer: 'Crown Interiors',
      rating: 4.9,
      likes: 201,
      description: 'Tranquil bathroom design with natural materials and calming colors.',
      features: ['Rain Shower', 'Floating Vanity', 'Natural Stone', 'Ambient Lighting'],
      colors: ['#F5F5F5', '#8FBC8F', '#4682B4', '#D2B48C']
    },
    {
      id: 5,
      title: 'Executive Home Office',
      category: 'office',
      style: 'Traditional',
      imageUrl: '/assets/images/office/f1.png',
      designer: 'Crown Interiors',
      rating: 4.6,
      likes: 143,
      description: 'Professional workspace with built-in storage and ergonomic design.',
      features: ['Executive Desk', 'Built-in Shelving', 'Ergonomic Chair', 'Task Lighting'],
      colors: ['#8B4513', '#F5F5DC', '#2F4F4F', '#CD853F']
    },
    {
      id: 6,
      title: 'Walk-in Wardrobe',
      category: 'wardrobe',
      style: 'Modern',
      imageUrl: '/assets/images/living/ward.png',
      designer: 'Crown Interiors',
      rating: 4.8,
      likes: 178,
      description: 'Spacious wardrobe with organized storage and luxury finishes.',
      features: ['Mirror Panels', 'LED Strips', 'Shoe Racks', 'Jewelry Drawers'],
      colors: ['#FFFFFF', '#C0C0C0', '#FFD700', '#8B4513']
    }
  ];

  const filteredDesigns = featuredDesigns.filter(design => {
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory;
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.style.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (designId) => {
    setFavorites(prev => 
      prev.includes(designId) 
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Design Gallery
              <span className="block text-2xl md:text-3xl font-light mt-2 opacity-90">
                Create Your Dream Interior
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Explore our curated collection of interior designs and customize them to match your vision
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowCustomizer(true)}
                className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Palette className="mr-2" size={20} />
                Start Designing
              </button>
              <button 
                onClick={() => setShowInspiration(true)}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors flex items-center justify-center"
              >
                <Lightbulb className="mr-2" size={20} />
                Get Inspired
              </button>
              <button 
                onClick={() => setShowRoomPlanner(true)}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors flex items-center justify-center"
              >
                <Maximize className="mr-2" size={20} />
                Room Planner
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search designs, styles, rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-600'
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedCategory === 'all' ? 'All Designs' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({filteredDesigns.length} designs)
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
              }
            >
              {filteredDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'aspect-[4/3]'}`}>
                    <img
                      src={design.imageUrl}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button
                      onClick={() => toggleFavorite(design.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(design.id) ? 'text-red-500 fill-current' : 'text-gray-600'}
                      />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                      <button 
                        onClick={() => {
                          setSelectedDesign(design);
                          setShowCustomizer(true);
                        }}
                        className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center"
                      >
                        <Palette className="mr-2" size={16} />
                        Customize
                      </button>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Eye className="mr-2" size={16} />
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{design.title}</h3>
                        <p className="text-sm text-gray-600">{design.style} • {design.designer}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} className="fill-current" />
                        <span className="text-sm font-medium text-gray-700">{design.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{design.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {design.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {design.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{design.features.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {design.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Heart size={14} />
                          {design.likes} likes
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedDesign(design);
                          setShowCustomizer(true);
                        }}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center"
                      >
                        Customize
                        <ArrowRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No designs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Design Your Dream Home?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get personalized design recommendations and professional consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowRoomPlanner(true)}
              className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Maximize className="mr-2" size={20} />
              Start Room Planning
            </button>
            <button 
              onClick={() => setShowInspiration(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors flex items-center justify-center"
            >
              <Lightbulb className="mr-2" size={20} />
              Get Inspiration
            </button>
          </div>
        </div>
      </section>

      {/* Design Tool Modals */}
      {showCustomizer && (
        <DesignCustomizer
          designData={selectedDesign}
          onSave={(data) => {
            console.log('Design saved:', data);
            setShowCustomizer(false);
          }}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      {showInspiration && (
        <DesignInspiration
          onSelectTemplate={(template) => {
            setSelectedDesign(template);
            setShowInspiration(false);
            setShowCustomizer(true);
          }}
          onClose={() => setShowInspiration(false)}
        />
      )}

      {showRoomPlanner && (
        <RoomPlanner
          roomType={selectedCategory !== 'all' ? selectedCategory : 'living-room'}
          onSave={(data) => {
            console.log('Room saved:', data);
            setShowRoomPlanner(false);
          }}
          onClose={() => setShowRoomPlanner(false)}
        />
      )}
    </div>
  );
};

export default DesignGalleryPage;