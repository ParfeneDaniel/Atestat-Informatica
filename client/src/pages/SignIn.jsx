import { useState } from "react";
import "../style/SignIn.css";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.errors) {
        setError(data.errors);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        setAuth(data);
        navigate("/tasks/dashboard");
        setError(false);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return auth ? (
    <Navigate to="/tasks/dashboard" state={{ from: location }} replace />
  ) : (
    <div className="background">
      <div className="stackSignIn">
        <form className="form" onSubmit={handleSubmit}>
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            onChange={handleChange}
          />
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            onChange={handleChange}
          />
          <input
            type="submit"
            value={loading ? "Loading..." : "Submit"}
            id="submit"
            disabled={loading}
          />
        </form>
        <p>
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {error ? <p className="errors">{error}</p> : ""}
      </div>
    </div>
  );
};

export default SignIn;
