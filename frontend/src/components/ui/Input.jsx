import React from 'react';
import PropTypes from "prop-types";

const Input = React.forwardRef(({ id, type, placeholder, value, onChange, required, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`
        block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
        placeholder-gray-400 focus:outline-none  sm:text-sm transition-shadow duration-200 ease-in-out
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;