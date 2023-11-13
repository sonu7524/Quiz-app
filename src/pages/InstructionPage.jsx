import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ButtonComponent from "../components/common/Button";

export default function InstructionPage() {
    const [isChecked, setChecked] = useState(false);
    const navigate = useNavigate();

  const handleStartClick = () => {
    if (isChecked) {
      // Redirect to the quiz page
      localStorage.setItem('quizId', 1);
      navigate(`/quiz/que/1`);
    } else {
      alert('Please acknowledge that you have read the instructions.');
    }
  };

  return (
    <div className="quiz-start-container">
      <h1>Quiz Instructions</h1>
      <p>
        Welcome to the quiz! Read the instructions carefully before proceeding.
      </p>
      <ul>
        <li>Make sure you have a stable internet connection.</li>
        <li>You will have a limited time to complete the quiz.</li>
        <li>Answer all the questions to the best of your ability.</li>
      </ul>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
        />
        I have read and understood the instructions.
      </label>
      <div onClick={handleStartClick}><ButtonComponent text={"Start Quiz"}/></div>
    </div>
  );
};