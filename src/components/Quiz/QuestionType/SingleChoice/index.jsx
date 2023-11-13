import React, { useState } from 'react';
import ButtonComponent from '../../../common/Button';
import { useParams } from 'react-router-dom';
import './styles.css';
const SingleChoiceQuestion = ({ question, options, setUserResponse, correctAnswer }) => {
  let { queNo, quizId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState('');
  const [userAnswers, setUserAnswers] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
    <div className='single-choice'>
      <h3>Single Choice Question.</h3>
      <div className="question">
        <div className="question-pattern">
          <h3>Que {queNo}:</h3>
          <h3>{question}</h3>
        </div>
        <div onClick={validateAnswers}><ButtonComponent bgColor={'green'} text={'Check'}  /></div>
      </div>
      {isCorrect === 'correct' ? <p style={{color: 'green'}}>Correct Answer!</p>: <div>{ isCorrect === 'wrong' ? <p style={{color: 'red'}}>Wrong Answer!</p> : <p></p>}</div>}
      <form className="form-single-choice">
        {options.map((option, index) => (
          <div key={index}>
            
            <label className='option'>
              <input
                type="radio"
                name="singleChoice"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <div>{option}</div>
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default SingleChoiceQuestion;
