import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonComponent from '../../../common/Button';
import './styles.css';

const MatrixSortingChoiceQuestion = ({ question, criteria, sortElements, setUserResponse, correctAnswer }) => {
  const { queNo } = useParams();
  const [sortedElements, setSortedElements] = useState(sortElements);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(criteria.length).fill(null));
  const [userOrder, setUserOrder] = useState([]);
  let [isCorrect, setIsCorrect] = useState('');

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('index', index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event, criterionIndex) => {
    event.preventDefault();

    const droppedIndex = parseInt(event.dataTransfer.getData('index'));

    const updatedElements = Array.from(sortedElements);
    const [removed] = updatedElements.splice(draggedIndex, 1);
    updatedElements.splice(droppedIndex, 0, removed);

    setSortedElements(updatedElements);

    // Set the user answer for the corresponding criterion
    const updatedAnswers = [...userAnswers];
    updatedAnswers[criterionIndex] = draggedIndex;
    setUserAnswers(updatedAnswers);

    setDraggedIndex(null);
    const newAnswers = [];
    for(let i = 0; i < criteria.length; i++) {
      newAnswers.push(sortElements[updatedAnswers[i]]);
    }
    setUserResponse(newAnswers);
    setUserOrder(newAnswers);
  };
  const validateAnswers = () => {
    console.log(userOrder);
    for(let i = 0; i < correctAnswer.length; i++) {
      if(correctAnswer[i].toLowerCase() !== userOrder[i].toLowerCase()) {
        setIsCorrect('wrong');
        return;
      }
    }
    setIsCorrect('correct');
  };

  return (
    <div className="single-choice">
      <h3>Matrix Type Question.</h3>
      <div className="question">
          <div className="question-pattern">
            <h3>Que {queNo}:</h3>
            <h3>{question}</h3>
          </div>
          <div onClick={validateAnswers}>
              <ButtonComponent bgColor={'green'} text={'Check'} />
          </div>
      </div>
      <div
        className="sortable-elements"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 0)} // Assuming the first criterion
      >
        {sortedElements.map((element, index) => (
          <div
            key={index}
            className="sort-element"
            draggable
            onDragStart={handleDragStart(index)}
          >
            {element}
          </div>
        ))}
      </div>
      {isCorrect === 'correct' ? <p style={{color: 'green'}}>Correct Answer!</p>: <div>{ isCorrect === 'wrong' ? <p style={{color: 'red'}}>Wrong Answer!</p> : <p></p>}</div>}
      <div className="criterion-container">
        {criteria.map((criterion, index) => (
          <tr key={index} className="option">
            <td>{criterion}</td>
            <td
              className="set-answer"
              onDragOver={(event) => handleDragOver(event)}
              onDrop={(event) => handleDrop(event, index)}
            >
              {/* Display the current user answer for this criterion */}
              {userAnswers[index] !== null && (
                <div className="user-answer">
                  {sortedElements[userAnswers[index]]}
                </div>
              )}
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
};

export default MatrixSortingChoiceQuestion;

