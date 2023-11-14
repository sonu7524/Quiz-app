import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import {calculateScore} from "../functions/calculateScore";
import { useQuestionContext } from "../QuestionProvider";

export default function ResultPage() {
    const { questionArray } = useQuestionContext();
    let [userResponse, setUserResponse] = useState(JSON.parse(localStorage.getItem("userResponse")) || []);
    let [result, setResult] = useState({});
    useEffect(() => {
        setResult(calculateScore(questionArray, userResponse));
        setTimeout(() => {
            localStorage.clear();
        }, 5000);
    })
    return (
        <div className="result-page">
            <Header />
            <div className="result-wrapper">
                <div className="result-container">
                    <h1>Thanks for submitting the test.</h1>
                    <h2 style={{color: 'var(--blue)'}}>Your score is <b style={{color: 'green'}}>{result.totalScore}</b></h2>
                    <table>
                        <tbody>
                                <tr>
                                    <th>Total Questions</th>
                                    <td>{result.totalQuestions}</td>
                                </tr>
                                <tr>
                                    <th>Correct Answers</th>
                                    <td>{result.correctAnswers}</td>
                                </tr>
                                <tr>
                                    <th>Incorrect Answers</th>
                                    <td>{result.incorrectAnswers}</td>
                                </tr>
                                <tr>
                                    <th>Unanswered</th>
                                    <td>{result.totalQuestions-result.incorrectAnswers-result.correctAnswers}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}