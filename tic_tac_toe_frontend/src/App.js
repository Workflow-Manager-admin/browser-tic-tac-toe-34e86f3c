import React, { useState } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component for Tic Tac Toe.
 * Handles state for the game, history, and scoreboard.
 */
function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState(null); // 'X', 'O', or 'draw'

  // Scoreboard state
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  // Determine winner or draw whenever board changes
  React.useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setResult(winner);
      setGameOver(true);
      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    } else if (board.every(Boolean)) {
      setResult('draw');
      setGameOver(true);
      setScore((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    }
  }, [board]);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || gameOver) return;
    const nextBoard = [...board];
    nextBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext((x) => !x);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(result === 'draw' ? isXNext : result === 'O');
    setGameOver(false);
    setResult(null);
  }

  // PUBLIC_INTERFACE
  function handleRestartAll() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setResult(null);
    setScore({ X: 0, O: 0, draws: 0 });
  }

  let status;
  if (result === 'draw') {
    status = "It's a draw!";
  } else if (result) {
    status = `Winner: ${result}`;
  } else {
    status = `Next: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="tic-tac-toe-app">
      <div className="scoreboard-container">
        <Scoreboard X={score.X} O={score.O} draws={score.draws} />
      </div>
      <div className="game-area">
        <div className="status" aria-live="polite">{status}</div>
        <Board
          squares={board}
          onSquareClick={handleSquareClick}
          highlight={result && result !== 'draw' ? getWinningLine(board) : []}
        />
        <div className="controls">
          <button className="control-btn" onClick={handleReset} aria-label="Reset game" tabIndex={0}>
            Reset Game
          </button>
          <button className="control-btn" onClick={handleRestartAll} aria-label="Restart scores" tabIndex={0}>
            Restart Scores
          </button>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // All possible winning line combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// Find the winning line for highlighting after win
function getWinningLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return [a, b, c];
    }
  }
  return [];
}

export default App;
