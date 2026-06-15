import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";
import logo from "../assets/images/logo.png";

const RegisterPage = () => {

    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [okMessage, setOkMessage] = useState("");
    const [error, setError] = useState("");

    const triggerRegister = async(e) =>{
      e.preventDefault();
      setIsLoading(true);
      setError("");

      const registerData = {
        first_name : firstname,
        last_name : lastname,
        email : email,
        password : password
      }

      try{
        const response = await fetch("http://127.0.0.1:8000/register/", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          } ,
          body : JSON.stringify(registerData),
        });
        
        const data = await response.json();
        if(response.ok){
          setOkMessage(data.message);
          navigate("/login")
        }else{
          setError("User exists already! LogIn")
        }
      }catch(error){
        setError("Couldn't reach please connect again!")
      }finally{
        setIsLoading(false);
      }
    }

    return (
    <div className="register-form-section">

      {/* LOGO */}
      <div className="register-logo"><img src={logo}alt="CareerFlow Logo"/>
        <span>CareerFlow</span>
      </div>

      

      {/* FORM */}
      <form onSubmit={triggerRegister}>
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
        <h2>Create Account</h2>
        <p>Start your journey with CareerFlow today.</p>
        {/* NAME ROW */}
        <div className="input-row">
          <div className="input-group">
            <label>First name</label>
            <input type="text" placeholder="Alex" required value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
          </div>
          <div className="input-group">
            <label>Last name</label>
            <input type="text" placeholder="Student" required value={lastname} onChange={(e) => setLastname(e.target.value)}/>
          </div>
        </div>
        {/* EMAIL */}
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="alex@university.edu" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        {/* PASSWORD */}
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {/* BUTTON */}
        <button
          type="submit"
          className="register-btn"
          disabled={isLoading}
          style={{
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          {isLoading ? "Working..." : "Create Account"}
        </button>
        {/* LOGIN LINK */}
        <p id="nav_login">
          Already have an account?
          <a onClick={() => navigate("/login")} style={{cursor:"pointer"}}>Login here</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;