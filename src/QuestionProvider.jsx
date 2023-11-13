import React, { createContext, useContext, useState } from 'react';

const QuestionContext = createContext();

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export const QuestionProvider = ({ children }) => {
  const [questionArray, setQuestionArray] = useState([
    {
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        userAnswer: null,
        correctAnswer: "Delhi",
        questionType: "single",
        questionNumber: 1
    },
    {
        question: "What is the largest country in the world?",
        options: ["Russia", "Canada", "China", "USA"],
        userAnswer: null,
        correctAnswer: "Russia",
        questionType: "single",
        questionNumber: 2
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
        userAnswer: null,
        correctAnswer: "Vatican City",
        questionType: "single",
        questionNumber: 3
    },
    {
        question: "What is the largest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        userAnswer: null,
        correctAnswer: "Nile",
        questionType: "single",
        questionNumber: 4
    },
    {
        question: "What is the smallest continent in the world?",
        options: ["Africa", "Antarctica", "Australia", "Asia"],
        userAnswer: null,
        correctAnswer: "Antarctica",
        questionType: "single",
        questionNumber: 5
    },
    {
        questionType: "multiple",
        questionNumber: 6,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        userAnswer: [],
        correctAnswer: ["Sydney", "Canberra", "Melbourne"],
    },
    {
        questionType: "multiple",
        questionNumber: 7,
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        userAnswer: [],
        correctAnswer: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    },
    {
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        userAnswer: null,
        correctAnswer: "Delhi",
        questionType: "single",
        questionNumber: 8
    },
    {
        question: "What is the largest country in the world?",
        options: ["Russia", "Canada", "China", "USA"],
        userAnswer: null,
        correctAnswer: "Russia",
        questionType: "single",
        questionNumber: 9
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
        userAnswer: null,
        correctAnswer: "Vatican City",
        questionType: "single",
        questionNumber: 10
    },
    {
        question: "What is the largest river in the world?",
        options: null,
        userAnswer: null,
        correctAnswer: "Nile",
        questionType: "freely",
        questionNumber: 11
    },
    {
        question: "Follow the missing pattern and fill in accordingly.",
        pattern: "12, 16, {Blank}, 24, 28, {Blank}, 36",
        userAnswer: [],
        correctAnswer: ["20", "32"],
        questionType: "filling",
        questionNumber: 12
    },
    {
        question: "Fill in the missing word",
        questionType: "filling",
        questionNumber: 13,
        pattern: "{Blank} is the capital of Australia?",
        userAnswer: [],
        correctAnswer: ["Sydney"],
    },
    {
        questionType: "sorting",
        questionNumber: 14,
        question: "Arrange correct order of the following cities?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        userAnswer: [],
        correctAnswer: ["Chennai","Mumbai","Delhi", "Kolkata"],
    },
    {
        question: "What is the smallest continent in the world?",
        criteria: ["Africa", "Antarctica", "Australia", "Asia"],
        sortElements: ["Antarctica","Africa", "Australia", "Asia"],
        userAnswer: null,
        correctAnswer: ["Africa", "Antarctica", "Australia", "Asia"],
        questionType: "matrix",
        questionNumber: 15
    },
    {
        questionType: "sorting",
        questionNumber: 16,
        question: "Arrange correct order of the following cities?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        userAnswer: [],
        correctAnswer: ["Chennai","Mumbai","Delhi", "Kolkata"],
    },
  
  ]); // Your initial question array

  const updateQuestionArray = (updatedArray) => {
    setQuestionArray(updatedArray);
  };

  return (
    <QuestionContext.Provider value={{ questionArray, updateQuestionArray }}>
      {children}
    </QuestionContext.Provider>
  );
};
