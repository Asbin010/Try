import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ShieldCheckIcon,
  EnvelopeIcon,
  UserIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  ipAddress?: string;
}

interface LoginForm {
  username: string;
  password: string;
}

const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<LoginForm>({ username: '', password: '' });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if already logged in (token in localStorage)
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchContacts();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', loginData, {
        timeout: 10000,
      });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        setIsLoggedIn(true);
        fetchContacts();
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else if (error.code === 'ECONNABORTED') {
        setLoginError('Request timeout. Please check your connection.');
      } else if (error.code === 'ERR_NETWORK') {
        setLoginError('Cannot connect to server. Please check if the backend is running.');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/admin/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error: any) {
      console.error('Failed to fetch contacts:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setContacts([]);
    setSelectedContact(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const goHome = () => {
    window.location.href = '/';
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="card">
            <div className="text-center mb-8">
              <ShieldCheckIcon className="h-16 w-16 text-neon-green mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gradient mb-2">Admin Access</h1>
              <p className="text-dark-muted">Secure portal for portfolio management</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="input-field"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="input-field pr-12"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-muted hover:text-neon-green"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {loginError}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner w-5 h-5 mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={goHome}
                className="text-dark-muted hover:text-neon-green transition-colors duration-300 text-sm flex items-center justify-center mx-auto"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Portfolio
              </button>
            </div>

            <div className="mt-6 p-4 bg-dark-hover/50 rounded-lg border border-gray-800">
              <p className="text-xs text-dark-muted text-center">
                Demo Credentials: admin / cyber123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <ShieldCheckIcon className="h-8 w-8 text-neon-green" />
            <div>
              <h1 className="text-2xl font-bold text-gradient">Admin Dashboard</h1>
              <p className="text-dark-muted">Contact form submissions</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={goHome}
              className="btn-secondary"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Portfolio
            </button>
            <button
              onClick={handleLogout}
              className="btn-primary"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card text-center">
            <EnvelopeIcon className="h-8 w-8 text-neon-green mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gradient">{contacts.length}</h3>
            <p className="text-dark-muted">Total Messages</p>
          </div>
          <div className="card text-center">
            <UserIcon className="h-8 w-8 text-neon-blue mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gradient">
              {new Set(contacts.map(c => c.email)).size}
            </h3>
            <p className="text-dark-muted">Unique Contacts</p>
          </div>
          <div className="card text-center">
            <CalendarIcon className="h-8 w-8 text-neon-purple mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gradient">
              {contacts.filter(c => 
                new Date(c.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </h3>
            <p className="text-dark-muted">This Week</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contacts List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-gradient mb-6">Recent Messages</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 bg-dark-hover rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedContact?._id === contact._id
                        ? 'border-neon-green bg-neon-green/5'
                        : 'border-gray-700 hover:border-neon-green/50'
                    }`}
                    onClick={() => setSelectedContact(contact)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-dark-text">{contact.name}</h3>
                        <p className="text-neon-green text-sm">{contact.email}</p>
                        <p className="text-dark-muted text-xs mt-1">
                          {formatDate(contact.submittedAt)}
                        </p>
                      </div>
                      <div className="text-neon-green">
                        <EnvelopeIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-dark-muted text-sm mt-2 line-clamp-2">
                      {contact.message.substring(0, 100)}
                      {contact.message.length > 100 ? '...' : ''}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {contacts.length === 0 && (
                <div className="text-center py-8">
                  <EnvelopeIcon className="h-12 w-12 text-dark-muted mx-auto mb-4" />
                  <p className="text-dark-muted">No messages yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Message Detail */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-gradient mb-6">Message Details</h2>
            {selectedContact ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Name</label>
                  <p className="text-neon-green font-semibold">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Email</label>
                  <p className="text-neon-blue">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Submitted</label>
                  <p className="text-dark-muted font-mono text-sm">
                    {formatDate(selectedContact.submittedAt)}
                  </p>
                </div>
                {selectedContact.ipAddress && (
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">IP Address</label>
                    <p className="text-dark-muted font-mono text-sm">{selectedContact.ipAddress}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Message</label>
                  <div className="bg-dark-hover p-4 rounded-lg border border-gray-700">
                    <p className="text-dark-text leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    className="btn-primary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(`mailto:${selectedContact.email}`, '_blank')}
                  >
                    Reply via Email
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <EnvelopeIcon className="h-16 w-16 text-dark-muted mx-auto mb-4" />
                <p className="text-dark-muted">Select a message to view details</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;