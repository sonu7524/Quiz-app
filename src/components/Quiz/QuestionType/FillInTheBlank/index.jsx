import React, { useState } from 'react';
import './styles.css'; // Make sure to create a corresponding CSS file
import { useParams } from 'react-router-dom';
import ButtonComponent from '../../../common/Button';

const FillInTheBlanks = ({ question, pattern, setUserResponse, correctAnswer }) => {
  const blanksRegex = /{Blank}/g;
  const { queNo } = useParams();
  const blanksCount = (pattern.match(blanksRegex) || []).length;
  const initialUserAnswers = Array.from({ length: blanksCount }, () => '');
  const [isCorrect, setIsCorrect] = useState('');

  const [userAnswers, setUserAnswers] = useState(initialUserAnswers);

  const handleInputChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
    setUserResponse(newAnswers);
  };

  const handleSortAnswers = () => {
    const sortedAnswers = [...userAnswers].sort();
    setUserAnswers(sortedAnswers);
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
  console.log(isCorrect);
  return (
    <div className="fill-in-the-blanks">
      <div className="question-title">
        <h3>Fill in the blanks.</h3>
        <div className='question'>
            <div className='question-pattern'>
              <h3>Que {queNo}:</h3>
              <h3>{question}</h3>
            </div>
            <div onClick={validateAnswers}>
              <ButtonComponent text={'Check'} bgColor={'green'} />
            </div>
        </div>
        {isCorrect === 'correct' ? <p style={{color: 'green'}}>Correct Answer!</p>: <div>{ isCorrect === 'wrong' ? <p style={{color: 'red'}}>Wrong Answer!</p> : <p></p>}</div>}
        <div className='pattern'>{pattern.split('{Blank}').map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index !== pattern.split('{Blank}').length -1 && (
              <input
                type="text"
                value={userAnswers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
          </React.Fragment>
        ))}
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlanks;



