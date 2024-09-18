'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react'

interface Game {
  id: string;
  name: string;
  icon?: React.ReactNode; // Optional icon property
}

interface CollapsibleNavProps {
  games?: Game[];
  onSelectGame: (gameId: string) => void;
  currentGame: string;
}

export function CollapsibleNavComponent({ games = [], onSelectGame, currentGame }: CollapsibleNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white text-black transition-all duration-300 font-mono border-r ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-white text-black hover:bg-gray-100 border rounded-full w-10 h-10" // Set width and height for round shape
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Collapse menu" : "Expand menu"}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
      <div className="p-4">
        {isOpen && (
          <h2 className="text-xl font-bold mb-4">
            Games <Gamepad2 className="inline h-5 w-5 ml-2" /> {/* Single icon next to "Games" */}
          </h2>
        )}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav>
            <ul className="space-y-2">
              {games.length > 0 ? (
                games.map((game) => (
                  <li key={game.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${isOpen ? 'px-4' : 'px-2'} ${
                        currentGame === game.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => onSelectGame(game.id)}
                    >
                      {isOpen && <span>{game.name}</span>} {/* Show name only if open */}
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-400">No games available</li>
              )}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}