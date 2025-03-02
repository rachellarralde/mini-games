"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type CardType = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
};

const generateCards = () => {
  const values = ["A", "B", "C", "D", "E", "F"];
  const cards: CardType[] = [];
  values.forEach((val, i) => {
    cards.push({ id: i * 2, value: val, flipped: false, matched: false });
    cards.push({ id: i * 2 + 1, value: val, flipped: false, matched: false });
  });
  return cards.sort(() => Math.random() - 0.5);
};

export default function MemoryMatch() {
  const [cards, setCards] = useState<CardType[]>(generateCards());
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.value === secondCard.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === firstCard.value ? { ...card, matched: true } : card
          )
        );
        resetCards();
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetCards();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const handleCardClick = (card: CardType) => {
    if (disabled || card.flipped || card.matched) return;
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );
    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    resetCards();
  };

  const isComplete = cards.every((card) => card.matched);

  return (
    <div className="p-8 font-mono">
      <h1 className="text-3xl font-bold mb-4">Memory Match</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-20 h-20 border flex items-center justify-center text-2xl cursor-pointer"
            onClick={() => handleCardClick(card)}
          >
            {card.flipped || card.matched ? card.value : "?"}
          </div>
        ))}
      </div>
      {isComplete && <p className="mb-4">You&apos;ve matched all the cards!</p>}
      <Button onClick={resetGame}>Restart Game</Button>
    </div>
  );
}
