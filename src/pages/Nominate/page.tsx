import React, { useEffect, useState } from 'react';
import { getNominations } from '../../utils/api';
import { Nomination } from '../../types';
import ProgressIndicator from './_components/ProgressIndicator';
import NominationForm from './_components/NominationForm';
import RecentNominations from './_components/RecentNominations';

const Nominate: React.FC = () => {
  const [recentNominations, setRecentNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentNominations = async () => {
      try {
        const response = await getNominations('approved');
        setRecentNominations(response.nominations.slice(0, 6));
      } catch (error) {
        console.error('Error loading recent nominations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentNominations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cafe-dark mb-4">Nominate Your Favorite Café</h1>
        <p className="text-lg text-cafe-brown">
          Share your favorite café with the CDO community and help others discover great coffee spots
        </p>
      </div>

      <ProgressIndicator />
      <NominationForm />
      <RecentNominations nominations={recentNominations} />
    </div>
  );
};

export default Nominate;
