import { Navigate } from "react-router-dom";
import Tasks from "../pages/teacher/Tasks";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

const TasksGuard = () => {
  console.log("tasks");
  const distpatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    distpatch(getUser());
  }, []);
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{user?.role === "student" ? <Navigate to="/login" /> : <Tasks />}</>;
};

export default TasksGuard;
