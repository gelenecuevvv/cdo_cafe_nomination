import React from 'react';
import { Nomination } from '../../../types';
import { formatDate } from '../../../utils/helpers';

interface RecentNominationsProps {
  nominations: Nomination[];
}

const RecentNominations: React.FC<RecentNominationsProps> = ({ nominations }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-cafe-dark mb-6">Recent Nominations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nominations.length > 0 ? (
          nominations.map((nomination) => (
            <div key={nomination.nomination_id} className="cafe-card p-6">
              <h3 className="text-lg font-semibold text-cafe-dark mb-2">{nomination.cafe_name}</h3>
              <p className="text-cafe-brown text-sm mb-3">{nomination.address}</p>
              <p className="text-cafe-dark text-sm italic">"{nomination.reason}"</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-cafe-brown">{formatDate(nomination.created_at)}</span>
                {nomination.facebook_link && (
                  <a 
                    href={nomination.facebook_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
            <h3 className="text-xl font-semibold text-cafe-dark mb-2">No nominations yet</h3>
            <p className="text-cafe-brown">Be the first to nominate a café!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentNominations;
