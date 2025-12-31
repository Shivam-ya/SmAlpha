import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) return alert("Enter email");
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h1>Welcome Back 👋</h1>
        <p>Login to continue managing your dashboard</p>
      </div>

      <div className="auth-right">
        <h2>Sign In</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input placeholder="Password" type="password" />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
