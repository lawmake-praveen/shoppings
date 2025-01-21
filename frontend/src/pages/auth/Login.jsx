import React, { useState } from "react";
import * as AuthApi from "../../features/AuthSlice.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in " + JSON.stringify(loginData));

    const response = await AuthApi.loginApi(loginData);
    console.log(`response for login: ${JSON.stringify(response)}`);
    const message = await response.json();
    if (response.status == 200) {
      localStorage.setItem("username", JSON.stringify(message.username));
      localStorage.setItem("accessToken", JSON.stringify(message.accessToken));
      navigate("/dashboard");
    } else {
      alert(message.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          required
          value={loginData.username}
          minLength={8}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value.toUpperCase() })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <input type="submit" value="Submit" />
        <span className="bottom-text">
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
