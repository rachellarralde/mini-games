"use client";

import React, { useState, useEffect } from "react";
import { Alert } from "@/components/ui/alert";

const colors = ["red", "green", "blue", "yellow"];

// Map specific keys to color names
const keyToColor: Record<string, string> = {
  q: "red",
  w: "green",
  e: "blue",
  r: "yellow",
};

export default function SimonSays() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [message, setMessage] = useState("Get ready!");
  const [timeLeft, setTimeLeft] = useState(30); // Timer state initialized to 30 seconds
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over

  // Add a new color to the sequence
  const addColorToSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => [...prev, randomColor]);
    setMessage(`Current Sequence: ${randomColor}`);
  };

  // On mount, start by adding the first color and starting the timer
  useEffect(() => {
    addColorToSequence();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setMessage("Time's up! Game over.");
          setGameOver(true); // Set game over state
          return 0; // Stop the timer
        }
        return prev - 1; // Decrease time left
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Listen for keyboard events and map keys to colors
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const color = keyToColor[e.key.toLowerCase()];
      if (color && !gameOver) {
        // Prevent input if game is over
        handleUserClick(color);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userSequence, sequence, gameOver]);

  // Handle user input (from both clicks and keyboard)
  const handleUserClick = (color: string) => {
    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    const index = newUserSequence.length - 1;
    // Check if the latest color matches the sequence
    if (newUserSequence[index] !== sequence[index]) {
      setMessage("Wrong sequence! Game over.");
      setGameOver(true); // Set game over state
    } else {
      // If the user matched the entire current sequence
      if (newUserSequence.length === sequence.length) {
        setMessage("Good job! Get ready for the next round.");
        setUserSequence([]);

        setTimeout(() => {
          addColorToSequence();
        }, 1000);
      }
    }
  };

  return (
    <div
      className={`p-8 font-mono max-w-xl mx-auto ${
        gameOver ? "bg-red-200" : ""
      }`}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Simon Says</h1>
      <Alert className="text-center">
        <p>{message}</p>
        <p>Time Left: {timeLeft} seconds</p>
      </Alert>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Press <strong>Q</strong>, <strong>W</strong>, <strong>E</strong>, or{" "}
        <strong>R</strong> to match the sequence.
      </p>
      <div className="flex gap-4 mt-4 justify-center">
        {colors.map((color) => (
          <div
            key={color}
            className="w-16 h-16 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleUserClick(color)}
          />
        ))}
      </div>
      {/* Hide the current sequence display if the game is over */}
      {!gameOver && (
        <p className="mt-4 text-center">
          Current Sequence: {sequence.join(", ")}
        </p>
      )}
      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-red-700">Game Over!</p>
        </div>
      )}
    </div>
  );
}
