import { useChoiseContext } from "../context/ChoiseContext";
import { useTaskContext } from "../context/TaskContext";
import "../style/TaskContainer.css";
import TaskCard from "./TaskCard";

const TaskContainer = () => {
  const { select, search } = useChoiseContext();
  const { tasks } = useTaskContext();
  var sortedTask = [];
  if (select == 1) {
    sortedTask = [...tasks]
      .sort((taskA, taskB) => (taskA.updatedAt > taskB.updatedAt ? -1 : 1))
      .filter((task) => task.title.toLowerCase().includes(search));
  } else if (select == 2) {
    sortedTask = [...tasks]
      .sort((taskA, taskB) => (taskA.updatedAt > taskB.updatedAt ? 1 : -1))
      .filter((task) => task.title.toLowerCase().includes(search));
  } else if (select == 3) {
    sortedTask = [...tasks]
      .sort((taskA, taskB) =>
        taskA.importance > taskB.importance
          ? -1
          : taskA.importance < taskB.importance
          ? 1
          : taskA.updatedAt > taskB.updatedAt
          ? -1
          : 1
      )
      .filter((task) => task.title.toLowerCase().includes(search));
  } else if (select == 4) {
    sortedTask = [...tasks]
      .sort((taskA, taskB) =>
        taskA.importance > taskB.importance
          ? 1
          : taskA.importance < taskB.importance
          ? -1
          : taskA.updatedAt > taskB.updatedAt
          ? -1
          : 1
      )
      .filter((task) => task.title.toLowerCase().includes(search));
  } else if (select == 5) {
    sortedTask = tasks
      .filter((task) => task.status == 1)
      .filter((task) => task.title.toLowerCase().includes(search));
  } else {
    sortedTask = tasks
      .filter((task) => task.status == 2)
      .filter((task) => task.title.toLowerCase().includes(search));
  }
  return (
    <div className="taskContainer">
      {sortedTask.map((task, index) => {
        return <TaskCard task={task} key={index} />;
      })}
    </div>
  );
};

export default TaskContainer;
