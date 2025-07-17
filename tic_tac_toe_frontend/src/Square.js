import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Single square button for the Tic Tac Toe board.
 * @param {Object} props - value (X/O/null), onClick (func), highlight (boolean)
 */
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      aria-label={value ? `Square occupied by ${value}` : 'Empty square'}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

export default Square;
