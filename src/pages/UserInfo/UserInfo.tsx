import React, { useState } from 'react';
import { LogOut, Mail, Phone, User, Lock, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { logout } from '@/modules/auth/authSlice';
import { persistor } from '../../app/store';
import { appLogout, changePassword } from '@/services/authService';
import { showInfo, showSuccess } from '@/utils/swal';

const UserInfoPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    persistor.pause();
    dispatch(logout());
    await persistor.purge();
    await appLogout();
  };

  const handleChangePassword = async () => {
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await changePassword(password);
      setShowModal(false);
      setPassword('');
      setConfirmPassword('');
      showSuccess('Password changed successfully');
    } catch (err) {
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-2">Manage your account information</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-8 space-y-6">
            <InfoRow icon={<User />} label="Name" value={user?.name} />
            <InfoRow icon={<Mail />} label="Email" value={user?.email} />
            <InfoRow icon={<Phone />} label="Phone" value={user?.phone} />
          </div>

          <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                <Lock size={16} />
                <span>Change Password</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-white text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔐 Change Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Change Password
            </h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-60"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }: any) => (
  <div className="flex items-center space-x-4">
    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

export default UserInfoPage;
