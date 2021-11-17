import { Container } from "@mui/material";
import Nav from "../components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import StudentTask from "./Task";
import SpeakingStudent from "./Speaking";
import { useSelector } from "react-redux";
import { alertLoading } from "../assets/js/sweetalert2";
import NavTeacher from "../components/teacher/Nav";
import ListeningAnswer from "./ListeningAnswer";
import HomeGuard from "../privateRoute/HomeGuard";
import MyClassGuard from "../privateRoute/MyClassGuard";
import TeacherStudentGuard from "../privateRoute/TeacherStudentGuard";
import ProfileGuard from "../privateRoute/ProfileGuard";
import TasksGuard from "../privateRoute/TasksGuard";
import SearchSongGuard from "../privateRoute/SearchSongGuard";
import CreateTaskGuard from "../privateRoute/CreateTaskGuard";

function App() {
  const access_token = localStorage.getItem("access_token");
  const { isLoggedIn, isLoading, isError, user } = useSelector((state) => state.user);

  // if (isLoading) {
  //   alertLoading();
  // }

  return (
    <>
      {access_token ? <Header /> : ""}
      <Container sx={{ mt: 13, mb: 8 }} fixed>
        <Routes>
          <Route path="/myclass/:id" element={<TeacherStudentGuard />} />
          <Route path="/" element={<HomeGuard />} />
          <Route path="/class" element={<MyClassGuard />} />
          <Route path="/profile" element={<ProfileGuard />} />
          <Route path="/tasks" element={<TasksGuard />} />

          <Route path="/search-song" element={<SearchSongGuard />} />
          <Route path="/create-listening-task/:id" element={<CreateTaskGuard />} />
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
