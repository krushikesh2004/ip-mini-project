import React from 'react';
import './QuestionDisplay.css';

function QuestionDisplay({ question, guessedWord }) {
  return (
    <div className="question-display">
      <div className="word-display">{guessedWord.split('').join(' ')}</div>
      <div className="question">{question}</div>
    </div>
  );
}

export default QuestionDisplay;