import QuestionComponent from "../components/Quiz/Question";
import React, { useState, useEffect } from 'react';
import { getQuestion } from '../functions/getQuestion';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuizPage() {

    let { quizId, queNo } = useParams();
    const navigate = useNavigate();
    const [questionArray, setQuestionArray] = useState([]);

    useEffect(() => {
      getData();  
    }, []);
    
    async function getData() {
      const questions = await getQuestion("001q");
      setQuestionArray(questions);
    }


    const totalQuestions = questionArray.length;
    const history = useNavigate();
    const questionsPerRow = Math.floor(totalQuestions / 4);
    const [currentQuestion, setCurrentQuestion] = useState(parseInt(queNo));
    const [time, setTime] = useState(parseInt(localStorage.getItem('timer')) || 900);
    const [timeRemaining, setTimeRemaining] = useState({});
    const [isFlagged, setIsFlagged] = useState(false);

    
    const [visitedQuestions, setVisitedQuestions] = useState(
      JSON.parse(localStorage.getItem('visitedQuestions')) || []
    );
    const [flaggedQuestions, setFlaggedQuestions] = useState(
      JSON.parse(localStorage.getItem('flaggedQuestions')) || []
    );

    useEffect(() => {
      if (localStorage.getItem('visitedQuestions')) {
        setVisitedQuestions(JSON.parse(localStorage.getItem('visitedQuestions')));
      }
      else {
        localStorage.setItem('visitedQuestions', JSON.stringify([1]));
      }
      const timer = setInterval(() => {
        if (time > 0) {
          const hours = Math.floor(time / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = time % 60;
          setTimeRemaining({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          });
          setTime(time - 1);
        } else {
          // Redirect to the results page or do something when the time is up
          clearInterval(timer);
          alert('Time is up!');
          history('/results');
        }
      }, 1000);
      localStorage.setItem('timer', time);

      return () => {
        clearInterval(timer);
      };

    }, [time, history, currentQuestion, queNo]);


    const renderQuestionBoxes = () => {
      const boxes = [];
      for (let i = 1; i <= totalQuestions; i++) {
        const isVisited = visitedQuestions.findIndex((q) => q === i) !== -1;
        const isFlagged = flaggedQuestions.includes(i);
        boxes.push(
          <div
            key={i}
            className={`question-box ${i === parseInt(queNo) ? 'selected' : ''} ${isFlagged ? 'flagged' : ''} ${isVisited ? 'visited' : ''}`}
            onClick={() => navigate(`/quiz/que/${i}`)}
          >
            {i}
          </div>
        );
      }
      return boxes;
    };

    return (
      <div>
        <div className="quiz-container">
          <div className="quiz-left-container">
            <QuestionComponent questionObj={questionArray[queNo - 1]} totalQuestions={questionArray.length} setIsFlagged={setIsFlagged} />
          </div>
          <div className="quiz-right-container">
            <div className="timer-box">Time Remaining: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</div>
            <div className="question-grid">{renderQuestionBoxes()}</div>
          </div>
        </div>
      </div>
    );
}
