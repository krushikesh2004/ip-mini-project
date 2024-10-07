import React from 'react';
import './Keyboard.css';

function Keyboard({ onLetterClick }) {
  return (
    <div className="keyboard">
      {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
        <button key={letter} onClick={() => onLetterClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;