import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import WordGuesser from './Components/WordGuesser';
import TicTacToe from './Components/TicTacToe';
import MathQuiz from './Components/MathQuiz';
import MazeRunner from './Components/MazeRunner'; // Add this import

function App() {
  const [activeGame, setActiveGame] = useState('wordguesser');

  return (
    <div className="App">
      <Navbar setActiveGame={setActiveGame} />
      <div className="game-container">
        {activeGame === 'wordguesser' && <WordGuesser />}
        {activeGame === 'tictactoe' && <TicTacToe />}
        {activeGame === 'mathquiz' && <MathQuiz />}
        {activeGame === 'mazerunner' && <MazeRunner />} {/* Add this line */}
      </div>
    </div>
  );
}

export default App;
