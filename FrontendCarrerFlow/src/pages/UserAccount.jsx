import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserAccount.css"

const UserAccount = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const [userDetails, setUserDetails] = useState({});

  const fetchUserDetails = async() =>{
    try{
      const token = localStorage.getItem("access");

      const response = await fetch("http://127.0.0.1:8000/account/", {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        }
      });
      const data = await response.json();

      if(response.ok){
        setUserDetails(data);
      }else{
        console.log(data);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    fetchUserDetails();
  }, [])

  console.log(userDetails.email)

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="profile-avatar">
          {userDetails.username?.charAt(0).toUpperCase()}
        </div>

        <h2>{userDetails.username}</h2>
        <p>{userDetails.email}</p>

        <div className="account-details">
          <div className="detail-item">
            <strong>Username</strong>
            <span>{userDetails.username}</span>
          </div>

          <div className="detail-item">
            <strong>Email</strong>
            <span>{userDetails.email}</span>
          </div>

          <div className="detail-item">
            <strong>JOINED</strong>
            <span>
              {new Date(userDetails.joined).toLocaleDateString()}
            </span>
          </div>
          
        </div>

        <div className="account-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;