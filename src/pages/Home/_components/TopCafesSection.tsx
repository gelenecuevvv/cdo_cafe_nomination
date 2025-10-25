import React from 'react';
import { Link } from 'react-router-dom';
import { LeaderboardItem } from '../../../types';

interface TopCafesSectionProps {
  leaderboard: LeaderboardItem[];
}

const TopCafesSection: React.FC<TopCafesSectionProps> = ({ leaderboard }) => {
  const topCafes = leaderboard.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-cafe-dark mb-4">Top Nominated Cafés</h2>
          <p className="text-lg text-cafe-brown">
            See which cafés are getting the most love from our community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCafes.length > 0 ? (
            topCafes.map((cafe, index) => (
              <div key={index} className="cafe-card p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-cafe-gold text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-cafe-dark">{cafe.cafe_name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cafe-gold font-semibold">{cafe.nomination_count} nominations</span>
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
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-xl font-semibold text-cafe-dark mb-2">No cafés nominated yet</h3>
              <p className="text-cafe-brown">Be the first to nominate your favorite café!</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/map" className="btn-cafe-outline">
            View Full Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCafesSection;
