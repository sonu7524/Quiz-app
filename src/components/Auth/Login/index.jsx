import React, { useState } from "react";
import loginImg from "../../../assets/login.png";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[error,setError] = useState("");

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const generateToken = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (email && password) {
        try {
          const user = JSON.parse(localStorage.getItem(email));
          // Check if the response contains a token
          if (user) {
            // Redirect to the "/dashboard" page
            window.location.href = "/quiz";
            // Set the token in the sessionStorage
            sessionStorage.setItem("auth_token", generateToken());
          } else {
            setError("Account not found");
          }
        } catch (error) {
          console.error(error);
          setError("Invalid Credentials");
        }
      } else {
        setError("All fields are required");
      }
    };
    return (
        <div className="login">
            <img className="login-img" src={loginImg} />
            <form className="login-form">
                <div className="login-title">
                  <div className="pulse purple circle"></div>
                  <p className="title">Login Now</p>
                </div>
                <p className="message">Login now and get full access to our app. </p> 
                <input onChange={handleEmail} required="" placeholder="Email" type="email" className="input"/>
                <input onChange={handlePassword} required="" placeholder="Password" type="password" className="input"/>
                {error && <span style={{color:"red"}} className="error">{error}</span>}
                <button onClick={handleSubmit} className="submit">Login</button>
                <p className="signin">Don't have an acount ? <Link to={"/register"}>Register Now</Link> </p>
            </form>
        </div>
    )
}

export default Login;
