"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const size = 3; // 3x3 puzzle
const solvedPuzzle = Array.from(
  { length: size * size },
  (_, i) => (i + 1) % (size * size)
);

const shufflePuzzle = (puzzle: number[]) => {
  return puzzle.sort(() => Math.random() - 0.5);
};

export default function PicturePuzzle() {
  const [puzzle, setPuzzle] = useState<number[]>(
    shufflePuzzle([...solvedPuzzle])
  );
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      resetGame(); // Reset puzzle when a new image is uploaded
    }
  };

  const moveTile = (index: number) => {
    const emptyIndex = puzzle.indexOf(0);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - size,
      emptyIndex + size,
    ];
    if (validMoves.includes(index)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[emptyIndex], newPuzzle[index]] = [
        newPuzzle[index],
        newPuzzle[emptyIndex],
      ];
      setPuzzle(newPuzzle);
      if (newPuzzle.join() === solvedPuzzle.join()) {
        setMessage("Puzzle solved!");
      }
    }
  };

  const resetGame = () => {
    setPuzzle(shufflePuzzle([...solvedPuzzle]));
    setMessage("");
  };

  // Calculate background position for a given tile value (1-indexed)
  const getBackgroundPosition = (tile: number) => {
    const pieceIndex = tile - 1; // convert to 0-indexed
    const row = Math.floor(pieceIndex / size);
    const col = pieceIndex % size;
    // When size > 1, compute percentage offset for each piece
    const posX = (col * 100) / (size - 1);
    const posY = (row * 100) / (size - 1);
    return `${posX}% ${posY}%`;
  };

  return (
    <div className="p-8 font-mono">
      <h1 className="text-3xl font-bold mb-4">Picture Puzzle</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          title="Upload an image to start the puzzle."
          placeholder="Upload an image to start the puzzle."
        />
      </div>
      {!imageUrl && (
        <p className="mb-4">Upload an image to start the puzzle.</p>
      )}
      {imageUrl && (
        <div
          className="grid grid-cols-3 gap-1 mb-4"
          style={{ width: "300px", height: "300px" }}
        >
          {puzzle.map((tile, index) => (
            <div
              key={index}
              onClick={() => moveTile(index)}
              className="border cursor-pointer"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: tile === 0 ? "#ddd" : undefined,
                backgroundImage: tile !== 0 ? `url(${imageUrl})` : undefined,
                backgroundSize: `${size * 100}% ${size * 100}%`,
                backgroundPosition:
                  tile !== 0 ? getBackgroundPosition(tile) : undefined,
              }}
            >
              {/* Optionally, show nothing or a number overlay */}
            </div>
          ))}
        </div>
      )}
      {message && <p className="mb-4">{message}</p>}
      <Button onClick={resetGame}>Restart Puzzle</Button>
    </div>
  );
}
