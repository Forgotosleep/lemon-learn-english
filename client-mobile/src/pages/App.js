import { Container } from "@mui/material";
import Nav from "../components/Nav";
import Home from "./Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Class from "./Class";
import Profile from "./Profile";
import Header from "../components/Header";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../store/actions/actionUser";

function App() {
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, isError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      {access_token ? <Header /> : ""}
      <Container sx={{ mt: 13, mb: 8 }} fixed>
        <Routes>
          <Route path="/" element={access_token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/class" element={access_token ? <Class /> : <Navigate to="/login" />} />
          <Route path="/profile" element={access_token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={access_token ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={access_token ? <Navigate to="/" /> : <RegisterPage />} />
        </Routes>
      </Container>
      {access_token ? (
        <Container fixed>
          <Nav />
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
