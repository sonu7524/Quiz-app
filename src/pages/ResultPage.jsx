import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import {calculateScore} from "../functions/calculateScore";
import { useQuestionContext } from "../QuestionProvider";

export default function ResultPage() {
    const { questionArray } = useQuestionContext();
    let [score, setScore] = useState(0);
    useEffect(() => {
        console.log(questionArray);
        const userAnswers = localStorage.getItem("userResponse") || "[]";
        console.log(JSON.parse(userAnswers));
        setScore(calculateScore(questionArray, JSON.parse(userAnswers)));
    })
    return (
        <div className="result-page">
            <Header />
            <h1>Thanks for submitting the test.</h1>
            <h2>Your score is {score}</h2>
        </div>
    )
}