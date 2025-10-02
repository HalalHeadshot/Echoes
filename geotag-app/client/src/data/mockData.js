// Mock user data
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

// Mock memories data
export const mockMemories = [
  {
    id: '1',
    title: 'Beach Sunset',
    description: 'Beautiful sunset at Santa Monica Beach with friends. The sky was painted in shades of orange and pink.',
    location: {
      coordinates: [-118.4912, 34.0195], // [longitude, latitude]
      address: 'Santa Monica Beach, CA'
    },
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    createdAt: '2024-08-15T18:30:00Z'
  },
  {
    id: '2',
    title: 'Mountain Hike',
    description: 'Reached the summit after a 5-hour hike. The view was absolutely worth it!',
    location: {
      coordinates: [-119.5383, 37.8651], // Yosemite
      address: 'Yosemite National Park, CA'
    },
    photoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    createdAt: '2024-07-22T14:20:00Z'
  },
  {
    id: '3',
    title: 'Coffee Shop Corner',
    description: 'Found this cozy coffee shop in downtown. Perfect spot for working remotely.',
    location: {
      coordinates: [-118.2437, 34.0522], // LA Downtown
      address: 'Downtown Los Angeles, CA'
    },
    photoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    createdAt: '2024-09-10T09:15:00Z'
  },
  {
    id: '4',
    title: 'City Lights',
    description: 'Night photography session in the city. Captured some amazing light trails.',
    location: {
      coordinates: [-122.4194, 37.7749], // San Francisco
      address: 'San Francisco, CA'
    },
    photoUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
    createdAt: '2024-06-05T21:45:00Z'
  },
  {
    id: '5',
    title: 'Desert Adventure',
    description: 'Camping under the stars in Joshua Tree. The Milky Way was spectacular.',
    location: {
      coordinates: [-116.0377, 34.1361], // Joshua Tree
      address: 'Joshua Tree National Park, CA'
    },
    photoUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600',
    createdAt: '2024-05-18T23:00:00Z'
  }
];