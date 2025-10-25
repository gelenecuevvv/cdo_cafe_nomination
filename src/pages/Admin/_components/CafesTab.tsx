import React from 'react';
import { Cafe } from '../../../types';
import { formatDate, showToast } from '../../../utils/helpers';

interface CafesTabProps {
  cafes: Cafe[];
}

const CafesTab: React.FC<CafesTabProps> = ({ cafes }) => {
  const handleEdit = (cafeId: number) => {
    showToast('Edit café functionality coming soon!', 'success');
  };

  const handleDelete = (cafeId: number) => {
    if (confirm('Are you sure you want to delete this café?')) {
      showToast('Café deleted successfully!', 'success');
    }
  };

  const handleExport = () => {
    showToast('Exporting data...', 'success');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-cafe-dark">Manage Cafés</h3>
        <button onClick={handleExport} className="btn-cafe-outline">
          Export Data
        </button>
      </div>
      
      <div className="space-y-4">
        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            <div key={cafe.cafe_id} className="cafe-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-cafe-dark">{cafe.cafe_name}</h4>
                  <p className="text-cafe-brown text-sm mb-2">{cafe.address}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-cafe-gold font-semibold">{cafe.nomination_count} nominations</span>
                    <span className="text-cafe-brown">{formatDate(cafe.created_at)}</span>
                  </div>
                  {cafe.facebook_link && (
                    <a 
                      href={cafe.facebook_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook Page
                    </a>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(cafe.cafe_id)}
                    className="btn-cafe-outline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cafe.cafe_id)}
                    className="btn-cafe-outline text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-cafe-dark mb-2">No cafés found</h3>
            <p className="text-cafe-brown">Start by approving some nominations!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CafesTab;
