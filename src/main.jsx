import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { preloadCriticalRoutes } from './utils/routePreloader';

// Define critical routes to preload
const criticalRoutes = [
  { path: '/', priority: 'high' },
  { path: '/gallery', priority: 'high' },
  { path: '/kitchen', priority: 'medium' },
  { path: '/wardrobe', priority: 'medium' },
  { path: '/bedroom', priority: 'medium' },
  { path: '/bathroom', priority: 'low' },
  { path: '/living-room', priority: 'low' },
  { path: '/office', priority: 'low' },
  { path: '/luxe', priority: 'low' },
  { path: '/get-estimate', priority: 'medium' },
];

// Preload critical routes
preloadCriticalRoutes(criticalRoutes);

// Remove loading spinner if present
const removeLoadingSpinner = () => {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.classList.add('fade-out');
    setTimeout(() => {
      spinner.remove();
    }, 300);
  }
};

// Create root and render app
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove loading spinner after app is rendered
removeLoadingSpinner();
