import React from "react";

export default function Login({ onLogin }) {
  return (
    <div className="centered">
      <div className="login-card">
        <h2>StudyFlow</h2>
        <p className="subtitle">Your study companion</p>

        <input placeholder="your.email@university.edu" />
        <input type="password" placeholder="Password" />

        <button onClick={onLogin}>Log In</button>

        <p className="link">Forgot Password?</p>
        <p className="link">Don't have an account? Create Account</p>
      </div>
    </div>
  );
}
