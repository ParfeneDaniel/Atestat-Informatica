import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./main.css";
import { AuthContextProvider } from "./context/AuthContext";
import { TaskContextProvider } from "./context/TaskContext";
import { ChoiseContextProvider } from "./context/ChoiseContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <ChoiseContextProvider>
          <RouterProvider router={router} />
        </ChoiseContextProvider>
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
