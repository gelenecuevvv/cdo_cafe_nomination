import React, { useEffect, useState } from 'react';
import { getCafes, getNominations } from '../../utils/api';
import { Cafe, Nomination } from '../../types';
import { isAdmin } from '../../utils/helpers';
import LoginForm from './_components/LoginForm';
import AdminDashboard from './_components/AdminDashboard';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const adminStatus = isAdmin();
      setIsLoggedIn(adminStatus);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Admin;
