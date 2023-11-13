import React, { lazy, Suspense, useState } from "react";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/common/Loader";
import AccountPage from "./pages/AccountPage";
import { QuestionProvider } from "./QuestionProvider";
import QuizPage from "./pages/QuizPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
import ResultPage from "./pages/ResultPage";
import InstructionPage from "./pages/InstructionPage";

function App() {
  const authToken = sessionStorage.getItem("auth_token");
  const quizId = localStorage.getItem("quizId");
  const currentQuestion = parseInt(localStorage.getItem("currentQuestion")) || 0;

  return (
    <div className="App">
      <QuestionProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="loader"><Loader /></div>}>
        <Routes>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="quiz/result" element={<ResultPage />} />
          {authToken ? <Route path="/login" element={<Navigate to="/dashboard" />} /> : <Route path="/login" element={<LoginPage />} />}
          {authToken ? <Route path="/quiz/*" element={<InstructionPage />} /> : <Route path="/quiz/*" element={<Navigate to="/login" />} />}
          {authToken ? <Route path="/account" element={<AccountPage />} /> : <Route path="/account" element={<Navigate to="/login" />} />}
          {currentQuestion === 0 ? <Route path="/quiz/*" element={<InstructionPage />} /> : <Route path="/quiz/*" element={<Navigate to={`/quiz/${quizId}/que/${currentQuestion}`} />} />}
          <Route path="/quiz/que/:queNo" element={<QuizPage />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      </QuestionProvider>
    </div>
  );
}

export default App;
