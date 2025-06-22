import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Star, Award } from 'lucide-react';
import Form from '../common/Form';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["Mansoor Ali Sirajuthin","+91 88839 58877"],
      description: "Speak directly with our design consultants",
      action: "tel:+919876543210"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@lecrowninteriors.com", "design@lecrowninteriors.com"],
      description: "Send us your project details",
      action: "mailto:info@lecrowninteriors.com"
    },
    {
      icon: MapPin,
      title: "Visit Our Studio",
      details: ["D.No 3, Balaji Nagar, Kuniyamuthur", "Coimbatore - 641008, Tamil Nadu, India"],
      description: "Experience our designs in person",
      action: "https://g.co/kgs/HJMQqLu"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sun: 10:00 AM - 5:00 PM"],
      description: "We're here when you need us",
      action: null
    }
  ];

  const stats = [
    { number: "6000+", label: "Happy Clients", icon: Star },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "45", label: "Days Installation", icon: Clock },
    { number: "10", label: "Year Warranty", icon: Award }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-light mb-4 text-gray-800">
            Let's Create Your 
            <span className="block text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text font-semibold">
              Dream Space Together
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your space into a masterpiece? Our expert designers are here to bring your vision to life with unparalleled craftsmanship and attention to detail.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-100"
              variants={fadeInVariants}
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                Get In Touch
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're planning a complete home makeover or a single room transformation, 
                we're here to guide you through every step of your design journey.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="group"
                  variants={fadeInVariants}
                >
                  <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-100 hover:border-yellow-300">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h4>
                      <div className="space-y-1 mb-2">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 font-medium">
                            {info.action && idx === 0 ? (
                              <a 
                                href={info.action} 
                                className="hover:text-yellow-600 transition-colors duration-300"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={fadeInVariants}
            >
              <a 
                href="https://wa.me/919876543210" 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Chat
              </a>
              <button 
                onClick={() => setShowForm(true)}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg lg:hidden"
              >
                <Send className="w-5 h-5 mr-2" />
                Quick Form
              </button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="hidden lg:block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-yellow-100">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Start Your Design Journey
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and our design experts will contact you within 24 hours.
                </p>
              </div>
              <Form />
            </div>
          </motion.div>
        </div>

        {/* Mobile Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center lg:hidden p-4">
            <motion.div 
              className="bg-white rounded-2xl relative w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-300 z-10"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="p-6">
                <Form />
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
            Ready to Begin Your Transformation?
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have trusted us to create their dream spaces. 
            Your perfect interior is just a consultation away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919876543210"
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-3 px-8 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now for Free Consultation
            </a>
            <a 
              href="mailto:info@lecrowninteriors.com"
              className="bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white py-3 px-8 rounded-xl font-semibold flex items-center justify-center transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;