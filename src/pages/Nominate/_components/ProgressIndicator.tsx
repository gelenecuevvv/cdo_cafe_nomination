import React, { useState, useEffect } from 'react';
import { getUserId } from '../../../utils/helpers';

const ProgressIndicator: React.FC = () => {
  const [nominationCount, setNominationCount] = useState(0);

  useEffect(() => {
    // For demo purposes, we'll use a mock count
    // In a real app, you'd fetch this from the API
    const count = Math.floor(Math.random() * 5); // Mock count
    setNominationCount(count);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cafe-dark">Your Nominations</h3>
        <span className="text-cafe-gold font-semibold">{nominationCount} / 20</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(nominationCount / 20) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-cafe-brown mt-2">
        You can nominate up to 20 cafés. Each nomination helps build our community map.
      </p>
    </div>
  );
};

export default ProgressIndicator;
