import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Tasks = () => {
  const location = useLocation();
  const { auth } = useAuthContext();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default Tasks;
