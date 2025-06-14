import React, { useState, useEffect, memo } from 'react';

/**
 * LazyImage component for optimized image loading
 * 
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Blur-up loading effect
 * - Responsive image support with srcSet
 * - Fallback for browsers that don't support IntersectionObserver
 * 
 * @param {Object} props Component props
 * @param {string} props.src Main image source
 * @param {string} props.alt Image alt text
 * @param {string} props.className CSS classes
 * @param {string} props.placeholderSrc Low-quality placeholder image (optional)
 * @param {Object} props.srcSet Responsive image sources (optional)
 * @param {string} props.sizes Responsive image sizes (optional)
 * @param {string} props.fetchpriority Image fetch priority (optional)
 * @param {Object} props.style Additional inline styles (optional)
 * @returns {JSX.Element} LazyImage component
 */
const LazyImage = memo(({
  src,
  alt,
  className = '',
  placeholderSrc,
  srcSet,
  sizes,
  fetchpriority = 'auto',
  style = {},
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Set up intersection observer to detect when image is in viewport
  useEffect(() => {
    // Skip if image is already loaded or browser doesn't support IntersectionObserver
    if (isLoaded || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const imgRef = document.getElementById(`lazy-img-${src.replace(/[^\w]/g, '-')}`);
    if (!imgRef) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '200px 0px', // Start loading 200px before image enters viewport
      threshold: 0.01
    });

    observer.observe(imgRef);

    return () => {
      if (imgRef) observer.unobserve(imgRef);
    };
  }, [src, isLoaded]);

  // Handle image load event
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Generate unique ID for the image
  const imageId = `lazy-img-${src.replace(/[^\w]/g, '-')}`;

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        backgroundColor: '#f3f4f6', // Light gray background while loading
        ...style 
      }}
    >
      {/* Placeholder image or blur effect */}
      {placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 blur-sm"
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}

      {/* Main image - only load src when in viewport */}
      <img
        id={imageId}
        src={isInView ? src : ''}
        srcSet={isInView ? srcSet : ''}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        fetchpriority={fetchpriority}
        onLoad={handleImageLoaded}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

export default LazyImage;