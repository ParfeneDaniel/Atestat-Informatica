import "../style/Dashboard.css";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import TaskContainer from "../components/TaskContainer";
import { useTaskContext } from "../context/TaskContext";
import Choises from "../components/Choises";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { setAuth } = useAuthContext();
  const { tasks, setTasks } = useTaskContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/task/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 401 || response.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("tasks");
        setAuth("");
        setTasks("");
        navigate("/");
      } else {
        const data = await response.json();
        localStorage.setItem("tasks", JSON.stringify(data));
        setTasks(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="backgroundDashboard">
      <Navbar />
      <Choises />
      {tasks? <TaskContainer /> : ""}
    </div>
  );
};

export default Dashboard;
