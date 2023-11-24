
import "./styles.css";
import MatrixSortingChoiceQuestion from '../QuestionType/MatrixType';
import SingleChoiceQuestion from '../QuestionType/SingleChoice';
import MultipleChoiceQuestion from '../QuestionType/MultipleChoice';
import ButtonComponent from '../../common/Button';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FillInTheBlanks from "../QuestionType/FillInTheBlank";
import SortingQuestion from "../QuestionType/SortingAnswer";
import FreeChoiceQuestion from "../QuestionType/FreeAnswer";



const QuestionComponent = ({questionObj, totalQuestions, setIsFlagged}) => {
  const { queNo, quizId } = useParams();
  let [userResponse, setUserResponse] = useState([]);
  let [ visitedQue, setVisitedQue] = useState([]);
  let[isFlag, setIsFlag] = useState(false);

  useEffect(() => {
    localStorage.setItem('currentQuestion', parseInt(queNo));
  }, [queNo]);

  const handleSaveAnswer = (state, setState) => {
    const visitedQuestions = JSON.parse(localStorage.getItem('visitedQuestions'));
    if(!visitedQuestions){
      localStorage.setItem('visitedQuestions', parseInt(queNo));
      setVisitedQue(parseInt(queNo));
    }
    else{
      const index = visitedQuestions.indexOf(parseInt(queNo));
      if(index === -1){
        visitedQuestions.push(parseInt(queNo));
        localStorage.setItem('visitedQuestions', JSON.stringify(visitedQuestions));
        setVisitedQue(visitedQuestions);
      }
    }
    const data = {
      questionId: parseInt(queNo),
      answer: state
    }
    console.log(data)
    const userResponse = localStorage.getItem('userResponse');
    if (userResponse) {
      const response = JSON.parse(userResponse);
      const quesResponse =  response.find((item) => item.questionId === parseInt(queNo));
      if(quesResponse){
        const index = response.indexOf(quesResponse);
        response[index] = data;
        localStorage.setItem('userResponse', JSON.stringify(response));
      }
      else{
        response.push(data);
        localStorage.setItem('userResponse', JSON.stringify(response));
      }
    }
    else {
      localStorage.setItem('userResponse', JSON.stringify([data]));
    }

    setState([]);
  }

  const handleFlagBtn = () => {

    const flagArray = JSON.parse(localStorage.getItem('flaggedQuestions')) || [];

    if(flagArray.indexOf(parseInt(queNo)) === -1){
        flagArray.push(parseInt(queNo));
        localStorage.setItem('flaggedQuestions', JSON.stringify(flagArray));
    }
    else{
        flagArray.splice(flagArray.indexOf(parseInt(queNo)), 1);
        localStorage.setItem('flaggedQuestions', JSON.stringify(flagArray));
    }
    setIsFlag(!isFlag);
    setIsFlagged(!isFlag);
};

  const handleSubmit = () => {
    handleSaveAnswer(userResponse, setUserResponse);
    alert("You have submitted your answer");
    navigate(`/results`);
  }
  const navigate = useNavigate();
    return (
      <div className="question-container">
        <div className="question-change">
            {parseInt(queNo) > 1 && <div onClick={() => navigate(`/quiz/que/${parseInt(queNo) - 1}`)}><ButtonComponent text="Previous" /></div>}
            {totalQuestions > parseInt(queNo) && <div onClick={() => handleSaveAnswer(userResponse, setUserResponse)} className={parseInt(queNo) === 1 ? "next-btn" : ""}><div onClick={() => navigate(`/quiz/que/${parseInt(queNo) + 1}`)}><ButtonComponent text="Next" /></div></div>}
        </div>
        <div className="question-content">
            {questionObj?.questionType === "single" && <SingleChoiceQuestion question={questionObj?.question} options={questionObj?.options} setUserResponse={setUserResponse} correctAnswer={questionObj?.correctAnswer} />}
            {questionObj?.questionType === "multiple" && <MultipleChoiceQuestion question={questionObj?.question} options={questionObj?.options} setUserResponse={setUserResponse} correctAnswer={questionObj?.correctAnswer} />}
            {questionObj?.questionType === "matrix" && <MatrixSortingChoiceQuestion question={questionObj?.question} criteria={questionObj?.criteria} setUserResponse={setUserResponse} sortElements={questionObj?.sortElements} correctAnswer={questionObj?.correctAnswer} />}
            {questionObj?.questionType === "filling" && <FillInTheBlanks question={questionObj?.question} pattern={questionObj?.pattern} setUserResponse={setUserResponse} correctAnswer={questionObj?.correctAnswer} />}
            {questionObj?.questionType === "sorting" && <SortingQuestion question={questionObj?.question} options={questionObj?.options} setUserResponse={setUserResponse} correctAnswer={questionObj?.correctAnswer} />}
            {questionObj?.questionType === "freely" && <FreeChoiceQuestion question={questionObj?.question} setUserResponse={setUserResponse} correctAnswer={questionObj?.correctAnswer} />}  
        </div>
        <div className="question-footer">
            <div className="question-footer-btn">
              <div className="quiz-flag" onClick={handleFlagBtn}><ButtonComponent bgColor={'orange'} text={isFlag ? 'Unflag' : 'Flag'} /></div>
              {totalQuestions === parseInt(queNo) && <div className="quiz-submission" onClick={handleSubmit}><ButtonComponent bgColor={"var(--purple)"} text="Submit" /></div>}
            </div>
        </div>
      </div>
    );
};

export default QuestionComponent;
