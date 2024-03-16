import { Link } from "react-router-dom";
import "../style/TaskCard.css";

const TaskCard = ({ task }) => {
  return (
    <div className="task">
      <div className="header">
        <Link to={`/tasks/view/${task._id}`}>
          <h2>{task.title}</h2>
        </Link>
      </div>
      <pre className="content">{task.content}</pre>
      <div className="bottom">
        <p>{task.status == 1 ? "In Progress" : "Finished"}</p>
        <p>{task.importance}</p>
        <Link to={`/tasks/edit/${task._id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
