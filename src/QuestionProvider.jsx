import React, { createContext, useContext, useEffect, useState } from 'react';
import { getQuestion } from './functions/getQuestion';

const QuestionContext = createContext();

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export const QuestionProvider = ({ children }) => {
  const [questionArray, setQuestionArray] = useState([]);
  
  useEffect(() => {
    setQuestionArray(getData());
  }, []);
  
  async function getData() {
    return await getQuestion();
  }

  const updateQuestionArray = (updatedArray) => {
    setQuestionArray(updatedArray);
  };

  return (
    <QuestionContext.Provider value={{ questionArray, updateQuestionArray }}>
      {children}
    </QuestionContext.Provider>
  );
};
