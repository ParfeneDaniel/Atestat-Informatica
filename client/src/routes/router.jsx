import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Tasks from "../pages/Tasks";
import Dashboard from "../pages/Dashboard";
import AddTask from "../pages/AddTask";
import TaskView from "../pages/TaskView";
import TaskEdit from "../pages/TaskEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "tasks",
    element: <Tasks />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add",
        element: <AddTask />,
      },
      {
        path: "view/:id",
        element: <TaskView />,
      },
      {
        path: "edit/:id",
        element: <TaskEdit />
      },
    ],
  },
]);
