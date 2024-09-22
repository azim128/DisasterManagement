import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ children, value, onValueChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
            disabled,
            value,
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: (selectedValue) => {
              onValueChange(selectedValue);
              setIsOpen(false);
            },
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, onClick, isOpen, disabled, value }) => {
  return (
    <button
      className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border rounded-md shadow-sm ${
        isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
      } ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'hover:border-gray-400'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {React.Children.map(children, child => 
        child.type === SelectValue ? React.cloneElement(child, { value }) : child
      )}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
    </button>
  );
};

const SelectValue = ({ placeholder, value }) => {
  return <span className="block truncate">{value || placeholder}</span>;
};

const SelectContent = ({ children, isOpen, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
      <ul className="py-1 overflow-auto text-base max-h-60 focus:outline-none sm:text-sm">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { onSelect })
        )}
      </ul>
    </div>
  );
};

const SelectItem = ({ children, value, onSelect }) => {
  return (
    <li
      className="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9 hover:bg-blue-100"
      onClick={() => onSelect(value)}
    >
      <span className="block truncate">{children}</span>
    </li>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };