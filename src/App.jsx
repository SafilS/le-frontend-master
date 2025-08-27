import React, { useEffect, useCallback, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { AnimationProvider } from './context/AnimationContext';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import GetEstimatePage from './components/design-tool/GetEstimateModel';
import EstimationPage from './pages/EstimationPage';
import ModularKitchen from './components/designs/ModularKitchen';
import Wardrobe from './components/designs/Wardrobe';
import BedRoom from './components/designs/BedRoom';
import BathRoom from './components/designs/BathRoom';
import LivingRoom from './components/designs/LivingRoom';
import HomeOffice from './components/designs/HomeOffice';
import CrownLuxe from './components/designs/CrownLuxe';
import EstimationTest from './components/estimation/EstimationTest';
import DesignGalleryPage from './pages/DesignGalleryPage';
import { DesignProvider } from './context/DesignContext';
import { HeroImageProvider } from './context/HeroImageContext';
import Contact from './components/contact/Contact';
import Chatbot  from './components/chatbot/Chatbot';
import { testScrollToEstimate } from './utils/scrollTest';


const routes = [
  { path: '/', component: HomePage, preload: true },
  { path: '/get-estimate', component: GetEstimatePage, preload: true },
  { path: '/estimate/:type', component: EstimationPage, preload: false },
  { path: '/estimate/entire-home', component: React.lazy(() => import('./pages/estimate/entire-home')), preload: false },
  { path: '/estimate/kitchen', component: React.lazy(() => import('./pages/estimate/kitchen')), preload: false },
  { path: '/test-estimation', component: EstimationTest, preload: false },
  { path: '/gallery', component: DesignGalleryPage, preload: true },
  { path: '/luxe', component: CrownLuxe, preload: false },
  { path: '/kitchen', component: ModularKitchen, preload: true },
  { path: '/wardrobe', component: Wardrobe, preload: true },
  { path: '/bedroom', component: BedRoom, preload: true },
  { path: '/bathroom', component: BathRoom, preload: true },
  { path: '/living-room', component: LivingRoom, preload: true },
  { path: '/office', component: HomeOffice, preload: true },
  { path: '/contact', component: Contact, preload: true }

];

const RouteHandler = ({ children }) => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    routes
      .filter((route) => route.preload)
      .forEach((route) => {
        const Component = route.component;
        if (typeof Component === 'function') {
          Component.preload?.();
        }
      });

    const timer = setTimeout(() => {
      routes
        .filter((route) => !route.preload)
        .forEach((route) => {
          const Component = route.component;
          if (typeof Component === 'function') {
            Component.preload?.();
          }
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const prefetchRoute = useCallback((path) => {
    const route = routes.find((r) => r.path === path);
    if (route) {
      const Component = route.component;
      if (typeof Component === 'function') {
        Component.preload?.();
      }
    }
  }, []);

  useEffect(() => {
    window.prefetchRoute = prefetchRoute;
    return () => {
      window.prefetchRoute = null;
    };
  }, [prefetchRoute]);

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);

  return children;
};

// Conditional Footer component that doesn't render on the entire-home page
const FooterWithCondition = () => {
  const location = useLocation();
  const isEntireHomePage = location.pathname.startsWith('/estimate') || 
                          location.pathname === '/get-estimate' ||
                          location.pathname === '/test-estimation';
  
  // Don't render the Footer on the entire-home page
  if (isEntireHomePage) {
    return null;
  }
  
  // Render the Footer on all other pages
  return <Footer />;
};

// Conditional Chatbot component that doesn't render on estimation pages
const ChatbotWithCondition = () => {
  const location = useLocation();
  const isEstimationPage = location.pathname.startsWith('/estimate') || 
                          location.pathname === '/get-estimate' ||
                          location.pathname === '/test-estimation';
  
  // Don't render the Chatbot on estimation pages
  if (isEstimationPage) {
    return null;
  }
  
  // Render the Chatbot on all other pages
  return <Chatbot />;
};

function App() {
  return (
    <AnimationProvider>
      <HeroImageProvider>
        <DesignProvider>
          <BrowserRouter>
            <RouteHandler>
              <Header />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Routes>
                {routes.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </Suspense>
            <FooterWithCondition />
            <ChatbotWithCondition /> 
          </RouteHandler>
        </BrowserRouter>
      </DesignProvider>
    </HeroImageProvider>
  </AnimationProvider>
  );
}

export default App;
