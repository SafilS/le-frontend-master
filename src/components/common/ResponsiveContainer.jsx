import React from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = "", 
  size = "default", 
  padding = "default",
  as = "div" 
}) => {
  const sizeClasses = {
    small: "max-w-3xl",
    default: "max-w-7xl",
    large: "max-w-screen-2xl",
    full: "max-w-none"
  };

  const paddingClasses = {
    none: "",
    small: "px-4 sm:px-6",
    default: "px-4 sm:px-6 lg:px-8",
    large: "px-6 sm:px-8 lg:px-12"
  };

  const Component = as;

  return (
    <Component 
      className={`
        mx-auto 
        ${sizeClasses[size]} 
        ${paddingClasses[padding]} 
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer;