import React from 'react';
import PropTypes from "prop-types";

const Button = React.forwardRef(({ type, className, disabled, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={`
        inline-flex items-center justify-center px-4 py-2 border border-transparent 
        rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200 ease-in-out ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;