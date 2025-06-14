/**
 * Utility functions for image optimization
 */

/**
 * Preloads an array of images to improve perceived performance
 * @param {string[]} imageUrls Array of image URLs to preload
 * @param {boolean} highPriority Whether to use high priority loading
 * @returns {Promise<void>} Promise that resolves when all images are preloaded
 */
export const preloadImages = (imageUrls, highPriority = false) => {
  if (!imageUrls || !imageUrls.length) return Promise.resolve();

  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      if (highPriority) {
        img.fetchpriority = 'high';
      }
      
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
};

/**
 * Generates a low-quality placeholder image URL
 * @param {string} originalUrl Original image URL
 * @param {number} width Width of the placeholder
 * @returns {string} Placeholder image URL
 */
export const generatePlaceholderUrl = (originalUrl, width = 20) => {
  // This is a simplified example - in a real app, you would use a service like Cloudinary
  // or have a server endpoint that generates low-quality placeholders
  if (originalUrl.includes('?')) {
    return `${originalUrl}&width=${width}&quality=10`;
  }
  return `${originalUrl}?width=${width}&quality=10`;
};

/**
 * Determines if an image should be lazy loaded based on its position
 * @param {number} index Index of the image in a list
 * @param {number} threshold Number of images to eagerly load
 * @returns {string} 'eager' or 'lazy'
 */
export const getLoadingStrategy = (index, threshold = 2) => {
  return index < threshold ? 'eager' : 'lazy';
};

/**
 * Generates responsive image srcSet
 * @param {string} baseUrl Base image URL
 * @param {number[]} widths Array of widths for srcSet
 * @returns {string} srcSet attribute value
 */
export const generateSrcSet = (baseUrl, widths = [320, 640, 960, 1280, 1920]) => {
  // This is a simplified example - in a real app, you would use a service like Cloudinary
  // or have a server endpoint that generates different sized images
  return widths
    .map(width => {
      if (baseUrl.includes('?')) {
        return `${baseUrl}&width=${width} ${width}w`;
      }
      return `${baseUrl}?width=${width} ${width}w`;
    })
    .join(', ');
};

/**
 * Checks if the browser supports modern image formats
 * @returns {Object} Object with support flags for different formats
 */
export const checkImageFormatSupport = () => {
  const canvas = document.createElement('canvas');
  if (!canvas || !canvas.getContext) {
    return {
      webp: false,
      avif: false,
      jpeg2000: false
    };
  }

  const ctx = canvas.getContext('2d');
  return {
    webp: ctx.createImageData(1, 1).data.buffer instanceof ArrayBuffer,
    avif: false, // Need more complex detection
    jpeg2000: false // Need more complex detection
  };
};

export default {
  preloadImages,
  generatePlaceholderUrl,
  getLoadingStrategy,
  generateSrcSet,
  checkImageFormatSupport
};