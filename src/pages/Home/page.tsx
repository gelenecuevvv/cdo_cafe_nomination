import React, { useEffect, useState } from 'react';
import { getCafes, getLeaderboard } from '../../utils/api';
import { Cafe, LeaderboardItem } from '../../types';
import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/FeaturesSection';
import StatsSection from './_components/StatsSection';
import TopCafesSection from './_components/TopCafesSection';

const Home: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cafesResponse, leaderboardResponse] = await Promise.all([
          getCafes(),
          getLeaderboard()
        ]);
        
        setCafes(cafesResponse.cafes);
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
    <div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection cafes={cafes} />
      <TopCafesSection leaderboard={leaderboard} />
    </div>
  );
};

export default Home;
