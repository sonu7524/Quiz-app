import React, { useState } from 'react';
import './styles.css'; // Make sure to create a corresponding CSS file
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useParams } from 'react-router-dom';
import ButtonComponent from '../../../common/Button';

const SortingQuestion = ({ question, options, setUserResponse, correctAnswer }) => {
  const { queNo, quizId } = useParams();
  const [userAnswers, setUserAnswers] = useState([...options]);
  const [draggedOption, setDraggedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState('');

  const handleDragStart = (index) => {
    setDraggedOption(index);
  };

  const handleDragOver = (index) => {
    const updatedOrder = [...userAnswers];
    updatedOrder.splice(draggedOption, 1);
    updatedOrder.splice(index, 0, userAnswers[draggedOption]);
    setUserAnswers(updatedOrder);
    setDraggedOption(index);
    setUserResponse(updatedOrder);
  };

  const handleDragEnd = () => {
    setDraggedOption(null);
  };

  const validateAnswers = () => {
    // Replace {Blank} placeholders with user answers for validation
    console.log(correctAnswer, userAnswers);
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
    console.log(isCorrect);
  };

  return (
    <div className="sorting-question">
      <h3>Sorting Type Question.</h3>
      <div className="question">
        <div className="question-pattern">
          <h3>Que {queNo}:</h3>
          <h3>{question}</h3>
        </div>
        <div onClick={validateAnswers}><ButtonComponent bgColor={'green'} text={'Check'}  /></div>
      </div>
      {isCorrect === 'correct' ? <p style={{color: 'green'}}>Correct Answer!</p>: <div>{ isCorrect === 'wrong' ? <p style={{color: 'red'}}>Wrong Answer!</p> : <p></p>}</div>}
      <div className="form-single-choice">
        {userAnswers.map((option, index) => (
          <div key={index} className="option" draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(index);
          }}
          onDragEnd={handleDragEnd}>
              <DragIndicatorIcon />
              <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingQuestion;
