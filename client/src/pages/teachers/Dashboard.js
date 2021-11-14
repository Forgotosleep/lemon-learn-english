import React from "react";
import { Route, Routes, useLocation, useMatch } from "react-router";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import ManageClass from "./ManageClass";

export default function () {
  return (
    <>
      <h1>Teacher dashboard</h1>

      <Link to={`/dashboard`} className="">
        home
      </Link>
      <Link to={`/dashboard/class`} className="m-4">
        manage class
      </Link>

      <div className="container mt-4 pt-4">
        <Routes>
          <Route path={`/`} element={<h2>home dashboard</h2>}></Route>
          <Route path={`/class`} element={<ManageClass />}></Route>
          <Route path={`/class/add`} element={<AddClass />}></Route>
        </Routes>
      </div>
    </>
  );
}
