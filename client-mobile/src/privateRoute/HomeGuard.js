import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
import HomeTeacher from "../pages/teacher/Home";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

const HomeGuard = () => {
  console.log("home");
  const distpatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    distpatch(getUser());
  }, []);
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{user?.role === "student" ? <Home /> : user?.role === "teacher" ? <HomeTeacher /> : ""}</>;
};

export default HomeGuard;
