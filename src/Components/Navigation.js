import React from 'react';
import './Navigation.css';

function Navigation({ onPrevClick, onNextClick }) {
  return (
    <div className="navigation">
      <button onClick={onPrevClick}>←</button>
      <button onClick={onNextClick}>→</button>
    </div>
  );
}

export default Navigation;