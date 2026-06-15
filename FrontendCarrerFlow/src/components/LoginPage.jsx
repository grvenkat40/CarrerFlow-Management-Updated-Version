import React from "react";
import "../styles/LoginPage.css";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer; 

    if (error) {
      timer = setTimeout(() => { 
        setErrorMessage("");
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer); 
    };
  }, [error]);

  const triggerLogin = async(e) =>{
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    const loginData = {
      email : email,
      password : password,
    };

    try{
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method:"POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(loginData),
      });

      const data = await response.json();

      if(response.ok){

        localStorage.setItem("userID", data.id);
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", data.username);

        setErrorMessage(data.message);
        navigate(`/users/${data.username}/dashboard`);
      } else{
        setErrorMessage(data.detail || data.message || "Invalid email or password.");
      }
      }catch(error){
        console.error("Network Error:", error);
        setErrorMessage("Could not connect to the server. Please try again later.");
      }finally{
        setIsLoading(false);

    }
  }

  useEffect(() => {
    const submitBtn = document.querySelector(".login-btn");

    if (submitBtn) {
      submitBtn.style.cursor = isLoading ? "not-allowed" : "pointer";
      submitBtn.style.opacity = isLoading ? "0.5" : "1";
      submitBtn.disabled = isLoading;
    }
  }, [isLoading]);

  return (
    <main className="login_container">
      
      {/* LEFT SIDE */}
      <div className="hero-content">

        <div className="logo-wrapper">
          <img src={logo} alt="Icon"className="logo-icon"/>
          <span className="logo-text">CareerFlow</span>
        </div>
        <h1>Launch your career<br />with confidence.</h1>
        <p className="hero-description">
          Track your job applications, manage your skills,
          and organize your interview preparation in one
          systematic platform designed for students and graduates.
        </p>

        <ul className="feature-list">
          <li>✅ Track unlimited job applications</li>
          <li>✅ Visualize your progress with analytics</li>
          <li>✅ Manage skill development goals</li>
        </ul>

      </div>
      
      {/* RIGHT SIDE */}
      <div className="login-form-section">
        {
          error && (
            <div id="errorMsg"
              style={{
                display:"flex",
                justifyContent:"center",
                width: "max-content",
                height:"max-content",
                background: "#fee2e2",
                border: "1px solid #ef4444",
                padding: "12px 15px",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {error}
              </p>
            </div>
          )
        }
        <form onSubmit={triggerLogin}>
          <h2>Welcome Back</h2>
          <p>Please enter your details to continue.</p>

          <div className="input-group">
            <label>Email</label>
            <input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <p id="nav_register">
            Don't have an account?
            <a onClick={() => navigate("/register")} style={{cursor:"pointer"}}>
              Sign Up here
            </a>
          </p>
        </form>

      </div>

    </main>
  );
};

export default LoginPage;