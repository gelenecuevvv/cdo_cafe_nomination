import React from 'react';
import { Link } from 'react-router-dom';
import { Cafe } from '../../../types';

interface CafeModalProps {
  cafe: Cafe | null;
  onClose: () => void;
}

const CafeModal: React.FC<CafeModalProps> = ({ cafe, onClose }) => {
  if (!cafe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-cafe-dark">{cafe.cafe_name}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-cafe-dark">Address:</h4>
              <p className="text-cafe-brown">{cafe.address}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-cafe-dark">Nominations:</h4>
              <p className="text-cafe-gold font-semibold">{cafe.nomination_count} nominations</p>
            </div>
            
            {cafe.facebook_link && (
              <div>
                <h4 className="font-semibold text-cafe-dark">Facebook:</h4>
                <a 
                  href={cafe.facebook_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Visit Facebook Page
                </a>
              </div>
            )}
            
            {cafe.image_path && (
              <div>
                <img 
                  src={cafe.image_path} 
                  alt={cafe.cafe_name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          
          <div className="mt-6 flex gap-3">
            <button 
              onClick={onClose}
              className="btn-cafe-outline flex-1"
            >
              Close
            </button>
            <Link 
              to="/nominate" 
              className="btn-cafe flex-1 text-center"
            >
              Nominate Another
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeModal;
