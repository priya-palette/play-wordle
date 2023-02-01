import React, {useEffect, useState, createContext} from 'react'
import Keyboard from './Components/Keyboard';
import {words,  boardDefault } from './Words';
import Board from './Components/Board';
import './App.css'

interface GameOver {
  isGameOver: boolean,
  wordGuess: boolean
}

interface currentAttempt {
  attempt: number,
  letter: number
}

interface AppContext {
  targetWord: string,
  gameOver: GameOver,
  board: string[][];
  currentAttempt: currentAttempt,
  setBoard: Function,
  setCurrentAttempt: Function,
  handleEnter: Function,
  handleSelect: Function,
  handleDelete: Function,
}

export const Context = createContext<AppContext | null>(null)

const App = () => {
  const [targetWord, setTargetWord] = useState<string>('')
  const [gameOver, setGameOver] = useState({
    isGameOver: false,
    wordGuess: false
  })
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(boardDefault)))
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letter: 0 })

  useEffect(() => {
    setTargetWord(words[Math.round(Math.random() * words.length)])
  },[])

  console.log('targetWord', targetWord)

  const handleEnter = () => {
    if(currentAttempt.letter !== 5) return

    let currentWord = ""
    for(let i=0; i<5; i++) {
      currentWord += board[currentAttempt.attempt][i]
    }

    if(words.includes(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt +1, letter: 0})
    } else {
      alert("Word not found")
    }

    if(currentWord.toLowerCase() === targetWord) {
      setGameOver({ isGameOver: true, wordGuess: true });
      return;
    }
    if(currentAttempt.attempt === 5) {
      setGameOver({isGameOver: true, wordGuess: false})
      return
    }
  }

  const handleSelect = (key: string) => {
    if(currentAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letter] = key.toUpperCase()
    setBoard(newBoard);
    setCurrentAttempt({
      attempt: currentAttempt.attempt,
      letter: currentAttempt.letter + 1
    })
  }


  const handleDelete = () => {
    if (currentAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({ ...currentAttempt, letter: currentAttempt.letter - 1 });
  }

  const handleReset = () => {
    setBoard(boardDefault)
    setTargetWord(words[Math.round(Math.random() * words.length)])
    setGameOver({
      isGameOver: false,
      wordGuess: false
    })
    setCurrentAttempt({ attempt: 0, letter: 0 })
  }


  return(
    <div className='App'>
      <h3 className='title'>Wordle!</h3>
      <Context.Provider
        value={{
          targetWord,
          gameOver,
          currentAttempt,
          setBoard,
          board,
          setCurrentAttempt,
          handleEnter,
          handleSelect,
          handleDelete,
        }}
        >
      <div className='game'>
        <Board/>
        {gameOver.isGameOver
        ? <div>
            <h3>
              {gameOver.wordGuess
                ? "You Correctly Guessed the Wordle"
                : "You Failed to Guess the Word"}
            </h3>
            <h3>Correct Word: {targetWord}</h3>
            {gameOver.wordGuess && (
              <h3>You guessed in {currentAttempt.attempt} attempts</h3>
            )}
            <button className='button' onClick={() => handleReset()}>Play Again</button>
        </div>
          : <Keyboard/>
        }
      </div>
      </Context.Provider>
    </div>
  )
}

export default App