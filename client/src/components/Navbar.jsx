import "../style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";

const Navbar = () => {
  const { auth, setAuth } = useAuthContext();
  const { setTasks } = useTaskContext();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.message) {
        localStorage.removeItem("user");
        localStorage.removeItem("tasks");
        setAuth("");
        setTasks("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <p>D&D Task</p>
      </Link>
      <Link to="/tasks/add">
        <p>Add a task</p>
      </Link>
      <button onClick={handleSignOut}>Sign Out</button>
      <div className="fullName">
        <p>{auth.firstName}</p>
        <p>{auth.lastName}</p>
      </div>
    </div>
  );
};

export default Navbar;
