
import Sidebar from '../../../modules/navigation/components/Sidebar';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="ml-16 flex-1">
       <Outlet/>
      </main>
    </div>
  );
};

export default Layout;