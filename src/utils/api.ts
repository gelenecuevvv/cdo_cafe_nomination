import { ApiResponse, Cafe, Nomination, LeaderboardItem } from '../types';
import { demoCafes, demoLeaderboard, demoNominations } from './demoData';

// Demo mode - simulate API calls with mock data
const simulateDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// API functions using demo data
export const getCafes = async (): Promise<{ cafes: Cafe[] }> => {
  await simulateDelay(500);
  return { cafes: demoCafes };
};

export const getNominations = async (status?: string): Promise<{ nominations: Nomination[] }> => {
  await simulateDelay(500);
  let nominations = demoNominations;
  
  if (status) {
    nominations = nominations.filter(nomination => nomination.status === status);
  }
  
  return { nominations };
};

export const getLeaderboard = async (): Promise<{ leaderboard: LeaderboardItem[] }> => {
  await simulateDelay(500);
  return { leaderboard: demoLeaderboard };
};

export const submitNomination = async (formData: any): Promise<ApiResponse<any>> => {
  await simulateDelay(1000);
  
  // Simulate successful submission
  console.log('Demo: Nomination submitted:', formData);
  
  return {
    success: true,
    message: 'Nomination submitted successfully',
    data: {
      nomination_id: Math.floor(Math.random() * 1000),
      ...formData
    }
  };
};

export const approveNomination = async (nominationId: number): Promise<ApiResponse<any>> => {
  await simulateDelay(500);
  
  console.log('Demo: Nomination approved:', nominationId);
  
  return {
    success: true,
    message: 'Nomination approved successfully'
  };
};

export const rejectNomination = async (nominationId: number): Promise<ApiResponse<any>> => {
  await simulateDelay(500);
  
  console.log('Demo: Nomination rejected:', nominationId);
  
  return {
    success: true,
    message: 'Nomination rejected'
  };
};
