import "../style/TaskContainer.css";
import useFunction from "../hooks/useFunction";
import TaskCard from "./TaskCard";

const TaskContainer = () => {
  const sortedTasks = useFunction();
  console.log(sortedTasks);
  return (
    <div className="taskContainer">
      {sortedTasks.map((task, index) => {
        return <TaskCard task={task} key={index} />;
      })}
    </div>
  );
};

export default TaskContainer;
