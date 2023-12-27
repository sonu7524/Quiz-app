import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import {calculateScore} from "../functions/calculateScore";
import {getQuestion} from "../functions/getQuestion";
import ButtonComponent from "../components/common/Button";

export default function ResultPage() {
    let [result, setResult] = useState({});
    let [questionsArray, setQuestionsArray] = useState([]);
    useEffect(() => {
        getData(); 
        const userResponse = JSON.parse(localStorage.getItem("userResponse"));
        setResult(calculateScore(questionsArray, userResponse));
    },[questionsArray]);

    async function getData() {
        const questions = await getQuestion("001q");
        setQuestionsArray(questions);
    }

    const handleExit = () => {
        localStorage.setItem("currentQuestion", 1);
        localStorage.removeItem("userResponse");
        localStorage.removeItem("visitedQuestions");
        localStorage.removeItem("flaggedQuestions");
        localStorage.removeItem("timer");
        window.location.href = "/";
    }
    return (
        <div className="result-page">
            <div className="result-wrapper">
                <div className="result-container">
                    <h1>Thanks for submitting the test.</h1>
                    <h2 style={{color: 'var(--blue)'}}>Your score is <b style={{color: 'green'}}>{result.totalScore}</b></h2>
                    <table>
                        <tbody>
                                <tr style={{color: 'blue'}}>
                                    <th>Total Questions</th>
                                    <td>{result.totalQuestions}</td>
                                </tr>
                                <tr style={{color: 'green'}}>
                                    <th>Correct Answers</th>
                                    <td>{result.correctAnswers}</td>
                                </tr>
                                <tr style={{color: 'red'}}>
                                    <th>Incorrect Answers</th>
                                    <td>{result.incorrectAnswers}</td>
                                </tr>
                                <tr style={{color: 'gray'}}>
                                    <th>Unanswered</th>
                                    <td>{result.totalQuestions-result.incorrectAnswers-result.correctAnswers}</td>
                                </tr>
                        </tbody>
                    </table>
                    <div onClick={handleExit}><ButtonComponent text="Exit" color="var(--white)" bgColor="var(--black)" /></div>
                </div>
            </div>
        </div>
    )
}