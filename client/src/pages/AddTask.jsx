import { useState } from "react";
import "../style/AddTask.css";
import { Link } from "react-router-dom";

const AddTask = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const response = await fetch("/api/task/add", {
        method: "POST",
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
        setError(data.errors);
        setMessage(null);
      } else {
        setError(null);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
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
            onChange={handleChange}
          />
          <label>Content: </label>
          <textarea
            id="content"
            placeholder="Enter the content of the task"
            rows={5}
            onChange={handleChange}
          />
          <label>Importance: </label>
          <input
            type="text"
            id="importance"
            placeholder="Enter the importance of the task (between 1 and 5)"
            onChange={handleChange}
          />
          <label>Status: </label>
          <input
            type="text"
            placeholder="Enter the status cod of the task (1 - in progress, 2 - finished)"
            id="status"
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
        <Link to="/tasks/dashboard">
          <p>Go to dashboard</p>
        </Link>
      </div>
    </div>
  );
};

export default AddTask;
