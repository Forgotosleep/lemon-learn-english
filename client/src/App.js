import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/teachers/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <h1>Start Page</h1> */}

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>

        <Route path="/" element={<h1>Start Page</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
