import React, { useState } from "react";
import * as AuthApi from "../../features/AuthSlice.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Logging in " + JSON.stringify(registerData));

    const response = await AuthApi.RegisterApi(registerData);
    console.log(`response for register: ${JSON.stringify(response)}`);
    const message = await response.json();
    if (response.status == 200) {
      localStorage.setItem("username", JSON.stringify(message.username));
      localStorage.setItem("accessToken", JSON.stringify(message.accessToken));
      navigate("/");
      alert(message.message);
    } else {
      alert(message.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleRegister}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          required
          value={registerData.username}
          minLength={8}
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value.toUpperCase() })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          minLength={8}
          onChange={(e) =>
            setRegisterData({ ...registerData, confirmPassword: e.target.value })
          }
        />
        <input type="submit" value="Submit" />
        <span className="bottom-text">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Login
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
