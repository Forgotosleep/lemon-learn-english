import { Container } from "@mui/material";
import Nav from "../components/Nav";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Class from "./Class";
import Profile from "./Profile";
import Header from "../components/Header";
function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 13, mb: 8 }} fixed>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class" element={<Class />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
      <Container fixed>
        <Nav />
      </Container>
    </>
  );
}

export default App;
