import React from 'react';
import './Navbar.css';

function Navbar({ setActiveGame }) {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => setActiveGame('wordguesser')}>Word Guesser</li>
        <li onClick={() => setActiveGame('tictactoe')}>Tic-Tac-Toe</li>
        <li onClick={() => setActiveGame('mathquiz')}>Math Quiz</li>
        <li onClick={() => setActiveGame('mazerunner')}>Maze Runner</li> {/* Add this line */}
      </ul>
    </nav>
  );
}

export default Navbar;
