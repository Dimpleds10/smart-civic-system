import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
export const mockReports = [
  {
    id: 1,
    title: "Overflowing Garbage Bin",
    description: "The bin has not been cleared for days.",
    location: "Sector 15, Market Road",
    status: "reported",
    category: "garbage",
    created_at: "2025-09-25T10:00:00Z",
    upvotes: 12,
    comments: 2,
    image_url: "https://th.bing.com/th/id/OIP.a_2tqgDON9eywN9OpOtWYQHaFj?w=237&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"   // ✅ Your image
  },
  {
    id: 2,
    title: "Waterlogging on Main Street",
    description: "Heavy rains have caused severe waterlogging.",
    location: "Main Street, Near Park",
    status: "in_progress",
    category: "water",
    created_at: "2025-09-26T08:30:00Z",
    upvotes: 8,
    comments: 1,
    image_url: "https://th.bing.com/th/id/OIP.uxfOOTVAKwHROn6fe_F0cwHaE7?w=259&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"     // ✅ Your image
  },
  {
    id: 3,
    title: "Broken Public Toilet",
    description: "Door broken and facilities not working",
    location: "Temple Road, Sector 9",
    status: "resolved",
    category: "broken toilet",
    created_at: "2025-09-27T20:15:00Z",
    upvotes: 5,
    comments: 0,
    image_url: "https://th.bing.com/th/id/OIP.041fUq0bPlDiQUWJty-kIQHaD4?w=321&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"     // ✅ Your image
  }
];

export const mockWasteOffers = [
  {
    id: 1,
    title: 'Plastic Bottles - 50kg',
    category: 'plastic',
    quantity: '50kg',
    location: 'Koramangala, Bangalore',
    points: 250,
    user_name: 'Rahul Sharma',
    created_at: '2024-01-15T08:00:00Z',
    status: 'available'
  },
  {
    id: 2,
    title: 'Old Newspapers - 20kg',
    category: 'paper',
    quantity: '20kg',
    location: 'Lajpat Nagar, Delhi',
    points: 100,
    user_name: 'Priya Patel',
    created_at: '2024-01-14T16:30:00Z',
    status: 'claimed'
  }
];