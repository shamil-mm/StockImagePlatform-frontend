import { 
  Home, 
  Edit, 
  Download, 
  User, 
} from 'lucide-react';

export const SIDEBAR_MENU_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Edit, label: 'Create', path: '/create', divider: true },
  { icon: Download, label: 'Downloads', path: '/downloads', divider: true },
  { icon: User, label: 'Profile', path: '/profile' },

];