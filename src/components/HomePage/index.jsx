import React from "react";
import ButtonComponent from "../common/Button";
import { useNavigate } from "react-router-dom";
import homeImg from "../../assets/home.png";
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import "./styles.css";


export default function HomePage() {
    const navigate = useNavigate();
    const handleStartButton = () => {
        const auth_token = localStorage.getItem("auth_token");
        if (auth_token) {
            navigate("/quiz");
        }
        else{
            navigate("/login");
        }
    }
    return (
        <div className="home-page">
            <div className="home-content">
                <h1 className="home-title">Create your own <b style={{color: "var(--purple)"}}>Quiz</b>.</h1> 
                <p className="home-subtitle">with <b style={{color: "var(--purple)"}}>Quizine</b>.</p>
                <div className="home-btn" onClick={handleStartButton}><div><ButtonComponent text="Get Started" color="var(--white)" icon={<DirectionsRunRoundedIcon />} bgColor="var(--black)" /></div></div>
            </div>
            <img className="home-img" src={homeImg} alt="home" />
        </div>
    );
}