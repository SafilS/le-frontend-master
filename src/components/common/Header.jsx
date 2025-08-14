import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  const [screenSize, setScreenSize] = useState('large');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if current page is Crown Luxe
  const isCrownLuxePage = location.pathname === '/luxe';

  // Handle estimate button click
  const handleEstimateClick = useCallback(() => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    const scrollToEstimate = () => {
      const estimateSection = document.getElementById('get-estimate');
      console.log('Looking for element with id="get-estimate":', estimateSection);
      
      if (estimateSection) {
        console.log('Element found! Scrolling...');
        
        // Use native scrollIntoView with offset adjustment
        const yOffset = -100; // Negative offset to account for fixed header
        const y = estimateSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        console.log('Scrolling to position:', y);
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        
        return true;
      } else {
        console.error('❌ Element with id="get-estimate" not found!');
        // Debug: show all available elements with 'estimate' in their ID
        const allEstimateElements = document.querySelectorAll('[id*="estimate"]');
        console.log('Available elements with "estimate" in ID:', allEstimateElements);
        return false;
      }
    };

    if (location.pathname === '/') {
      console.log('✅ On homepage, attempting to scroll...');
      if (!scrollToEstimate()) {
        // Retry after a short delay in case DOM isn't fully ready
        console.log('🔄 First attempt failed, retrying in 500ms...');
        setTimeout(() => {
          scrollToEstimate();
        }, 500);
      }
    } else {
      console.log('🔄 Not on homepage, navigating first...');
      navigate('/');
      
      // Wait for route change and component mount
      setTimeout(() => {
        console.log('🔄 Navigation complete, attempting scroll...');
        if (!scrollToEstimate()) {
          // Additional retry for navigation case
          setTimeout(() => {
            console.log('🔄 Second attempt after navigation...');
            scrollToEstimate();
          }, 300);
        }
      }, 200);
    }
  }, [location.pathname, navigate]);

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
      const width = window.innerWidth;
      
      // Determine screen size categories
      if (width >= 1400) {
        setScreenSize('xlarge');
        setShowDesktopNav(true);
      } else if (width >= 1200) {
        setScreenSize('large');
        setShowDesktopNav(true);
      } else if (width >= 1024) {
        setScreenSize('medium');
        setShowDesktopNav(true);
      } else if (width >= 768) {
        setScreenSize('small');
        setShowDesktopNav(false);
      } else {
        setScreenSize('mobile');
        setShowDesktopNav(false);
      }
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
    { name: 'Crown Luxe', path: '/luxe', priority: 1 },
    { name: 'Gallery', path: '/gallery', priority: 2, fullName: 'Design Gallery' },
    { name: 'Kitchen', path: '/kitchen', priority: 3, fullName: 'Modular Kitchen' },
    { name: 'Wardrobe', path: '/wardrobe', priority: 4 },
    { name: 'Bedroom', path: '/bedroom', priority: 5 },
    { name: 'Living', path: '/living-room', priority: 6, fullName: 'Living Room' },
    { name: 'Bathroom', path: '/bathroom', priority: 7 },
    { name: 'Office', path: '/office', priority: 8, fullName: ' Office' },
  ];

  // Filter and limit navigation links based on screen size
  const getVisibleNavLinks = () => {
    switch (screenSize) {
      case 'xlarge':
        return navLinks.map(link => ({ ...link, displayName: link.fullName || link.name }));
      case 'large':
        return navLinks.map(link => ({ ...link, displayName: link.fullName || link.name }));
      case 'medium':
        // Show only priority links with shorter names
        return navLinks.slice(0, 6).map(link => ({ ...link, displayName: link.name }));
      default:
        return navLinks.map(link => ({ ...link, displayName: link.fullName || link.name }));
    }
  };

  const visibleNavLinks = getVisibleNavLinks();

  // Dynamic spacing and sizing based on screen size
  const getNavSpacing = () => {
    switch (screenSize) {
      case 'xlarge':
        return 'space-x-4';
      case 'large':
        return 'space-x-3';
      case 'medium':
        return 'space-x-1';
      default:
        return 'space-x-2';
    }
  };

  const getNavTextSize = () => {
    switch (screenSize) {
      case 'xlarge':
        return 'text-sm';
      case 'large':
        return 'text-sm';
      case 'medium':
        return 'text-xs';
      default:
        return 'text-sm';
    }
  };

  const getNavPadding = () => {
    switch (screenSize) {
      case 'xlarge':
        return 'px-3 py-1.5';
      case 'large':
        return 'px-2 py-1';
      case 'medium':
        return 'px-1.5 py-1';
      default:
        return 'px-2 py-1';
    }
  };

  return (
    <>
      <header className={`fixed w-full z-50 ${isCrownLuxePage ? (isScrolled ? 'bg-transparent/70 backdrop-blur-md shadow-md' : 'bg-transparent') : (isScrolled ? 'bg-white/90 shadow-md' : 'bg-white')} py-3 md:py-4 lg:py-6 transition-all duration-500`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full min-h-[40px]">
            {/* Responsive Luxury Logo */}
            <div className="flex-shrink-0 max-w-[65%] lg:max-w-none">
              <PrefetchLink to="/" className="flex items-center group">
                <img 
                  src="/assets/icons/logo.png" 
                  alt="LE-Crown Interiors" 
                  className="h-8 md:h-8 lg:h-9 xl:h-10 md:mr-1 transition-transform duration-300 group-hover:scale-110"
                  fetchpriority="high"
                />
                <div className="relative">
                  {/* Mobile Logo - Full Name */}
                  <div className="flex items-center md:hidden">
                    <div className="flex flex-col relative">
                      <div className="relative">
                        <span className={`text-lg font-black tracking-wide ${isCrownLuxePage ? 'text-white drop-shadow-md' : (isScrolled ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent')}`}>
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
                      <span className={`text-xs font-light tracking-[0.15em] ${isCrownLuxePage ? 'text-white/90 drop-shadow-md' : (isScrolled ? 'bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent')} -mt-1`}>
                        INTERIORS
                      </span>
                    </div>
                  </div>
                  
                  {/* Desktop Logo - Responsive sizing */}
                  <div className="hidden md:flex items-center">
                    <div className="relative">
                      <span className={`font-black tracking-wider ${isCrownLuxePage ? 'text-white drop-shadow-lg' : (isScrolled ? 'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent')} ${
                        screenSize === 'xlarge' ? 'text-3xl' : 
                        screenSize === 'large' ? 'text-2xl' : 
                        'text-xl'
                      }`}>
                        LE-CROWN
                      </span>
                      {/* Custom crown on L - Responsive sizing */}
                      <div className={`absolute left-0 ${
                        screenSize === 'xlarge' ? '-top-2 w-5 h-3' :
                        screenSize === 'large' ? '-top-1.5 w-4 h-2.5' :
                        '-top-1 w-3 h-2'
                      }`}>
                        <div className={`flex items-end justify-center ${
                          screenSize === 'xlarge' ? 'space-x-1' : 'space-x-0.5'
                        }`}>
                          <div className={`bg-yellow-500 rounded-t-full shadow-sm ${
                            screenSize === 'xlarge' ? 'w-1.5 h-2.5' :
                            screenSize === 'large' ? 'w-1 h-2' :
                            'w-0.5 h-1.5'
                          }`}></div>
                          <div className={`bg-yellow-400 rounded-t-full shadow-sm ${
                            screenSize === 'xlarge' ? 'w-1.5 h-3' :
                            screenSize === 'large' ? 'w-1 h-2.5' :
                            'w-0.5 h-2'
                          }`}></div>
                          <div className={`bg-yellow-500 rounded-t-full shadow-sm ${
                            screenSize === 'xlarge' ? 'w-1.5 h-2.5' :
                            screenSize === 'large' ? 'w-1 h-2' :
                            'w-0.5 h-1.5'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                    <div className={`flex flex-col ${screenSize === 'xlarge' ? 'ml-2' : 'ml-1'}`}>
                      <span className={`font-light tracking-[0.2em] ${isCrownLuxePage ? 'text-white/90 drop-shadow-md' : (isScrolled ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent')} ${
                        screenSize === 'xlarge' ? 'text-base' :
                        screenSize === 'large' ? 'text-sm' :
                        'text-xs'
                      }`}>
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

            {/* Desktop Navigation - Responsive */}
            {showDesktopNav && (
              <nav className={`flex ${getNavSpacing()} flex-1 justify-center mx-2 overflow-hidden`}>
                <div className="flex items-center space-x-1 lg:space-x-2 xl:space-x-3 max-w-full overflow-hidden">
                  {visibleNavLinks.map((link, index) => (
                    <PrefetchLink 
                      key={link.name}
                      to={link.path}
                      className={`relative ${getNavTextSize()} font-semibold whitespace-nowrap transition-all duration-300 group ${getNavPadding()} rounded-md flex-shrink-0 ${
                        link.name === 'Crown Luxe' 
                          ? isCrownLuxePage 
                            ? 'text-yellow-300 hover:text-yellow-200 drop-shadow-md' 
                            : 'text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text hover:from-yellow-500 hover:to-yellow-300'
                          : isCrownLuxePage 
                            ? 'text-white hover:text-yellow-200 drop-shadow-md' 
                            : (isScrolled ? 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80')
                      }`}
                    >
                      <div className="flex items-center">
                        {link.name === 'Crown Luxe' && <span className="mr-1 text-xs">👑</span>}
                        <span className="truncate">{link.displayName}</span>
                      </div>
                      {/* Luxury underline effect */}
                      <div className={`absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        link.name === 'Crown Luxe' 
                          ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' 
                          : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
                      }`}></div>
                    </PrefetchLink>
                  ))}
                  
                  {/* More menu for hidden items on medium screens */}
                  {screenSize === 'medium' && navLinks.length > 6 && (
                    <div className="relative group">
                      <button className={`text-xs font-semibold ${isCrownLuxePage ? 'text-white hover:text-yellow-200 drop-shadow-md' : (isScrolled ? 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80')} px-1.5 py-1 rounded-md transition-all duration-300`}>
                        More
                      </button>
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="py-2">
                          {navLinks.slice(6).map((link) => (
                            <PrefetchLink
                              key={link.name}
                              to={link.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200"
                            >
                              {link.fullName || link.name}
                            </PrefetchLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            )}

            {/* Compact Contact Button - Desktop - Responsive */}
            {showDesktopNav && (
              <div className="flex items-center flex-shrink-0 ml-2">
                <button
                  onClick={handleEstimateClick}
                  className={`${isCrownLuxePage ? 'bg-yellow-500/80 hover:bg-yellow-400/90 backdrop-blur-sm' : (isScrolled ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400' : 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400')} text-white py-2 rounded-lg transition-all duration-300 font-bold flex items-center shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap ${
                    screenSize === 'xlarge' ? 'px-4 text-sm' :
                    screenSize === 'large' ? 'px-3 text-sm' :
                    'px-2 text-xs'
                  }`}
                >
                  <Phone size={screenSize === 'medium' ? 12 : 14} className={screenSize !== 'medium' ? 'mr-1' : ''} />
                  {screenSize !== 'medium' && <span className="ml-1">Estimate</span>}
                  {screenSize === 'xlarge' && <span className="ml-1">✨</span>}
                </button>  
              </div>
            )}

            {/* Mobile Menu Button */}
            {!showDesktopNav && (
              <div className="flex items-center flex-shrink-0">
                <button
                  onClick={toggleMenu}
                  className={`${isCrownLuxePage ? 'text-white hover:text-yellow-200' : (isScrolled ? 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80' : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/80')} focus:outline-none p-1.5 rounded-lg transition-all duration-300`}
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
                        <span className="truncate font-semibold">{link.fullName || link.name}</span>
                      </div>
                      <span className="text-gray-500 text-xs">→</span>
                    </div>
                  </PrefetchLink>
                ))}
                <div className="border-t border-yellow-200 pt-4 mt-4">
                  <button
                    onClick={handleEstimateClick}
                    className="block w-full text-center bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold shadow-lg text-sm"
                  >
                    <Phone size={16} className="mr-2" />
                    Get Free Estimate
                    <span className="ml-2">✨</span>
                  </button>
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