import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board component for Tic Tac Toe. Renders 3x3 grid of Square components.
 * @param {Object} props - props.squares (array of 9), props.onSquareClick (function), props.highlight (array of 3 indices)
 */
function Board({ squares, onSquareClick, highlight }) {
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        highlight={highlight && highlight.includes(i)}
      />
    );
  }
  // Create rows for the board
  const boardRows = [0, 1, 2].map((row) =>
    <div className="board-row" key={row}>
      { [0, 1, 2].map(col => renderSquare(row * 3 + col)) }
    </div>
  );
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {boardRows}
    </div>
  );
}

export default Board;
