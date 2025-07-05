import React, { createContext, useState, useContext } from 'react';

/**
 * Animation Context for controlling animation behavior across the application
 * 
 * This context provides a way to globally control animation settings,
 * particularly for disabling scroll-triggered animations when needed.
 */
const AnimationContext = createContext();

/**
 * Animation Provider Component
 * 
 * Provides animation control settings to the component tree
 * 
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 * @returns {JSX.Element} Provider component
 */
export const AnimationProvider = ({ children }) => {
  // State to control whether scroll animations should be disabled
  const [disableScrollAnimations, setDisableScrollAnimations] = useState(false);

  // Animation settings object to be passed to components
  const animationSettings = {
    // For framer-motion's whileInView animations
    scrollAnimations: {
      // If scroll animations are disabled, set initial and animate to the same value
      // This makes elements appear immediately in their final state
      initial: disableScrollAnimations ? "visible" : "hidden",
      whileInView: "visible",
      // If scroll animations are disabled, set once to false to ensure animations
      // are applied immediately without waiting for scroll
      viewport: { once: true, amount: 0.3 }
    },
    // Toggle scroll animation state
    disableScrollAnimations,
    setDisableScrollAnimations
  };

  return (
    <AnimationContext.Provider value={animationSettings}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Custom hook to use animation context
 * 
 * @returns {Object} Animation settings and controls
 */
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  
  return context;
};