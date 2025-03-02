"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

const grid = [
  ["C", "O", "D", "E", "X"],
  ["A", "R", "E", "A", "T"],
  ["M", "A", "T", "H", "S"],
  ["P", "Y", "T", "H", "O"],
  ["J", "A", "V", "A", "S"],
];
const wordsToFind = ["CODE", "MATH", "JAVA"];

export default function WordSearch() {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [guess, setGuess] = useState("");

  const handleGuess = () => {
    const word = guess.toUpperCase();
    if (wordsToFind.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
    }
    setGuess("");
  };

  const isComplete = foundWords.length === wordsToFind.length;

  return (
    <div className="p-8 font-mono">
      <h1 className="text-3xl font-bold mb-4">Word Search Puzzle</h1>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-10 h-10 flex items-center justify-center border"
            >
              {letter}
            </div>
          ))
        )}
      </div>
      <p className="mb-4">Words to find: {wordsToFind.join(", ")}</p>
      <p className="mb-4">
        Found: {foundWords.length > 0 ? foundWords.join(", ") : "None"}
      </p>
      {isComplete && (
        <Alert>
          <p>You found all the words!</p>
        </Alert>
      )}
      {!isComplete && (
        <div className="flex gap-2">
          <Input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter a word"
          />
          <Button onClick={handleGuess}>Submit</Button>
        </div>
      )}
    </div>
  );
}
