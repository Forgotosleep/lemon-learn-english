import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/teachers/Dashboard";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/teachers/Login";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function RequireAuth({ children, ...rest }) {
  const token = localStorage.getItem("access_token");
  return <>{!token ? <Navigate to="/login"></Navigate> : children}</>;
}

function App() {
  return (
    <div className="App">
      {/* <h1>Start Page</h1> */}

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard/*"
          element={
            <RequireAuth>
              <Navbar />
              <Dashboard />
            </RequireAuth>
          }
        ></Route>

        {/* start page should be login page if not loged in, else go to /dashboard */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navigate to="/dashboard"></Navigate>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
