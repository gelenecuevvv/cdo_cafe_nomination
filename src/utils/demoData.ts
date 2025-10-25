import { Cafe, LeaderboardItem, Nomination } from '../types';

// Demo data for the application
export const demoCafes: Cafe[] = [
  {
    cafe_id: 1,
    cafe_name: "Brew & Beans Coffee",
    address: "Centrio Mall, Cagayan de Oro",
    latitude: 8.4808,
    longitude: 124.6479,
    facebook_link: "https://facebook.com/brewandbeans",
    image_path: "/images/brew-beans.jpg",
    nomination_count: 15,
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    cafe_id: 2,
    cafe_name: "Coffee Project",
    address: "SM CDO Downtown Premier, Cagayan de Oro",
    latitude: 8.4850,
    longitude: 124.6500,
    facebook_link: "https://facebook.com/coffeeproject",
    image_path: "/images/coffee-project.jpg",
    nomination_count: 12,
    created_at: "2024-01-20T14:15:00Z"
  },
  {
    cafe_id: 3,
    cafe_name: "Starbucks CDO",
    address: "Ayala Centrio Mall, Cagayan de Oro",
    latitude: 8.4750,
    longitude: 124.6400,
    facebook_link: "https://facebook.com/starbucks",
    image_path: "/images/starbucks.jpg",
    nomination_count: 8,
    created_at: "2024-01-25T09:45:00Z"
  }
];

export const demoLeaderboard: LeaderboardItem[] = [
  {
    cafe_name: "Brew & Beans Coffee",
    nomination_count: 15,
    facebook_link: "https://facebook.com/brewandbeans"
  },
  {
    cafe_name: "Coffee Project",
    nomination_count: 12,
    facebook_link: "https://facebook.com/coffeeproject"
  },
  {
    cafe_name: "Starbucks CDO",
    nomination_count: 8,
    facebook_link: "https://facebook.com/starbucks"
  },
  {
    cafe_name: "Café de Oro",
    nomination_count: 6,
    facebook_link: "https://facebook.com/cafedeoro"
  },
  {
    cafe_name: "The Coffee Bean & Tea Leaf",
    nomination_count: 4,
    facebook_link: "https://facebook.com/coffeebean"
  }
];

export const demoNominations: Nomination[] = [
  {
    nomination_id: 1,
    cafe_name: "Brew & Beans Coffee",
    address: "Centrio Mall, Cagayan de Oro",
    latitude: 8.4808,
    longitude: 124.6479,
    facebook_link: "https://facebook.com/brewandbeans",
    reason: "Amazing coffee and great atmosphere! Perfect for studying.",
    image_path: "/images/brew-beans.jpg",
    user_id: "user_123",
    user_name: "Maria Santos",
    status: "approved",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    nomination_id: 2,
    cafe_name: "Coffee Project",
    address: "SM CDO Downtown Premier, Cagayan de Oro",
    latitude: 8.4850,
    longitude: 124.6500,
    facebook_link: "https://facebook.com/coffeeproject",
    reason: "Best iced coffee in the city! Love their pastries too.",
    image_path: "/images/coffee-project.jpg",
    user_id: "user_456",
    user_name: "John Doe",
    status: "approved",
    created_at: "2024-01-20T14:15:00Z"
  }
];
