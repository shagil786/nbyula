import React, { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../utils/api";
import { setToken } from "../../utils/auth-utils";
import { setUserDetailsInfo } from "../../utils/userDetailsInfo";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    container,
    usernameStyle,
    passwordStyle,
    buttonStyle,
    wrapper,
    mainContainer,
  } = styles;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };

    login(body)
      .then(async (res) => {
        const { id, isAdmin, password, secret, token, username } = res.data;
        await setToken({ secret, username });
        let obj = {
          token: token,
          email: username,
          userId: id,
          password: password,
          isAdmin: isAdmin,
          secret: secret,
        };
        setUserDetailsInfo(obj);
        navigate("/app/job-listing");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <div className={container}>
      <div className={mainContainer}>
        <h2>Login</h2>
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
          <button type="submit" className={buttonStyle} onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
