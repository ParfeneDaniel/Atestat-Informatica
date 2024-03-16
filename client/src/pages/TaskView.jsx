import "../style/TaskView.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

const TashView = () => {
  const { id } = useParams();
  const { tasks } = useTaskContext();
  const navigate = useNavigate();
  const task = tasks.find((task) => task._id == id);
  const handleClick = () => {
    navigate("/tasks/dashboard");
  }
  return (
    <div className="background">
      <div className="stackViewTask">
        <div className="taskDetails">
          <h1>{task.title}</h1>
          <pre className="taskContent">{task.content}</pre>
          <p className="taskImportance">Importance: {task.importance}</p>
          <p className="taskStatus">
            Status: {task.status == 1 ? "In Progress" : "Finished"}
          </p>
        </div>
        <button onClick={handleClick}>Go to dashboard</button>
      </div>
    </div>
  );
};

export default TashView;
