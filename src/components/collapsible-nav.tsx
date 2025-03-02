"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Gamepad2 } from "lucide-react";

interface Game {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

interface CollapsibleNavProps {
  games: Game[];
  onSelectGame: (id: string) => void;
  currentGame: string;
}

export function CollapsibleNavComponent({
  games = [],
  onSelectGame,
  currentGame,
}: CollapsibleNavProps) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white text-black transition-all duration-300 font-mono border-r ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-white text-black hover:bg-gray-100 border rounded-full w-10 h-10"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Collapse menu" : "Expand menu"}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      <div className="p-4">
        {isOpen && (
          <h2 className="text-xl font-bold mb-4">
            Games <Gamepad2 className="inline h-5 w-5 ml-2" />
          </h2>
        )}
        <ScrollArea>
          <nav>
            <ul className="space-y-2">
              {games.length > 0 ? (
                games.map((game) => (
                  <li key={game.id}>
                    <Button
                      variant={currentGame === game.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isOpen ? "px-4" : "px-2"
                      }`}
                      onClick={() => onSelectGame(game.id)}
                    >
                      {game.icon}
                      {isOpen && <span className="ml-2">{game.name}</span>}
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-400">
                  No games available
                </li>
              )}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
