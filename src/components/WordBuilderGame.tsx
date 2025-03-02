'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@radix-ui/react-progress";

const GAME_DURATION = 60 // 60 seconds
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUM_LETTERS = 10

export function WordBuilderGame() {
  const [letters, setLetters] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [isGameActive, setIsGameActive] = useState(false)

  const generateLetters = useCallback(() => {
    return Array.from({ length: NUM_LETTERS }, () => LETTERS[Math.floor(Math.random() * LETTERS.length)])
  }, [])

  const startGame = useCallback(() => {
    setLetters(generateLetters())
    setWords([])
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setIsGameActive(true)
  }, [generateLetters])

  const endGame = useCallback(() => {
    setIsGameActive(false)
  }, [])

  const submitWord = useCallback(() => {
    if (input.length > 0) {
      // Here you would typically check if the word is valid
      // For simplicity, we're accepting all words
      setWords(prev => [...prev, input])
      setScore(prev => prev + calculateScore(input))
      setInput('')
    }
  }, [input])

  const calculateScore = (word: string) => {
    // Simple scoring: 1 point per letter
    return word.length
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isGameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (timeLeft === 0) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [isGameActive, timeLeft, endGame])

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Word Builder</h2>
      {!isGameActive ? (
        <Button onClick={startGame}>Start Game</Button>
      ) : (
        <>
          <div className="mb-4">
            <Progress value={(timeLeft / GAME_DURATION) * 100} />
            <p className="text-sm text-gray-600">Time left: {timeLeft}s</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Letters:</p>
            <div className="flex flex-wrap gap-2">
              {letters.map((letter, index) => (
                <span key={index} className="bg-blue-100 px-2 py-1 rounded">{letter}</span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="Type your word"
              className="mb-2"
            />
            <Button onClick={submitWord}>Submit Word</Button>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Words: {words.join(', ')}</p>
          </div>
          <div>
            <p className="text-xl font-bold">Score: {score}</p>
          </div>
        </>
      )}
    </div>
  )
}