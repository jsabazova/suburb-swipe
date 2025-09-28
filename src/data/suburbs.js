// Melbourne suburbs data with Unsplash image integration

const UNSPLASH_ACCESS_KEY = 'your-unsplash-access-key'; // Replace with actual API key
const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos';

// Default Melbourne suburbs for the game
export const MELBOURNE_SUBURBS = [
  {
    id: 'fitzroy',
    name: 'Fitzroy',
    description: 'Hip inner-city suburb known for its street art and cafes'
  },
  {
    id: 'st-kilda',
    name: 'St Kilda',
    description: 'Beachside suburb with vibrant nightlife and Luna Park'
  },
  {
    id: 'brighton',
    name: 'Brighton',
    description: 'Affluent bayside suburb with colorful beach boxes'
  },
  {
    id: 'south-yarra',
    name: 'South Yarra',
    description: 'Trendy suburb with upscale shopping on Chapel Street'
  },
  {
    id: 'carlton',
    name: 'Carlton',
    description: 'Cultural hub home to Melbourne University and Little Italy'
  },
  {
    id: 'brunswick',
    name: 'Brunswick',
    description: 'Eclectic inner suburb with live music venues and diverse food'
  },
  {
    id: 'richmond',
    name: 'Richmond',
    description: 'Former working-class suburb now trendy with Vietnamese cuisine'
  },
  {
    id: 'toorak',
    name: 'Toorak',
    description: 'Prestigious suburb known for luxury shopping and dining'
  },
  {
    id: 'collingwood',
    name: 'Collingwood',
    description: 'Artistic enclave with warehouses converted to lofts and galleries'
  },
  {
    id: 'prahran',
    name: 'Prahran',
    description: 'Bustling suburb with Chapel Street shopping and nightlife'
  }
];

/**
 * Fetch image from Unsplash API
 * @param {string} query - Search query for the image
 * @returns {Promise<string>} Image URL
 */
async function fetchUnsplashImage(query) {
  // For development, we'll use placeholder images from Unsplash
  // In production, you'd want to use the actual API with proper error handling

  try {
    // Using Unsplash Source for direct image URLs (no API key required for demo)
    // This provides random images based on search terms
    const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},melbourne,australia,suburb`;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Fallback to a default image
    return `https://source.unsplash.com/800x600/?melbourne,australia`;
  }
}

/**
 * Get suburbs with images
 * @returns {Promise<Array>} Array of suburbs with image URLs
 */
export async function getSuburbsWithImages() {
  const suburbsWithImages = await Promise.all(
    MELBOURNE_SUBURBS.map(async (suburb) => {
      const imageUrl = await fetchUnsplashImage(`${suburb.name} melbourne`);
      return {
        ...suburb,
        imageUrl,
        // Add some random variance to image URLs to get different images on refresh
        imageId: Math.random().toString(36).substr(2, 9)
      };
    })
  );

  return suburbsWithImages;
}

/**
 * Alternative method using curated images for better consistency
 * This uses specific Unsplash photo IDs for each suburb to ensure quality
 */
export const SUBURB_IMAGES = {
  'fitzroy': 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&h=600&fit=crop',
  'st-kilda': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'brighton': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  'south-yarra': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop',
  'carlton': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
  'brunswick': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
  'richmond': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'toorak': 'https://images.unsplash.com/photo-1464822759844-d150ad6d1b99?w=800&h=600&fit=crop',
  'collingwood': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
  'prahran': 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop'
};

/**
 * Get suburbs with curated images for consistent quality
 * @returns {Array} Array of suburbs with curated image URLs
 */
export function getSuburbsWithCuratedImages() {
  return MELBOURNE_SUBURBS.map(suburb => ({
    ...suburb,
    imageUrl: SUBURB_IMAGES[suburb.id] || SUBURB_IMAGES['fitzroy'] // fallback
  }));
}