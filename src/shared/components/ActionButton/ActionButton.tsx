import React from 'react';

const ActionButton = ({ 
  icon: Icon, 
  onClick, 
  label,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} bg-white/90 hover:bg-white text-gray-700 rounded transition-all duration-200 shadow-lg ${className}`}
      aria-label={label}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
};

export default ActionButton;