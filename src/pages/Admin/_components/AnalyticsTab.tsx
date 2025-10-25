import React from 'react';
import { Cafe } from '../../../types';

interface AnalyticsTabProps {
  cafes: Cafe[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ cafes }) => {
  const topCafes = cafes
    .sort((a, b) => b.nomination_count - a.nomination_count)
    .slice(0, 5);

  const recentActivity = [
    'New nomination for "Brew & Beans Coffee"',
    'Café "Coffee Project" approved',
    'User submitted 3 nominations',
    '"Starbucks CDO" reached 10 nominations',
    'New café "Café de Oro" added'
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-cafe-dark mb-6">Analytics Dashboard</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-cafe-beige rounded-lg p-6">
          <h4 className="text-lg font-semibold text-cafe-dark mb-4">Top 5 Cafés</h4>
          <div className="space-y-3">
            {topCafes.map((cafe, index) => (
              <div key={cafe.cafe_id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-cafe-gold text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <span className="text-cafe-dark">{cafe.cafe_name}</span>
                </div>
                <div className="text-cafe-gold font-semibold">{cafe.nomination_count}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-cafe-beige rounded-lg p-6">
          <h4 className="text-lg font-semibold text-cafe-dark mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="text-sm text-cafe-brown">
                • {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
