import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>Create Account</h1>
        <p>Signup to access dashboard</p>
      </div>

      <form className="auth-right">
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Password" />
        <button type="button" onClick={() => navigate("/")}>
          Signup
        </button>
      </form>
    </div>
  );
}
