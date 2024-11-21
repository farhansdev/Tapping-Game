"use client";

import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const CountingGame = () => {
  const [level, setLevel] = useState(1);
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Initial time limit
  const [isPlaying, setIsPlaying] = useState(false);

  const totalLevels = 6;
  const levelsConfig = [
    { time: 5, targetTaps: 15 },
    { time: 10, targetTaps: 25 },
    { time: 15, targetTaps: 40 },
    { time: 20, targetTaps: 60 },
    { time: 35, targetTaps: 80 },
    { time: 45, targetTaps: 100 },
  ];

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleFail();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const startLevel = () => {
    setIsPlaying(true);
    setTaps(0);
    setTimeLeft(levelsConfig[level - 1].time);
  };

  const handleTap = () => {
    if (isPlaying) {
      setTaps((prev) => prev + 1);
      if (taps + 1 === levelsConfig[level - 1].targetTaps) {
        handleSuccess();
      }
    }
  };


  const handleSuccess = () => {
    setIsPlaying(false);
    if (level === totalLevels) {
      Swal.fire("🎉 Congratulations! You completed all levels! 🎉");
      resetGame();
    } else {
      Swal.fire("✅ Congratulations! Click OK to go to the next level!");
      const nextLevel = level + 1;
      setLevel(nextLevel); // Update level state
      setTimeLeft(levelsConfig[nextLevel - 1].time); // Set timeLeft for the next level
      setTaps(0); // Reset taps
      setIsPlaying(true); // Restart game for the next level
    }
  };
  

  const handleFail = () => {
    setIsPlaying(false);
    Swal.fire("❌ Better luck next time! Starting from Level 1!");
    resetGame();
  };

  const resetGame = () => {
    setLevel(1);
    setTaps(0);
    setTimeLeft(levelsConfig[0].time);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Counting Game</h1>
        <p className="text-lg mb-2">Level: {level}</p>
        <p className="text-lg mb-2">
          Time Left: <span className="text-red-500 font-bold">{timeLeft}</span> seconds
        </p>
        <p className="text-lg mb-4">
          Taps: <span className="text-green-500 font-bold">{taps}</span> /{" "}
          {levelsConfig[level - 1].targetTaps}
        </p>
        {!isPlaying && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={startLevel}
          >
            {level === 1 ? "Start Game" : "Restart Level"}
          </button>
        )}
        {isPlaying && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={handleTap}
          >
            Tap!
          </button>
        )}

      </div>
      <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition"
            onClick={resetGame}
          >
            Reset
          </button> 
    </div>
  );
};

export default CountingGame;