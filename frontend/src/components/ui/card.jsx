import React from 'react';
import PropTypes from "prop-types";

const Card = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-white shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = ({ children, className, ...props }) => {
  return <div className={`p-6 ${className}`} {...props}>{children}</div>;
};

const CardTitle = ({ children, className, ...props }) => {
  return <h2 className={`text-2xl font-bold text-gray-800 mb-2 ${className}`} {...props}>{children}</h2>;
};

const CardDescription = ({ children, className, ...props }) => {
  return <p className={`text-sm text-gray-600 ${className}`} {...props}>{children}</p>;
};

const CardContent = ({ children, className, ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 bg-gray-50 border-t border-gray-100 text-sm text-gray-600 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};