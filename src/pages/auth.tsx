import React, { useState } from 'react';
import './auth.css';
import { registerUser, loginUser } from '../api/handleApi';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
        registerUser(name, email, password);
        setIsSignUp(false);
    } else {
        loginUser(email, password, navigate);
    }
};



  return (
    <section className="signup-container">
        <div className="signup-cover">
            <div className="cover-content">
                <h1>MOST WELCOME TO MY PORTFOLIO</h1>
                <div className="cover-underline"></div>
                <p>Start with Setting Up Your Account</p>
            </div>
        </div>
        <div className="signup-content">
        <h2>{isSignUp ? "REGISTER" : "LOGIN"}</h2>
            <form className="infoForm authForm" onSubmit={handleSubmit}>
                <div>
                  {isSignUp && (
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="infoInput"
                            name="name"
                            onChange={e => setName(e.target.value)}
                        />
                        <p className="error-txt">This field can't be empty</p>
                    </div>
                  )}
                    <div className="input-field">
                        <input
                        type="text"
                        placeholder="Email Address"
                        className="infoInput"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        />
                        <p className="error-txt">This field can't be empty</p>
                    </div>
                </div>
                <div>
                    <div className="input-field">
                        <input
                        type="password"
                        className="infoInput"
                        placeholder="Password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        />
                        <p className="error-txt">This field can't be empty</p>
                    </div>
                    {isSignUp && (
                        <div className="input-field">
                            <input
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                                />
                            <p className="error-txt">This field can't be empty</p>
                        </div>
                    
                    )}
                </div>
                {isSignUp ? (
                <>
                    <span style={{color: "#ffffff80", fontSize: "14px"}}>
                        Already have an account?{" "}
                        <span className="signup-text" style={{ fontWeight: "bold", cursor: "pointer", color: "#F45815" }} onClick={() => { 
                            setIsSignUp((prev) => !prev);
                        }}>Login</span>
                    </span>
                </>
                ) : (
                <>
                    <span style={{color: "#ffffff80", fontSize: "14px"}}>
                        Don't have an account?{" "}
                        <span className="signup-text" style={{ fontWeight: "bold", cursor: "pointer", color: "#F45815" }} onClick={() => {
                            setIsSignUp((prev) => !prev);
                        }}>Signup</span>
                    </span>
                </>
                )}       
                <center>
                    <p className="confirm-pass-error" style={{display: confirmPass ? "none" : "block",}}>
                        ! Passoword does not match the confirm password
                    </p>
                    <button className="button auth-btn" type="submit">{isSignUp ? "Register" : "Login"}</button>
                </center>
            </form>
            <footer>
                <p className="copyright">Designed and Built By Aldo Twizerimana</p>
                <p className="git_ratings">Follow me on my <a href="https://github.com/Aldot-02">Github</a></p>
            </footer>
        </div>
    </section>
  )
}

export default Auth