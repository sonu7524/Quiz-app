import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import ButtonComponent from '../../../common/Button';

const FreeChoiceQuestion = ({ question, setUserResponse, correctAnswer }) => {
  const {queNo} = useParams();
  const [userAnswers, setUserAnswers] = useState('');
  const [isCorrect, setIsCorrect] = useState('');

  const handleInputChange = (e) => {
    setUserAnswers(e.target.value);
    setUserResponse(e.target.value);
  };

  const validateAnswers = () => {
    // Replace {Blank} placeholders with user answers for validation
    if(typeof correctAnswer === 'object') {
      for(let i = 0; i < correctAnswer.length; i++) {
        if(correctAnswer[i].toLowerCase() !== userAnswers[i].toLowerCase()) {
          setIsCorrect('wrong');
          return;
        }
      }
      setIsCorrect('correct');
    }
    else{
      if(correctAnswer.toLowerCase() !== userAnswers.toLowerCase()) {
        setIsCorrect('wrong');
        return;
      }
      setIsCorrect('correct');
    }
    
  };

  return (
    <div className="free-choice">
      <h3>Freely Answer Question.</h3>
      <div className="question">
        <div className="question-pattern">
          <h3>Que {queNo}:</h3>
          <h3>{question}</h3>
        </div>
        <div onClick={validateAnswers}>
          <ButtonComponent bgColor={'green'} text={'Check'} />
        </div>
      </div>
      <div>
      {isCorrect === 'correct' ? <p style={{color: 'green'}}>Correct Answer!</p>: <div>{ isCorrect === 'wrong' ? <p style={{color: 'red'}}>Wrong Answer!</p> : <p></p>}</div>}
      </div>
      <label className='free-input'>
        <p>Your Answer: </p>
        <input type="text" value={userAnswers} onChange={handleInputChange} />
      </label>
    </div>
  );
};

export default FreeChoiceQuestion;