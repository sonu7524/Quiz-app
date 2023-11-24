import React from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../Button";
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';

export default function Header() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("auth_token");
    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        navigate("/login");
    }

    const isloginMenu =     <div className="login-menu">
                                <Link className="link1" to="/"><p>HOME</p></Link>
                                <Link className="link1" to="/login"><p>LOGIN</p></Link>
                                <Link className="link1" to="/register"><p>REGISTER</p></Link>
                            </div>

    const isprofileMenu =  <div className="profile-menu">
                                <Link to="/"><p className="link2">HOME</p></Link>
                                <Link to="/account"><p className="link2">ACCOUNT</p></Link>
                                <Link to="/quiz"><Button text="Start Quiz" color="var(--black)" bgColor="var(--white)" /></Link>
                                <p className="link2" onClick={handleLogout}><LogoutIcon /></p>
                            </div>
    return (
        <div className="header">
            <h1 className="logo"><DirectionsRunRoundedIcon sx={{fontSize: "2.2rem"}} />Quizine.</h1>
            {authToken ? isprofileMenu : isloginMenu}
        </div>
    );
}