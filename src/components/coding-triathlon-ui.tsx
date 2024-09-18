'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Wrench, Bug, HelpCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define the challenge type
type Challenge = {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  testCases?: { input: unknown; expectedOutput: unknown }[]; // Optional for debugging challenges
  hint: string;
}

// Define the challenges
const codeSprintChallenges: Challenge[] = [
  {
    id: 'reverseString',
    title: 'Reverse a String',
    description: 'Write a function that reverses a string.',
    initialCode: 'function reverseString(str) {\n  // Your code here\n}',
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'OpenAI', expectedOutput: 'IAnepO' },
    ],
    hint: "Use a loop or array methods to reverse the string.",
  },
  {
    id: 'sumArray',
    title: 'Sum of Array',
    description: 'Write a function that calculates the sum of an array of numbers.',
    initialCode: 'function sumArray(arr) {\n  // Your code here\n}',
    testCases: [
      { input: [1, 2, 3, 4, 5], expectedOutput: 15 },
      { input: [-1, 0, 1], expectedOutput: 0 },
    ],
    hint: "Use a loop or array methods to calculate the sum.",
  },
]

const codeRefactorChallenges: Challenge[] = [
  {
    id: 'nestedLoops',
    title: 'Optimize Nested Loops',
    description: 'Refactor the function to reduce the time complexity from O(n^2) to O(n).',
    initialCode: `function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}`,
    testCases: [
      { input: [1, 2, 3, 1, 2, 3], expectedOutput: [1, 2, 3] },
      { input: [4, 5, 6, 4, 5, 6], expectedOutput: [4, 5, 6] },
    ],
    hint: "Consider using a Set or an object to keep track of seen elements.",
  },
  {
    id: 'recursiveToIterative',
    title: 'Convert Recursive to Iterative',
    description: 'Refactor the recursive function to an iterative one to improve space complexity.',
    initialCode: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    testCases: [
      { input: 5, expectedOutput: 120 },
      { input: 0, expectedOutput: 1 },
    ],
    hint: "Try using a loop instead of recursion. Initialize a result variable and multiply it by each number from 1 to n.",
  },
]

const debuggingChallenges: Challenge[] = [
  {
    id: 'fixArraySum',
    title: 'Fix Array Sum',
    description: 'Identify and fix the bug in the array sum function.',
    initialCode: `function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
    hint: "Check the loop condition carefully.",
    testCases: [
      { input: [1, 2, 3, 4, 5], expectedOutput: 15 },
      { input: [10, 20, 30], expectedOutput: 60 },
    ],
  },
  {
    id: 'fixStringReverse',
    title: 'Fix String Reverse',
    description: 'Identify and fix the bug in the string reverse function.',
    initialCode: `function reverseString(str) {
  return str.split('').reverse().join();
}`,
    hint: "Check the join method carefully.",
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'JavaScript', expectedOutput: 'tpircSavaJ' },
    ],
  },
  {
    id: 'fixFactorial',
    title: 'Fix Factorial Function',
    description: 'Identify and fix the bug in the factorial function.',
    initialCode: `function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n);
}`,
    hint: "Check the recursive call carefully.",
    testCases: [
      { input: 5, expectedOutput: 120 },
      { input: 0, expectedOutput: 1 },
    ],
  },
]

export function CodingTriathlonUi() {
  const [currentChallenge, setCurrentChallenge] = useState('sprint')
  const [code, setCode] = useState('')
  const [currentSprintChallenge, setCurrentSprintChallenge] = useState(codeSprintChallenges[0])
  const [currentRefactorChallenge, setCurrentRefactorChallenge] = useState(codeRefactorChallenges[0])
  const [currentDebuggingChallenge, setCurrentDebuggingChallenge] = useState(debuggingChallenges[0])
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [completedChallenges, setCompletedChallenges] = useState<{ [key: string]: boolean }>({
    sprint: false,
    refactor: false,
    debug: false,
  });

  useEffect(() => {
    if (currentChallenge === 'sprint') {
      setCode(currentSprintChallenge.initialCode)
    } else if (currentChallenge === 'refactor') {
      setCode(currentRefactorChallenge.initialCode)
    } else if (currentChallenge === 'debug') {
      setCode(currentDebuggingChallenge.initialCode)
    }
    setShowHint(false)
    setSubmissionStatus('idle')
    setErrorMessage('')
  }, [currentChallenge, currentSprintChallenge, currentRefactorChallenge, currentDebuggingChallenge])

  const runTests = (challenge: Challenge) => {
    try {
      const func = new Function('return ' + code)()
      const allTestsPassed = challenge.testCases?.every(
        (testCase) => JSON.stringify(func(testCase.input)) === JSON.stringify(testCase.expectedOutput)
      )
      if (allTestsPassed) {
        setScore(score + 1)
        setSubmissionStatus('correct')
        setCompletedChallenges((prev) => ({ ...prev, [currentChallenge]: true })); // Mark challenge as completed
        setTimeout(() => {
          setSubmissionStatus('idle')
          if (currentChallenge === 'sprint') {
            setCurrentChallenge('refactor')
          } else if (currentChallenge === 'refactor') {
            setCurrentChallenge('debug')
          }
        }, 1000)
      } else {
        setSubmissionStatus('incorrect')
        setErrorMessage('Some tests failed. Try again!')
      }
    } catch (error) {
      setSubmissionStatus('incorrect')
      setErrorMessage('Error in your code. Check for syntax errors.')
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const challenges = [
    { id: 'sprint', title: 'Code Sprint', icon: Zap, description: 'Speed coding challenges', completed: completedChallenges.sprint },
    { id: 'refactor', title: 'Code Refactor', icon: Wrench, description: 'Optimize inefficient code', completed: completedChallenges.refactor },
    { id: 'debug', title: 'Debugging Dash', icon: Bug, description: 'Identify and fix bugs', completed: completedChallenges.debug },
  ]

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Coding Triathlon</h1>
          <p className="text-gray-600">Test your coding skills in three exciting challenges!</p>
        </header>
        <main>
          <Tabs value={currentChallenge} onValueChange={setCurrentChallenge}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {challenges.map((challenge) => (
                <TabsTrigger key={challenge.id} value={challenge.id} className="text-sm">
                  <challenge.icon className="w-4 h-4 mr-2" />
                  {challenge.title}
                  {completedChallenges[challenge.id] && <CheckCircle className="text-green-500 h-4 w-4 ml-2 inline" />} {/* Show checkmark if completed */}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="sprint">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentSprintChallenge.title}</CardTitle>
                  <CardDescription>{currentSprintChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">Score: {score}</div>
                  {showHint && (
                    <Alert className="mb-4">
                      <AlertTitle>Hint</AlertTitle>
                      <AlertDescription>{currentSprintChallenge.hint}</AlertDescription>
                    </Alert>
                  )}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`font-mono w-full h-60 p-2 border rounded transition-all duration-300
                      ${submissionStatus === 'correct' ? 'border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)]' : 
                        submissionStatus === 'incorrect' ? 'border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}`}
                    rows={10}
                  />
                  {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  {/* Commented out the Skip button */}
                  {/* <Button variant="outline" onClick={() => nextChallenge('sprint')}>Skip</Button> */}
                  <Button variant="outline" onClick={toggleHint}>
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => runTests(currentSprintChallenge)}>Submit Solution</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="refactor">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentRefactorChallenge.title}</CardTitle>
                  <CardDescription>{currentRefactorChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">Score: {score}</div>
                  {showHint && (
                    <Alert className="mb-4">
                      <AlertTitle>Hint</AlertTitle>
                      <AlertDescription>{currentRefactorChallenge.hint}</AlertDescription>
                    </Alert>
                  )}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`font-mono w-full h-60 p-2 border rounded transition-all duration-300
                      ${submissionStatus === 'correct' ? 'border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)]' : 
                        submissionStatus === 'incorrect' ? 'border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}`}
                    rows={10}
                  />
                  {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  {/* Commented out the Skip button */}
                  {/* <Button variant="outline" onClick={() => nextChallenge('refactor')}>Skip</Button> */}
                  <Button variant="outline" onClick={toggleHint}>
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => runTests(currentRefactorChallenge)}>Submit Solution</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="debug">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentDebuggingChallenge.title}</CardTitle>
                  <CardDescription>{currentDebuggingChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">Score: {score}</div>
                  {showHint && (
                    <Alert className="mb-4">
                      <AlertTitle>Hint</AlertTitle>
                      <AlertDescription>{currentDebuggingChallenge.hint}</AlertDescription>
                    </Alert>
                  )}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`font-mono w-full h-60 p-2 border rounded transition-all duration-300
                      ${submissionStatus === 'correct' ? 'border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)]' : 
                        submissionStatus === 'incorrect' ? 'border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}`}
                    rows={10}
                  />
                  {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  {/* Commented out the Skip button */}
                  {/* <Button variant="outline" onClick={() => nextChallenge('debug')}>Skip</Button> */}
                  <Button variant="outline" onClick={toggleHint}>
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => runTests(currentDebuggingChallenge)}>Submit Solution</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}