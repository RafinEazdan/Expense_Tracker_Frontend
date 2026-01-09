import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../lib/api';
import type { User } from '../lib/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ArrowLeft, Mail, Calendar, Hash, Trash2, AlertTriangle } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user: contextUser, logout } = useAuth();
  const [user, setUser] = useState<User | null>(contextUser);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    } else {
      fetchProfile();
    }
  }, [contextUser]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await authApi.getProfile();
      setUser(data);
    } catch (error: any) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await authApi.deleteAccount();
      toast.success('Account deleted successfully');
      logout();
      navigate('/register');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete account');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Failed to load profile</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-4">
                <Mail className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">Your Profile</h1>
                <p className="text-primary-100 mt-1">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8 space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <Mail className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Email Address</p>
                <p className="text-lg text-gray-900 mt-1">{user.email}</p>
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <Hash className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">User ID</p>
                <p className="text-lg text-gray-900 mt-1">#{user.id}</p>
              </div>
            </div>

            {/* Account Created */}
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Account Created</p>
                <p className="text-lg text-gray-900 mt-1">
                  {format(new Date(user.created_at), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(user.created_at), 'h:mm a')}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 px-6 py-8 bg-red-50">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 rounded-lg p-3">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Permanently delete your account and all associated data
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-red-100 rounded-full p-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Account
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Are you absolutely sure you want to delete your account?
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-800 font-medium">
                    This action is permanent and cannot be undone.
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    All your expense data will be deleted permanently.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={deleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting ? 'Deleting...' : 'Delete My Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
