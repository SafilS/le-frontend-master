import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Lightbulb, 
  Maximize, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Wand2, 
  Layers,
  Play,
  Star,
  Crown,
  Zap
} from 'lucide-react';

const DesignToolIntro = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const designFeatures = [
    {
      id: 1,
      icon: Palette,
      title: "Color & Material Customizer",
      description: "Experiment with thousands of colors, textures, and premium materials in real-time",
      highlight: "Real-time Preview",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      icon: Maximize,
      title: "3D Room Planner",
      description: "Design your space in 3D with accurate measurements and furniture placement",
      highlight: "Precise Planning",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      icon: Lightbulb,
      title: "AI Design Inspiration",
      description: "Get personalized design suggestions based on your style preferences and space",
      highlight: "AI Powered",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const designSteps = [
    {
      step: "01",
      title: "Upload Your Space",
      description: "Take photos or upload floor plans of your room"
    },
    {
      step: "02", 
      title: "Customize & Design",
      description: "Use our tools to experiment with layouts, colors, and furniture"
    },
    {
      step: "03",
      title: "Visualize in 3D",
      description: "See your design come to life with photorealistic 3D renders"
    },
    {
      step: "04",
      title: "Get Professional Quote",
      description: "Receive detailed estimates and connect with our design experts"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full mb-6">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-gray-800">
            Design Your Dream Space
            <span className="block text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text font-semibold">
              With Our Custom Design Tool
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mb-6"></div>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience the future of interior design with our revolutionary custom design tool. 
            Visualize, customize, and perfect your space before making any commitments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Try Design Tool Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.button
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-600 text-yellow-600 font-semibold rounded-xl hover:bg-yellow-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 mr-2" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {designFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="relative group"
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Feature highlight badge */}
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full mb-4">
                    {feature.highlight}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-yellow-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-gray-800 mb-4">
              How It Works
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your space in just four simple steps with our intuitive design process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-bold text-xl rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                  {index < designSteps.length - 1 && (
                    <div className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-gray-200"></div>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">
                  {step.title}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4">
                <Crown className="w-8 h-8" />
              </div>
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute bottom-4 left-1/4">
                <Star className="w-6 h-6" />
              </div>
              <div className="absolute bottom-4 right-1/4">
                <Zap className="w-8 h-8" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
                Ready to Design Your Dream Space?
              </h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of homeowners who have transformed their spaces with our design tool. 
                Start your journey today and see your vision come to life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/gallery"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-yellow-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg group"
                >
                  <Palette className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Designing Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="/estimate/entire-home"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-yellow-600 transition-all duration-300"
                >
                  Get Free Estimation
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignToolIntro;