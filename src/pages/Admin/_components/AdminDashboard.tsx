import React, { useEffect, useState } from 'react';
import { getCafes, getNominations } from '../../../utils/api';
import { Cafe, Nomination } from '../../../types';
import { logoutAdmin } from '../../../utils/helpers';
import StatsCards from './StatsCards';
import AdminTabs from './AdminTabs';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cafesResponse, nominationsResponse] = await Promise.all([
          getCafes(),
          getNominations('pending')
        ]);
        
        setCafes(cafesResponse.cafes);
        setNominations(nominationsResponse.nominations);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    onLogout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-cafe-dark">Admin Dashboard</h1>
          <p className="text-cafe-brown">Manage cafés and nominations</p>
        </div>
        <button onClick={handleLogout} className="btn-cafe-outline">
          Logout
        </button>
      </div>

      <StatsCards cafes={cafes} nominations={nominations} />
      <AdminTabs cafes={cafes} nominations={nominations} />
    </div>
  );
};

export default AdminDashboard;
