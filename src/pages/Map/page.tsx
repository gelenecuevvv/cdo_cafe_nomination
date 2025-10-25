import React, { useEffect, useState } from 'react';
import { getCafes, getLeaderboard } from '../../utils/api';
import { Cafe, LeaderboardItem } from '../../types';
import MapSection from './_components/MapSection';
import LeaderboardSection from './_components/LeaderboardSection';
import SearchAndFilters from './_components/SearchAndFilters';
import CafeModal from './_components/CafeModal';

const Map: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cafesResponse, leaderboardResponse] = await Promise.all([
          getCafes(),
          getLeaderboard()
        ]);
        
        setCafes(cafesResponse.cafes);
        setFilteredCafes(cafesResponse.cafes);
        setLeaderboard(leaderboardResponse.leaderboard);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-cafe-dark mb-4">CDO Café Map & Leaderboard</h1>
        <p className="text-lg text-cafe-brown">
          Explore all nominated cafés in Cagayan de Oro and see which ones are most popular
        </p>
      </div>

      <SearchAndFilters 
        cafes={cafes} 
        onFilterChange={setFilteredCafes}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <MapSection 
          cafes={filteredCafes} 
          onCafeSelect={setSelectedCafe}
        />
        <LeaderboardSection 
          leaderboard={leaderboard}
          cafes={filteredCafes}
        />
      </div>

      <CafeModal 
        cafe={selectedCafe} 
        onClose={() => setSelectedCafe(null)}
      />
    </div>
  );
};

export default Map;
