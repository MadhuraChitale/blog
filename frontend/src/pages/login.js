import React, { useEffect } from "react";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { Button } from "@mui/material";

function Login() {
  const [user, setUser] = useState({});

  let handleCallbackResponse = (response) => {
    console.log(response);
    let userObject = jwtDecode(response.credential);
    setUser(userObject);
    document.getElementById("signIn").hidden = true;

    // send data to backend and store in user sessions
  };

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id:
          "731656192661-hgnqdg8eas0je78uqf9qtrmuan7giesl.apps.googleusercontent.com",
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
    setUser({});
    document.getElementById("signIn").hidden = false;
  };

  return (
    <div>
      <div id="signIn"></div>
      {Object.keys(user) != 0 && (
        <Button onClick={handleLogout}>Sign Out</Button>
      )}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture} alt={user.name} />
        </div>
      )}
      <div>fix frontent and state management</div>
    </div>
  );
}

export default Login;
