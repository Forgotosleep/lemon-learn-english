import { Navigate } from "react-router-dom";
import ClassTeacher from "../pages/teacher/MyClass";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

const TeacherStudentGuard = () => {
  console.log("teacher");
  const distpatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    distpatch(getUser());
  }, []);
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{user?.role === "student" ? <Navigate to="/login" /> : <ClassTeacher />}</>;
};

export default TeacherStudentGuard;
