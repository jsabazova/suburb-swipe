import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './components/GameBoard';
import Results from './components/Results';

function App() {
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'results'
  const [finalSuburbs, setFinalSuburbs] = useState([]);

  const handleGameComplete = (suburbs) => {
    setFinalSuburbs(suburbs);
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('playing');
    setFinalSuburbs([]);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AnimatePresence mode="wait">
        {gameState === 'playing' ? (
          <motion.div
            key="game"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <GameBoard onGameComplete={handleGameComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Results suburbs={finalSuburbs} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional: Add a footer or additional navigation */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-4 text-xs text-gray-500 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-1"
      >
        Suburb Swipe v1.0
      </motion.footer>
    </div>
  );
}

export default App;