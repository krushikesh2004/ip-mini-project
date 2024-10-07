import React, { useState, useEffect } from 'react';
import './MathQuiz.css';

function MathQuiz() {
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateQuestion();
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() < 0.5 ? '+' : 'x';
    
    setQuestion(`${num1} ${operator} ${num2}`);
    
    const answer = operator === '+' ? num1 + num2 : num1 * num2;
    setCorrectAnswer(answer);
    
    const wrongAnswers = [
      answer + Math.floor(Math.random() * 5) + 1,
      answer - Math.floor(Math.random() * 5) - 1,
      answer * 2,
    ];
    
    setOptions(shuffle([...wrongAnswers, answer]));
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    generateQuestion();
  };

  const stopGame = () => {
    setGameOver(true);
    setTimeRemaining(0);
  };

  const restartGame = () => {
    setScore(0);
    setTimeRemaining(60);
    setGameOver(false);
    generateQuestion();
  };

  return (
    <div className="math-quiz">
      <div className="score">Score: {score}</div>
      <div className="question-container">
        <div className="question">{question}</div>
        <div className="instruction">Click on the correct answer!</div>
      </div>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)} disabled={gameOver}>
            {option}
          </button>
        ))}
      </div>
      <div className="controls">
        <button className="stop-button" onClick={stopGame} disabled={gameOver}>
          Stop Game
        </button>
        <div className="time-remaining">Time Remaining: {timeRemaining}</div>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default MathQuiz;
