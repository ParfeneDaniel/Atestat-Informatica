import { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import "../style/TaskEdit.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const TaskEdit = () => {
  const { id } = useParams();
  const { tasks } = useTaskContext();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const task = tasks.find((task) => task._id == id);
  useEffect(() => {
    const taskData = {
      title: task.title,
      content: task.content,
      importance: task.importance,
      status: task.status,
    };
    setFormData(taskData);
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
        setError(null);
      }
      if (data.errors) {
        setMessage(null);
        setError(data.errors);
      } else {
        setError(null);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const response = await fetch(`/api/task/${id}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
        },
      });
      console.log(response);
      const data = await response.json();
      if (data.message) {
        navigate("/tasks/dashboard");
      }
      setLoadingDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="background">
      <div className="stackAddTask">
        <form className="form" onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            placeholder="Enter the title of the task (maximum 30 characters)"
            id="title"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <label>Content: </label>
          <textarea
            id="content"
            placeholder="Enter the content of the task"
            rows={5}
            value={formData.content || ""}
            onChange={handleChange}
          />
          <label>Importance: </label>
          <input
            type="text"
            id="importance"
            placeholder="Enter the importance of the task (between 1 and 5)"
            value={formData.importance || ""}
            onChange={handleChange}
          />
          <label>Status: </label>
          <input
            type="text"
            placeholder="Enter the status cod of the task (1 - in progress, 2 - finished)"
            id="status"
            value={formData.status || ""}
            onChange={handleChange}
          />
          <input
            type="submit"
            value={loading ? "Loading..." : "Submit"}
            id="submit"
            disabled={loading}
          />
        </form>
        {error ? <p className="errors">{error}</p> : ""}
        {message ? <p className="message">{message}</p> : ""}
        <button disabled={loadingDelete} onClick={handleDelete}>{loadingDelete ? "Deleting..." : "Delete Task"}</button>
        <Link to="/tasks/dashboard">
          <p>Go to dashboard</p>
        </Link>
      </div>
    </div>
  );
};

export default TaskEdit;
