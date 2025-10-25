import { ApiResponse, Cafe, Nomination, LeaderboardItem } from '../types';
import { demoCafes, demoLeaderboard, demoNominations } from './demoData';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Utility function to make API requests
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// Demo mode - simulate API calls with mock data
const simulateDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// API functions using localStorage data
export const getCafes = async (): Promise<{ cafes: Cafe[] }> => {
  try {
    // Try to fetch from database first
    const response = await apiRequest<{ cafes: Cafe[] }>('/cafes');
    return response;
  } catch (error) {
    console.log('Database unavailable, using localStorage:', error);
    
    // Fallback: Get from localStorage
    const localCafes = JSON.parse(localStorage.getItem('cafes') || '[]');
    const allCafes = [...localCafes, ...demoCafes];
    
    return { cafes: allCafes };
  }
};

export const getNominations = async (status?: string): Promise<{ nominations: Nomination[] }> => {
  try {
    // Try to fetch from database first
    const url = status ? `/nominations?status=${status}` : '/nominations';
    const response = await apiRequest<{ nominations: Nomination[] }>(url);
    return response;
  } catch (error) {
    console.log('Database unavailable, using localStorage:', error);
    
    // Fallback: Get from localStorage
    const localNominations = JSON.parse(localStorage.getItem('nominations') || '[]');
    const allNominations = [...localNominations, ...demoNominations];
    
    let nominations = allNominations;
    if (status) {
      nominations = nominations.filter(nomination => nomination.status === status);
    }
    
    return { nominations };
  }
};

export const getLeaderboard = async (): Promise<{ leaderboard: LeaderboardItem[] }> => {
  await simulateDelay(500);
  
  // Calculate leaderboard from localStorage data
  const localCafes = JSON.parse(localStorage.getItem('cafes') || '[]');
  const localNominations = JSON.parse(localStorage.getItem('nominations') || '[]');
  
  // Count nominations per café
  const nominationCounts: { [key: string]: number } = {};
  localNominations.forEach(nomination => {
    const cafeId = nomination.cafe_id;
    nominationCounts[cafeId] = (nominationCounts[cafeId] || 0) + 1;
  });
  
  // Create leaderboard from local data
  const localLeaderboard = localCafes.map(cafe => ({
    cafe_name: cafe.cafe_name,
    nomination_count: nominationCounts[cafe.cafe_id] || 0,
    facebook_link: cafe.facebook_link
  })).filter(item => item.nomination_count > 0);
  
  // Combine with demo data
  const allLeaderboard = [...localLeaderboard, ...demoLeaderboard];
  
  return { leaderboard: allLeaderboard };
};

export const submitNomination = async (formData: any): Promise<ApiResponse<any>> => {
  try {
    // Try to submit to database first
    console.log('Attempting to save to database...');
    
    const cafeData = {
      cafe_name: formData.cafe_name,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      facebook_link: formData.facebook_link || null,
      image_path: formData.image_path || null
    };

    // Create café first
    const cafeResponse = await apiRequest<{ cafe_id: number }>('/cafes', {
      method: 'POST',
      body: JSON.stringify(cafeData)
    });

    // Then create nomination
    const nominationData = {
      user_id: parseInt(formData.user_id),
      cafe_id: cafeResponse.cafe_id,
      reason: formData.reason
    };
    
    console.log('📝 Sending nomination data:', nominationData);

    const response = await apiRequest<{ message: string; nomination_id: number; remaining_nominations: number }>('/nominations', {
      method: 'POST',
      body: JSON.stringify(nominationData)
    });

    console.log('✅ Nomination saved to DATABASE:', response);
    
    return {
      success: true,
      message: 'Nomination submitted successfully! (Saved to database)',
      data: {
        nomination_id: response.nomination_id,
        remaining_nominations: response.remaining_nominations
      }
    };
  } catch (error) {
    console.log('Database unavailable, saving locally:', error);
    
    // Fallback: Store in localStorage
    const nominations = JSON.parse(localStorage.getItem('nominations') || '[]');
    const cafes = JSON.parse(localStorage.getItem('cafes') || '[]');
    
    // Check if café already exists
    let cafeId = cafes.findIndex(cafe => 
      cafe.cafe_name === formData.cafe_name && 
      cafe.address === formData.address
    );
    
    if (cafeId === -1) {
      // Create new café
      const newCafe = {
        cafe_id: Date.now(),
        cafe_name: formData.cafe_name,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        facebook_link: formData.facebook_link || null,
        image_path: formData.image_path || null,
        created_at: new Date().toISOString()
      };
      cafes.push(newCafe);
      cafeId = newCafe.cafe_id;
      localStorage.setItem('cafes', JSON.stringify(cafes));
    } else {
      cafeId = cafes[cafeId].cafe_id;
    }
    
    // Create nomination
    const newNomination = {
      nomination_id: Date.now(),
      user_id: formData.user_id,
      cafe_id: cafeId,
      reason: formData.reason,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    nominations.push(newNomination);
    localStorage.setItem('nominations', JSON.stringify(nominations));
    
    console.log('✅ Nomination saved locally (database unavailable):', newNomination);
    console.log('📊 Total nominations:', nominations.length);
    
    return {
      success: true,
      message: 'Nomination submitted successfully! (Saved locally - MySQL not running)',
      data: {
        nomination_id: newNomination.nomination_id,
        remaining_nominations: 20 - nominations.length
      }
    };
  }
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
