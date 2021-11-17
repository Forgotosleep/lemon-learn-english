import { AppBar, Toolbar, Icon, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { yellow, brown } from "@mui/material/colors";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import psyduck from "../assets/icon/psyduck.svg";

export default function Header() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const color = {
    backgroundColor: yellow[600],
    color: brown[700],
  };
  function capitalizeFirstLetter([first, ...rest]) {
    return [first.toUpperCase(), ...rest].join("");
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setValue("Home");
    } else if (location.pathname.substr(0, 8) === "/myclass") {
      setValue("My Class");
    } else if (location.pathname.substr(0, 6) === "/tasks") {
      setValue("Tasks");
    } else if (location.pathname.substr(0, 9) === "/speaking") {
      setValue("Speaking");
    } else if (location.pathname.substr(0, 8) === "/myclass") {
      setValue("My Class");
    } else if (location.pathname === "/search-song") {
      setValue("Search Song");
    } else if (location.pathname.substr(0, 22) === "/create-listening-task") {
      setValue("Create Task");
    } else {
      setValue(capitalizeFirstLetter(location.pathname.substr(1)));
    }
  }, [location.pathname]);
  const displayDesktop = () => {
    return (
      <>
        <Toolbar>
          {value === "My Class" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "Tasks" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "Search Song" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : value === "Create Task" ? (
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
          ) : (
            <Icon sx={{ mr: 2 }}>
              <img src={psyduck} alt="psyduck" height={25} width={25} />
            </Icon>
          )}
          <strong>{value}</strong>
        </Toolbar>
      </>
    );
  };

  return (
    <header>
      <AppBar style={color}>{displayDesktop()}</AppBar>
    </header>
  );
}
