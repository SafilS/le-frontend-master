import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  PenTool, 
  Hammer, 
  Rocket, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';

const ProcessExplainer = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Default icons if no specific icon is provided
  const defaultIcons = [Lightbulb, PenTool, Hammer, Rocket];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="relative">
      {/* Process Timeline - Desktop */}
      <div className="hidden lg:block relative mb-16">
        {/* Progress Line */}
        <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
            variants={progressVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>

        {/* Step Indicators */}
        <motion.div 
          className="grid grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon || defaultIcons[index % defaultIcons.length];
            
            return (
              <motion.div
                key={index}
                className="relative text-center"
                variants={stepVariants}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Number Circle */}
                <motion.div
                  className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg scale-110'
                      : 'bg-white border-4 border-yellow-200 text-yellow-600 hover:border-yellow-400'
                  }`}
                  whileHover="hover"
                  initial="rest"
                >
                  <motion.div variants={iconVariants}>
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </motion.div>

                {/* Step Content */}
                <div className={`transition-all duration-500 ${activeStep === index ? 'transform scale-105' : ''}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Step Duration */}
                  {step.duration && (
                    <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{step.duration}</span>
                    </div>
                  )}
                </div>

                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-20 -right-8 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="w-6 h-6 text-yellow-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Process Cards - Mobile/Tablet */}
      <motion.div 
        className="lg:hidden space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, index) => {
          const IconComponent = step.icon || defaultIcons[index % defaultIcons.length];
          
          return (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
              whileHover={{ y: -5 }}
            >
              {/* Step Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {step.title}
                  </h3>
                  {step.duration && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{step.duration}</span>
                    </div>
                  )}
                </div>
                <motion.div
                  className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>
              </div>

              {/* Step Description */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Step Features */}
              {step.features && (
                <div className="flex flex-wrap gap-2">
                  {step.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-200 rounded-full opacity-10 blur-xl" />
              
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-transparent rounded-full" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Process Summary */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 mr-3" />
            <h3 className="text-xl font-bold">Ready to Start Your Journey?</h3>
          </div>
          <p className="text-yellow-100 mb-4">
            Our proven process ensures your project is completed on time, within budget, and exceeds your expectations.
          </p>
          <motion.button
            className="bg-white text-yellow-600 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-50 transition-colors duration-300 flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessExplainer;

// Example usage:
/*
import { FaSearch, FaEdit, FaTools, FaCheckCircle } from 'react-icons/fa';

const processSteps = [
  {
    title: "Discovery",
    description: "We analyze your needs and identify the best approach to your project.",
    icon: FaSearch
  },
  {
    title: "Design",
    description: "Our team creates a detailed plan and visual mockups of your solution.",
    icon: FaEdit
  },
  {
    title: "Development",
    description: "We build your solution with clean, efficient, and maintainable code.",
    icon: FaTools
  },
  {
    title: "Delivery",
    description: "We deploy your solution and provide ongoing support and maintenance.",
    icon: FaCheckCircle
  }
];

<ProcessExplainer steps={processSteps} />
*/