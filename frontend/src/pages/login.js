import React, { useEffect } from "react";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { Button } from "@mui/material";
import { useHistory, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authprovider";
import axios from "axios";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  const { authState, authDispatch } = useAuth();

  let handleCallbackResponse = (response) => {
    console.log(response);
    let userObject = jwtDecode(response.credential);
    // setUser(userObject);
    authDispatch({ type: "LOGIN", payload: userObject }); // Dispatch login action
    document.getElementById("signIn").hidden = true;

    // send data to backend and store in user sessions
    // Prepare the data to be sent to the backend
    const data = { userObject };

    axios
      .post("http://localhost:5000/api/userdata", data)
      .then((response) => {
        // Handle the response from the backend if needed
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
      });

    // Store user data in session storage
    sessionStorage.setItem("user", JSON.stringify(userObject));

    navigate(`/landing`);
  };

  useEffect(() => {
    const clientid = process.env.REACT_APP_CLIENT_ID;
    console.log(clientid);
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signIn"),
        {
          theme: "outline",
          size: "large",
        }
      );
    } else {
      console.error("Google API is not available.");
    }
  }, []);

  let handleLogout = () => {
    // setUser({});
    authDispatch({ type: "LOGOUT" });
    document.getElementById("signIn").hidden = false;
  };

  return (
    <div>
      <div className="container">
        <div className="image-container">
          <img src="/images/bg.png" alt="Image" />
        </div>
        <div className="content-container">
          <div>
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div id="signIn"></div>
          <h1>QuickReadings</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
