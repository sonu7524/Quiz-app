import React, { useEffect, useState } from "react";
import accountImg from "../../../assets/account.png";
import "./styles.css";

export default function AccountPage() {
    let[user,setUser] = useState({});

    useEffect(() => {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const userId = localStorage.getItem("userId");
        setUser({username,email,userId});
    }, []);
    return (


        <div className="account">
                <div className="account-card">
                    <div className="account-title">
                        <h1>ACCOUNT</h1>
                        <img style={{width: "10rem", height: "10rem"}} src={accountImg} alt="account" />
                    </div>
                    <div className="account-details">
                        <h4>User-ID: {user.userId}</h4>
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
        </div>
    )
}