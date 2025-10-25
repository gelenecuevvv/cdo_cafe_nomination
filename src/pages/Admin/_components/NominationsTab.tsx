import React from 'react';
import { Nomination } from '../../../types';
import { formatDate, showToast } from '../../../utils/helpers';

interface NominationsTabProps {
  nominations: Nomination[];
}

const NominationsTab: React.FC<NominationsTabProps> = ({ nominations }) => {
  const handleApprove = (nominationId: number) => {
    showToast('Nomination approved successfully!', 'success');
    // In a real app, you'd call the API here
  };

  const handleReject = (nominationId: number) => {
    showToast('Nomination rejected.', 'success');
    // In a real app, you'd call the API here
  };

  const handleApproveAll = () => {
    showToast('All nominations approved!', 'success');
    // In a real app, you'd call the API here
  };

  const handleRejectAll = () => {
    showToast('All nominations rejected.', 'success');
    // In a real app, you'd call the API here
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-cafe-dark">Pending Nominations</h3>
        <div className="flex gap-2">
          <button onClick={handleApproveAll} className="btn-cafe-outline text-sm">
            Approve All
          </button>
          <button onClick={handleRejectAll} className="btn-cafe-outline text-sm">
            Reject All
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {nominations.length > 0 ? (
          nominations.map((nomination) => (
            <div key={nomination.nomination_id} className="cafe-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-cafe-dark">{nomination.cafe_name}</h4>
                  <p className="text-cafe-brown text-sm mb-2">{nomination.address}</p>
                  <p className="text-cafe-dark italic">"{nomination.reason}"</p>
                  <div className="flex items-center mt-3 text-sm text-cafe-brown">
                    <span>Nominated by: {nomination.user_name || 'Anonymous'}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(nomination.created_at)}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleApprove(nomination.nomination_id)}
                    className="btn-cafe text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(nomination.nomination_id)}
                    className="btn-cafe-outline text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-cafe-dark mb-2">No pending nominations</h3>
            <p className="text-cafe-brown">All nominations have been processed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NominationsTab;
