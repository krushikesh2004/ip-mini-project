import React from 'react';
import './LivesDisplay.css';

function LivesDisplay({ lives }) {
  return (
    <div className="lives-display">
      <div className="lives-label">LIVES</div>
      <div className="lives-value">{lives}</div>
    </div>
  );
}

export default LivesDisplay;
