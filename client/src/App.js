import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/teachers/Dashboard";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <h1>Start Page</h1> */}

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>

        {/* start page should be login page if not loged in, else go to /dashboard */}
        <Route
          path="/"
          element={
            <>
              <h1>Start Page (gonna be login page)</h1>
              <Link to="/dashboard">Dashboard</Link>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
