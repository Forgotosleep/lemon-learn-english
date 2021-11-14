import React from "react";
import { Route, Routes, useLocation, useMatch } from "react-router";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import ManageClass from "./ManageClass";
import ManageLevel from "./ManageLevel";

export default function () {
  return (
    <div className="container">
      <h1>Admin dashboard</h1>

      <Link to={`/dashboard`} className="me-4 btn">
        home
      </Link>
      <Link to={`/dashboard/class`} className="me-4 btn">
        manage class
      </Link>
      <Link to={`/dashboard/level`} className="me-4 btn">
        level & category
      </Link>

      <div className="container mt-4 pt-4">
        <Routes>
          <Route path={`/`} element={<h2>home dashboard</h2>}></Route>
          <Route path={`/class`} element={<ManageClass />}></Route>
          <Route path={`/class/add`} element={<AddClass />}></Route>
          <Route path={`/level`} element={<ManageLevel />}></Route>
        </Routes>
      </div>
    </div>
  );
}
