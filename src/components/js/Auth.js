import React, { useState } from "react";
import "../css/Auth.css";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
      <form className="auth-form">
        {isSignUp && (
          <div>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
        )}
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
      </form>
      <p onClick={toggleMode}>
        {isSignUp
          ? "Already have an account? Log In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

export default Auth;
