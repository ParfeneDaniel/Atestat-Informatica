import { Link, useNavigate } from "react-router-dom";
import "../style/App.css";
import { useAuthContext } from "../context/AuthContext";

const App = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/tasks/dashboard");
  }
  return (
    <div className="background">
      <div className="stack">
        <h1>D&D Task</h1>
        <h2>A tool for organised people</h2>
        {auth ? (
          <div className="dashboardButton">
            <button onClick={handleClick}>Go to dashboard</button>
          </div>
        ) : (
          <div className="buttonGroup">
            <Link to="/signup">
              <button className="signUpButton">SignUp</button>
            </Link>
            <Link to="/signin">
              <button className="signInButton">SignIn</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
