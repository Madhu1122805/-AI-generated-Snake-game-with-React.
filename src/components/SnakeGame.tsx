import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center justify-center p-0">
      <div className="mb-4 flex justify-between w-full max-w-[400px] border-b-2 border-cyan-400 pb-2">
        <div className="text-2xl font-black neon-text">SCORE: {score.toString().padStart(6, '0')}</div>
        <div className="text-2xl font-black neon-text">{isPaused ? 'PAUSED' : 'RUNNING'}</div>
      </div>

      <div 
        className="relative bg-black neon-border overflow-hidden cursor-none"
        style={{ width: '400px', height: '400px', display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] pointer-events-none opacity-10">
          {Array(400).fill(0).map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-400" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`${i === 0 ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' : 'bg-cyan-900'} border border-black z-20`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="bg-magenta-500 shadow-[0_0_15px_#ff00ff] z-20"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
            backgroundColor: '#ff00ff'
          }}
        />

        {/* Game Over Overlay */}
        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 backdrop-blur-sm"
            >
              {isGameOver ? (
                <>
                  <h2 className="text-6xl font-black text-magenta-500 mb-8 glitch screen-tear" data-text="GAME_OVER">GAME_OVER</h2>
                  <button 
                    onClick={resetGame}
                    className="px-8 py-4 border-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-black text-2xl uppercase tracking-widest"
                  >
                    REBOOT_SYSTEM
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-6xl font-black text-cyan-400 mb-8 glitch" data-text="PAUSED">PAUSED</h2>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="px-8 py-4 border-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-black text-2xl uppercase tracking-widest"
                  >
                    RESUME_EXECUTION
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-sm text-cyan-800 uppercase tracking-[0.3em] font-bold">
        [ARROWS] TO_NAVIGATE // [SPACE] TO_PAUSE
      </div>
    </div>
  );
}
