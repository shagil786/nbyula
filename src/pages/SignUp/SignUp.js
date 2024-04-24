import React, { useState } from "react";
import styles from "./Signup.module.css";
import Switch from "react-switch";

const SignUp = () => {
  const {
    container,
    usernameStyle,
    passwordStyle,
    adminStyle,
    buttonStyle,
    wrapper,
    mainContainer,
  } = styles;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login data to backend or perform authentication logic
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("isAdmin:", isAdmin);
    // Reset form fields after submission
    setUsername("");
    setPassword("");
    setIsAdmin(false);
  };

  return (
    <div className={container}>
      <div className={mainContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={wrapper}>
          <div className={usernameStyle}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={passwordStyle}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={adminStyle}>
            <label>Admin:</label>
            <Switch
              onChange={(checked) => setIsAdmin(checked)}
              checked={isAdmin}
            />
          </div>
          <button type="submit" className={buttonStyle}>
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
