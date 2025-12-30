import { Routes, Route } from 'react-router-dom';
import Layout from '@/shared/components/Layout';
import ProtectedRoute from '@/shared/routes/ProtectedRoute';

import HomePage from '../pages/Home';
import UserInfoPage from '../pages/UserInfo';
import AuthPage from '@/pages/Auth';
import PostImagePage from '@/pages/PostImage';
import DownloadPage from '@/pages/Download';
import EditImage from '@/pages/EditImage';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<Layout/>}>
      <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserInfoPage/></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><PostImagePage/></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditImage/></ProtectedRoute>} />
      <Route path="/downloads" element={<ProtectedRoute><DownloadPage/></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;