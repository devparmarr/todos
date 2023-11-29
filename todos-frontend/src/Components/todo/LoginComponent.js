import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./TodoApp.css";
import { useAuth } from "./security/AuthContext";


export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const authContext = useAuth();

  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  function handleSubmit() {
    if (authContext.login(username, password)) {
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="Login">
      
      {showErrorMessage && (
        <div className="errorMessage">
          Authentication Failed. Please check your credentials.
        </div>
      )}
      <div className="LoginForm">
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-secondary" type="button " name="login" onClick={handleSubmit}>
            login
          </button>
        </div>
      </div>
    </div>
  );
}
