import React, { useState, useEffect } from "react";
import "./styles.css";
import ButtonComponent from "../common/Button";
export default function Dashboard() {  
    const handleCreateQuiz = () => {
        window.location.href = "/create-quiz";
    }

    const handleJoinQuiz = () => {
        window.location.href = "/join-quiz";
    }
    
    return (
        <div className="dashboard">
           <div className="dashboard-button">
               <div onClick={handleCreateQuiz}><ButtonComponent text="create quiz" bgColor={"var(--purple)"} /></div>
               <div onClick={handleJoinQuiz}><ButtonComponent text="join quiz" bgColor={"var(--purple)"} /></div>
           </div>
           <div className="dashboard-content">

           </div>
        </div>
    )
}