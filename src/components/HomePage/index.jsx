import React from "react";
import homeImg from "../../assets/home.png";
import "./styles.css";
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import ButtonComponent from "../common/Button";

export default function Home() {
    const handleClick = () => {
        const authToken = sessionStorage.getItem("auth_token");
        if(authToken){
            window.location.href = "/dashboard";
        }
        else{
            window.location.href = "/login";
        }
    }
    return (
        <div className="home">
            <img className="home-img" src={homeImg} alt="home" />
            <div className="home-content">
                <h1 className="home-title">Create your own <b style={{color: "var(--purple)"}}>Quiz</b>.</h1> 
                <p className="home-subtitle">with <b style={{color: "var(--purple)"}}>Quizine</b>.</p>
                <div className="home-btn" onClick={handleClick}><div><ButtonComponent text="Get Started" color="var(--white)" icon={<DirectionsRunRoundedIcon />} bgColor="var(--black)" /></div></div>
            </div>
        </div>
    )
}