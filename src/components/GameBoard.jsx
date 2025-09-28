import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameCard from './GameCard';
import { getSuburbsWithCuratedImages } from '../data/suburbs';
import { initializeSuburb, updateRatings, getRandomPair } from '../utils/elo';
import useSwipe from '../hooks/useSwipe';

const GameBoard = ({ onGameComplete }) => {
  const [suburbs, setSuburbs] = useState([]);
  const [currentPair, setCurrentPair] = useState(null);
  const [roundCount, setRoundCount] = useState(0);
  const [usedPairs, setUsedPairs] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const MAX_ROUNDS = 20;

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const suburbsData = getSuburbsWithCuratedImages();
    const initializedSuburbs = suburbsData.map(initializeSuburb);
    setSuburbs(initializedSuburbs);
    setRoundCount(0);
    setUsedPairs([]);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    getNextPair();
  };

  const getNextPair = () => {
    const pair = getRandomPair(suburbs, usedPairs);
    if (!pair) {
      // No more unique pairs available, end game
      onGameComplete(suburbs);
      return;
    }
    setCurrentPair(pair);
  };

  // Swipe handlers
  const handleSwipeLeft = () => {
    if (currentPair && !isAnimating) {
      handleSuburbSelect(currentPair[1]); // Right suburb wins on left swipe
    }
  };

  const handleSwipeRight = () => {
    if (currentPair && !isAnimating) {
      handleSuburbSelect(currentPair[0]); // Left suburb wins on right swipe
    }
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight, 100);

  const handleSuburbSelect = (selectedSuburb) => {
    if (isAnimating || !currentPair) return;

    setIsAnimating(true);

    const [suburbA, suburbB] = currentPair;
    const winner = selectedSuburb;
    const loser = winner.id === suburbA.id ? suburbB : suburbA;

    // Update ratings
    const { winnerRating, loserRating } = updateRatings(winner.rating, loser.rating);

    // Update suburbs state
    setSuburbs(prevSuburbs =>
      prevSuburbs.map(suburb => {
        if (suburb.id === winner.id) {
          return { ...suburb, rating: winnerRating, matches: suburb.matches + 1 };
        }
        if (suburb.id === loser.id) {
          return { ...suburb, rating: loserRating, matches: suburb.matches + 1 };
        }
        return suburb;
      })
    );

    // Add this pair to used pairs
    const pairKey = [suburbA.id, suburbB.id].sort().join('-');
    setUsedPairs(prev => [...prev, pairKey]);

    // Increment round
    const newRoundCount = roundCount + 1;
    setRoundCount(newRoundCount);

    // Wait for animation then proceed
    setTimeout(() => {
      setIsAnimating(false);

      if (newRoundCount >= MAX_ROUNDS) {
        onGameComplete(suburbs);
      } else {
        getNextPair();
      }
    }, 500);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏙️
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Suburb Swipe
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Choose your favorite between two Melbourne suburbs.
            After {MAX_ROUNDS} rounds, we'll show your Top 10!
          </p>
          <motion.button
            className="btn-primary text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            Start Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!currentPair) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <div className="text-xl">Preparing your results...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            This or That?
          </h1>
          <div className="text-right">
            <div className="text-lg font-semibold text-indigo-600">
              Round {roundCount + 1} of {MAX_ROUNDS}
            </div>
            <div className="text-sm text-gray-500">
              Choose your favorite suburb
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-indigo-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((roundCount) / MAX_ROUNDS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Game Cards */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPair[0].id}-${currentPair[1].id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 h-[600px]"
            {...swipeHandlers}
          >
            <GameCard
              suburb={currentPair[0]}
              onSelect={handleSuburbSelect}
              isLeft={true}
              isAnimating={isAnimating}
            />

            <div className="flex items-center justify-center md:hidden">
              <div className="text-2xl font-bold text-gray-400">VS</div>
            </div>

            <GameCard
              suburb={currentPair[1]}
              onSelect={handleSuburbSelect}
              isLeft={false}
              isAnimating={isAnimating}
            />
          </motion.div>
        </AnimatePresence>

        {/* VS indicator for desktop */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            className="bg-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-gray-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VS
          </motion.div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Click or tap the suburb you prefer. On mobile, you can also swipe left or right!
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <span>👈</span>
            <span>Swipe left for right suburb</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center space-x-1">
            <span>👉</span>
            <span>Swipe right for left suburb</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;