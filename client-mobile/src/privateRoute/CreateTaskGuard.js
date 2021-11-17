import Class from "../pages/Class";
import { Navigate } from "react-router-dom";
import CreateListeningTask from "../pages/CreateListeningTask";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

const CreateTaskGuard = () => {
  console.log("cretae task");
  const distpatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    distpatch(getUser());
  }, []);
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{user?.role === "student" ? <Class /> : user?.role === "teacher" ? <CreateListeningTask /> : ""}</>;
};

export default CreateTaskGuard;
