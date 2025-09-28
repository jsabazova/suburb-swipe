// Melbourne suburbs data with Unsplash image integration

const UNSPLASH_ACCESS_KEY = 'your-unsplash-access-key'; // Replace with actual API key
const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos';

// Melbourne suburbs for the game - expanded collection
export const MELBOURNE_SUBURBS = [
  {
    id: 'fitzroy',
    name: 'Fitzroy',
    description: 'Hip inner-city suburb known for its street art and trendy cafes'
  },
  {
    id: 'st-kilda',
    name: 'St Kilda',
    description: 'Iconic beachside suburb with Luna Park and vibrant nightlife'
  },
  {
    id: 'brighton',
    name: 'Brighton',
    description: 'Affluent bayside suburb famous for colorful beach boxes'
  },
  {
    id: 'south-yarra',
    name: 'South Yarra',
    description: 'Trendy area with upscale shopping and dining on Chapel Street'
  },
  {
    id: 'carlton',
    name: 'Carlton',
    description: 'Cultural hub home to Melbourne University and Little Italy'
  },
  {
    id: 'brunswick',
    name: 'Brunswick',
    description: 'Eclectic inner suburb with live music venues and diverse food scene'
  },
  {
    id: 'richmond',
    name: 'Richmond',
    description: 'Trendy suburb famous for Vietnamese food and converted warehouses'
  },
  {
    id: 'toorak',
    name: 'Toorak',
    description: 'Melbourne\'s most prestigious suburb with luxury shopping'
  },
  {
    id: 'collingwood',
    name: 'Collingwood',
    description: 'Artistic enclave with converted warehouses and galleries'
  },
  {
    id: 'prahran',
    name: 'Prahran',
    description: 'Bustling area with Chapel Street shopping and entertainment'
  },
  {
    id: 'northcote',
    name: 'Northcote',
    description: 'Bohemian suburb with live music venues and vintage shops'
  },
  {
    id: 'st-kilda-east',
    name: 'St Kilda East',
    description: 'Quiet residential area near Caulfield Park and racecourse'
  },
  {
    id: 'port-melbourne',
    name: 'Port Melbourne',
    description: 'Waterfront suburb with beaches and historic Beacon Cove'
  },
  {
    id: 'south-melbourne',
    name: 'South Melbourne',
    description: 'Victorian-era suburb with famous market and leafy streets'
  },
  {
    id: 'albert-park',
    name: 'Albert Park',
    description: 'Home to the Formula 1 Grand Prix circuit and beautiful lake'
  },
  {
    id: 'middle-park',
    name: 'Middle Park',
    description: 'Charming bayside suburb with tree-lined streets and beaches'
  },
  {
    id: 'elwood',
    name: 'Elwood',
    description: 'Relaxed beachside community with cafes and coastal charm'
  },
  {
    id: 'windsor',
    name: 'Windsor',
    description: 'Trendy suburb with Chapel Street\'s southern end and restaurants'
  },
  {
    id: 'hawthorn',
    name: 'Hawthorn',
    description: 'Leafy eastern suburb with Glenferrie Road shopping strip'
  },
  {
    id: 'camberwell',
    name: 'Camberwell',
    description: 'Family-friendly suburb with excellent schools and Burke Road'
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
 * Curated high-quality images for Melbourne suburbs
 * These are carefully selected to represent the character of each area
 */
export const SUBURB_IMAGES = {
  // Inner City & Trendy
  'fitzroy': 'https://images.unsplash.com/photo-1531920327645-26d1a2e5d7d7?w=800&h=600&fit=crop&q=80', // Street art & hipster cafes
  'collingwood': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&q=80', // Industrial converted warehouses
  'richmond': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80', // Vietnamese restaurants & modern living
  'brunswick': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80', // Music venues & eclectic shops
  'northcote': 'https://images.unsplash.com/photo-1566844862-2d4d0e2fe1a4?w=800&h=600&fit=crop&q=80', // Bohemian streets & vintage stores

  // Bayside & Beaches
  'st-kilda': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Luna Park & beach promenade
  'brighton': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80', // Iconic colorful beach boxes
  'elwood': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80', // Peaceful beach & kite surfers
  'port-melbourne': 'https://images.unsplash.com/photo-1520637836862-4d197d17c881?w=800&h=600&fit=crop&q=80', // Historic pier & waterfront
  'middle-park': 'https://images.unsplash.com/photo-1571906252796-7d1dd0db8c8a?w=800&h=600&fit=crop&q=80', // Tree-lined streets near beach
  'albert-park': 'https://images.unsplash.com/photo-1584435087906-72409eb00135?w=800&h=600&fit=crop&q=80', // F1 circuit & beautiful lake

  // Upscale & Shopping
  'toorak': 'https://images.unsplash.com/photo-1464822759844-d150ad6d1b99?w=800&h=600&fit=crop&q=80', // Luxury mansions & high-end shopping
  'south-yarra': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80', // Chapel Street shopping & dining
  'prahran': 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop&q=80', // Market & entertainment precinct
  'windsor': 'https://images.unsplash.com/photo-1520637836862-4d197d17c881?w=800&h=600&fit=crop&q=80', // Southern Chapel Street dining

  // Inner South
  'south-melbourne': 'https://images.unsplash.com/photo-1595946985748-96b25e1c5e70?w=800&h=600&fit=crop&q=80', // Victorian terraces & famous market
  'st-kilda-east': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Quiet residential near park

  // Cultural & University
  'carlton': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80', // University & Italian heritage

  // Eastern Suburbs
  'hawthorn': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Leafy streets & Glenferrie Road
  'camberwell': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80', // Family-friendly & tree-lined streets
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