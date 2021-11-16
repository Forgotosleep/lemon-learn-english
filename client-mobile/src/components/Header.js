import { AppBar, Toolbar, Icon, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
