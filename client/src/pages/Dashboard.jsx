import "../style/Dashboard.css";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import TaskContainer from "../components/TaskContainer";
import { useTaskContext } from "../context/TaskContext";
import Choises from "../components/Choises";

const Dashboard = () => {
  const { tasks, setTasks } = useTaskContext();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/task/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data);
      localStorage.setItem("tasks", JSON.stringify(data));
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
