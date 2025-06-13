import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Heart, 
  Clock, 
  Folder, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Trash2,
  Edit,
  Eye,
  Share2,
  Plus,
  Grid,
  List,
  Calendar,
  TrendingUp,
  DollarSign,
  Home,
  Star,
  Settings
} from 'lucide-react';
import { useDesign } from '../../context/DesignContext';

const DesignDashboard = ({ onCreateNew, onEditDesign }) => {
  const {
    savedDesigns,
    favorites,
    recentlyViewed,
    userPreferences,
    getDesignStats,
    getFavoriteDesigns,
    getRecentlyViewedDesigns,
    deleteDesign,
    toggleFavorite,
    exportDesigns,
    importDesigns
  } = useDesign();

  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const stats = getDesignStats();

  const tabs = [
    { id: 'all', name: 'All Designs', count: savedDesigns.length },
    { id: 'favorites', name: 'Favorites', count: favorites.length },
    { id: 'recent', name: 'Recent', count: recentlyViewed.length }
  ];

  const getFilteredDesigns = () => {
    let designs = [];
    
    switch (activeTab) {
      case 'favorites':
        designs = getFavoriteDesigns();
        break;
      case 'recent':
        designs = getRecentlyViewedDesigns();
        break;
      default:
        designs = savedDesigns;
    }

    // Apply search filter
    if (searchTerm) {
      designs = designs.filter(design =>
        design.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.style?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        designs.sort((a, b) => a.title?.localeCompare(b.title) || 0);
        break;
      case 'price':
        designs.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0));
        break;
      case 'recent':
      default:
        designs.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    }

    return designs;
  };

  const handleExport = () => {
    const data = exportDesigns();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crown-designs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = importDesigns(e.target.result);
        if (success) {
          alert('Designs imported successfully!');
        } else {
          alert('Error importing designs. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredDesigns = getFilteredDesigns();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Design Dashboard</h1>
          <p className="text-gray-600">Manage your interior design projects and inspiration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Designs</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalDesigns}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Home className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-800">{stats.favoriteCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Heart className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">₹{stats.totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-800">+{Math.floor(Math.random() * 10) + 1}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name A-Z</option>
                <option value="price">Highest Price</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Actions */}
              <button
                onClick={onCreateNew}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={20} />
                New Design
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600"
                  title="Export Designs"
                >
                  <Download size={20} />
                </button>
                <label className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600 cursor-pointer" title="Import Designs">
                  <Upload size={20} />
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.name}
                <span className="ml-2 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Designs Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredDesigns.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Folder size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No designs found</h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === 'all' 
                    ? "You haven't created any designs yet. Start by creating your first design!"
                    : `No ${activeTab} designs found. Try adjusting your search or filters.`
                  }
                </p>
                <button
                  onClick={onCreateNew}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Plus size={20} />
                  Create Your First Design
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
              }>
                {filteredDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[4/3]'}`}>
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <Home size={48} className="text-gray-400" />
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => toggleFavorite(design.id)}
                          className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                        >
                          <Heart
                            size={16}
                            className={favorites.includes(design.id) ? 'text-red-500 fill-current' : 'text-gray-600'}
                          />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {design.category || 'Design'}
                        </span>
                      </div>
                    </div>

                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 line-clamp-1">
                          {design.title || 'Untitled Design'}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={14} className="fill-current" />
                          <span className="text-xs text-gray-600">4.8</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {design.description || 'No description available'}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{design.style || 'Modern'}</span>
                        <span>{new Date(design.updatedAt || design.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">
                            ₹{(design.totalPrice || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onEditDesign(design)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit Design"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            title="View Design"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Share Design"
                          >
                            <Share2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this design?')) {
                                deleteDesign(design.id);
                              }
                            }}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete Design"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DesignDashboard;