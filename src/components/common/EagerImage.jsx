import React, { useState, memo } from 'react';

/**
 * EagerImage component for immediate image loading
 * 
 * Features:
 * - Eager loading of all images
 * - Blur-up loading effect
 * - Responsive image support with srcSet
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
 * @returns {JSX.Element} EagerImage component
 */
const EagerImage = memo(({ 
  src,
  alt,
  className = '',
  placeholderSrc,
  srcSet,
  sizes,
  fetchpriority = 'high',
  style = {},
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle image load event
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Generate unique ID for the image
  const imageId = `eager-img-${src.replace(/[^\w]/g, '-')}`;

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

      {/* Main image - load immediately */}
      <img
        id={imageId}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="eager" // Force eager loading
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

export default EagerImage;