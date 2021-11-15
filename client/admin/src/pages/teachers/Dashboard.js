import React from "react";
import { Route, Routes, useLocation, useMatch } from "react-router";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import ClassDetails from "./ClassDetails";
import ManageClass from "./ManageClass";
import ManageLevel from "./ManageLevel";

export default function () {
  return (
    <div className="container pe-5 ps-5 pb-5 pt-2" style={{}}>
      {/* <h1>Admin dashboard</h1> */}

      {/* <div>
        <Link to={`/dashboard`} className="me-4 btn">
          home
        </Link>
        <Link to={`/dashboard/class`} className="me-4 btn">
          manage class
        </Link>
        <Link to={`/dashboard/level`} className="me-4 btn">
          level & category
        </Link>
      </div> */}

      <div
        className="container "
        style={
          {
            // backgroundColor: "#bababa",
            // padding: "40px",
            // borderRadius: "20px",
            // minHeight: "600px",
          }
        }
      >
        <Routes>
          <Route path={`/`} element={<h2>home dashboard</h2>}></Route>
          <Route path={`/class`} element={<ManageClass />}></Route>
          <Route path={`/class/add`} element={<AddClass />}></Route>
          <Route path={`/class/:id/*`} element={<ClassDetails />}></Route>
          <Route path={`/level`} element={<ManageLevel />}></Route>
        </Routes>
      </div>
    </div>
  );
}
