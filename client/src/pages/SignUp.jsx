import { Link, useLocation, Navigate } from "react-router-dom";
import "../style/SignUp.css";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { auth } = useAuthContext();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (data.message) {
        setMessage(data.message);
        setError(null);
      }
      if (data.errors) {
        setMessage(null);
        setError(data.errors);
      } else {
        setError(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return auth ? (
    <Navigate to="/tasks/dashboard" state={{ from: location }} replace />
  ) : (
    <div className="background">
      <div className="stackSignUp">
        <form className="form" onSubmit={handleSubmit}>
          <label>First Name: </label>
          <input
            type="text"
            placeholder="Enter your first name"
            id="firstName"
            onChange={handleChange}
          />
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="Enter your last name"
            id="lastName"
            onChange={handleChange}
          />
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
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
        {error ? <p className="errors">{error}</p> : ""}
        {message ? <p className="message">{message}</p> : ""}
      </div>
    </div>
  );
};

export default SignUp;
