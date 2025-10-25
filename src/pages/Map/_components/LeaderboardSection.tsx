import React from 'react';
import { Cafe, LeaderboardItem } from '../../../types';

interface LeaderboardSectionProps {
  leaderboard: LeaderboardItem[];
  cafes: Cafe[];
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ leaderboard, cafes }) => {
  const totalNominations = cafes.reduce((sum, cafe) => sum + cafe.nomination_count, 0);
  const mostNominated = cafes.length > 0 ? 
    cafes.reduce((max, cafe) => cafe.nomination_count > max.nomination_count ? cafe : max).cafe_name : '-';

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-cafe-dark mb-4">Top 10 Most Nominated Cafés</h2>
        <div className="space-y-3">
          {leaderboard.length > 0 ? (
            leaderboard.map((cafe, index) => (
              <div key={index} className="leaderboard-item">
                <div className="leaderboard-rank">{index + 1}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-cafe-dark">{cafe.cafe_name}</h4>
                  <p className="text-sm text-cafe-brown">{cafe.nomination_count} nominations</p>
                </div>
                {cafe.facebook_link && (
                  <a 
                    href={cafe.facebook_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">☕</div>
              <p className="text-cafe-brown">No cafés nominated yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-cafe-dark mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-cafe-brown">Total Cafés:</span>
            <span className="font-semibold text-cafe-dark">{cafes.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cafe-brown">Total Nominations:</span>
            <span className="font-semibold text-cafe-dark">{totalNominations}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cafe-brown">Most Nominated:</span>
            <span className="font-semibold text-cafe-dark">{mostNominated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
