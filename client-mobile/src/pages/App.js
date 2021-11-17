import { Container } from "@mui/material";
import Nav from "../components/Nav";
import Home from "./Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Class from "./Class";
import Profile from "./Profile";
import Header from "../components/Header";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import StudentTask from "./Task";
import HomeTeacher from "./teacher/Home";
import SpeakingStudent from "./Speaking";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../store/actions/actionUser";
import ProfileTeacher from "./teacher/Profile";
import { alertLoading } from "../assets/js/sweetalert2";
import NavTeacher from "../components/teacher/Nav";
import ClassTeacher from "./teacher/MyClass";
import Tasks from "./teacher/Tasks";
import CreateListeningTask from "./CreateListeningTask";
import SongSearch from "./SongSearch";
import ListeningAnswer from "./ListeningAnswer";

function App() {
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, isError, user } = useSelector((state) => state.user);
  const home = () => {
    return <>{user?.role === "student" ? <Home /> : user?.role === "teacher" ? <HomeTeacher /> : ""}</>;
  };
  const profile = () => {
    return <>{user?.role === "student" ? <Profile /> : user?.role === "teacher" ? <ProfileTeacher /> : ""}</>;
  };

  const myClass = () => {
    return <>{user?.role === "student" ? <Class /> : <Navigate to="/login" />}</>;
  };
  const teacherClass = () => {
    return <>{user?.role === "student" ? <Navigate to="/login" /> : <ClassTeacher />}</>;
  };
  const tasks = () => {
    return <>{user?.role === "student" ? <Navigate to="/login" /> : <Tasks />}</>;
  };
  useEffect(() => {
    dispatch(getUser());
  }, [isLoggedIn]);

  return (
    <>
      {isLoading ? alertLoading() : ""}
      {access_token ? <Header /> : ""}
      <Container sx={{ mt: 13, mb: 8 }} fixed>
        <Routes>
          <Route path="/myclass/:id" element={access_token ? teacherClass() : <Navigate to="/login" />} />
          <Route path="/" element={access_token ? home() : <Navigate to="/login" />} />
          <Route path="/class" element={access_token ? myClass() : <Navigate to="/login" />} />
          <Route path="/profile" element={access_token ? profile() : <Navigate to="/login" />} />
          <Route path="/tasks" element={access_token ? tasks() : <Navigate to="/login" />} />

          <Route path="/search-song" element={access_token ? <SongSearch /> : <Navigate to="/login" />} />
          <Route path="/create-listening-task/:id" element={access_token ? <CreateListeningTask /> : <Navigate to="/login" />} />
          <Route path="/listening-answer" element={access_token ? <ListeningAnswer /> : <Navigate to="/login" />} />

          <Route path="/tasks/:id" element={access_token ? <StudentTask /> : <Navigate to="/login" />} />
          <Route path="/speaking/:id" element={access_token ? <SpeakingStudent /> : <Navigate to="/login" />} />

          <Route path="/login" element={access_token ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={access_token ? <Navigate to="/" /> : <RegisterPage />} />
        </Routes>
      </Container>
      {user?.role === "student" ? (
        <Container fixed>
          <Nav />
        </Container>
      ) : user?.role === "teacher" ? (
        <Container fixed>
          <NavTeacher />
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
