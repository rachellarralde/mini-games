'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FaLightbulb, FaRedo } from 'react-icons/fa' // Import the lightbulb and redo icons
import Confetti from 'react-confetti' // Import the confetti component

// Helper function to shuffle a string
const shuffleString = (str: string) => {
  return str.split('').sort(() => Math.random() - 0.5).join('')
}

// Expanded list of words for the game
const words = [
  'REACT', 'ANAGRAM', 'PUZZLE', 'CODING', 'JAVASCRIPT', 'PYTHON', 'DEVELOPER', 
  'PROGRAM', 'FUNCTION', 'VARIABLE', 'COMPONENT', 'INTERFACE', 'ALGORITHM', 
  'DATABASE', 'NETWORK', 'SOFTWARE', 'HARDWARE', 'DEBUGGING', 'COMPUTER', 
  'INTERNET', 'WEBSITE', 'APPLICATION', 'FRAMEWORK', 'LIBRARY', 'SCRIPTING',
  'ASYNC', 'AWAIT', 'PROMISE', 'CALLBACK', 'CLOSURE', 'CONTEXT', 'HOOKS',
  'REDUX', 'STATE', 'PROPS', 'COMPILER', 'TRANSPILER', 'BABEL', 'WEBPACK',
  'NODEJS', 'EXPRESS', 'MONGODB', 'GRAPHQL', 'REST',
  'JSON', 'HTML', 'SASS', 'LESS', 'TAILWIND', 'BOOTSTRAP',
  'REACTNATIVE', 'FLUTTER', 'SWIFT', 'KOTLIN', 'ANDROID', 'MOBILE',
  'RESPONSIVE', 'DESIGN', 'TESTING', 'JEST', 'MOCHA', 'CHAI',
  'ENZYME', 'CYPRESS', 'SELENIUM', 'JASMINE', 'KARMA', 'TYPESCRIPT', 'FLOW',
  'LINTING', 'ESLINT', 'PRETTIER', 'FORMATTER', 'GITHUB', 'VERSION',
  'CONTROL', 'DOCKER', 'KUBERNETES', 'CLOUD', 'AZURE',
  'DEVOPS', 'AGILE', 'SCRUM', 'KANBAN', 'JIRA', 'TRELLO', 'SLACK',
  'ZOOM', 'TEAMS', 'MEET', 'COLLABORATION', 'REMOTE', 'WORK', 'PRODUCTIVITY',
  'HOUSE', 'TREE', 'WATER', 'FOOD', 'FRIEND', 'FAMILY', 'MUSIC', 
  'MOVIE', 'BOOK', 'PHONE', 'COMPUTER', 'TABLE', 'CHAIR', 'WINDOW', 'DOOR', 
  'PAPER', 'NOTEBOOK', 'SHOES', 'SOCKS', 'JACKET', 
  'GLASSES', 'WATCH', 'CLOCK', 'PILLOW', 'BLANKET', 'TOWEL', 
  'SOAP', 'SHAMPOO', 'TOOTHBRUSH', 'TOOTHPASTE', 'MIRROR', 'LAMP', 'LIGHT', 
  'AIRCONDITIONER', 'HEATER', 'OVEN', 'STOVE', 'FRIDGE', 'FREEZER', 
  'MICROWAVE', 'BLENDER', 'TOASTER', 'KETTLE', 'COFFEE', 'SUGAR', 
  'SALT', 'PEPPER', 'SPICE', 'BUTTER', 'BREAD', 'MILK', 
  'CHEESE', 'MEAT', 'FISH', 'VEGETABLE', 'FRUIT', 'SNACK', 'CHOCOLATE', 
  'CANDY', 'ICECREAM', 'CAKE', 'COOKIE', 'JUICE', 'SODA', 'WINE', 
  'BEER', 'WHISKEY', 'VODKA', 'TEQUILA', 'WATERMELON', 'ORANGE', 
  'APPLE', 'BANANA', 'GRAPE', 'STRAWBERRY', 'BLUEBERRY', 'RASPBERRY', 'BLACKBERRY', 
  'CHERRY', 'PEACH', 'PLUM', 'PEAR', 'MANGO', 'PINEAPPLE', 'COCONUT', 'LEMON', 
  'LIME', 'AVOCADO', 'TOMATO', 'CUCUMBER', 'CARROT', 'POTATO', 'ONION', 'GARLIC', 
  'GINGER', 'BROCCOLI', 'CAULIFLOWER', 'SPINACH', 'LETTUCE', 'CABBAGE', 'PEPPER', 
  'CHILI', 'MUSHROOM', 'BEAN', 'CORN', 'RICE', 'PASTA', 'NOODLE', 'BEEF', 
  'CHICKEN', 'PORK', 'LAMB', 'DUCK', 'TURKEY', 'SALMON', 'TUNA', 'SHRIMP', 'CRAB', 
  'LOBSTER', 'OYSTER', 'CLAM', 'MUSSEL', 'SQUID', 'OCTOPUS', 'SEAWEED', 'ALGAE', 
  'KELP', 'PLANKTON', 'CORAL', 'REEF', 'FISHING', 'BOATING', 'SAILING', 'DIVING', 
  'SNORKELING', 'SURFING', 'SWIMMING', 'WAVES', 'TIDES', 'CURRENTS', 'OCEAN', 
  'LAKE', 'RIVER', 'STREAM', 'POND', 'WATERFALL', 'RAIN', 'SNOW', 'HAIL', 
  'SLEET', 'MIST', 'CLOUD', 'MOON', 'STAR', 'PLANET', 'GALAXY', 
  'UNIVERSE', 'SPACE', 'ASTRONAUT', 'ROCKET', 'SATELLITE', 'TELESCOPE', 'MICROSCOPE', 
  'EXPERIMENT', 'SCIENCE', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'GEOLOGY', 
  'ASTRONOMY', 'MATHEMATICS', 'ALGEBRA', 'GEOMETRY', 'CALCULUS', 'STATISTICS', 
  'PROBABILITY', 'ENGINEERING', 'TECHNOLOGY', 'INNOVATION', 'INVENTION', 'DISCOVERY', 
  'RESEARCH', 'DEVELOPMENT', 'EDUCATION', 'SCHOOL', 'UNIVERSITY', 'COLLEGE', 
  'STUDENT', 'TEACHER', 'PROFESSOR', 'LECTURE', 'CLASS', 'COURSE', 'SUBJECT', 
  'HOMEWORK', 'EXAM', 'TEST', 'QUIZ', 'GRADE', 'SCORE', 'RESULT', 'CERTIFICATE', 
  'DIPLOMA', 'DEGREE', 'MASTERS', 'DOCTORATE', 'THESIS', 'DISSERTATION', 
  'JOURNAL', 'ARTICLE', 'LIBRARY', 'READING', 'WRITING', 'ESSAY', 
  'REPORT', 'PROJECT', 'PRESENTATION', 'SLIDES', 'GRAPH', 'CHART', 'DIAGRAM', 
  'TABLE', 'FIGURE', 'IMAGE', 'PHOTO', 'PICTURE', 'DRAWING', 'PAINTING', 'SCULPTURE', 
  'MUSEUM', 'GALLERY', 'EXHIBITION', 'SHOW', 'PERFORMANCE', 'THEATER', 
  'DRAMA', 'COMEDY', 'TRAGEDY', 'MUSICAL', 'OPERA', 'BALLET', 'DANCE', 'CONCERT', 
  'BAND', 'ORCHESTRA', 'CHOIR', 'SINGER', 'MUSICIAN', 'COMPOSER', 'SONG', 'ALBUM', 
  'RECORD', 'TRACK', 'SINGLE', 'CHART', 'RADIO', 'STATION', 'BROADCAST', 
  'PODCAST', 'STREAM', 'VIDEO', 'MOVIE', 'FILM', 'CINEMA', 'THEATER', 'SCREEN', 
  'PROJECTOR', 'TELEVISION', 'REMOTE', 'CONTROL', 'CHANNEL', 'PROGRAM', 
  'SHOW', 'SERIES', 'EPISODE', 'SEASON', 'DOCUMENTARY', 'NEWS', 'REPORT', 'JOURNALISM', 
  'MAGAZINE', 'NEWSPAPER', 'ARTICLE', 'COLUMN', 'EDITORIAL', 'OPINION', 'INTERVIEW', 
  'FEATURE', 'STORY', 'HEADLINE', 'SUBTITLE', 'CAPTION', 'PHOTO', 'IMAGE', 'PICTURE', 
  'GRAPHIC', 'DESIGN', 'LAYOUT', 'PAGE', 'PRINT', 'PUBLISH', 'DISTRIBUTE', 'CIRCULATE', 
  'SUBSCRIBE', 'READER', 'AUDIENCE', 'VIEWER', 'LISTENER', 'FOLLOWER', 'SUPPORTER', 
  'MEMBER', 'COMMUNITY', 'GROUP', 'CLUB', 'ORGANIZATION', 'ASSOCIATION', 'SOCIETY', 
  'NETWORK', 'CONNECTION', 'RELATIONSHIP', 'FRIENDSHIP', 'PARTNERSHIP', 'TEAM', 
  'COLLABORATION', 'COOPERATION', 'ALLIANCE', 'UNION', 'FEDERATION', 'CONFEDERATION', 
  'LEAGUE', 'COALITION', 'BLOC', 'PANEL', 'COMMITTEE', 'BOARD', 'COUNCIL', 'ASSEMBLY', 
  'CONGRESS', 'PARLIAMENT', 'SENATE', 'HOUSE', 'REPRESENTATIVE', 'DELEGATE', 'AMBASSADOR', 
  'DIPLOMAT', 'MINISTER', 'SECRETARY', 'PRESIDENT', 'PRIME', 'MINISTER', 'CHANCELLOR', 
  'GOVERNOR', 'MAYOR', 'COUNCILOR', 'OFFICIAL', 'ADMINISTRATOR', 'MANAGER', 'DIRECTOR', 
  'EXECUTIVE', 'LEADER', 'CHIEF', 'HEAD', 'BOSS', 'SUPERVISOR', 'COORDINATOR', 'FACILITATOR', 
  'ORGANIZER', 'PLANNER', 'STRATEGIST', 'ANALYST', 'CONSULTANT', 'ADVISOR', 'EXPERT', 
  'SPECIALIST', 'PROFESSIONAL', 'PRACTITIONER', 'WORKER', 'EMPLOYEE', 'STAFF', 'PERSONNEL', 
  'TEAM', 'MEMBER', 'COLLEAGUE', 'COWORKER', 'PARTNER', 'ASSOCIATE', 'FELLOW', 'PEER', 
  'FRIEND', 'COMPANION', 'BUDDY', 'MATE', 'ACQUAINTANCE', 'CONTACT', 'CONNECTION', 
  'RELATION', 'RELATIVE', 'FAMILY', 'MEMBER', 'PARENT', 'CHILD', 'SIBLING', 'BROTHER', 
  'SISTER', 'COUSIN', 'UNCLE', 'AUNT', 'NEPHEW', 'NIECE', 'GRANDPARENT', 'GRANDCHILD', 
  'GRANDFATHER', 'GRANDMOTHER', 'GRANDSON', 'GRANDDAUGHTER', 'INLAW', 'SPOUSE', 'HUSBAND', 
  'WIFE', 'PARTNER', 'BOYFRIEND', 'GIRLFRIEND', 'FIANCE', 'FIANCEE', 'ENGAGED', 'MARRIED', 
  'DIVORCED', 'SEPARATED', 'SINGLE', 'WIDOWED', 'WIDOWER', 'ORPHAN', 'ADOPTED',
]

export function AnagramGuesserComponent() {
  const [word, setWord] = useState('')
  const [anagram, setAnagram] = useState('')
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [correctCount, setCorrectCount] = useState(0) // Counter for correct answers
  const [timeLeft, setTimeLeft] = useState(120) // Changed from 60 (1 minute) to 120 (2 minutes)
  const maxGuesses = 3 // Changed from 6 to 3
  const [showHint, setShowHint] = useState(false) // State to manage hint visibility
  const [showModal, setShowModal] = useState(false) // State to manage modal visibility
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [totalTime, setTotalTime] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    resetGame()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const resetGame = () => {
    setCorrectCount(0)
    setTotalTime(0)
    setGameOver(false)
    setTimeLeft(120)
    startNewWord()
    startTimer()
  }

  const startNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)]
    setWord(newWord)
    setAnagram(shuffleString(newWord))
    setGuess('')
    setGuesses([])
    setGameStatus('playing')
  }

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!)
          endGame()
          return 0
        }
        setTotalTime(prev => prev + 1)
        return prevTime - 1
      })
    }, 1000)
  }

  const handleGuess = () => {
    if (guess.length !== word.length) {
      setShowModal(true)
      return
    }

    const newGuesses = [...guesses, guess.toUpperCase()]
    setGuesses(newGuesses)
    setGuess('')

    if (guess.toUpperCase() === word) {
      setCorrectCount((prevCount) => prevCount + 1)
      if (timeLeft > 1) {
        startNewWord() // Only start a new word, don't reset the timer
      } else {
        endGame()
      }
    } else if (newGuesses.length >= maxGuesses) {
      endGame()
    }
  }

  const endGame = () => {
    setGameStatus('lost')
    setGameOver(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGuess()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  const averageTime = correctCount > 0 ? Math.round(totalTime / correctCount) : 0

  return (
    <div className="max-w-md mx-auto mt-8 p-4 font-mono"> {/* Added font-mono for monospaced font */}
      {gameOver && <Confetti />} {/* Show confetti when the game is won */}
      <div className="hero-section text-center py-8"> {/* Hero section */}
        <h1 className="text-5xl font-bold mb-8">Anagram Guesser</h1> {/* Hero title */}
      </div>
      <div className="flex justify-between mb-8"> {/* Timer and correct answers */}
        <p className="text-lg">Time Left: {formatTime(timeLeft)}</p>
        <p className="text-lg">Correct Answers: {correctCount}</p>
      </div>
      <div className="text-center mb-8"> {/* Added more margin to separate sections */}
        <p className="text-xl font-semibold flex items-center justify-center">
          Anagram: {anagram}
          <FaRedo className="ml-2 cursor-pointer text-lg" onClick={startNewWord} /> {/* Reload icon to skip the word */}
        </p>
        <p className="text-sm text-gray-500">Guess the original word!</p>
      </div>

      <div className="mb-4">
        {guesses.map((g, index) => (
          <div key={index} className="flex mb-2 justify-center">
            {g.split('').map((letter, i) => (
              <div
                key={i}
                className={`w-16 h-16 border-2 flex items-center justify-center mr-1 font-bold text-2xl
                  ${letter === word[i] ? 'bg-green-500 text-white' : 
                    word.includes(letter) ? 'bg-yellow-500 text-white' : 'bg-gray-300'}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameStatus === 'playing' && (
        <div className="flex mb-4 justify-center">
          <Input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress} // Add key press handler
            maxLength={word.length}
            className="mr-2 w-full"
            placeholder="Enter your guess"
          />
        </div>
      )}

      {gameOver && (
        <Alert className="border-2 bg-blue-100 mt-4">
          <AlertTitle>Game Over!</AlertTitle>
          <AlertDescription>
            <p>You got {correctCount} answers correct!</p>
            <p>Average time per correct answer: {formatTime(averageTime)}</p>
          </AlertDescription>
        </Alert>
      )}

      {gameOver && (
        <Button onClick={resetGame} className="mt-4 w-full">
          Play Again
        </Button>
      )}

      {gameStatus === 'playing' && (
        <div className="text-center mt-4">
          <p 
            className="text-sm text-gray-500 cursor-pointer flex items-center justify-center"
            onClick={() => setShowHint(!showHint)}
          >
            <FaLightbulb className="mr-2" /> {showHint ? `Hint: Starts with "${word[0]}" and ends with "${word[word.length - 1]}"` : 'Hint'}
          </p>
        </div>
      )}

      {/* Modal for incorrect guess length */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 max-w-md relative z-50" style={{backgroundColor: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Invalid Guess</h2>
            <p>Your guess must be the same length as the anagram!</p>
            <Button onClick={() => setShowModal(false)} className="mt-4 w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// TODO: Add a difficulty setting to the game for words of different lengths
// TODO: Add background music that changes based on whether the player gives a correct or incorrect answer, and also upon winning. 
// TODO: Toggle to turn on and off background music
// TODO: Display the number of remaining attempts
