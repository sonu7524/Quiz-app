import React, { useState } from "react";
import signupImg from "../../../assets/login.png";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";


function Signup({setLoading}) {
  let[fullName,setFullName] = useState("");
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[confirmPassword,setConfirmPassword] = useState("");
    let[error,setError] = useState("");

    const handleFullName = (e)=>{
        setFullName(e.target.value);
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        if(fullName && email && password && confirmPassword){
            if(password === confirmPassword){
                const user = {
                    username: fullName,
                    email: email,
                    password: password
                }

                const response = await axios.post("https://quizine.onrender.com/api/auth/signup", user);
                if(response.status === 200){
                    setLoading(false);
                    window.location.href = "/login";
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
                else{
                    setLoading(false);
                    setError("User Already Exists");
                }
            }else{
                setLoading(false);
                setError("Passwords do not match");
            }
        }
        else{
            setLoading(false);
            setError("All fields are required");
        }
    }

  return (
      <>
        <div className="signup">
          <img className="signup-img" src={signupImg} />
          <form className="form-signup">
            <div className="login-title">
                <div className="pulse purple circle"></div>
                <p className="title">Register </p>
            </div>
                <p className="message">Register now and get full access to our app. </p>
                <input onChange={handleFullName} required="" placeholder="Full Name" type="text" className="input"/>
                <input onChange={handleEmail} required="" placeholder="Email" type="email" className="input"/>
                <input onChange={handlePassword} required="" placeholder="Password" type="password" className="input"/>
                <input onChange={handleConfirmPassword} required="" placeholder="Confirm Password" type="password" className="input"/>
                {error && <span style={{color:"red"}} className="error">{error}</span>}
                <button onClick={handleSubmit} type="submit" className="submit">Submit</button>
                <p className="signin">Already have an acount ? <Link to={"/login"}>Signin</Link> </p>
            </form>
      </div>
      </>
  );
}

export default Signup;
