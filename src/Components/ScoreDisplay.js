import React from 'react';
import './ScoreDisplay.css';

function ScoreDisplay({ score }) {
  return (
    <div className="score-display">
      <div className="score-label">SCORE</div>
      <div className="score-value">{score}</div>
    </div>
  );
}

export default ScoreDisplay;