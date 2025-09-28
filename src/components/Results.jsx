import { motion } from 'framer-motion';
import { sortByRating } from '../utils/elo';
import { useState } from 'react';

const Results = ({ suburbs, onRestart }) => {
  const [imageErrors, setImageErrors] = useState(new Set());
  const sortedSuburbs = sortByRating(suburbs);
  const top10 = sortedSuburbs.slice(0, 10);

  const handleImageError = (suburbId) => {
    setImageErrors(prev => new Set([...prev, suburbId]));
  };

  const getRankSuffix = (rank) => {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }

    switch (lastDigit) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getMedal = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}${getRankSuffix(rank)}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Top 10 Melbourne Suburbs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your preferences, here are your favorite Melbourne suburbs ranked from most to least preferred.
          </p>
        </motion.div>

        {/* Rankings */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {top10.map((suburb, index) => {
            const rank = index + 1;
            const hasImageError = imageErrors.has(suburb.id);

            return (
              <motion.div
                key={suburb.id}
                variants={itemVariants}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                  rank <= 3 ? 'ring-2 ring-yellow-200' : ''
                }`}
              >
                <div className="flex items-center p-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    {rank <= 3 ? (
                      <div className="text-3xl">{getMedal(rank)}</div>
                    ) : (
                      <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                        {rank}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0 w-24 h-24 ml-6 rounded-lg overflow-hidden">
                    {hasImageError ? (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <div className="text-2xl">🏙️</div>
                      </div>
                    ) : (
                      <img
                        src={suburb.imageUrl}
                        alt={suburb.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(suburb.id)}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 ml-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {suburb.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {suburb.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Rating: {suburb.rating}</span>
                          <span>•</span>
                          <span>Matches: {suburb.matches}</span>
                        </div>
                      </div>

                      {/* Rating Visualization */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">
                          {suburb.rating}
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(((suburb.rating - 1000) / 400) * 100, 100)}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Game Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {sortedSuburbs.length}
              </div>
              <div className="text-sm text-gray-600">Suburbs Ranked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {Math.round(sortedSuburbs.reduce((sum, s) => sum + s.matches, 0) / sortedSuburbs.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Matches</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {Math.max(...sortedSuburbs.map(s => s.rating))}
              </div>
              <div className="text-sm text-gray-600">Highest Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {sortedSuburbs[0].name}
              </div>
              <div className="text-sm text-gray-600">Your Favorite</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
          >
            Play Again
          </motion.button>

          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const text = `My Top 10 Melbourne Suburbs:\n${top10.map((s, i) => `${i + 1}. ${s.name}`).join('\n')}\n\nGenerated by Suburb Swipe!`;
              navigator.share
                ? navigator.share({ title: 'My Top 10 Suburbs', text })
                : navigator.clipboard.writeText(text);
            }}
          >
            Share Results
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          Rankings based on your choices using the Elo rating system
        </motion.div>
      </div>
    </div>
  );
};

export default Results;