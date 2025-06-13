import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  Palette, 
  Home, 
  Sparkles, 
  TrendingUp,
  Heart,
  Share2,
  Download,
  Play,
  ArrowRight,
  Filter,
  Star,
  Clock,
  Users,
  Eye
} from 'lucide-react';

const DesignInspiration = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [selectedStyle, setSelectedStyle] = useState('all');

  const categories = [
    { id: 'trending', name: 'Trending Now', icon: TrendingUp },
    { id: 'popular', name: 'Most Popular', icon: Heart },
    { id: 'new', name: 'New Arrivals', icon: Sparkles },
    { id: 'seasonal', name: 'Seasonal', icon: Clock }
  ];

  const styles = [
    'All Styles', 'Modern', 'Contemporary', 'Traditional', 'Minimalist', 
    'Industrial', 'Scandinavian', 'Bohemian', 'Luxury', 'Rustic'
  ];

  const inspirationData = [
    {
      id: 1,
      title: 'Scandinavian Living Room',
      description: 'Clean lines, natural materials, and cozy textures create a perfect Nordic atmosphere.',
      category: 'trending',
      style: 'Scandinavian',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      designer: 'Nordic Interiors',
      likes: 1247,
      views: 8934,
      difficulty: 'Easy',
      timeToComplete: '2-3 weeks',
      budget: '₹2,50,000 - ₹4,00,000',
      colors: ['#FFFFFF', '#F5F5F5', '#D3D3D3', '#8B4513'],
      features: ['Natural Wood', 'Neutral Colors', 'Cozy Textiles', 'Minimal Decor'],
      rooms: ['Living Room', 'Bedroom', 'Kitchen'],
      tags: ['cozy', 'natural', 'bright', 'functional']
    },
    {
      id: 2,
      title: 'Modern Luxury Kitchen',
      description: 'Sleek design with premium materials and smart technology integration.',
      category: 'popular',
      style: 'Modern',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      designer: 'Crown Luxe',
      likes: 2156,
      views: 15678,
      difficulty: 'Advanced',
      timeToComplete: '4-6 weeks',
      budget: '₹5,00,000 - ₹8,50,000',
      colors: ['#2C3E50', '#FFFFFF', '#F39C12', '#E74C3C'],
      features: ['Smart Appliances', 'Quartz Countertops', 'LED Lighting', 'Island Design'],
      rooms: ['Kitchen', 'Dining'],
      tags: ['luxury', 'smart', 'efficient', 'contemporary']
    },
    {
      id: 3,
      title: 'Bohemian Bedroom Retreat',
      description: 'Eclectic mix of patterns, textures, and colors for a free-spirited vibe.',
      category: 'new',
      style: 'Bohemian',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      designer: 'Boho Designs',
      likes: 892,
      views: 5432,
      difficulty: 'Medium',
      timeToComplete: '3-4 weeks',
      budget: '₹1,80,000 - ₹3,20,000',
      colors: ['#8B4513', '#DEB887', '#CD853F', '#F4A460'],
      features: ['Layered Textiles', 'Vintage Pieces', 'Plants', 'Warm Lighting'],
      rooms: ['Bedroom', 'Living Room'],
      tags: ['eclectic', 'colorful', 'artistic', 'relaxed']
    },
    {
      id: 4,
      title: 'Industrial Loft Office',
      description: 'Raw materials and exposed elements create an urban workspace.',
      category: 'trending',
      style: 'Industrial',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      designer: 'Urban Spaces',
      likes: 1534,
      views: 9876,
      difficulty: 'Medium',
      timeToComplete: '3-5 weeks',
      budget: '₹2,20,000 - ₹3,80,000',
      colors: ['#2F2F2F', '#696969', '#CD853F', '#F4A460'],
      features: ['Exposed Brick', 'Metal Fixtures', 'Concrete Floors', 'Open Shelving'],
      rooms: ['Office', 'Living Room'],
      tags: ['urban', 'raw', 'functional', 'masculine']
    },
    {
      id: 5,
      title: 'Minimalist Zen Bathroom',
      description: 'Serene and clutter-free space focused on relaxation and wellness.',
      category: 'popular',
      style: 'Minimalist',
      imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop',
      designer: 'Zen Interiors',
      likes: 1876,
      views: 12345,
      difficulty: 'Easy',
      timeToComplete: '2-3 weeks',
      budget: '₹1,50,000 - ₹2,80,000',
      colors: ['#FFFFFF', '#F8F8FF', '#E6E6FA', '#D3D3D3'],
      features: ['Clean Lines', 'Natural Materials', 'Soft Lighting', 'Minimal Decor'],
      rooms: ['Bathroom', 'Bedroom'],
      tags: ['peaceful', 'clean', 'simple', 'spa-like']
    },
    {
      id: 6,
      title: 'Traditional Indian Living Room',
      description: 'Rich colors and traditional craftsmanship celebrate Indian heritage.',
      category: 'seasonal',
      style: 'Traditional',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      designer: 'Heritage Homes',
      likes: 1123,
      views: 7654,
      difficulty: 'Advanced',
      timeToComplete: '5-7 weeks',
      budget: '₹3,50,000 - ₹6,00,000',
      colors: ['#8B0000', '#FFD700', '#8B4513', '#F4A460'],
      features: ['Handcrafted Furniture', 'Rich Textiles', 'Brass Accents', 'Traditional Art'],
      rooms: ['Living Room', 'Dining Room'],
      tags: ['cultural', 'rich', 'ornate', 'heritage']
    }
  ];

  const filteredInspiration = inspirationData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStyle = selectedStyle === 'all' || selectedStyle === 'All Styles' || item.style === selectedStyle;
    return matchesCategory && matchesStyle;
  });

  const trendingColors = [
    { name: 'Sage Green', color: '#9CAF88', trend: '+15%' },
    { name: 'Warm Terracotta', color: '#E07A5F', trend: '+22%' },
    { name: 'Deep Navy', color: '#264653', trend: '+8%' },
    { name: 'Soft Cream', color: '#F4F3EE', trend: '+12%' },
    { name: 'Dusty Rose', color: '#D4A5A5', trend: '+18%' },
    { name: 'Charcoal Gray', color: '#36454F', trend: '+10%' }
  ];

  const designTips = [
    {
      title: 'Layer Your Lighting',
      description: 'Combine ambient, task, and accent lighting for a well-lit space.',
      icon: Lightbulb,
      category: 'Lighting'
    },
    {
      title: 'Use the 60-30-10 Rule',
      description: '60% dominant color, 30% secondary, 10% accent for perfect balance.',
      icon: Palette,
      category: 'Color'
    },
    {
      title: 'Create Visual Flow',
      description: 'Use consistent elements to guide the eye through your space.',
      icon: Eye,
      category: 'Layout'
    },
    {
      title: 'Mix Textures',
      description: 'Combine smooth, rough, soft, and hard textures for visual interest.',
      icon: Home,
      category: 'Styling'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Design Inspiration
              <span className="block text-2xl md:text-3xl font-light mt-2 opacity-90">
                Discover Your Perfect Style
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Get inspired by trending designs, expert tips, and curated collections
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white shadow-sm">
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
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md border'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Style Filter */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedStyle === style
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-purple-100'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Inspiration Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {categories.find(c => c.id === selectedCategory)?.name} Designs
              </h2>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + selectedStyle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {filteredInspiration.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                            <Heart size={16} className="text-gray-600" />
                          </button>
                          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                            <Share2 size={16} className="text-gray-600" />
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={() => onSelectTemplate && onSelectTemplate(item)}
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                          >
                            <Play className="mr-2" size={16} />
                            Use This Template
                          </button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.style} • {item.designer}</p>
                          </div>
                          <div className="flex items-center gap-1 text-purple-500">
                            <Star size={16} className="fill-current" />
                            <span className="text-sm font-medium text-gray-700">4.8</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          {item.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Heart size={14} />
                              {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {item.views}
                            </span>
                          </div>
                          <span>{item.timeToComplete}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-purple-600">{item.budget}</p>
                          </div>
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center">
                            Explore
                            <ArrowRight size={16} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Colors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-purple-600" size={24} />
                Trending Colors
              </h3>
              <div className="space-y-3">
                {trendingColors.map((color, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <span className="font-medium text-gray-700">{color.name}</span>
                    </div>
                    <span className="text-green-600 text-sm font-medium">{color.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="mr-2 text-purple-600" size={24} />
                Design Tips
              </h3>
              <div className="space-y-4">
                {designTips.map((tip, idx) => {
                  const IconComponent = tip.icon;
                  return (
                    <div key={idx} className="border-l-4 border-purple-600 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent size={16} className="text-purple-600" />
                        <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                      <span className="text-xs text-purple-600 font-medium">{tip.category}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
              <p className="text-purple-100 mb-4">
                Turn your inspiration into reality with our design tools.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Start Designing
                </button>
                <button className="w-full border border-white text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                  Get Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignInspiration;