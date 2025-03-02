"use client"; // Add this line to mark the component as a Client Component

import { AnagramGuesserComponent } from "@/components/anagram-guesser";
import { CollapsibleNavComponent } from "@/components/collapsible-nav";
import { useState } from "react"; // Import useState for managing state
import { Gamepad2 } from "lucide-react"; // Import Gamepad2
import { WordBuilderGame } from "@/components/WordBuilderGame";
import SimonSays from "@/components/simon-says";
import PicturePuzzle from "@/components/picture-puzzle";
import MathBlitz from "@/components/math-blitz";
import TypingChallenge from "@/components/typing-challenge";
import Hangman from "@/components/hangman";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentGame, setCurrentGame] = useState<string>("1"); // Set initial game to Anagram Guesser

  const onSelectGame = (gameId: string) => {
    setCurrentGame(gameId); // Update currentGame when a game is selected
  };

  const games = [
    {
      id: "1",
      name: "Anagram Guesser",
      icon: <Gamepad2 />,
      component: AnagramGuesserComponent,
    },
    {
      id: "2",
      name: "Word Builder",
      icon: <Gamepad2 />,
      component: WordBuilderGame,
    },
    {
      id: "3",
      name: "Simon Says",
      icon: <Gamepad2 />,
      component: SimonSays,
    },
    {
      id: "4",
      name: "Picture Puzzle",
      icon: <Gamepad2 />,
      component: PicturePuzzle,
    },
    {
      id: "7",
      name: "Math Blitz",
      icon: <Gamepad2 />,
      component: MathBlitz,
    },
    {
      id: "8",
      name: "Typing Challenge",
      icon: <Gamepad2 />,
      component: TypingChallenge,
    },
    {
      id: "9",
      name: "Hangman",
      icon: <Gamepad2 />,
      component: Hangman,
    },
  ];

  // Find the currently selected game component
  const CurrentGameComponent = games.find(
    (game) => game.id === currentGame
  )?.component;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <CollapsibleNavComponent
        games={games}
        onSelectGame={onSelectGame}
        currentGame={currentGame}
      />{" "}
      {/* Pass props */}
      {CurrentGameComponent && <CurrentGameComponent />}{" "}
      {/* Render the selected game component */}
      <Footer />
    </div>
  );
}
