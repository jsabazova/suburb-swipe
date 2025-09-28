// Elo rating system for suburb rankings
// K-factor determines how much ratings change after each match
// Higher K-factor = more dramatic rating changes per match
const K_FACTOR = 50; // Increased from 32 for more responsive ratings

/**
 * Calculate expected score for player A against player B
 * @param {number} ratingA - Rating of player A
 * @param {number} ratingB - Rating of player B
 * @returns {number} Expected score (0-1)
 */
function getExpectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

/**
 * Update Elo ratings after a match with adaptive K-factor
 * @param {number} winnerRating - Current rating of the winner
 * @param {number} loserRating - Current rating of the loser
 * @param {number} winnerMatches - Number of matches winner has played
 * @param {number} loserMatches - Number of matches loser has played
 * @returns {Object} New ratings for both players
 */
export function updateRatings(winnerRating, loserRating, winnerMatches = 0, loserMatches = 0) {
  const expectedWinner = getExpectedScore(winnerRating, loserRating);
  const expectedLoser = getExpectedScore(loserRating, winnerRating);

  // Adaptive K-factor: higher for fewer matches (more volatile early game)
  const getKFactor = (matches) => {
    if (matches < 5) return 60;  // Very responsive for first few matches
    if (matches < 10) return 45; // Still responsive
    return K_FACTOR; // Standard after 10+ matches
  };

  const winnerK = getKFactor(winnerMatches);
  const loserK = getKFactor(loserMatches);

  const newWinnerRating = Math.round(winnerRating + winnerK * (1 - expectedWinner));
  const newLoserRating = Math.round(loserRating + loserK * (0 - expectedLoser));

  return {
    winnerRating: newWinnerRating,
    loserRating: newLoserRating
  };
}

/**
 * Initialize suburb with default Elo rating
 * @param {Object} suburb - Suburb object
 * @returns {Object} Suburb with initial rating
 */
export function initializeSuburb(suburb) {
  return {
    ...suburb,
    rating: 1200, // Standard starting Elo rating
    matches: 0
  };
}

/**
 * Sort suburbs by rating (highest to lowest)
 * @param {Array} suburbs - Array of suburb objects
 * @returns {Array} Sorted suburbs
 */
export function sortByRating(suburbs) {
  return [...suburbs].sort((a, b) => b.rating - a.rating);
}

/**
 * Get random pair of suburbs for comparison
 * @param {Array} suburbs - Array of all suburbs
 * @param {Array} usedPairs - Array of previously used pairs
 * @returns {Array|null} Pair of suburbs or null if no new pairs available
 */
export function getRandomPair(suburbs, usedPairs = []) {
  const availablePairs = [];

  for (let i = 0; i < suburbs.length; i++) {
    for (let j = i + 1; j < suburbs.length; j++) {
      const pair = [suburbs[i].id, suburbs[j].id].sort();
      const pairKey = pair.join('-');

      if (!usedPairs.includes(pairKey)) {
        availablePairs.push([suburbs[i], suburbs[j]]);
      }
    }
  }

  if (availablePairs.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availablePairs.length);
  return availablePairs[randomIndex];
}