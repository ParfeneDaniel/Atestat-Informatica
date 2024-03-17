import { createContext, useContext, useState } from "react";

export const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || null
  );
  const value = { tasks, setTasks };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
