import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Custom Link component with prefetching capability
const PrefetchLink = memo(({ to, children, className, onClick }) => {
  // Handle prefetching on hover
  const handleMouseEnter = useCallback(() => {
    // Use the global prefetchRoute function if available
    if (window.prefetchRoute) {
      window.prefetchRoute(to);
    }
  }, [to]);

  return (
    <Link 
      to={to} 
      className={className} 
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Breakpoint at exactly 1540px for desktop/mobile view
      const shouldShow = window.innerWidth >= 1540;
      setShowDesktopNav(shouldShow);
    };

    handleResize(); // call initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Crown Luxe', path: '/luxe' },
    { name: 'Design Gallery', path: '/gallery' },
    { name: 'Modular Kitchen', path: '/kitchen' },
    { name: 'Wardrobe', path: '/wardrobe' },
    { name: 'Bedroom', path: '/bedroom' },
    { name: 'Living Room', path: '/living-room' },
    { name: 'Bathroom', path: '/bathroom' },
    { name: 'Home Office', path: '/office' },
  ];

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-xl py-2 md:py-3' : 'bg-white/98 backdrop-blur-xl py-3 md:py-4 lg:py-6'}`}>
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between w-full">
            {/* Responsive Luxury Logo */}
            <div className="flex-shrink-0 max-w-[65%] lg:max-w-none">
              <PrefetchLink to="/" className="flex items-center group">
                <img 
                  src="/assets/icons/logo.png" 
                  alt="LE-Crown Interiors" 
                  className="h-10 md:h-8 lg:h-10 md:mr-1 transition-transform duration-300 group-hover:scale-110"
                  fetchpriority="high"
                />
                <div className="relative">
                  {/* Mobile Logo - Full Name */}
                  <div className="flex items-center md:hidden">
                    <div className="flex flex-col relative">
                      <div className="relative">
                        <span className="text-lg font-black tracking-wide bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                          LE-CROWN
                        </span>
                        {/* Custom crown on L */}
                        <div className="absolute -top-1 left-0 w-2 h-1">
                          <div className="flex items-end justify-center space-x-0.5">
                            <div className="w-0.5 h-1 bg-yellow-500 rounded-t-full"></div>
                            <div className="w-0.5 h-1.5 bg-yellow-400 rounded-t-full"></div>
                            <div className="w-0.5 h-1 bg-yellow-500 rounded-t-full"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-light tracking-[0.15em] bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent -mt-1">
                        INTERIORS
                      </span>
                    </div>
                  </div>
                  
                  {/* Desktop Logo - Compact */}
                  <div className="hidden md:flex items-center">
                    <div className="relative">
                      <span className="text-xl lg:text-2xl xl:text-3xl font-black tracking-wider bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                        LE-CROWN
                      </span>
                      {/* Custom crown on L - Desktop */}
                      <div className="absolute -top-1 lg:-top-1.5 xl:-top-2 left-0 w-3 lg:w-4 xl:w-5 h-2 lg:h-2.5 xl:h-3">
                        <div className="flex items-end justify-center space-x-0.5 lg:space-x-1">
                          <div className="w-0.5 lg:w-1 xl:w-1.5 h-1.5 lg:h-2 xl:h-2.5 bg-yellow-500 rounded-t-full shadow-sm"></div>
                          <div className="w-0.5 lg:w-1 xl:w-1.5 h-2 lg:h-2.5 xl:h-3 bg-yellow-400 rounded-t-full shadow-sm"></div>
                          <div className="w-0.5 lg:w-1 xl:w-1.5 h-1.5 lg:h-2 xl:h-2.5 bg-yellow-500 rounded-t-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-1 lg:ml-2 flex flex-col">
                      <span className="text-xs lg:text-sm xl:text-base font-light tracking-[0.2em] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent">
                        INTERIORS
                      </span>
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-1"></div>
                    </div>
                    
                    {/* Luxury Accent Elements - Desktop Only */}
                    <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-ping"></div>
                  </div>
                </div>
              </PrefetchLink>
            </div>

            {/* Desktop Navigation */}
            {showDesktopNav && (
              <nav className="flex space-x-2 xl:space-x-4 flex-1 justify-center mx-2">
                {navLinks.map((link, index) => (
                  <PrefetchLink 
                    key={link.name}
                    to={link.path}
                    className={`relative text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 group px-1 xl:px-2 py-1 rounded-md ${
                      link.name === 'Crown Luxe' 
                        ? 'text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text hover:from-yellow-500 hover:to-yellow-300' 
                        : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-center">
                      {link.name === 'Crown Luxe' && <span className="mr-1 text-xs">👑</span>}
                      <span className="truncate max-w-[80px] xl:max-w-none">{link.name}</span>
                    </div>
                    {/* Luxury underline effect */}
                    <div className={`absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      link.name === 'Crown Luxe' 
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' 
                        : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
                    }`}></div>
                  </PrefetchLink>
                ))}
              </nav>
            )}


            {/* Compact Contact Button - Desktop */}
            {showDesktopNav && (
              <div className="flex items-center flex-shrink-0 ml-2">
                <PrefetchLink 
                  to="/estimate/entire-home" 
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-2 px-2 lg:px-3 xl:px-4 rounded-lg transition-all duration-300 text-xs font-bold flex items-center shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
                >
                  <Phone size={12} className="lg:mr-1" />
                  <span className="hidden lg:inline ml-1">Estimate</span>
                  <span className="hidden xl:inline ml-1">✨</span>
                </PrefetchLink>  
              </div>
            )}


            {/* Mobile Menu Button */}
            {!showDesktopNav && (
              <div className="flex items-center flex-shrink-0">
                <button
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-yellow-600 focus:outline-none p-1.5 rounded-lg hover:bg-yellow-50 transition-all duration-300"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Mobile Menu */}
        {!showDesktopNav && isMenuOpen && (
          <div className="bg-white shadow-2xl border-t border-yellow-200 max-h-screen overflow-y-auto">
            <div className="px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <PrefetchLink 
                    key={link.name}
                    to={link.path}
                    className={`relative font-medium py-3 px-4 rounded-lg transition-all duration-300 text-sm border ${
                      link.name === 'Crown Luxe' 
                        ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-800' 
                        : 'text-gray-800 hover:text-yellow-700 hover:bg-yellow-50 border-gray-200 hover:border-yellow-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {link.name === 'Crown Luxe' && <span className="mr-2 text-sm">👑</span>}
                        <span className="truncate font-semibold">{link.name}</span>
                      </div>
                      <span className="text-gray-500 text-xs">→</span>
                    </div>
                  </PrefetchLink>
                ))}
                <div className="border-t border-yellow-200 pt-4 mt-4">
                  <PrefetchLink 
                    to="/get-estimate"
                    className="block w-full text-center bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold shadow-lg text-sm"
                  >
                    <Phone size={16} className="mr-2" />
                    Get Free Estimate
                    <span className="ml-2">✨</span>
                  </PrefetchLink>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;