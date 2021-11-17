import { Container } from "@mui/material";
import Nav from "../components/Nav";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
import Class from "../pages/Class";
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentTask from "../pages/Task";
import HomeTeacher from "../pages/teacher/Home";
import SpeakingStudent from "../pages/Speaking";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ProfileTeacher from "../pages/teacher/Profile";
import ClassTeacher from "../pages/teacher/MyClass";
import Tasks from "../pages/teacher/Tasks";
import CreateListeningTask from "../pages/CreateListeningTask";
import SongSearch from "../pages/SongSearch";
import ListeningAnswer from "../pages/ListeningAnswer";

export const home = (props) => {
  console.log("home");
  const { role } = props;
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{role === "student" ? <Home /> : role === "teacher" ? <HomeTeacher /> : ""}</>;
};
export const profile = (props) => {
  console.log("profile");
  const { role } = props;
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;

  return <>{role === "student" ? <Profile /> : role === "teacher" ? <ProfileTeacher /> : ""}</>;
};

export const myClass = (props) => {
  console.log("myClass");
  const { role } = props;
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{role === "student" ? <Class /> : <Navigate to="/login" />}</>;
};
export const teacherClass = (props) => {
  console.log("teacherClass");
  const { role } = props;
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{role === "student" ? <Navigate to="/login" /> : <ClassTeacher />}</>;
};
export const tasks = (props) => {
  console.log("tasks");
  const { role } = props;
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return <Navigate to="/login" />;
  return <>{role === "student" ? <Navigate to="/login" /> : <Tasks />}</>;
};
