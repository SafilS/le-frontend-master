import React from 'react';

const ResponsiveText = ({ 
  children, 
  as = "p", 
  size = "base", 
  weight = "normal", 
  className = "", 
  ...props 
}) => {
  const Component = as;

  const sizeClasses = {
    xs: "fluid-text-xs",
    sm: "fluid-text-sm", 
    base: "fluid-text-base",
    lg: "fluid-text-lg",
    xl: "fluid-text-xl",
    "2xl": "fluid-text-2xl",
    "3xl": "fluid-text-3xl",
    "4xl": "fluid-text-4xl",
    "5xl": "fluid-text-5xl",
    "6xl": "fluid-text-6xl",
    "7xl": "fluid-text-7xl",
    "8xl": "fluid-text-8xl",
    "9xl": "fluid-text-9xl"
  };

  const weightClasses = {
    thin: "font-thin",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black"
  };

  return (
    <Component 
      className={`
        ${sizeClasses[size]} 
        ${weightClasses[weight]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ResponsiveText;