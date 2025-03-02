"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

type Problem = {
  question: string;
  answer: number;
};

const generateProblem = (): Problem => {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  return { question: `${a} + ${b} = ?`, answer: a + b };
};

export default function MathBlitz() {
  // Timer states
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Problem and game states
  const [problem, setProblem] = useState<Problem>(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Timer effect: countdown from a set time once the game starts
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !completed) {
      timer = setInterval(() => {
        setElapsedTime((prev) => Math.max(prev - 1, 0)); // Decrease elapsed time
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, completed]);

  const startGame = () => {
    setElapsedTime(30); // Set countdown time (e.g., 30 seconds)
    setGameStarted(true);
    setCompleted(false);
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === problem.answer) {
      setScore(score + 1);
      setFeedback("Correct!");
      setProblem(generateProblem());
    } else {
      setFeedback("Incorrect, try again!");
    }
    setUserAnswer("");
  };

  return (
    <div className="p-8 font-mono">
      <h1 className="text-3xl font-bold mb-4">Math Blitz</h1>

      {/* If the game hasn't started, show the Start button */}
      {!gameStarted && (
        <Button onClick={startGame} className="mb-4">
          Start Game
        </Button>
      )}

      {/* Once the game is started, display the timer, problem, and input */}
      {gameStarted && (
        <>
          <p className="mb-4 text-xl">Time Elapsed: {elapsedTime} seconds</p>
          <p className="mb-4 text-xl">{problem.question}</p>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
            className="mb-4"
          />
          <Button onClick={handleSubmit}>Submit Answer</Button>
          {feedback && (
            <Alert className="mt-4">
              <p>{feedback}</p>
            </Alert>
          )}
          <p className="mt-4">Score: {score}</p>
        </>
      )}
    </div>
  );
}
