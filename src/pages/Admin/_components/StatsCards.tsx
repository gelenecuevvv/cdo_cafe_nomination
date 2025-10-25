import React from 'react';
import { Cafe, Nomination } from '../../../types';

interface StatsCardsProps {
  cafes: Cafe[];
  nominations: Nomination[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ cafes, nominations }) => {
  const totalNominations = cafes.reduce((sum, cafe) => sum + cafe.nomination_count, 0);
  const pendingNominations = nominations.length;
  const activeUsers = Math.floor(cafes.length * 0.8);

  const stats = [
    {
      icon: '☕',
      value: cafes.length,
      label: 'Total Cafés',
      color: 'bg-cafe-gold'
    },
    {
      icon: '📝',
      value: totalNominations,
      label: 'Total Nominations',
      color: 'bg-green-500'
    },
    {
      icon: '⏳',
      value: pendingNominations,
      label: 'Pending',
      color: 'bg-yellow-500'
    },
    {
      icon: '👥',
      value: activeUsers,
      label: 'Active Users',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className={`${stat.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-cafe-dark">{stat.value}</div>
              <div className="text-cafe-brown">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
