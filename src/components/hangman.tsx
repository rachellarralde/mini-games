"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const words = ["REACT", "JAVASCRIPT", "PYTHON", "CODE", "DEVELOPER"];
const maxWrong = 6;

export default function Hangman() {
  const [word] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [inputLetter, setInputLetter] = useState("");

  const handleGuess = () => {
    const letter = inputLetter.toUpperCase();
    if (letter && !guessed.includes(letter)) {
      setGuessed([...guessed, letter]);
      if (!word.includes(letter)) {
        setWrongCount(wrongCount + 1);
      }
    }
    setInputLetter("");
  };

  const displayWord = word
    .split("")
    .map((letter) => (guessed.includes(letter) ? letter : "_"))
    .join(" ");
  const isWinner = word.split("").every((letter) => guessed.includes(letter));
  const isLoser = wrongCount >= maxWrong;

  return (
    <div className="p-8 font-mono">
      <h1 className="text-3xl font-bold mb-4">Hangman</h1>
      <p className="mb-4 text-xl">{displayWord}</p>
      <p className="mb-4">
        Wrong guesses: {wrongCount} / {maxWrong}
      </p>
      {isWinner && (
        <Alert>
          <AlertTitle>You win!</AlertTitle>
          <AlertDescription>Congratulations!</AlertDescription>
        </Alert>
      )}
      {isLoser && (
        <Alert>
          <AlertTitle>You lose!</AlertTitle>
          <AlertDescription>The word was: {word}</AlertDescription>
        </Alert>
      )}
      {!isWinner && !isLoser && (
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputLetter}
            onChange={(e) => setInputLetter(e.target.value)}
            maxLength={1}
            placeholder="Enter a letter"
          />
          <Button onClick={handleGuess}>Guess</Button>
        </div>
      )}
    </div>
  );
}
