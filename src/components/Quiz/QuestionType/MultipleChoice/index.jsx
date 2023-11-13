import React, { useState } from 'react';
import './styles.css';
import ButtonComponent from '../../../common/Button';
import { useParams } from 'react-router-dom';

const MultipleChoiceQuestion = ({ question, options, correctAnswer, setUserResponse }) => {
  let { queNo, quizId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState('');

  const handleOptionChange = (value, checked) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      if (checked) {
        return [...prevSelectedAnswers, value];
      } else {
        return prevSelectedAnswers.filter((answer) => answer !== value);
      }
    });
    setUserResponse((prevSelectedAnswers) => {
      if (checked) {
        return [...prevSelectedAnswers, value];
      } else {
        return prevSelectedAnswers.filter((answer) => answer !== value);
      }
    });
    setUserAnswers((prevSelectedAnswers) => {
      if (checked) {
        return [...prevSelectedAnswers, value];
      } else {
        return prevSelectedAnswers.filter((answer) => answer !== value);
      }
    })
  };

  const validateAnswers = () => {
    // Replace {Blank} placeholders with user answers for validation
    if(typeof correctAnswer === 'object') {
      if(correctAnswer.length !== userAnswers.length) {
        setIsCorrect('wrong');
        return;
      }
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
      <h3>Mutiple Choice Question.</h3>
      <div className="question">
        <div className="question-pattern">
          <h3>Que {queNo}:</h3>
          <h3>{question}</h3>
        </div>
        <div onClick={validateAnswers}>
          <ButtonComponent bgColor={'green'} text={'Check'} />
        </div>
      </div>
      {isCorrect === 'correct' ? <p style={{color: 'green'}}>Correct Answer!</p>: <div>{ isCorrect === 'wrong' ? <p style={{color: 'red'}}>Wrong Answer!</p> : <p></p>}</div>}
      <form className="form-single-choice">
        {options.map((option, index) => (
          <div key={index}>
            <label className={`option`}>
              <input
                type="checkbox"
                name="multipleChoice"
                value={option}
                checked={selectedAnswers.includes(option)}
                onChange={(e)=> handleOptionChange(e.target.value, e.target.checked)}
                // disabled={isCorrect || isWrong} // Disable checkbox after checking the answer
              />
              <div className="checkmark"></div>
              {option}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default MultipleChoiceQuestion;

