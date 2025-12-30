import React from 'react';

type Size = 'sm' | 'md' | 'lg';

interface ActionButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>; // Lucide icon type
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  size?: Size;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  size = 'md',
  className = ''
}) => {
  const sizeClasses: Record<Size, string> = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes: Record<Size, number> = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const iconSize = iconSizes[size];

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} bg-white/90 hover:bg-white text-gray-700 rounded transition-all duration-200 shadow-lg ${className}`}
      aria-label={label}
    >
      <Icon width={iconSize} height={iconSize} />
    </button>
  );
};

export default ActionButton;
