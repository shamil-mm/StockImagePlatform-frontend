import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import NavItem from '../NavItem';
import { SIDEBAR_MENU_ITEMS } from '../../constants/menuItems';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path:string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <aside className="fixed left-0 top-5 h-screen w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4 z-50">
      <Logo />
      
      <div className="w-10 h-px bg-gray-200 my-2" />
      <div className="flex flex-col gap-4 flex-1">
        {SIDEBAR_MENU_ITEMS.map((item, index) => (
          <React.Fragment key={index}>
            <NavItem 
              {...item} 
              active={location.pathname === item.path}
              onClick={() => handleNavClick(item.path)}
            />
            {item.divider && <div className="w-10 h-px bg-gray-200 my-2" />}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;