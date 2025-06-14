import React, { useEffect, useState, useCallback } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useLocation, 
  useNavigationType 
} from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import GetEstimatePage from './components/design-tool/GetEstimateModel';
import EstimationPage from './pages/EstimationPage';
import ModularKitchen from './components/designs/ModularKitchen';
import Wardrobe from './components/designs/Wardrobe';
import Footer from './components/common/Footer';
import BedRoom from './components/designs/BedRoom';
import BathRoom from './components/designs/BathRoom';
import LivingRoom from './components/designs/LivingRoom';
import HomeOffice from './components/designs/HomeOffice';
import CrownLuxe from './components/designs/CrownLuxe';
import EstimationTest from './components/estimation/EstimationTest';
import DesignGalleryPage from './pages/DesignGalleryPage';
import { DesignProvider } from './context/DesignContext';
import { HeroImageProvider } from './context/HeroImageContext';

// Route configuration with metadata for preloading
const routes = [
  { path: '/', component: HomePage, preload: true },
  { path: '/get-estimate', component: GetEstimatePage, preload: true },
  { path: '/estimate/:type', component: EstimationPage, preload: false },
  { path: '/test-estimation', component: EstimationTest, preload: false },
  { path: '/gallery', component: DesignGalleryPage, preload: true },
  { path: '/luxe', component: CrownLuxe, preload: false },
  { path: '/kitchen', component: ModularKitchen, preload: true },
  { path: '/wardrobe', component: Wardrobe, preload: true },
  { path: '/bedroom', component: BedRoom, preload: true },
  { path: '/bathroom', component: BathRoom, preload: true },
  { path: '/living-room', component: LivingRoom, preload: true },
  { path: '/office', component: HomeOffice, preload: true }
];

// Component to handle route transitions and preloading
const RouteHandler = ({ children }) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  
  // Preload components on initial load and navigation
  useEffect(() => {
    // Preload high-priority routes immediately
    routes
      .filter(route => route.preload)
      .forEach(route => {
        // Touch the component to ensure it's loaded in memory
        const Component = route.component;
        if (typeof Component === 'function') {
          // This doesn't render anything, just ensures the component is loaded
          Component.preload && Component.preload();
        }
      });
      
    // Preload remaining routes after a delay
    const timer = setTimeout(() => {
      routes
        .filter(route => !route.preload)
        .forEach(route => {
          const Component = route.component;
          if (typeof Component === 'function') {
            Component.preload && Component.preload();
          }
        });
    }, 2000); // 2 second delay for lower priority routes
    
    return () => clearTimeout(timer);
  }, []);
  
  // Preload the next likely routes when hovering over links
  const prefetchRoute = useCallback((path) => {
    const route = routes.find(r => r.path === path);
    if (route) {
      const Component = route.component;
      if (typeof Component === 'function') {
        Component.preload && Component.preload();
      }
    }
  }, []);
  
  // Add the prefetch function to window for use in link hover handlers
  useEffect(() => {
    window.prefetchRoute = prefetchRoute;
    return () => {
      window.prefetchRoute = null;
    };
  }, [prefetchRoute]);
  
  // Scroll restoration
  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);
  
  return children;
};

function App() {
  return (
    <HeroImageProvider>
      <DesignProvider>
        <BrowserRouter>
          <RouteHandler>
            <Header />
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
            <Footer />
          </RouteHandler>
        </BrowserRouter>
      </DesignProvider>
    </HeroImageProvider>
  );
}

export default App;
