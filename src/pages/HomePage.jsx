import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';
import { Star } from 'lucide-react';

// Import common components
// import Footer from '../components/common/Footer';
import CTAButton from '../components/common/CTAButton';

// Import home-specific components
import Hero from '../components/home/Hero';
import ServiceShowcase from '../components/home/ServiceShowcase';
import ProcessExplainer from '../components/home/ProcessExplainer';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import PortfolioGrid from '../components/home/OurProjects';
import GetFreeEstimate from '../components/home/GetFreeEstimate';
import Contact from '../components/home/Contact';
import DesignToolIntro from '../components/home/DesignToolIntro';

const HomePage = () => {
  // Get animation context
  const { disableScrollAnimations } = useAnimation();
  
  // Fade-in animation for sections
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Enhanced services data
  const services = [
    {
      id: 1,
      title: "Modular Kitchens",
      description: "Bespoke kitchen solutions that blend elegance with functionality, tailored to your lifestyle. Our expert designers create spaces that inspire culinary creativity while maximizing efficiency and storage.",
      imagePath: "/assets/images/kitchen/k1.png",
      category: "Premium",
      rating: "4.9",
      duration: "4-6 weeks",
      projects: "500+",
      priceRange: "₹3.5L - ₹8L",
      features: ["Modular Design", "Premium Hardware", "Soft-Close Drawers", "LED Lighting"]
    },
    {
      id: 2,
      title: "Living Room Makeovers",
      description: "Transform your living space into a sanctuary of style and comfort with our signature designs. We create harmonious environments that reflect your personality and enhance your daily living experience.",
      imagePath: "/assets/images/living/l1.png",
      category: "Luxury",
      rating: "4.8",
      duration: "3-5 weeks",
      projects: "400+",
      priceRange: "₹2.5L - ₹6L",
      features: ["Custom Furniture", "Ambient Lighting", "Smart Storage", "Premium Fabrics"]
    },
    {
      id: 3,
      title: "Luxury Bedrooms",
      description: "Create a personal retreat with our curated bedroom designs focused on luxury and tranquility. Every element is carefully selected to promote rest, relaxation, and rejuvenation.",
      imagePath: "/assets/images/bedroom/b1.png",
      category: "Elite",
      rating: "4.9",
      duration: "3-4 weeks",
      projects: "350+",
      priceRange: "₹2L - ₹5L",
      features: ["Walk-in Wardrobes", "Mood Lighting", "Luxury Bedding", "Climate Control"]
    },
    {
      id: 4,
      title: "Custom Furniture",
      description: "Handcrafted, bespoke furniture pieces that express your unique personality and style. Our artisans create one-of-a-kind pieces that become the centerpiece of your interior design.",
      imagePath: "/assets/images/furniture/f1.png",
      category: "Artisan",
      rating: "4.8",
      duration: "6-8 weeks",
      projects: "200+",
      priceRange: "₹50K - ₹3L",
      features: ["Handcrafted", "Premium Wood", "Custom Finishes", "Lifetime Warranty"]
    },
    {
      id: 5,
      title: "Complete Home Design",
      description: "End-to-end interior design solutions for your entire home. From concept to completion, we handle every aspect of your home transformation with meticulous attention to detail.",
      imagePath: "/assets/images/living/l2.png",
      category: "Comprehensive",
      rating: "4.9",
      duration: "8-12 weeks",
      projects: "150+",
      priceRange: "₹8L - ₹25L",
      features: ["Full Home Design", "Project Management", "Quality Assurance", "Post-Installation Support"]
    },
    {
      id: 6,
      title: "Office Interiors",
      description: "Professional workspace designs that boost productivity and reflect your brand identity. We create inspiring work environments that motivate teams and impress clients.",
      imagePath: "/assets/images/office/f1.png",
      category: "Commercial",
      rating: "4.7",
      duration: "6-10 weeks",
      projects: "100+",
      priceRange: "₹5L - ₹15L",
      features: ["Ergonomic Design", "Brand Integration", "Flexible Layouts", "Technology Integration"]
    }
  ];

  // Enhanced process steps data
  const processSteps = [
    {
      id: 1,
      title: "Discovery & Consultation",
      description: "We begin with an in-depth consultation to understand your vision, lifestyle, preferences, and budget requirements. Our design experts visit your space to assess possibilities and constraints.",
      duration: "1-2 days",
      features: ["Site Visit", "Requirement Analysis", "Budget Planning", "Timeline Discussion"]
    },
    {
      id: 2,
      title: "Design & Visualization",
      description: "Our talented designers create detailed 3D visualizations, mood boards, and technical drawings tailored to your aesthetic preferences and functional needs.",
      duration: "1-2 weeks",
      features: ["3D Renderings", "Material Selection", "Color Schemes", "Furniture Layout"]
    },
    {
      id: 3,
      title: "Execution & Installation",
      description: "Our master craftsmen and project managers bring the designs to life with meticulous attention to detail, quality materials, and precise execution.",
      duration: "4-8 weeks",
      features: ["Quality Materials", "Skilled Craftsmen", "Progress Updates", "Quality Checks"]
    },
    {
      id: 4,
      title: "Completion & Handover",
      description: "Experience the joy of stepping into your newly transformed space. We ensure everything is perfect before handover and provide comprehensive after-sales support.",
      duration: "1-2 days",
      features: ["Final Inspection", "Styling & Setup", "Documentation", "Warranty Coverage"]
    }
  ];

  // Enhanced testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Elizabeth Montgomery",
      role: "Luxury Penthouse Owner",
      location: "Mumbai, Maharashtra",
      quote: "The attention to detail and the quality of craftsmanship exceeded our expectations. Our penthouse has been transformed into a true sanctuary of elegance. Every corner reflects sophistication and the team's dedication to perfection is unmatched.",
      imagePath: "/assets/images/mobile1.jpg",
      rating: 5,
      project: "Complete Penthouse Renovation",
      duration: "8 weeks",
      budget: "₹45 Lakhs"
    },
    {
      id: 2,
      name: "Richard Bennett",
      role: "CEO, Luxury Developments",
      location: "Delhi NCR",
      quote: "Working with this team was an absolute pleasure. They understood our vision immediately and delivered a space that perfectly balances luxury and functionality. The project management was flawless and the results speak for themselves.",
      imagePath: "/assets/images/mobile2.jpg",
      rating: 5,
      project: "Corporate Office & Residence",
      duration: "12 weeks",
      budget: "₹75 Lakhs"
    },
    {
      id: 3,
      name: "Victoria & James Harrington",
      role: "Heritage Home Owners",
      location: "Bangalore, Karnataka",
      quote: "We were looking for designers who could honor the historical elements of our home while introducing modern luxury. The result is breathtaking. They preserved the soul of our heritage home while making it contemporary and functional.",
      imagePath: "/assets/images/mobile3.jpg",
      rating: 5,
      project: "Heritage Home Restoration",
      duration: "16 weeks",
      budget: "₹60 Lakhs"
    },
    {
      id: 4,
      name: "Priya & Arjun Sharma",
      role: "Young Professionals",
      location: "Pune, Maharashtra",
      quote: "As first-time homeowners, we were overwhelmed with choices. The team guided us through every step, creating a modern, functional space that perfectly fits our lifestyle. The smart storage solutions are incredible!",
      imagePath: "/assets/images/tab1.jpg",
      rating: 5,
      project: "2BHK Complete Interior",
      duration: "6 weeks",
      budget: "₹25 Lakhs"
    },
    {
      id: 5,
      name: "Dr. Rajesh Gupta",
      role: "Medical Professional",
      location: "Chennai, Tamil Nadu",
      quote: "The modular kitchen design has revolutionized our cooking experience. The team understood our family's needs perfectly and created a space that's both beautiful and highly functional. Outstanding work!",
      imagePath: "/assets/images/tab2.jpg",
      rating: 5,
      project: "Kitchen & Dining Renovation",
      duration: "4 weeks",
      budget: "₹18 Lakhs"
    }
  ];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <Hero />

      <motion.section 
        className="services-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <PortfolioGrid />
      </motion.section>

      {/* Get Free Estimate Section */}
      <motion.section 
        className="estimate-section"
        initial={disableScrollAnimations ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
        animate={disableScrollAnimations ? "visible" : undefined}
        variants={fadeInVariants}
      >
        <GetFreeEstimate />
      </motion.section>

      {/* Design Tool Introduction Section */}
      <motion.section 
        className="design-tool-intro-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <DesignToolIntro />
      </motion.section>

      {/* Services Showcase Section */}
      <motion.section 
        className="services-section"
        initial={disableScrollAnimations ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
        animate={disableScrollAnimations ? "visible" : undefined}
        variants={fadeInVariants}
      >
        <div className="container mx-auto px-2 py-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-light mb-2 text-gray-800">Our Signature Services</h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-3"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of services designed to transform your living spaces into paragons of luxury and functionality.
            </p>
          </div>
          
          <ServiceShowcase services={services} />
        </div>
      </motion.section>

      {/* Process Explainer Section */}
      <motion.section 
        className="process-section bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <div className="container mx-auto px-2 py-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-light mb-2 text-gray-800">Our Refined Process</h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-3"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A seamless journey from concept to completion, ensuring your vision is realized with precision and elegance.
            </p>
          </div>
          
          <ProcessExplainer steps={processSteps} />
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section 
        className="testimonial-section bg-gradient-to-br from-gray-50 via-white to-yellow-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full opacity-5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full mb-6">
              <Star className="w-8 h-8 text-white fill-current" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-light mb-4 text-gray-800">
              What Our Clients 
              <span className="block text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text font-semibold">
                Say About Us
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The satisfaction of our distinguished clientele speaks volumes about our commitment to excellence. 
              Here's what they have to say about their transformation journey with us.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                <span className="font-semibold">4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="font-semibold">100% Project Completion</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="font-semibold">6000+ Happy Families</span>
              </div>
            </div>
          </div>
          
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <Contact />
      </motion.section>

      {/* <Footer /> */}
    </div>  
  );
};

export default HomePage;