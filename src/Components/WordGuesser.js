import React, { useState, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import Keyboard from './Keyboard';
import Navigation from './Navigation';
import ScoreDisplay from './ScoreDisplay';
import LivesDisplay from './LivesDisplay';

const questions = [
  { question: "A Fruit, which keeps doctor away.", answer: "APPLE" },
  { question: "World's longest river.", answer: "NILE" },
  { question: "Largest planet in our solar system.", answer: "JUPITER" },
  { question: "A precious yellow metal.", answer: "GOLD" },
  { question: "The closest star to Earth.", answer: "SUN" },
  { question: "Frozen water is called...", answer: "ICE" }
];

function WordGuesser() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [guessedWord, setGuessedWord] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetWord();
  }, [currentQuestion]);

  const resetWord = () => {
    setGuessedWord('_'.repeat(questions[currentQuestion].answer.length));
    setLives(3);
  };

  const handleLetterClick = (letter) => {
    if (gameOver) return;

    const answer = questions[currentQuestion].answer;
    let newGuessedWord = '';
    let correctGuess = false;
    
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === letter) {
        newGuessedWord += letter;
        correctGuess = true;
      } else {
        newGuessedWord += guessedWord[i];
      }
    }
    
    setGuessedWord(newGuessedWord);
    
    if (!correctGuess) {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        setGameOver(true);
      }
    }
    
    if (newGuessedWord === answer) {
      setScore(score + 1);
      if (currentQuestion === questions.length - 1) {
        setGameOver(true);
      } else {
        handleNextQuestion();
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    resetWord();
  };

  return (
    <div className="word-guesser">
      <ScoreDisplay score={score} />
      <LivesDisplay lives={lives} />
      <QuestionDisplay 
        question={questions[currentQuestion].question} 
        guessedWord={guessedWord} 
      />
      <Keyboard onLetterClick={handleLetterClick} />
      <Navigation 
        onPrevClick={handlePrevQuestion} 
        onNextClick={handleNextQuestion} 
      />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default WordGuesser;
