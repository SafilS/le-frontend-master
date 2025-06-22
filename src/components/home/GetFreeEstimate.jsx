import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ChefHat, 
  Calculator, 
  ArrowRight, 
  Sparkles,
  Crown,
  Star,
  Clock,
  Shield
} from 'lucide-react';

const GetFreeEstimate = () => {
  const navigate = useNavigate();

  const handleEstimateClick = (type) => {
    navigate(`/estimate/${type}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3">
              <Calculator size={20} className="text-yellow-600 mr-2" />
              <span className="text-yellow-700 font-semibold text-sm tracking-wide">FREE ESTIMATION</span>
              <Sparkles size={16} className="text-yellow-600 ml-2" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Get Your{' '}
            <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Free Estimate
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Choose your project type and get an instant, detailed estimate with our advanced calculation tool. 
            Transparent pricing, no hidden costs.
          </motion.p>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600"
          >
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">Instant Results</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium">100% Accurate</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-medium">Expert Verified</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Estimation Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Entire Home Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden cursor-pointer"
            onClick={() => handleEstimateClick('entire-home')}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home size={32} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Entire Home
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete home interior design with detailed room-by-room estimation. 
                Perfect for full home makeovers and new constructions.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {[
                  '10+ rooms included',
                  'Living, dining, bedrooms',
                  'Bathrooms & kitchen',
                  'Home office & balcony',
                  'Real-time 3D preview'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-blue-600">Starting from ₹8L</span>
                </div>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Get Estimate</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          </motion.div>

          {/* Kitchen Only Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden cursor-pointer"
            onClick={() => handleEstimateClick('kitchen')}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChefHat size={32} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                Kitchen Only
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                Specialized modular kitchen estimation with cabinet configurations, 
                appliances, and premium finishes.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {[
                  'Modular cabinet design',
                  'Appliance integration',
                  'Counter & backsplash',
                  'Hardware & accessories'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-orange-600">Starting from ₹2.5L</span>
                </div>
                <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Get Estimate</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          </motion.div>
        </motion.div>

        {/* Room Types Preview */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              What's Included in Your Estimate?
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Get detailed pricing for every room in your home with our comprehensive estimation tool
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { name: 'Living Room', icon: '🛋️', color: 'bg-blue-100 text-blue-700' },
              { name: 'Dining Room', icon: '🍽️', color: 'bg-green-100 text-green-700' },
              { name: 'Kitchen', icon: '👨‍🍳', color: 'bg-orange-100 text-orange-700' },
              { name: 'Master Bedroom', icon: '🛏️', color: 'bg-purple-100 text-purple-700' },
              { name: 'Bedrooms', icon: '🛏️', color: 'bg-pink-100 text-pink-700' },
              { name: 'Bathrooms', icon: '🚿', color: 'bg-cyan-100 text-cyan-700' },
              { name: 'Home Office', icon: '💻', color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Balcony', icon: '🌿', color: 'bg-emerald-100 text-emerald-700' },
              { name: 'Storage', icon: '🗄️', color: 'bg-gray-100 text-gray-700' },
              { name: 'Lighting', icon: '💡', color: 'bg-yellow-100 text-yellow-700' }
            ].map((room, index) => (
              <motion.div
                key={room.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${room.color} rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg`}
              >
                <div className="text-2xl mb-2">{room.icon}</div>
                <div className="text-sm font-medium">{room.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-600 to-orange-500 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Crown size={24} className="text-white mr-2" />
              <span className="text-white font-semibold">PREMIUM ESTIMATION</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a Custom Quote?
            </h3>
            <p className="text-white/90 mb-6">
              For unique projects or commercial spaces, get a personalized consultation with our design experts.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-yellow-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
              onClick={() => navigate('/contact')}
            >
              Schedule Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetFreeEstimate;