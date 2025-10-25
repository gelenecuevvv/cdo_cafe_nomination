export interface Cafe {
  cafe_id: number;
  cafe_name: string;
  address: string;
  latitude: number;
  longitude: number;
  facebook_link?: string;
  image_path?: string;
  nomination_count: number;
  created_at: string;
}

export interface Nomination {
  nomination_id: number;
  cafe_name: string;
  address: string;
  latitude: number;
  longitude: number;
  facebook_link?: string;
  reason: string;
  image_path?: string;
  user_id: string;
  user_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface LeaderboardItem {
  cafe_name: string;
  nomination_count: number;
  facebook_link?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  cafes?: Cafe[];
  nominations?: Nomination[];
  leaderboard?: LeaderboardItem[];
}

export interface FormData {
  cafe_name: string;
  address: string;
  facebook_link?: string;
  reason: string;
  photo?: File;
  latitude: number;
  longitude: number;
  user_id: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

