import { LucideIcon } from 'lucide-react';
import React from 'react';
interface NavItemProps{
  icon:LucideIcon;
  label:string;
  active:boolean;
  onClick:()=>void
}

const NavItem : React.FC<NavItemProps> = ({ icon: Icon, label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-gray-900 text-white' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
      title={label}
      aria-label={label}
    >
      <Icon size={20} />
    </button>
  );
};

export default NavItem;