import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Scoreboard for tracking wins and draws.
 * @param {Object} props - X, O, draws (numbers)
 */
function Scoreboard({ X, O, draws }) {
  return (
    <div className="scoreboard" role="region" aria-label="Scoreboard">
      <div className="score x-score">
        X <span>{X}</span>
      </div>
      <div className="score o-score">
        O <span>{O}</span>
      </div>
      <div className="score draws">
        Draws <span>{draws}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
