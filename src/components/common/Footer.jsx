import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  ArrowUp,
  Heart,
  Award,
  Users,
  Star,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  
   const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      const response = await fetch("https://le-crown-interiors-backend.onrender.com/subscribe/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail(""); // Clear input
      } else {
        setError(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Crown Luxe', path: '/luxe', icon: '👑' },
    { name: 'Crown Deco', path: '/deco' },
    { name: 'Design Gallery', path: '/gallery' },
    { name: 'Get Estimate', path: '/get-estimate', highlight: true }
  ];

  const services = [
    { name: 'Modular Kitchen', path: '/kitchen' },
    { name: 'Wardrobe Design', path: '/wardrobe' },
    { name: 'Bedroom Design', path: '/bedroom' },
    { name: 'Living Room', path: '/living-room' },
    { name: 'Bathroom Design', path: '/bathroom' },
    { name: 'Home Office', path: '/office' }
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Awards Won' },
    { icon: Star, number: '4.9', label: 'Rating' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <div className="border-b border-gray-700/50 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                {/* Logo */}
                <div className="flex items-center mb-6">
                  <img 
                    src=".../public/assets/icons/logo.png" 
                    alt="LE-CROWN Interiors" 
                    className="h-12 mr-3"
                  />
                  <div>
                    <div className="relative">
                      <span className="text-2xl font-black tracking-wide bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                        LE-CROWN
                      </span>
                      {/* Crown decoration */}
                      <div className="absolute -top-2 left-0 w-4 h-3">
                        <div className="flex items-end justify-center space-x-0.5">
                          <div className="w-1 h-2 bg-yellow-500 rounded-t-full"></div>
                          <div className="w-1 h-2.5 bg-yellow-400 rounded-t-full"></div>
                          <div className="w-1 h-2 bg-yellow-500 rounded-t-full"></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-light tracking-[0.2em] text-gray-400">
                      INTERIORS
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6">
                  Crafting luxury interiors that reflect your unique style and elevate your living experience. Where elegance meets functionality.
                </p>

                {/* Newsletter Signup */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">Stay Updated</h4>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-400"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubscribed}
                      className={`px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-lg transition-all duration-300 font-semibold whitespace-nowrap ${
                        isSubscribed ? "cursor-not-allowed opacity-70" : ""
                      }`}
                    >
                      {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
                    </button>
                  </form>

                  {/* Success/Error Message */}
                  {error && <p className="text-red-400 mt-2">{error}</p>}
                  {isSubscribed && !error && <p className="text-green-400 mt-2">Subscribed successfully. Confirmation email sent!</p>}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 text-yellow-400">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className={`group flex items-center transition-all duration-300 ${
                          link.highlight 
                            ? 'text-yellow-400 font-semibold' 
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                        <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6 text-yellow-400">Our Services</h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        to={service.path}
                        className="group flex items-center text-gray-400 hover:text-yellow-400 transition-all duration-300"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {service.name}
                        </span>
                        <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 text-yellow-400">Get In Touch</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 transition-colors duration-300">
                      <MapPin size={18} className="text-yellow-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium">Visit Our Showroom</p>
                      <p className="text-gray-400 text-sm">D.No 3, Balaji Nagar, Kuniyamuthur, Coimbatore</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 transition-colors duration-300">
                      <Phone size={18} className="text-yellow-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium">Call Us</p>
                      <p className="text-gray-400 text-sm">+91 88839 58877</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 transition-colors duration-300">
                      <Mail size={18} className="text-yellow-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium">Email Us</p>
                      <p className="text-gray-400 text-sm">info@lecrowninteriors.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 transition-colors duration-300">
                      <Clock size={18} className="text-yellow-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium">Business Hours</p>
                      <p className="text-gray-400 text-sm">Mon - Sat: 9AM - 7PM</p>
                      <p className="text-gray-400 text-sm">Sunday: 10AM - 5PM</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, href: 'https://www.facebook.com/sharer.php?u=https://www.lecrowninteriors.com/', label: 'Facebook' },
                      { icon: Instagram, href: 'https://www.instagram.com/lecrowninteriors/', label: 'Instagram' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/cws/share?url=https://www.lecrowninteriors.com/', label: 'LinkedIn' },
                      { icon: Twitter, href: 'https://x.com/share?url=https://www.lecrowninteriors.com/&text=LE%20Crown%20Interiors', label: 'Twitter' }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300 group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 py-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {new Date().getFullYear()} LE-CROWN Interiors. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Made with</span>
                <Heart size={14} className="text-red-500 hidden md:inline" />
                <span className="hidden md:inline">for luxury living</span>
              </div>
              
              <div className="flex items-center gap-6">
                <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
                
                {/* Scroll to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={18} className="text-white group-hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
