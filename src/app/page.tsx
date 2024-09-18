"use client";

import { AnagramGuesserComponent } from "@/components/anagram-guesser";
import { CollapsibleNavComponent } from "@/components/collapsible-nav";
import { useState } from "react"; // Import useState for managing state
import { Gamepad2 } from 'lucide-react'; // Import Gamepad2
import { CodingTriathlonUi } from "@/components/coding-triathlon-ui";

export default function Home() {
  const [currentGame, setCurrentGame] = useState<string>('1'); // Set initial game to Anagram Guesser

  const onSelectGame = (gameId: string) => {
    setCurrentGame(gameId); // Update currentGame when a game is selected
  };

  const games = [
    { id: '1', name: ' Anagram Guesser', icon: <Gamepad2 />, component: AnagramGuesserComponent },
    { id: '2', name: ' Coding Triathlon', icon: <Gamepad2 />, component: CodingTriathlonUi },
  ];

  // Find the currently selected game component
  const CurrentGameComponent = games.find(game => game.id === currentGame)?.component;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <CollapsibleNavComponent games={games} onSelectGame={onSelectGame} currentGame={currentGame} /> {/* Pass props */}
      {CurrentGameComponent && <CurrentGameComponent />} {/* Render the selected game component */}
    </div>
  );
}
