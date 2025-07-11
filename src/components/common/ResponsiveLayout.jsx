import React from 'react';

// Responsive Grid Component
export const ResponsiveGrid = ({ 
  children, 
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = "md",
  className = "",
  ...props 
}) => {
  const gapClasses = {
    xs: "gap-2",
    sm: "gap-4", 
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10"
  };

  const colClasses = {
    xs: cols.xs ? `grid-cols-${cols.xs}` : "",
    sm: cols.sm ? `sm:grid-cols-${cols.sm}` : "",
    md: cols.md ? `md:grid-cols-${cols.md}` : "",
    lg: cols.lg ? `lg:grid-cols-${cols.lg}` : "",
    xl: cols.xl ? `xl:grid-cols-${cols.xl}` : ""
  };

  return (
    <div 
      className={`
        grid 
        ${Object.values(colClasses).join(' ')} 
        ${gapClasses[gap]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Flex Component
export const ResponsiveFlex = ({ 
  children, 
  direction = "row",
  wrap = true,
  justify = "start",
  align = "start",
  gap = "md",
  className = "",
  ...props 
}) => {
  const directionClasses = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    "col-reverse": "flex-col-reverse"
  };

  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };

  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch"
  };

  const gapClasses = {
    xs: "gap-2",
    sm: "gap-4", 
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10"
  };

  return (
    <div 
      className={`
        flex 
        ${directionClasses[direction]} 
        ${wrap ? 'flex-wrap' : 'flex-nowrap'} 
        ${justifyClasses[justify]} 
        ${alignClasses[align]} 
        ${gapClasses[gap]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Stack Component
export const ResponsiveStack = ({ 
  children, 
  spacing = "md",
  className = "",
  ...props 
}) => {
  const spacingClasses = {
    xs: "space-y-2",
    sm: "space-y-4", 
    md: "space-y-6",
    lg: "space-y-8",
    xl: "space-y-10"
  };

  return (
    <div 
      className={`
        ${spacingClasses[spacing]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Card Component
export const ResponsiveCard = ({ 
  children, 
  padding = "default",
  shadow = "default",
  rounded = "default",
  className = "",
  ...props 
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
    xl: "p-8 sm:p-10"
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    default: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl"
  };

  return (
    <div 
      className={`
        bg-white 
        ${paddingClasses[padding]} 
        ${shadowClasses[shadow]} 
        ${roundedClasses[rounded]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive Button Component
export const ResponsiveButton = ({ 
  children, 
  size = "default",
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props 
}) => {
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    default: "responsive-button",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
    xl: "px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl"
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  };

  return (
    <button 
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        rounded-lg 
        font-medium 
        transition-colors 
        duration-200 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default {
  ResponsiveGrid,
  ResponsiveFlex,
  ResponsiveStack,
  ResponsiveCard,
  ResponsiveButton
};