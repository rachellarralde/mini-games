"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

// A longer and more challenging phrase
const sampleText =
  "In a distant realm of shimmering dreams and forgotten legends, brave explorers embarked on epic journeys beyond the horizon.";

export default function TypingChallenge() {
  const [text] = useState(sampleText);
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Update elapsed time every second once the game has started
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && startTime && !completed) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, startTime, completed]);

  // Check if the user has completed the challenge
  useEffect(() => {
    if (gameStarted && inputText === text) {
      setCompleted(true);
      const timeTaken = (Date.now() - (startTime || Date.now())) / 1000;
      const words = text.split(" ").length;
      setWpm(Math.round((words / timeTaken) * 60));
    }
  }, [inputText, text, startTime, gameStarted]);

  // Start the game: reset values and record start time
  const startGame = () => {
    setInputText("");
    setStartTime(Date.now());
    setElapsedTime(0);
    setWpm(0);
    setCompleted(false);
    setGameStarted(true);
  };

  // Restart the game: clear all states
  const resetGame = () => {
    setInputText("");
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setCompleted(false);
    setGameStarted(false);
  };

  // Handle single button for both Start and Restart
  const handleGameButton = () => {
    if (!gameStarted) {
      startGame();
    } else {
      resetGame();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-mono bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Typing Challenge
        </h1>

        {/* Single button to start or restart the game */}
        <div className="flex justify-center mb-6">
          <Button onClick={handleGameButton}>
            {gameStarted ? "Restart" : "Start"}
          </Button>
        </div>

        {gameStarted && (
          <>
            <p className="mb-4 text-sm text-gray-700">{text}</p>
            <p className="mb-4 text-sm text-gray-700">
              Elapsed Time: <span className="font-semibold">{elapsedTime}</span>{" "}
              seconds
            </p>
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type the text here..."
              className="mb-4"
              disabled={completed}
            />
            {completed && (
              <Alert className="mb-4" variant="default">
                <p className="text-sm">
                  Completed! Your WPM:{" "}
                  <span className="font-semibold">{wpm}</span>
                </p>
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}
