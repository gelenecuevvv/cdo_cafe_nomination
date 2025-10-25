import React from 'react';
import { Cafe } from '../../../types';

interface StatsSectionProps {
  cafes: Cafe[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ cafes }) => {
  const totalNominations = cafes.reduce((sum, cafe) => sum + cafe.nomination_count, 0);
  const activeUsers = Math.floor(cafes.length * 0.8); // Estimated active users

  return (
    <section className="py-20 bg-cafe-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-cafe-dark mb-4">Community Impact</h2>
          <p className="text-lg text-cafe-brown">
            See how our community is growing
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-cafe-gold mb-2">{cafes.length}</div>
            <div className="text-cafe-dark font-medium">Cafés Nominated</div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-cafe-gold mb-2">{totalNominations}</div>
            <div className="text-cafe-dark font-medium">Total Nominations</div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-cafe-gold mb-2">{activeUsers}</div>
            <div className="text-cafe-dark font-medium">Active Contributors</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
