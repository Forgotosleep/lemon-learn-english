import Profile from "../pages/Profile";
import { Navigate } from "react-router-dom";
import ProfileTeacher from "../pages/teacher/Profile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

const ProfileGuard = () => {
  console.log("profile");
  const distpatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    distpatch(getUser());
  }, []);
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{user?.role === "student" ? <Profile /> : user?.role === "teacher" ? <ProfileTeacher /> : ""}</>;
};

export default ProfileGuard;
