/**
 * Utility functions for route preloading
 */

/**
 * Preloads a route by creating a hidden link with prefetch
 * @param {string} path Route path to preload
 */
export const preloadRoute = (path) => {
  // Skip if preload is not supported
  if (!('prefetch' in document.createElement('link'))) {
    return;
  }

  // Check if we already have a prefetch link for this route
  const existingLink = document.head.querySelector(`link[rel="prefetch"][href="${path}"]`);
  if (existingLink) {
    return; // Already prefetched
  }

  // Create a new prefetch link
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  link.as = 'document';
  
  // Add the link to the document head
  document.head.appendChild(link);
};

/**
 * Preloads assets (JS, CSS, images) needed for a route
 * @param {string[]} assetUrls Array of asset URLs to preload
 */
export const preloadAssets = (assetUrls) => {
  if (!assetUrls || !assetUrls.length) return;

  assetUrls.forEach(url => {
    // Skip if already preloaded
    const existingLink = document.head.querySelector(`link[rel="prefetch"][href="${url}"]`);
    if (existingLink) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    
    // Set appropriate 'as' attribute based on file extension
    if (url.endsWith('.js')) {
      link.as = 'script';
    } else if (url.endsWith('.css')) {
      link.as = 'style';
    } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/.test(url)) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Preloads critical routes on initial page load
 * @param {Object[]} routes Array of route objects with path and priority
 */
export const preloadCriticalRoutes = (routes) => {
  if (!routes || !routes.length) return;

  // Preload high priority routes immediately
  const highPriorityRoutes = routes.filter(route => route.priority === 'high');
  highPriorityRoutes.forEach(route => {
    preloadRoute(route.path);
  });

  // Preload medium priority routes after a short delay
  setTimeout(() => {
    const mediumPriorityRoutes = routes.filter(route => route.priority === 'medium');
    mediumPriorityRoutes.forEach(route => {
      preloadRoute(route.path);
    });
  }, 1000);

  // Preload low priority routes after user is idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      const lowPriorityRoutes = routes.filter(route => route.priority === 'low' || !route.priority);
      lowPriorityRoutes.forEach(route => {
        preloadRoute(route.path);
      });
    }, { timeout: 5000 });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      const lowPriorityRoutes = routes.filter(route => route.priority === 'low' || !route.priority);
      lowPriorityRoutes.forEach(route => {
        preloadRoute(route.path);
      });
    }, 3000);
  }
};

/**
 * Adds preload capability to a component
 * @param {React.Component} Component Component to enhance with preload capability
 * @param {string[]} assetUrls Optional array of asset URLs to preload with the component
 * @returns {React.Component} Enhanced component with preload method
 */
export const withPreload = (Component, assetUrls = []) => {
  Component.preload = () => {
    // Preload component's assets
    preloadAssets(assetUrls);
    
    // Call component's own preload method if it exists
    if (Component.originalPreload) {
      Component.originalPreload();
    }
  };
  
  // Store original preload method if it exists
  if (Component.preload && Component !== Component.preload) {
    Component.originalPreload = Component.preload;
  }
  
  return Component;
};

export default {
  preloadRoute,
  preloadAssets,
  preloadCriticalRoutes,
  withPreload
};