import { motion } from 'framer-motion';
import { useState } from 'react';

const GameCard = ({ suburb, onSelect, isLeft, isAnimating }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      onSelect(suburb);
    }
  };

  const cardVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.02,
      rotateY: isLeft ? -2 : 2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 },
    exit: {
      x: isLeft ? -window.innerWidth : window.innerWidth,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer select-none"
      variants={cardVariants}
      initial="initial"
      whileHover={!isAnimating ? "hover" : "initial"}
      whileTap={!isAnimating ? "tap" : "initial"}
      onClick={handleClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-2/3 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-lg">Loading...</div>
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🏙️</div>
                <div>Image not available</div>
              </div>
            </div>
          )}

          <img
            src={suburb.imageUrl}
            alt={suburb.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Select Indicator */}
          <motion.div
            className={`absolute top-4 ${isLeft ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 opacity-0`}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            Click to choose
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {suburb.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {suburb.description}
            </p>
          </div>

          {/* Visual Click Hint */}
          <div className="mt-4 flex items-center justify-center">
            <motion.div
              className="flex items-center space-x-2 text-indigo-600 text-sm font-medium"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span>Tap to choose</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👆
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Touch Area Enhancement */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-indigo-200 transition-colors duration-200" />
    </motion.div>
  );
};

export default GameCard;