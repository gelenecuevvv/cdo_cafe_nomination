import React, { useState } from 'react';
import { Cafe, Nomination } from '../../../types';
import NominationsTab from './NominationsTab';
import CafesTab from './CafesTab';
import AnalyticsTab from './AnalyticsTab';

interface AdminTabsProps {
  cafes: Cafe[];
  nominations: Nomination[];
}

const AdminTabs: React.FC<AdminTabsProps> = ({ cafes, nominations }) => {
  const [activeTab, setActiveTab] = useState('nominations');

  const tabs = [
    { id: 'nominations', label: 'Pending Nominations' },
    { id: 'cafes', label: 'Manage Cafés' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'nominations' && (
          <NominationsTab nominations={nominations} />
        )}
        {activeTab === 'cafes' && (
          <CafesTab cafes={cafes} />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsTab cafes={cafes} />
        )}
      </div>
    </div>
  );
};

export default AdminTabs;
